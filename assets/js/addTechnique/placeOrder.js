document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Асинхронная функция, которая отправляет запрос на сервер для создания нового заказа.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Вызывает функцию `collectContent` для сбора данных заказа, которые будут отправлены на сервер.
	 * 2. Отправляет HTTP POST запрос на сервер по адресу `allOrders.php` с данными заказа в формате JSON.
	 * 3. Ожидает получения ответа от сервера и преобразует его в формат JSON.
	 * 4. Проверяет, успешен ли ответ сервера (статус ответа `ok`). Если нет, выбрасывает ошибку с кодом статуса.
	 * 5. Если запрос успешен, создаёт и диспатчит событие `updateError` с сообщением об успешной отправке заказа.
	 * 6. В случае ошибки во время запроса или обработки ответа, создаёт и диспатчит событие `updateError` с деталями ошибки.
	 *
	 * @throws {Error} Если запрос не удался или произошла ошибка при обработке ответа, будет выброшена ошибка с кодом статуса или сообщением об ошибке.
	 */
	const createOrder = async () => {
		try {
			const request = collectContent(); // Формируем тело запроса
			const response = await fetch(`${SERVER_URL}orders.php`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(request),
			});
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			document.dispatchEvent(
				new CustomEvent('updateError', {
					detail: 'Заказ отправлен на рассмотрение!',
				})
			);
			clearFields();
		} catch (error) {
			// Если была ошибка, то обновляем переменную
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
		}
	};
	/**
	 * Функция собирает и обрабатывает данные из формы, подготавливая их для дальнейшей обработки.
	 * Она извлекает значения из элементов формы, проверяет их и формирует результирующий массив объектов с данными.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Извлекает значения из элементов формы, таких как техника, маршрут, ответственные лица, даты, время и др.
	 * 2. Проверяет и валидирует полученные данные.
	 * 3. Объединяет связанные данные в массив объектов, каждый из которых представляет запись с соответствующими полями.
	 *
	 * @returns {Array} Массив объектов с собранными данными из формы.
	 */
	const collectContent = () => {
		// Извлекаем значение сервиса из сессии
		const service = SESSION['service'];

		// Собираем значения названия техник
		const technique = Array.from(document.querySelectorAll('.technique-select'))
			.map((elem) => elem.value);

		// Извлекаем значение маршрута
		const route = document.querySelector('.route-select').value;

		// Собираем значения ответственных персон
		const responsiblePerson = Array.from(document.querySelectorAll('.person-select'))
			.map((elem) => elem.value)

		// Извлекаем значения дат и времени
		const dateFrom = document.querySelector('.date-from').value;
		const dateTo = document.querySelector('.date-to').value;
		let timeFrom = document.querySelector('.time-from').value;
		let timeTo = document.querySelector('.time-to').value;

		// Извлекаем значение смены
		const shift = Array.from(document.querySelectorAll('.form-check-input')).find((elem) => elem.checked)?.value;

		// Собираем значения вид работ
		const workActivity = Array.from(document.querySelectorAll('.work-activity'))
			.map((elem) => elem.value);

		// Собираем значения примечаний
		const remark = Array.from(document.querySelectorAll('.remark'))
			.map((elem) => elem.value);

		// Проверка и валидация входных данных
		validateInputs(service, technique, responsiblePerson, dateFrom, dateTo, route, timeFrom, timeTo, shift);

		// Устанавливаем значения времени по умолчанию, если они не заданы
		timeFrom = timeFrom ? timeFrom : shift.slice(0, 4);
		timeTo = timeTo ? timeTo : shift.slice(6, 11);

		// Объединяем данные по технике и ответственным лицам в массив
		let combinedArray = [];
		technique.forEach((item, index) => {
			if (item && responsiblePerson[index]) {
				combinedArray.push([item, responsiblePerson[index], workActivity[index], remark[index]]);
			}
		});
		// Фильтрация массива, исключающая пустые значения техники и активности
		combinedArray = combinedArray.filter((elem) => elem[0] !== '' && +elem[0] !== -1 && elem[1] !== '');

		// Создание результирующего массива объектов
		const result = [];
		combinedArray.forEach((subArr) => {
			const obj = {
				user_id: SESSION.id,
				service_id: +service,
				technique_id: +subArr[0],
				route_id: +route,
				responsible_person_id: +subArr[1],
				date_from: dateFrom,
				date_to: dateTo,
				time_from: timeFrom + ':00',
				time_to: timeTo + ':00',
				work_activity: subArr[2],
				remark: subArr[3],
			};
			// Добавляем информацию о смене, если она указана
			shift && (obj.shift = +shift[0] ? 1 : 0);
			result.push(obj);
		});

		return result;
	};
	/**
	 * Функция очищает все поля формы, сбрасывая их значения по умолчанию.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Сбрасывает значения всех полей выбора техники.
	 * 2. Очищает выбранное значение для маршрута.
	 * 3. Сбрасывает значения всех полей выбора ответственных лиц.
	 * 4. Очищает поля ввода для даты начала и окончания.
	 * 5. Очищает поля ввода для времени начала и окончания.
	 * 6. Снимает выбор со всех переключателей (чекбоксов).
	 * 7. Очищает поля ввода для активности и замечаний.
	 *
	 * @returns {void}
	 */
	const clearFields = () => {
		document.querySelectorAll('.technique-select')
			.forEach((elem) => elem.value = '');
		document.querySelector('.route-select').value = '';
		document.querySelectorAll('.person-select')
			.forEach((elem) => elem.value = '');
		document.querySelector('.date-from').value = '';
		document.querySelector('.date-to').value = '';
		document.querySelector('.time-from').value = '';
		document.querySelector('.time-to').value = '';
		document.querySelectorAll('.form-check-input')
			.forEach((elem) => elem.checked = false);
		document.querySelectorAll('.work-activity')
			.forEach((elem) => elem.value = '');
		document.querySelectorAll('.remark')
			.forEach((elem) => elem.value = '');
	};
	/**
	 * Функция валидирует входные данные формы, проверяя их на наличие и соответствие обязательным требованиям.
	 * В случае обнаружения ошибок выбрасывается исключение с соответствующим сообщением.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Проверяет наличие ID сервиса в данных сессии.
	 * 2. Убедится, что выбрана хотя бы одна техника.
	 * 3. Проверяет наличие ответственного лица.
	 * 4. Проверяет наличие дат начала и окончания работ.
	 * 5. Убедится, что выбран маршрут.
	 * 6. Проверяет наличие времени начала и окончания работ или смены.
	 *
	 * @param {string} service - ID сервиса, извлеченный из сессии.
	 * @param {Array} technique - Массив выбранных техник.
	 * @param {Array} responsiblePerson - Массив выбранных ответственных лиц.
	 * @param {string} dateFrom - Дата начала работ.
	 * @param {string} dateTo - Дата окончания работ.
	 * @param {string} route - Выбранный маршрут.
	 * @param {string} timeFrom - Время начала работ.
	 * @param {string} timeTo - Время окончания работ.
	 * @param {string} shift - Смена.
	 * @throws {Error} Если одно из обязательных полей не заполнено, выбрасывается исключение с сообщением об ошибке.
	 * @returns {boolean} Возвращает true, если все поля прошли проверку.
	 */
	const validateInputs = (service, technique, responsiblePerson, dateFrom, dateTo, route, timeFrom, timeTo, shift) => {
		const errors = {
			noService: 'В сессии нет ID сервиса!',
			noTechnique: 'Обязательное поле: Техника!',
			noResponsiblePerson: 'Обязательное поле: Ответственный!',
			noDate: 'Введите дату начала и окончания работ!',
			noRoute: 'Выберите маршрут!',
			noTimeOrShift: 'Введите время начала и окончания работ или выберите смену!',
		};

		if (!service) throw new Error(errors.noService);
		if (!technique.find((el) => el!='')) throw new Error(errors.noTechnique);
		if (!responsiblePerson.find((el) => el!='')) throw new Error(errors.noResponsiblePerson);
		if (!dateFrom || !dateTo) throw new Error(errors.noDate);
		if (!(timeFrom || shift) || !(timeTo || shift)) throw new Error(errors.noTimeOrShift);
		if (!route) throw new Error(errors.noRoute);


		return true;
	};
	/**
	 * Функция добавляет обработчик события клика на кнопку "Создать заказ".
	 * При клике на кнопку запускается асинхронная функция createOrder, которая обрабатывает создание заказа.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Находит кнопку "Создать заказ" в документе.
	 * 2. Добавляет обработчик события `click` на этот элемент.
	 * 3. При клике на кнопку запускает асинхронную функцию createOrder.
	 *
	 * @returns {void}
	 */
	const addEventCreateOrder = () => {
		const btnCreateOrder = document.querySelector('.create-order');
		btnCreateOrder.addEventListener('click', async () => await createOrder());
	};
	// Доделать потом...
	// const tempFunc = () => {
	// 	const dateFrom = document.querySelector('#dateFrom');
	// 	const
	// 	dateFrom.addEventListener('change', () => {
	// 		console.log(new Date(dateFrom.value));
	// 	});
	// };


	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	addEventCreateOrder();
	// tempFunc();
});
