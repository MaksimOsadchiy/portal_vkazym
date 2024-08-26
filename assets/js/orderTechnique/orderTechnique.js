document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Функция получает заказы с сервера с определённым статусом.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Формирует строку запроса с параметрами статуса и идентификатора из сессии.
	 * 2. Отправляет GET-запрос на сервер для получения данных о заказах.
	 * 3. Обрабатывает ответ от сервера и проверяет успешность операции.
	 * 4. В случае успешного ответа возвращает данные заказов.
	 * 5. В случае ошибки генерирует событие 'updateError' с описанием ошибки и возвращает пустой объект.
	 *
	 * @param {number|string} status - Статус заказов, по которому нужно выполнить запрос.
	 * @returns {Promise<Object>} - Объект с данными заказов или пустой объект в случае ошибки.
	 */
	const getOrders = async (status) => {
		try {
			const qparametr = `?service=${SESSION.service}&status=${status}`; // Устанавливаем кверипараметры
			const response = await fetch(`${SERVER_URL}orders.php${qparametr}`);
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			return jsonResponse;
		} catch (error) {
			// Если была ошибка, то обновляем переменную
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			return {};
		}
	};
	//
	const deleteOrder = async (id) => {
		try {
			const qparametr = `?id=${id}`; // Устанавливаем кверипараметры
			const response = await fetch(`${SERVER_URL}orders.php${qparametr}`, {
				method: 'DELETE',
			});
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа
			const bodyTable = document.querySelector('tbody');
			bodyTable.removeChild(bodyTable.querySelector(`tr[value="${id}"]`));
		} catch (error) {
			// Если была ошибка, то обновляем переменную
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			return {};
		}
	};
	/**
	 * Функция рисует таблицу заказов на основе полученных данных с сервера.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Отображает индикатор загрузки (спиннер) в теле таблицы.
	 * 2. Запрашивает данные заказов с сервера с учетом переданного параметра.
	 * 3. Очищает тело таблицы и заполняет его строками с данными заказов.
	 *
	 * @param {number|string} status - Статус для фильтрации заказов при запросе на сервер. По умолчанию 0.
	 */
	const drawTable = async (status = 0) => {
		const headTable = document.querySelector('thead').querySelector('tr');
		if (headTable.lastElementChild.textContent === "Управление") headTable.removeChild(headTable.lastElementChild);
		if (!+status) headTable.insertAdjacentHTML('beforeend', '<th class="col-1">Управление</th>');
		const bodyTable = document.querySelector('tbody');
		bodyTable.innerHTML = `
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div> 
        `;
		const dataOrders = Object.values(await getOrders(status));
		dataOrders.reverse();
		bodyTable.innerText = '';
		dataOrders.forEach((order) => bodyTable.appendChild(createRow(order))); // Перебираем массив данных заказов и создаем строки таблицы для каждого заказа, сразу добавляем созданную строку в таблицу
	};
	/**
	 * Функция создает HTML-строку таблицы для отображения информации о заказе.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Создает элемент строки таблицы `<tr>`.
	 * 2. Создает и заполняет ячейки строки данными из объекта заказа.
	 * 4. Добавляет созданные ячейки в строку.
	 * 5. Возвращает готовую строку для последующего добавления в таблицу.
	 *
	 * @param {Object} order - Объект, содержащий данные о заказе.
	 * @returns {HTMLElement} - Элемент строки таблицы, заполненный данными заказа.
	 */
	const createRow = (order) => {
		const row = document.createElement('tr');
		const tdDate = document.createElement('td');
		const tdTime = document.createElement('td');
		const tdTechnique = document.createElement('td');
		const tdRoute = document.createElement('td');
		const tdWork = document.createElement('td');
		const tdRemark = document.createElement('td');
		const tdResponsible = document.createElement('td');
		const tdCreatedAt = document.createElement('td');
		const tdManagment = document.createElement('td');
		const btnManagment = document.createElement('button');

		btnManagment.classList = 'btn btn-danger';

		row.setAttribute('value', order.id);

		tdDate.innerHTML = order.date;
		tdTime.innerHTML = order.time;
		tdTechnique.innerText = order.technique;
		tdRoute.innerText = order.route;
		tdWork.innerText = order.workActivity;
		tdRemark.innerText = order.remark;
		tdResponsible.innerHTML = `${order.responsiblePerson.lastname}<br>${order.responsiblePerson.firstname}<br>${order.responsiblePerson.patronymic}`;
		tdCreatedAt.innerText = order.created_at;
		btnManagment.innerText = 'Удалить';

		addEventBtnDelete(btnManagment, order.id);

		tdManagment.appendChild(btnManagment);
		row.appendChild(tdDate);
		row.appendChild(tdTime);
		row.appendChild(tdTechnique);
		row.appendChild(tdRoute);
		row.appendChild(tdWork);
		row.appendChild(tdRemark);
		row.appendChild(tdResponsible);
		row.appendChild(tdCreatedAt);
		if (!+order.status) row.appendChild(tdManagment);

		return row;
	};
	/**
	 * Функция добавляет обработчик события изменения значения для выпадающего списка,
	 * который вызывает перерисовку таблицы в зависимости от выбранного значения.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Находит элемент выпадающего списка в документе.
	 * 2. Добавляет обработчик события `change` на этот элемент.
	 * 3. При изменении значения в выпадающем списке вызывает функцию `drawTable`, передавая выбранный статус в качестве параметра.
	 *
	 * @returns {void}
	 */
	const addEventSelectChange = () => {
		const select = document.querySelector('.form-select');
		select.addEventListener('change', () => {
			drawTable(select.value);
		});
	};
	//
	const addEventBtnDelete = (btn, id) => {
		btn.addEventListener('click', () => deleteOrder(id));
	};

	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	drawTable();
	addEventSelectChange();
});
