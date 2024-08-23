document.addEventListener('DOMContentLoaded', async () => {
    //
    const getTechnique = async () => {
        try {
            const response = await fetch(`${SERVER_URL}techniques.php`);
            const jsonResponse = await response.json(); // Достаём тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

            return jsonResponse.map((obj) => `${obj.name_technique} (${obj.state_number})`);
        } catch (error) {
            console.log(error);
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
            return [];
        }
    }
    //
    const getOrders = async() => {
        try {
            const response = await fetch(`${SERVER_URL}orders.php?status=1`);
            const jsonResponse = await response.json(); // Достаём тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

            return Object.values(jsonResponse).map((obj) => {
                const date = obj.date.split('<br>-<br>').map((elem) => elem.split('.').reverse().join('-'));
                const time = obj.time.split('<br>-<br>');
                const newObj = {
                    x: [`${date[0]}T${time[0]}`, `${date[1]}T${time[1]}`],
                    y: `${obj.technique} (${obj.stateNumber})`,
                    service: obj.service,
                };
                return newObj;
            });
        } catch (error) {
            console.log(error);
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
            return [];
        }
    };
    //
    const todayLine = {
        id: 'todayLine',
        afterDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;

            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(255, 26, 104, 0.9)';
            ctx.setLineDash([14, 6]);
            ctx.moveTo(x.getPixelForValue(new Date()), top);
            ctx.lineTo(x.getPixelForValue(new Date()), bottom);
            ctx.stroke();

            ctx.setLineDash([]);
        },
    };
    //
    const getOrCreateLegendList = (chart, id) => {
        const legendContainer = document.getElementById(id);
        let listContainer = legendContainer.querySelector('ul');

        if (!listContainer) {
            listContainer = document.createElement('ul');
            listContainer.style.display = 'flex';
            listContainer.style.flexDirection = 'row';
            listContainer.style.margin = 0;
            listContainer.style.padding = 0;

            legendContainer.appendChild(listContainer);
        }

        return listContainer;
    };
    //
    const serviceTextPlugin = {
        id: 'serviceText',
        afterDatasetsDraw(chart, args, options) {
            const {ctx} = chart;
            chart.data.datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i);
                meta.data.forEach((bar, index) => {
                    const service = dataset.data[index].service;
                    const position = bar.tooltipPosition();

                    // Задаем параметры текста
                    ctx.save();
                    ctx.font = '12px Arial';
                    ctx.fillStyle = 'white'; // Цвет текста
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    // Координаты и размеры объекта
                    const {x, y, width, height} = bar;

                    // Обрезаем текст, если он выходит за границы объекта
                    ctx.beginPath();
                    ctx.rect(x-width+3, y-height/2, width-6, height);
                    ctx.clip();

                    // Рисуем текст в середине объекта
                    ctx.fillText(service, x-width/2, y);

                    ctx.restore();
                });
            });
        }
    };
    //
    const htmlLegendPlugin = {
        id: 'htmlLegend',
        afterUpdate(chart, args, options) {
            const ul = getOrCreateLegendList(chart, options.containerID);

            // Remove old legend items
            while (ul.firstChild) {
                ul.firstChild.remove();
            }

            // Reuse the built-in legendItems generator
            const items = chart.options.plugins.legend.labels.generateLabels(chart);

            items.forEach(item => {
                const li = document.createElement('li');
                li.style.alignItems = 'center';
                li.style.cursor = 'pointer';
                li.style.display = 'flex';
                li.style.flexDirection = 'row';
                li.style.marginLeft = '10px';

                li.onclick = () => {
                    const {type} = chart.config;
                    if (type === 'pie' || type === 'doughnut') {
                        // Pie and doughnut charts only have a single dataset and visibility is per item
                        chart.toggleDataVisibility(item.index);
                    } else {
                        chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                        // const meta = chart.getDatasetMeta(item.datasetIndex);
                        // meta.hidden = meta.hidden === null ? true : !meta.hidden;

                    }
                    chart.update({
                        duration: 1000, // Продолжительность анимации в миллисекундах
                        easing: 'easeOutQuart' // Тип анимации
                    });
                };

                // Color box
                const boxSpan = document.createElement('span');
                boxSpan.style.background = item.fillStyle;
                boxSpan.style.borderColor = item.strokeStyle;
                boxSpan.style.borderWidth = item.lineWidth + 'px';
                boxSpan.style.display = 'inline-block';
                boxSpan.style.flexShrink = 0;
                boxSpan.style.height = '20px';
                boxSpan.style.marginRight = '10px';
                boxSpan.style.width = '20px';

                // Text
                const textContainer = document.createElement('p');
                textContainer.style.color = item.fontColor;
                textContainer.style.margin = 0;
                textContainer.style.padding = 0;
                textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

                const text = document.createTextNode(item.text);
                textContainer.appendChild(text);

                li.appendChild(boxSpan);
                li.appendChild(textContainer);
                ul.appendChild(li);
            });
        }
    };


    //
    const ctx = document.getElementById('myChart');
    const minDate = new Date(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime() - 1 * 24 * 60 * 60 * 1000);
    const maxDate = new Date(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime() + 7 * 24 * 60 * 60 * 1000);
    const yAxisLabels = await getTechnique();
    const elements = await getOrders();

    const serviceColors = {
        'ДС': 'rgba(41, 105, 18, 0.7)',
        'ГКС': 'rgba(247, 195, 142, 0.7)',
        'ОТ': 'rgba(159, 214, 50, 0.7)',
        'ЭВС': 'rgba(101, 40, 8, 0.7)',
        'ХАЛ': 'rgba(239, 58, 126, 0.7)',
        'Диспетчер по транспорту': 'rgba(62, 219, 52, 0.7)',
        'РиФИ': 'rgba(87, 72, 73, 0.7)',
        'ГЗИ': 'rgba(14, 251, 99, 0.7)',
        'ЛЭС': 'rgba(62, 219, 52, 0.7)',
        'АиМО': 'rgba(231, 86, 59, 0.7)',
        'Связь': 'rgba(114, 255, 138, 0.7)',
        'ВПО': 'rgba(121, 158, 205, 0.7)',
        'СХМТРиСО': 'rgba(97, 204, 193, 0.7)',
        'Общежитие': 'rgba(237, 18, 209, 0.7)',
        'СЗК': 'rgba(1, 128, 77, 0.7)',
        'КСК': 'rgba(163, 64, 38, 0.7)',
    };

    new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: Object.keys(serviceColors).map((service) => ({
                label: service,
                data: elements.filter((item) => item.service === service),
                backgroundColor: serviceColors[service],
                borderWidth: 1,
                borderSkipped: false,
                borderRadius: 4,
                categoryPercentage: .95,
                grouped: false,
            }))
        },
        options: {
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    position: 'top',
                    type: 'time',
                    time: {
                        unit: 'hour',
                        displayFormats: {
                            hour: 'MMM d, ha'
                        }
                    },
                    ticks: {
                        source: 'auto',
                        autoSkip: false,
                        stepSize: 12,
                    },
                    min: minDate,
                    max: maxDate,
                },
                y: {
                    type: 'category',
                    labels: yAxisLabels,
                    beginAtZero: true,
                    ticks: {
                        autoSkip: false
                    }
                }
            },
            plugins: {
                htmlLegend: {
                    containerID: 'legend-container',
                },
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const service = context.raw.service;
                            return `Служба: ${service}`;
                        },
                        afterLabel: function(context) {
                            const time = context.raw.x.map((elem) => elem.split('T')[1]);
                            return `Время: ${time[0]}-${time[1]}`;
                        }
                    }
                }
            }
        },
        plugins: [todayLine, htmlLegendPlugin, serviceTextPlugin]
    });
});