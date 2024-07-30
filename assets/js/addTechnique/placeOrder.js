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
		} catch (error) {
			// Если была ошибка, то обновляем переменную
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
		}
	};
	//
	const collectContent = () => {
		const service = SESSION['service'];
		const technique = Array.from(document.querySelectorAll('.technique-select'))
			.map((elem) => elem.value);
		const route = document.querySelector('.route-select').value;
		const responsiblePerson = Array.from(document.querySelectorAll('.person-select'))
			.map((elem) => elem.value)
		const dateFrom = document.querySelector('.date-from').value;
		const dateTo = document.querySelector('.date-to').value;
		let timeFrom = document.querySelector('.time-from').value;
		let timeTo = document.querySelector('.time-to').value;
		const shift = Array.from(document.querySelectorAll('.form-check-input')).find((elem) => elem.checked)?.value;
		const workActivity = Array.from(document.querySelectorAll('.work-activity'))
			.map((elem) => elem.value);
		const remark = Array.from(document.querySelectorAll('.remark'))
			.map((elem) => elem.value);

		validateInputs(service, technique, responsiblePerson, dateFrom, dateTo, route, timeFrom, timeTo, shift);
		timeFrom = timeFrom ? timeFrom : shift.slice(0, 4);
		timeTo = timeTo ? timeTo : shift.slice(6, 11);
		const combinedArray = [];
		technique.forEach((item, index) => {
			if (item && responsiblePerson[index]) {
				combinedArray.push([item, responsiblePerson[index], workActivity[index], remark[index]]);
			}
		});
		combinedArray.filter((elem) => elem[0] !== '' && elem[2] !== '');
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
