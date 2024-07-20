document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Асинхронная функция, которая отправляет запрос на сервер для создания нового заказа.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Вызывает функцию `collectContent` для сбора данных заказа, которые будут отправлены на сервер.
	 * 2. Отправляет HTTP POST запрос на сервер по адресу `orders.php` с данными заказа в формате JSON.
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
		} catch (error) {
			// Если была ошибка, то обновляем переменную
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
		}
	};
	//
	const collectContent = () => {
		const service = SESSION['service'];
		const technique = Array.from(document.querySelectorAll('.technique-select'))
			.map((elem) => elem.value)
			.filter((elem) => elem !== '');
		const route = document.querySelector('.route-select').value;
		const responsiblePerson = Array.from(document.querySelectorAll('.person-select'))
			.map((elem) => elem.value)
			.filter((elem) => elem !== '');
		const dateFrom = document.querySelector('.date-from').value;
		const dateTo = document.querySelector('.date-to').value;
		let timeFrom = document.querySelector('.time-from').value;
		let timeTo = document.querySelector('.time-to').value;
		const shift = Array.from(document.querySelectorAll('.form-check-input')).find((elem) => elem.checked)?.value;

		// Обработчик времени доделать...
		// const shiftFrom = new Date(`${dateFrom}T${shift.slice(0, 5)}`);
		// const shiftTo = +shift[0] ? new Date(`${dateTo}T${shift.slice(0, 5)}`) : new Date(`${dateFrom}T${shift.slice(6, 11)}`);
		// const fullDateFrom = new Date(`${dateFrom}T${timeFrom}`);
		// const fullDateTo = new Date(`${dateTo}T${timeTo}`);
		// console.log(shiftFrom);
		// console.log(shiftTo);
		// console.log(fullDateFrom);
		// console.log(fullDateTo);
		// if (shift) {
		// 	let flag = fullDateFrom >= shiftFrom && fullDateTo <= shiftTo && fullDateFrom < fullDateTo
		// 	flag ? console.log('Верно') : console.log('Не верно');;
		// };

		validateInputs(service, technique, responsiblePerson, dateFrom, dateTo, route, timeFrom, timeTo, shift);
		timeFrom = timeFrom ? timeFrom : shift.slice(0, 4);
		timeTo = timeTo ? timeTo : shift.slice(6, 11);
		const combinedArray = [];
		technique.forEach((item, index) => {
			if (item && responsiblePerson[index]) {
				combinedArray.push([item, responsiblePerson[index]]);
			}
		});
		const result = [];
		combinedArray.forEach((subArr) => {
			const obj = {
				service_id: +service,
				technique_id: +subArr[0],
				route_id: +route,
				responsible_person_id: +subArr[1],
				date_from: dateFrom,
				date_to: dateTo,
				time_from: timeFrom + ':00',
				time_to: timeTo + ':00',
			};
			shift && (obj.shift = +shift[0] ? 1 : 0);
			result.push(obj);
		});
		return result;
	};
	//
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
		if (!technique.length) throw new Error(errors.noTechnique);
		if (!responsiblePerson.length) throw new Error(errors.noResponsiblePerson);
		if (!dateFrom || !dateTo) throw new Error(errors.noDate);
		if (!(timeFrom || shift) || !(timeTo || shift)) throw new Error(errors.noTimeOrShift);
		if (!route) throw new Error(errors.noRoute);

		return true;
	};
	//
	const addEventCreateOrder = () => {
		const btnCreateOrder = document.querySelector('.create-order');
		// btnCreateOrder.addEventListener('click', () => collectContent());
		btnCreateOrder.addEventListener('click', async () => await createOrder());
	};

	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	addEventCreateOrder();
});
