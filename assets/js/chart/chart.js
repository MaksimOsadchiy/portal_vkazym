document.addEventListener('DOMContentLoaded', async () => {
	/**
	 * Асинхронная функция для получения данных об услугах с сервера.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Отправляет HTTP GET запрос на сервер по адресу `services.php` для получения данных об услугах.
	 * 2. Преобразует ответ от сервера в формат JSON.
	 * 3. Проверяет, успешен ли ответ (статус ответа `ok`). Если ответ неуспешен, выбрасывает ошибку с кодом статуса.
	 * 4. В случае успешного получения данных, возвращает их в виде объекта.
	 * 5. Если произошла ошибка во время запроса или обработки ответа, генерирует событие `updateError` с сообщением об ошибке и возвращает пустой массив.
	 *
	 * @returns {Array<Record<string, (number|string)>>|[]} Возвращает массив объектов или пустой массив в случае ошибки.
	 */
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
	/**
	 * Асинхронная функция для получения данных о техниках с сервера.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Отправляет HTTP GET запрос.
	 * 2. Ожидает получения ответа и преобразует его в формат JSON.
	 * 3. Проверяет, успешен ли ответ сервера (статус ответа `ok`). Если нет, выбрасывает ошибку с кодом статуса.
	 * 4. Если запрос успешен, возвращает данные о техниках в формате JSON.
	 * 5. В случае ошибки во время запроса или обработки ответа, выводит сообщение об ошибке в консоль и генерирует событие `updateError` с деталями ошибки.
	 * 6. Возвращает пустой массив в случае ошибки.
	 *
	 * @returns {Array<Record<string, (number|string)>>|[]} Возвращает массив объектов, где каждый объект представляет данные о технике, или пустой массив в случае ошибки.
	 */
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
	/**
	 * Асинхронная функция для получения заказов с сервера в заданном диапазоне дат и статусе.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Отправляет HTTP GET запрос.
	 * 2. Ожидает получения ответа и преобразует его в формат JSON.
	 * 3. Проверяет, успешен ли ответ сервера (статус ответа `ok`). Если нет, выбрасывает ошибку с кодом статуса.
	 * 4. Фильтрует заказы по дате, сравнивая их с заданными диапазонами `dateFrom` и `dateTo`. Форматирует данные с помощью функции `formatOrder`.
	 * 5. Возвращает отфильтрованные и отформатированные заказы.
	 * 6. В случае ошибки во время запроса или обработки ответа, выводит сообщение об ошибке в консоль и генерирует событие `updateError` с деталями ошибки.
	 * 7. Возвращает пустой массив в случае ошибки.
	 *
	 * @param {Date} dateFrom - Начальная дата диапазона в виде объекта `Date`.
	 * @param {Date} dateTo - Конечная дата диапазона в виде объекта `Date`.
	 * @param {number} [status=0] - Статус заказа для фильтрации. По умолчанию 0.
	 *
	 * @returns {Array<Record<string, (number|string|Array)>>} Возвращает массив объектов, представляющих заказы, отфильтрованные по дате и статусу, или пустой массив в случае ошибки
	 */
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
	/**
	 * Асинхронная функция для получения списка ответственных лиц с сервера.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Отправляет HTTP GET запрос на сервер для получения списка ответственных лиц.
	 * 2. Ожидает получения ответа и преобразует его в формат JSON.
	 * 3. Проверяет, успешен ли ответ сервера (статус ответа `ok`). Если нет, выбрасывает ошибку с кодом статуса.
	 * 4. Возвращает массив объектов, представляющих ответственных лиц.
	 * 5. В случае ошибки во время запроса или обработки ответа, выводит сообщение об ошибке в консоль и генерирует событие `updateError` с деталями ошибки.
	 * 6. Возвращает пустой массив в случае ошибки.
	 *
	 * @returns {Array<Record<string, any>>} Возвращает массив объектов, представляющих ответственных лиц, или пустой массив в случае ошибки.
	 */
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
	/**
	 * Асинхронная функция для получения списка маршрутов с сервера.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Отправляет HTTP GET запрос на сервер для получения списка маршрутов.
	 * 2. Ожидает получения ответа и преобразует его в формат JSON.
	 * 3. Проверяет, успешен ли ответ сервера (статус ответа `ok`). Если нет, выбрасывает ошибку с кодом статуса.
	 * 4. Возвращает массив объектов, представляющих маршруты.
	 * 5. В случае ошибки во время запроса или обработки ответа, выводит сообщение об ошибке в консоль и генерирует событие `updateError` с деталями ошибки.
	 * 6. Возвращает пустой массив в случае ошибки.
	 *
	 * @returns {Array<Record<string, any>>} Возвращает массив объектов, представляющих маршруты, или пустой массив в случае ошибки.
	 */
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
	/**
	 * Асинхронная функция для обновления информации о заказе на сервере.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Извлекает идентификатор заказа из элемента с классом `.my-window`.
	 * 2. Собирает данные, необходимые для обновления заказа, с помощью функции `collectContentChangeOrder`.
	 * 3. Отправляет HTTP PUT запрос на сервер для обновления заказа с указанным идентификатором, передавая собранные данные в формате JSON.
	 * 4. Ожидает получения ответа и преобразует его в формат JSON.
	 * 5. Проверяет, успешен ли ответ сервера (статус ответа `ok`). Если нет, выбрасывает ошибку с кодом статуса.
	 * 6. Генерирует событие `updateError` с сообщением "Заказ изменён!" в случае успешного обновления.
	 * 7. Обновляет глобальные массивы `elements`, `filterEl`, и `listForLegend`, а также перерисовывает диаграмму.
	 * 8. Возвращает `true` в случае успешного обновления и `false` в случае ошибки.
	 * 9. В случае ошибки во время запроса или обработки ответа, выводит сообщение об ошибке в консоль и генерирует событие `updateError` с деталями ошибки.
	 *
	 * @returns {boolean} Возвращает `true`, если обновление прошло успешно, или `false` в случае ошибки.
	 */
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
	/**
	 * Функция для отрисовки столбчатой диаграммы с данными о заказах.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Создаёт новый экземпляр диаграммы с использованием библиотеки Chart.js, устанавливая тип диаграммы как `bar`.
	 * 2. Формирует массив наборов данных (`datasets`) на основе глобального массива `listForLegend`, фильтруя и группируя данные по типу услуги.
	 * 3. Настраивает внешний вид столбцов диаграммы, включая цвет, толщину, закругление углов и пропорции столбцов.
	 * 4. Устанавливает оси X и Y, где ось X отображает время (в формате `hour`), а ось Y — категории услуг.
	 * 5. Добавляет обработчик событий для кликов по элементам диаграммы, который вызывает функцию `drawContentOrder` для отображения информации о выбранном заказе.
	 * 6. Включает дополнительные плагины для легенды, линий и подсказок, а также кастомизирует подсказки, чтобы они отображали данные о времени и маршруте заказа.
	 * 7. Возвращает созданный экземпляр диаграммы.
	 *
	 * @returns {Chart} Возвращает экземпляр диаграммы Chart.js, настроенный для отображения данных о заказах.
	 */
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
	/**
	 * Функция для отображения информации о заказе в модальном окне редактирования.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Получает ссылки на элементы модального окна и формы редактирования.
	 * 2. Очищает текущие значения в полях формы.
	 * 3. Отображает модальное окно и скрывает прокрутку на странице.
	 * 4. Устанавливает ID заказа в модальном окне для последующей обработки.
	 * 5. Заполняет поля формы данными о заказе:
	 *    - Вставляет опции для выбора услуги, ответственного лица, техники и маршрута.
	 *    - Устанавливает значения дат и времени начала и окончания заказа.
	 *    - Выбирает смену и статус заказа из доступных вариантов.
	 *
	 * @param {Object} data - Объект с данными заказа, содержащий информацию о сервисе, ответственном лице, технике, маршруте, времени и статусе.
	 * @param {string} data.id - Идентификатор заказа.
	 * @param {string} data.serviceId - Идентификатор услуги.
	 * @param {Object} data.responsiblePerson - Объект с данными ответственного лица.
	 * @param {string} data.y - Наименование техники и её номер.
	 * @param {string} data.route - Маршрут заказа.
	 * @param {Array<string>} data.x - Массив дат и времени начала и окончания заказа в формате `T`.
	 * @param {number} data.shift - Идентификатор смены.
	 * @param {number} data.status - Статус заказа.
	 *
	 * @returns {void}
	 */
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
	/**
	 * Создаёт элемент `<option>` для использования в выпадающем списке.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Создаёт новый элемент `<option>`.
	 * 2. Устанавливает атрибут `value` равным переданному идентификатору.
	 * 3. Помечает элемент как выбранный, если параметр `select` равен `true`.
	 * 4. Помечает элемент как недоступный, если параметр `status` равен `true`.
	 * 5. Устанавливает текст элемента в соответствии с переданным значением `text`.
	 *
	 * @param {string|number} id - Значение атрибута `value` для элемента `<option>`.
	 * @param {string} text - Текстовое содержимое элемента `<option>`.
	 * @param {boolean} [select=false] - Флаг, указывающий, должен ли элемент быть выбранным.
	 * @param {boolean} [status=false] - Флаг, указывающий, должен ли элемент быть недоступным.
	 *
	 * @returns {HTMLOptionElement} Созданный элемент `<option>`.
	 */
	const createElement = (id, text, select, status = false) => {
		const option = document.createElement('option');
		option.setAttribute('value', id);
		option.selected = select;
		option.disabled = status;
		option.innerText = text;
		return option;
	};
	/**
	 * Форматирует массив заказов для упрощения дальнейшей обработки.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Преобразует каждый объект заказа в новый формат:
	 *    - Даты преобразуются в формат ISO с разделением времени и даты.
	 *    - Создаётся строка с техникой и её номером в скобках.
	 *    - Преобразуются идентификаторы и значения статуса и смены в числа.
	 * 2. Возвращает новый массив объектов с обновлённой структурой.
	 * 3. Отсортировывает массив по начальной дате (`x[0]`).
	 *
	 * @param {Array<Record<string, any>>} array - Массив объектов заказов с исходной структурой.
	 *
	 * @returns {Array<Record<string, any>>} Возвращает массив отформатированных объектов заказов, отсортированных по начальной дате.
	 */
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
	/**
	 * Фильтрует и обрабатывает массив заказов, объединяя пересекающиеся заказы.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Для каждого заказа в массиве проверяет, пересекается ли он с другими заказами, используя временные интервалы.
	 * 2. Если обнаружено пересечение, создаёт новый объект заказа с обновлённым текстом услуги и пометкой о группировке.
	 * 3. Если пересекающиеся заказы имеют одинаковую службу, добавляет к тексту службы индекс пересечения.
	 * 4. Возвращает массив заказов с обновлённой информацией о пересечениях.
	 *
	 * @param {Array<Record<string, any>>} array - Массив объектов заказов для фильтрации и обработки.
	 *
	 * @returns {Array<Record<string, any>>} Возвращает массив объектов заказов с обновлённой информацией о пересечениях.
	 */
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
	/**
	 * Собирает данные из формы для изменения заказа.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Извлекает значения из элементов формы, таких как выпадающие списки и поля даты/времени.
	 * 2. Проверяет наличие необходимых значений для полей даты и времени. Если какое-либо из них отсутствует, выбрасывает ошибку.
	 * 3. Формирует объект с данными заказа, включая идентификаторы, даты, время и статус.
	 * 4. Возвращает объект с собранными данными заказа.
	 *
	 * @returns {Record<string, any>} Объект с данными заказа, собранными из формы. Поля объекта включают идентификаторы, даты, время, смену и статус.
	 *
	 * @throws {Error} Если дата начала, дата конца, время начала или время конца отсутствуют, выбрасывает ошибку с соответствующим сообщением.
	 */
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
	/**
	 * Добавляет обработчик события изменения значения элемента выбора (select).
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент выбора с классом `choice` и добавляет к нему обработчик события `change`.
	 * 2. При изменении значения в элементе выбора:
	 *    - Получает обновленный список заказов с сервера на основе выбранного значения и диапазона дат.
	 *    - Фильтрует полученные заказы.
	 *    - Обновляет список легенды для диаграммы на основе отфильтрованных данных.
	 *    - Уничтожает текущую диаграмму и создает новую с обновленными данными.
	 *
	 * @returns {void}
	 */
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
	/**
	 * Добавляет обработчик события клика по документу для закрытия модального окна.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент `body` и контейнер модального окна с классом `my-window__container`.
	 * 2. Добавляет обработчик события `click` на весь документ.
	 * 3. При клике:
	 *    - Проверяет, отображается ли модальное окно (не содержит класс `window-hidden`).
	 *    - Если клик был вне контейнера модального окна:
	 *      - Восстанавливает прокрутку страницы (`overflow: auto`).
	 *      - Добавляет класс `window-hidden` к модальному окну для его скрытия.
	 *
	 *	@returns {void}
	 */
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
	/**
	 * Добавляет обработчик события для кнопки сохранения изменений в модальном окне.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент `body`, модальное окно с классом `my-window`, и кнопку сохранения изменений с классом `btn-save-changes`.
	 * 2. Добавляет обработчик события `click` на кнопку сохранения.
	 * 3. При клике на кнопку:
	 *    - Вызывает функцию `putOrder`, чтобы сохранить изменения.
	 *    - Если сохранение прошло успешно (`putOrder` возвращает `true`):
	 *      - Восстанавливает прокрутку страницы (`overflow: auto`).
	 *      - Добавляет класс `window-hidden` к модальному окну, чтобы скрыть его.
	 *
	 * @returns {void}
	 */
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

	//---ПЛАГИНЫ---\\
	/**
	 * Специальный плагин для Chart.js, добавляющий вертикальную линию, показывающую текущую дату.
	 *
	 * Плагин выполняет следующие шаги:
	 * 1. Использует метод `afterDatasetsDraw` для рисования линии после отрисовки данных на графике.
	 * 2. Извлекает необходимые элементы графика: контекст рисования (`ctx`), данные (`data`), область графика (`chartArea`), и шкалы (`scales`).
	 * 3. Сохраняет состояние контекста рисования.
	 * 4. Настраивает стиль линии:
	 *    - Ширина линии: 2 пикселя.
	 *    - Цвет: `rgba(255, 26, 104, 0.9)`.
	 *    - Штриховая линия с чередованием 14 пикселей сплошной и 6 пикселей пробела.
	 * 5. Рисует вертикальную линию на графике на позиции текущей даты, используя масштаб по оси X.
	 * 6. Восстанавливает настройки линии (убирает штриховку) после рисования.
	 */
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
	/**
	 * Специальный плагин для Chart.js, который создаёт контейнер списка легенды для Chart.js графика.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Извлекает элемент контейнера легенды по заданному идентификатору `id`.
	 * 2. Проверяет, существует ли уже элемент `<ul>` внутри контейнера.
	 * 3. Если элемент `<ul>` не существует, создаёт новый элемент `<ul>`, настраивает его стиль (отображение в ряд, без отступов и полей) и добавляет в контейнер легенды.
	 * 4. Возвращает элемент `<ul>`, который может использоваться для отображения списка элементов легенды.
	 *
	 * @param {Chart} chart - Экземпляр Chart.js графика.
	 * @param {string} id - Идентификатор элемента контейнера легенды.
	 *
	 * @returns {HTMLUListElement} Элемент `<ul>`, который содержит элементы легенды.
	 */
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
	// Не используется
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
			// 		ctx.fillStyle = 'white';
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
	/**
	 * Плагин для Chart.js, который создаёт и обновляет HTML-версию легенды графика.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. После обновления графика очищает существующие элементы легенды в указанном контейнере.
	 * 2. Использует встроенный генератор `generateLabels` для получения элементов легенды из конфигурации графика.
	 * 3. Для каждого элемента легенды создаёт новый элемент `<li>`, добавляет цветной квадрат и текст, и добавляет обработчик клика для управления видимостью данных на графике.
	 * 4. При клике на элемент легенды изменяет видимость данных в графике и обновляет график с анимацией.
	 *
	 * @type {Object}
	 *
	 * @property {string} id - Идентификатор плагина.
	 * @property {function} afterUpdate - Метод, который вызывается после обновления графика.
	 *
	 * @param {Chart} chart - Экземпляр Chart.js графика.
	 * @param {Object} args - Дополнительные параметры.
	 * @param {Object} options - Опции плагина, включая `containerID`, который указывает идентификатор контейнера для легенды.
	 */
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
	//---ПЛАГИНЫ---\\


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