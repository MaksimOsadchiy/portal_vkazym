document.addEventListener('DOMContentLoaded', async () => {
	//
	const getAllServices = async () => {
		try {
			const response = await fetch(`${SERVER_URL}services.php`);
			const jsonResponse = await response.json(); // Достаём тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа
			return jsonResponse;
		} catch (error) {
			console.log(error);
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			return [];
		}
	};
	//
	const getTechnique = async () => {
		try {
			const response = await fetch(`${SERVER_URL}techniques.php`);
			const jsonResponse = await response.json(); // Достаём тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			return jsonResponse;
		} catch (error) {
			console.log(error);
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			return [];
		}
	};
	//
	const getOrders = async (dateFrom, dateTo, status = 0) => {
		try {
			const response = await fetch(`${SERVER_URL}orders.php?status=${status}`);
			const jsonResponse = await response.json(); // Достаём тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			const result = formatOrder(
				Object.values(jsonResponse).filter((elem) => {
					const date = elem.date.split('<br>-<br>');
					const elemDateFrom = `${date[0].split('.').reverse().join('-')}T00:00:00`;
					const elemDateTo = `${date[1].split('.').reverse().join('-')}T00:00:00`;
					return !(new Date(elemDateTo) < dateFrom || new Date(elemDateFrom) > dateTo);
				})
			);

			return result;
		} catch (error) {
			console.log(error);
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			return [];
		}
	};
	//
	const getResponsiblePerson = async () => {
		try {
			const response = await fetch(`${SERVER_URL}responsiblePersons.php`);
			const jsonResponse = await response.json(); // Достаём тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			return jsonResponse;
		} catch (error) {
			console.log(error);
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			return [];
		}
	};
	//
	const getRoutes = async () => {
		try {
			const response = await fetch(`${SERVER_URL}routes.php`);
			const jsonResponse = await response.json(); // Достаём тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			return jsonResponse;
		} catch (error) {
			console.log(error);
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			return [];
		}
	};
	//
	const putOrder = async () => {
		try {
			const window = document.querySelector('.my-window');
			const id = window.getAttribute('id');
			const qparametr = `?id=${id}`;
			const data = collectContentChangeOrder();
			const response = await fetch(`${SERVER_URL}order.php${qparametr}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			document.dispatchEvent(new CustomEvent('updateError', { detail: 'Заказ изменён!' })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке

			if (+data.status !== elements.find((elem) => +elem.id === +id).status){
				elements = elements.filter((elem) => +elem.id !== +id);
			} else {
				const newElem = {
					id: +id,
					service: allServices.find((elem) => +elem.id === +data.service_id).service,
					x: [data.datetime_from.replace(' ', 'T'), data.datetime_to.replace(' ', 'T')],
					y: `${allTechnique.find((elem) => +elem.id_technique === +data.technique_id).name_technique} (${
						allTechnique.find((elem) => +elem.id_technique === +data.technique_id).state_number
					})`,
					serviceId: +data.service_id,
					responsiblePerson: allResponsiblePerson.find((elem) => +elem.id === +data.responsible_person_id),
					route: allRoutes.find((elem) => +elem.id === +data.route_id).route_to,
					routeId: +data.route_id,
					shift: +data.shift,
					status: +data.status,
				};
				elements = elements.map((elem) => (+elem.id === +id ? newElem : elem));
			}
			filterEl = filterOrder(elements);
			listForLegend = [...new Set(filterEl.map((elem) => elem.service))];
			chartInstance.destroy();
			chartInstance = drawChart();
			return true;
		} catch (error) {
			console.log(error);
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return false;
		}
	};
	//
	const drawChart = () => {
		return new Chart(ctx, {
			type: 'bar',
			data: {
				datasets: listForLegend
					.map((service) => {
						const list = filterEl.filter((item) => item.service === service);
						if (list.length) {
							return {
								label: service,
								data: list,
								backgroundColor: serviceColors[Object.keys(serviceColors).find((key) => service.split('(')[0] === key)],
								borderWidth: 1,
								borderSkipped: false,
								borderRadius: 4,
								categoryPercentage: 0.85,
								barPercentage: !!list[0]?.grouped ? 2.5 : 1,
								grouped: !!list[0]?.grouped,
								// maxBarThickness: 22,
								maxBarThickness: maxBarThickness,
							};
						}
					})
					.filter((elem) => elem !== undefined),
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
								hour: 'MMM d, ha',
							},
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
							autoSkip: false,
						},
					},
				},
				onClick: function (e, elements) {
					if (elements.length > 0) {
						const firstElement = elements[0];
						const datasetIndex = firstElement.datasetIndex;
						const index = firstElement.index;
						const clickedData = this.data.datasets[datasetIndex].data[index];
						drawContentOrder(clickedData);
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
							label: function (context) {
								const service = context.raw.service;
								return `Служба: ${service}`;
							},
							afterLabel: function (context) {
								const time = context.raw.x.map((elem) => elem.split('T')[1]);
								const route = context.raw.route;
								return `Время: ${time[0]}-${time[1]}\nМаршрут: ${route}`;
							},
						},
					},
				},
			},
			plugins: [todayLine, htmlLegendPlugin, serviceTextPlugin],
		});
	};
	//
	const drawContentOrder = (data) => {
		const body = document.querySelector('body');
		const window = document.querySelector('.my-window');
		const serviceSelect = window.querySelector('.select-service');
		const responsibleSelect = window.querySelector('.select-responsible');
		const techniqueSelect = window.querySelector('.select-technique');
		const routeSelect = window.querySelector('.select-route');
		const dateFrom = window.querySelector('.date-from');
		const dateTo = window.querySelector('.date-to');
		const timeFrom = window.querySelector('.time-from');
		const timeTo = window.querySelector('.time-to');
		const shift = document.querySelectorAll('.check-datetime');
		const statusSelect = window.querySelector('.select-status');

		// Array.from(document.querySelectorAll('.form-check-input')).find((elem) => elem.checked)
		serviceSelect.innerText = '';
		responsibleSelect.innerText = '';
		techniqueSelect.innerText = '';
		routeSelect.innerText = '';
		statusSelect.innerText = '';

		body.style.overflow = 'hidden';
		window.classList.remove('window-hidden');

		window.setAttribute('id', data.id);

		allServices.forEach((obj) => serviceSelect.appendChild(createElement(obj.id, obj.service, +data.serviceId === +obj.id)));
		allResponsiblePerson.forEach((obj) =>
			responsibleSelect.appendChild(
				createElement(
					obj.id,
					`${obj.lastname} ${obj.firstname} ${obj.patronymic}`,
					`${data.responsiblePerson.lastname} ${data.responsiblePerson.firstname} ${data.responsiblePerson.patronymic}` === `${obj.lastname} ${obj.firstname} ${obj.patronymic}`
				)
			)
		);
		allTechnique.forEach((obj) =>
			techniqueSelect.appendChild(
				createElement(obj.id_technique, `${obj.name_technique} (${obj.state_number})`, `${obj.name_technique} (${obj.state_number})` === data.y)
			)
		);
		allRoutes.forEach((obj) =>
			routeSelect.appendChild(
				createElement(obj.id, obj.route_to, obj.route_to === data.route)
			)
		);
		dateFrom.value = data.x[0].split('T')[0];
		timeFrom.value = data.x[0].split('T')[1];
		dateTo.value = data.x[1].split('T')[0];
		timeTo.value = data.x[1].split('T')[1];
		shift[+data.shift].checked = true;
		['На рассмотрении', 'Подтвердить', 'Отклонить'].forEach((elem, index) => statusSelect.appendChild(createElement(index, elem, index === +data.status)));
	};
	//
	const createElement = (id, text, select, status = false) => {
		const option = document.createElement('option');
		option.setAttribute('value', id);
		option.selected = select;
		option.disabled = status;
		option.innerText = text;
		return option;
	};
	//
	const formatOrder = (array) => {
		return array
			.map((obj) => {
				const date = obj.date.split('<br>-<br>').map((elem) => elem.split('.').reverse().join('-'));
				const time = obj.time.split('<br>-<br>');
				const newObj = {
					id: obj.id,
					x: [`${date[0]}T${time[0]}`, `${date[1]}T${time[1]}`],
					y: `${obj.technique} (${obj.stateNumber})`,
					service: obj.service,
					serviceId: obj.service_id,
					responsiblePerson: obj.responsiblePerson,
					route: obj.route,
					routeId: obj.route_id,
					shift: +obj.shift,
					status: +obj.status,
				};
				return newObj;
			})
			.sort((a, b) => new Date(a.x[0]) - new Date(b.x[0]));
	};
	//
	const filterOrder = (array) => {
		const result = array.map((elem, index) => {
			let tempObj = elem;
			array.some((secElem) => {
				if (elem !== secElem && elem.y === secElem.y) {
					if (!(new Date(elem.x[0]) > new Date(secElem.x[1]) || new Date(elem.x[1]) < new Date(secElem.x[0]))) {
						const newElem = { ...elem, grouped: true };
						newElem.service += ' - пересечение';
						if (elem.service === secElem.service) newElem.service += `(${index})`;
						tempObj = newElem;
						return true;
					}
				}
				return false;
			});
			return tempObj;
		});
		return result;
	};
	//
	const collectContentChangeOrder = () => {
		const window = document.querySelector('.my-window');
		const serviceSelect = window.querySelector('.select-service');
		const responsibleSelect = window.querySelector('.select-responsible');
		const techniqueSelect = window.querySelector('.select-technique');
		const routeSelect = window.querySelector('.select-route');
		const dateFrom = window.querySelector('.date-from');
		const dateTo = window.querySelector('.date-to');
		const timeFrom = window.querySelector('.time-from');
		const timeTo = window.querySelector('.time-to');
	 	const shift = Array.from(document.querySelectorAll('.form-check-input')).find((elem) => elem.checked).value
		const statusSelect = window.querySelector('.select-status');

		if (!dateFrom) throw new Error('Введите дату начала');
		if (!dateTo) throw new Error('Введите дату конца');
		if (!timeFrom) throw new Error('Введите время начала');
		if (!timeTo) throw new Error('Введите время конца');

		const obj = {
			service_id: serviceSelect.value,
			responsible_person_id: responsibleSelect.value,
			technique_id: techniqueSelect.value,
			route_id: routeSelect.value,
			date_from: dateFrom.value,
			date_to: dateTo.value,
			time_from: `${timeFrom.value}${timeFrom.value.length > 6 ? '' : ':00'}`,
			time_to: `${timeTo.value}${timeTo.value.length > 6 ? '' : ':00'}`,
			datetime_from: `${dateFrom.value} ${timeFrom.value}${timeFrom.value.length > 6 ? '' : ':00'}`,
			datetime_to: `${dateTo.value} ${timeTo.value}${timeTo.value.length > 6 ? '' : ':00'}`,
			shift: +!!+shift[0],
			status: statusSelect.value,
		};
		return obj;
	};
	//
	const addEventSelectChange = () => {
		const select = document.querySelector('.choice');
		select.addEventListener('change', async () => {
			elements = await getOrders(minDate, maxDate, select.value);
			filterEl = filterOrder(elements);
			listForLegend = [...new Set(filterEl.map((elem) => elem.service))];
			chartInstance.destroy();
			chartInstance = drawChart();
		});
	};
	//
	const addEventDocumentClick = () => {
		const body = document.querySelector('body');
		const windowContainer = document.querySelector('.my-window__container');
		document.addEventListener('click', (e) => {
			const window = document.querySelector('.my-window');
			if (!window.classList.contains('window-hidden')) {
				if (!windowContainer.contains(e.target)) {
					body.style.overflow = 'auto';
					window.classList.add('window-hidden');
				}
			}
		});
	};
	//
	const addEventBtnSaveChanges = () => {
		const body = document.querySelector('body');
		const window = document.querySelector('.my-window');
		const btnSave = window.querySelector('.btn-save-changes');
		btnSave.addEventListener('click', async () => {
			if (await putOrder()) {
				body.style.overflow = 'auto';
				window.classList.add('window-hidden');
			}
		});
	};

	//--*******--
	const todayLine = {
		id: 'todayLine',
		afterDatasetsDraw(chart, args, pluginOptions) {
			const {
				ctx,
				data,
				chartArea: { top, bottom, left, right },
				scales: { x, y },
			} = chart;

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
			// const { ctx } = chart;
			// chart.data.datasets.forEach((dataset, i) => {
			// 	const meta = chart.getDatasetMeta(i);
			// 	meta.data.forEach((bar, index) => {
			// 		const service = dataset.data[index].service;
			// 		const position = bar.tooltipPosition();
			// 		// Задаем параметры текста
			// 		ctx.save();
			// 		ctx.font = '12px Arial';
			// 		ctx.fillStyle = 'white'; // Цвет текста
			// 		ctx.textAlign = 'center';
			// 		ctx.textBaseline = 'middle';
			// 		// Координаты и размеры объекта
			// 		const { x, y, width, height } = bar;
			// 		// Обрезаем текст, если он выходит за границы объекта
			// 		ctx.beginPath();
			// 		ctx.rect(x - width + 3, y - height / 2, width - 6, height);
			// 		ctx.clip();
			// 		// Рисуем текст в середине объекта
			// 		ctx.fillText(service, x - width / 2, y);
			// 		ctx.restore();
			// 	});
			// });
		},
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

			items.forEach((item) => {
				const li = document.createElement('li');
				li.style.alignItems = 'center';
				li.style.cursor = 'pointer';
				li.style.display = 'flex';
				li.style.flexDirection = 'row';
				li.style.marginLeft = '10px';

				li.onclick = () => {
					const { type } = chart.config;
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
						easing: 'easeOutQuart', // Тип анимации
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
		},
	};
	//--*******--

	//
	const minDate = new Date(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime() - 2 * 24 * 60 * 60 * 1000);
	const maxDate = new Date(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime() + 7 * 24 * 60 * 60 * 1000);
	const allServices = await getAllServices();
	const allResponsiblePerson = await getResponsiblePerson();
	const allRoutes = await getRoutes();
	const allTechnique = await getTechnique();
	addEventBtnSaveChanges();
	addEventDocumentClick();
	addEventSelectChange();

	const yAxisLabels = allTechnique.map((obj) => `${obj.name_technique} (${obj.state_number})`);
	let elements = await getOrders(minDate, maxDate);
	let filterEl = filterOrder(elements);

	const ctx = document.getElementById('myChart');

	const canvasWidth = ctx.getContext('2d').canvas.width;
	const percentage = 8;
	const maxBarThickness = canvasWidth * (percentage / 100);

	const serviceColors = {
		ДС: 'rgba(41, 105, 18, 0.85)',
		'ДС - пересечение': 'rgba(41, 105, 18, 0.5)',
		ГКС: 'rgba(247, 195, 142, 0.85)',
		'ГКС - пересечение': 'rgba(247, 195, 142, 0.5)',
		ОТ: 'rgba(159, 214, 50, 0.85)',
		'ОТ - пересечение': 'rgba(159, 214, 50, 0.5)',
		ЭВС: 'rgba(101, 40, 8, 0.85)',
		'ЭВС - пересечение': 'rgba(101, 40, 8, 0.5)',
		ХАЛ: 'rgba(239, 58, 126, 0.85)',
		'ХАЛ - пересечение': 'rgba(239, 58, 126, 0.5)',
		'Диспетчер по транспорту': 'rgba(62, 219, 52, 0.85)',
		'Диспетчер по транспорту - пересечение': 'rgba(62, 219, 52, 0.5)',
		РиФИ: 'rgba(87, 72, 73, 0.85)',
		'РиФИ - пересечение': 'rgba(87, 72, 73, 0.5)',
		ГЗИ: 'rgba(14, 251, 99, 0.85)',
		'ГЗИ - пересечение': 'rgba(14, 251, 99, 0.5)',
		ЛЭС: 'rgba(62, 219, 52, 0.85)',
		'ЛЭС - пересечение': 'rgba(62, 219, 52, 0.5)',
		АиМО: 'rgba(231, 86, 59, 0.85)',
		'АиМО - пересечение': 'rgba(231, 86, 59, 0.5)',
		Связь: 'rgba(114, 255, 138, 0.85)',
		'Связь - пересечение': 'rgba(114, 255, 138, 0.5)',
		ВПО: 'rgba(121, 158, 205, 0.85)',
		'ВПО - пересечение': 'rgba(121, 158, 205, 0.5)',
		СХМТРиСО: 'rgba(97, 204, 193, 0.85)',
		'СХМТРиСО - пересечение': 'rgba(97, 204, 193, 0.5)',
		Общежитие: 'rgba(237, 18, 209, 0.85)',
		'Общежитие - пересечение': 'rgba(237, 18, 209, 0.5)',
		СЗК: 'rgba(1, 128, 77, 0.85)',
		'СЗК - пересечение': 'rgba(1, 128, 77, 0.5)',
		КСК: 'rgba(163, 64, 38, 0.85)',
		'КСК - пересечение': 'rgba(163, 64, 38, 0.5)',
	};
	let listForLegend = [...new Set(filterEl.map((elem) => elem.service))];

	let chartInstance = drawChart();
});