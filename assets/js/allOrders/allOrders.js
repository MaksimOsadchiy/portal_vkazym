document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Функция сохраняет изменения для указанного заказа и обновляет таблицу.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Формирует параметры запроса на основе переданных значений.
	 * 2. Отправляет PUT-запрос на сервер для обновления данных.
	 * 3. Обрабатывает ответ от сервера и проверяет успешность операции.
	 * 4. Если операция успешна, удаляет соответствующую строку из таблицы.
	 * 5. В случае ошибки, генерирует событие 'updateError' с описанием ошибки.
	 *
	 * @param {number} newStatus - новый статус заказа, который нужно сохранить на сервере.
	 * @param {number|string} id - Уникальный идентификатор заказы, данные которого нужно обновить.
	 */
	const saveChanges = async (newStatus, id) => {
		try {
			const qparametr = `?id=${id}`; // Устанавливаем кверипараметры
			const params = {
				status: newStatus,
			};
			const response = await fetch(`${NEW_SERVER_URL}orders${qparametr}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(params), // Отправляем объект в JSON формате
			});
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа
			const tbody = document.querySelector('tbody');
			const childRow = document.querySelector(`tr[id="${id}"]`);
			tbody.removeChild(childRow);
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
		}
	};
	/**
	 * Функция получает заказы с сервера с определённым статусом.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Формирует строку запроса с параметром статуса.
	 * 2. Отправляет GET-запрос на сервер для получения данных о заказах.
	 * 3. Обрабатывает ответ от сервера и проверяет успешность операции.
	 * 4. В случае успешного ответа возвращает данные заказов.
	 * 5. В случае ошибки генерирует событие 'updateError' с описанием ошибки и возвращает пустой объект.
	 *
	 * @param {number|string} status - Статус заказов, по которому нужно выполнить запрос, по умолчанию 0.
	 * @returns {Promise<Object>} - Объект с данными заказов или пустой объект в случае ошибки.
	 */
	const getOrders = async (status) => {
		try {
			const qparametr = `?status=${status}`; // Устанавливаем кверипараметры
			const response = await fetch(`${NEW_SERVER_URL}orders${qparametr}`);
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return {};
		}
	};
	/**
	 * Функция обновляет таблицу заказов на основе полученных данных с сервера.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Отображает индикатор загрузки (спиннер) в теле таблицы.
	 * 2. Запрашивает данные заказов с сервера с учетом статуса.
	 * 3. Вызывает функцию `filterOrders`, которая фильтрует и отображает заказы в зависимости от выбранной даты.
	 *
	 * @param {number|string} status - Статус для фильтрации заказов при запросе на сервер. По умолчанию 0.
	 */
	const updateTable = async (status = 0) => {
		const bodyTable = document.querySelector('tbody');
		// Отображаем индикатор загрузки (спиннер) в таблице
		bodyTable.innerHTML = `
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div> 
        `;
		orders = Object.values(await getOrders(status));
		orders.reverse();
		console.log(orders);
		filterOrders();
	};
	/**
	 * Функция отрисовывает содержимое таблицы, создавая строки для каждого заказа из глобального массива `orders`.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Находит элемент `<tbody>` таблицы в документе.
	 * 2. Очищает содержимое `<tbody>`, чтобы удалить все существующие строки.
	 * 3. Перебирает массив `orders`, создавая строку таблицы для каждого заказа с помощью функции `createRow`.
	 * 4. Добавляет созданные строки непосредственно в элемент `<tbody>`.
	 *
	 * @returns {void} - Функция не возвращает значение.
	 */
	const drawTable = (orders) => {
		const bodyTable = document.querySelector('tbody');
		bodyTable.innerText = '';
		orders.forEach((order) => bodyTable.appendChild(createRow(order))); // Перебираем массив данных заказов и создаем строки таблицы для каждого заказа, сразу добавляем созданную строку в таблицу
	};
	/**
	 * Функция создает HTML-строку таблицы для отображения информации о заказе.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Создает элемент строки таблицы `<tr>`.
	 * 2. Создает и заполняет ячейки строки данными из объекта заказа.
	 * 3. Устанавливает уникальный идентификатор для строки на основе ID заказа.
	 * 4. Добавляет созданные ячейки в строку.
	 * 5. Возвращает готовую строку для последующего добавления в таблицу.
	 *
	 * @param {Object} order - Объект, содержащий данные о заказе.
	 * @returns {HTMLElement} - Элемент строки таблицы, заполненный данными заказа.
	 */
	const createRow = (order) => {
		const row = document.createElement('tr');
		const tdService = document.createElement('td');
		const tdDate = document.createElement('td');
		const tdTime = document.createElement('td');
		const tdTechnique = document.createElement('td');
		const tdRoute = document.createElement('td');
		const tdWork = document.createElement('td');
		const tdRemark = document.createElement('td');
		const tdResponsible = document.createElement('td');
		const tdCreatedAt = document.createElement('td');
		const tdStatus = createSelect(order);

		row.setAttribute('id', order.id);

		tdService.innerHTML = order.service;
		tdDate.innerHTML = order.date;
		tdTime.innerHTML = order.time;
		tdTechnique.innerText = order.technique;
		tdRoute.innerText = order.route;
		tdWork.innerText = order.workActivity;
		tdRemark.innerText = order.remark;
		tdResponsible.innerHTML = `${order.responsiblePerson.lastname}<br>${order.responsiblePerson.firstname}<br>${order.responsiblePerson.patronymic}`;
		tdCreatedAt.innerText = order.created_at;

		row.appendChild(tdService);
		row.appendChild(tdDate);
		row.appendChild(tdTime);
		row.appendChild(tdTechnique);
		row.appendChild(tdRoute);
		row.appendChild(tdWork);
		row.appendChild(tdRemark);
		row.appendChild(tdResponsible);
		row.appendChild(tdCreatedAt);
		row.appendChild(tdStatus);

		return row;
	};
	/**
	 * Функция создает HTML-элемент ячейки таблицы с выпадающим списком для изменения статуса заказа.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Создает элемент ячейки таблицы `<td>`.
	 * 2. Создает контейнер для выпадающего списка и кнопки.
	 * 3. Создает и заполняет выпадающий список возможными статусами заказа.
	 * 4. Создает кнопку для сохранения изменений.
	 * 5. Добавляет обработчики событий для изменения статуса и сохранения изменений.
	 * 6. Добавляет выпадающий список и кнопку в контейнер, а затем контейнер в ячейку таблицы.
	 * 7. Возвращает готовую ячейку таблицы.
	 *
	 * @param {Object} order - Объект, содержащий данные о заказе.
	 * @returns {HTMLElement} - Элемент ячейки таблицы с выпадающим списком и кнопкой.
	 */
	const createSelect = (order) => {
		const tdSelect = document.createElement('td');
		const container = document.createElement('div');
		const select = document.createElement('select');
		const btn = createBtn();

		container.classList = 'd-flex flex-row align-items-center column-gap-2';
		select.classList = 'form-select choice-status';

		select.setAttribute('aria-label', 'Default select example');

		const list = ['В рассмотрении', 'Подтвердить', 'Отклонить'];
		list.forEach((elem, index) => {
			const option = document.createElement('option');
			option.setAttribute('value', index.toString());
			// Если статус заказа совпадает с текущим индексом, устанавливаем опцию как выбранную
			if (+index === +order.status) option.selected = true;
			option.innerText = elem;
			select.appendChild(option);
		});

		// Добавляем обработчики событий для изменения статуса и сохранения изменений
		addEventSelectStatusChange(select, btn);
		addEventBtnSave(btn, select, order);

		container.appendChild(select);
		container.appendChild(btn);
		tdSelect.appendChild(container);
		return tdSelect;
	};
	/**
	 * Функция создает HTML-элемент кнопки для сохранения изменений статуса заказа.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Создает элемент кнопки `<button>`.
	 * 2. Присваивает кнопке классы для стилизации.
	 * 3. Устанавливает кнопку в неактивное состояние (disabled).
	 * 4. Добавляет иконку сохранения внутри кнопки.
	 * 5. Возвращает готовую кнопку.
	 *
	 * @returns {HTMLElement} - Элемент кнопки для сохранения изменений.
	 */
	const createBtn = () => {
		const btn = document.createElement('button');
		btn.classList = 'btn btn-secondary';
		btn.disabled = true;
		btn.innerHTML = '<img src="assets/image/save.png" alt="Кнопка сохранить"/>';
		return btn;
	};
	/**
	 * Функция фильтрует заказы по дате и обновляет состояние кнопки PDF в зависимости от выбранной даты.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Находит элемент с классом "date-from" в документе, который содержит выбранную пользователем дату.
	 * 2. Находит элемент кнопки с классом "btn-pdf".
	 * 3. Проверяет, установлена ли дата:
	 *    a. Если дата не выбрана (пустое значение), отключает кнопку "PDF" и отображает все заказы в таблице.
	 *    b. Если дата выбрана, включает кнопку "PDF" и фильтрует заказы, отображая только те, которые соответствуют выбранной дате.
	 * 4. Фильтрация выполняется по дате заказа, которая сравнивается с выбранной датой.
	 * 5. Обновляет отображение таблицы в зависимости от отфильтрованных заказов.
	 *
	 * @returns {void}
	 */
	const filterOrders = () => {
		const dateElem = document.querySelector('.date-from');
		const btn = document.querySelector('.btn-pdf');
		if (!dateElem.value) {
			btn.disabled = true;
			drawTable(orders);
		} else {
			const [year, month, day] = dateElem.value.split('-');
			const selDate = `${day}.${month}.${year}`;
			tempOrders = orders.filter((order) => {
				let flag = false;
				order.date.split('<br>-<br>')[0] === selDate && (flag = true);
				return flag;
			});
			btn.disabled = !(tempOrders.length && tempOrders[0].status === 1);
			drawTable(tempOrders);
		}
	};
	/**
	 * Функция добавляет обработчик события изменения даты для элемента ввода даты,
	 * который вызывает фильтрацию заказов при изменении выбранной даты.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Находит элемент ввода даты с классом "date-from" в документе.
	 * 2. Добавляет обработчик события `change` на этот элемент.
	 * 3. При изменении даты вызывает функцию `filterOrders`, которая фильтрует и отображает заказы в зависимости от выбранной даты.
	 *
	 * @returns {void}
	 */
	const addEventDateChange = () => {
		const dateElem = document.querySelector('.date-from');
		dateElem.addEventListener('change', () => filterOrders());
	};
	/**
	 * Функция добавляет обработчик события на кнопку для сохранения изменений статуса заказа.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Добавляет обработчик события `click` на кнопку.
	 * 2. При нажатии на кнопку выполняется асинхронная функция, которая вызывает `saveChanges`.
	 * 3. Функция `saveChanges` сохраняет новый статус заказа на сервере, используя идентификатор заказа и выбранное значение из выпадающего списка.
	 *
	 * @param {HTMLElement} btn - Элемент кнопки, на который добавляется обработчик.
	 * @param {HTMLElement} select - Элемент выпадающего списка, из которого берется новое значение статуса.
	 * @param {Object} order - Объект заказа, содержащий информацию о заказе, включая его идентификатор.
	 */
	const addEventBtnSave = (btn, select, order) => {
		btn.addEventListener('click', async () => await saveChanges(select.value, order.id));
	};
	/**
	 * Функция добавляет обработчик события для изменения статуса заказа и контролирует активность кнопки сохранения.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Сохраняет начальное значение статуса из выпадающего списка.
	 * 2. Добавляет обработчик события `change` на выпадающий список.
	 * 3. При изменении выбранного статуса проверяет, совпадает ли новое значение с начальным.
	 * 4. Если новое значение отличается от начального, кнопка сохранения активируется, иначе остается неактивной.
	 *
	 * @param {HTMLElement} select - Элемент выпадающего списка для выбора статуса.
	 * @param {HTMLElement} btn - Элемент кнопки, которая будет активирована при изменении статуса.
	 */
	const addEventSelectStatusChange = (select, btn) => {
		const initialStatus = select.value; // Сохраняем начальное значение
		select.addEventListener('change', (event) => (btn.disabled = event.target.value === initialStatus));
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
		select.addEventListener('change', () => updateTable(select.value));
	};
	/**
	 * Функция добавляет обработчик события нажатия для кнопки "Сформировать PDF",
	 * который открывает новое окно для генерации PDF-документа с данными о заказах.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Находит элемент кнопки с классом "btn-pdf" в документе.
	 * 2. Добавляет обработчик события `click` на этот элемент.
	 * 3. При нажатии на кнопку:
	 *    - Получает дату из элемента с классом "date-from" и разбивает её на год, месяц и день.
	 *    - Формирует объект `data`, содержащий заказы (из переменной `tempOrders`) и отформатированную дату.
	 *    - Открывает новое окно с указанным URL для генерации PDF-документа.
	 *    - Через 500 миллисекунд отправляет объект `data` в новое окно с использованием метода `postMessage`.
	 *
	 * @returns {void}
	 */
	const addEventBtnPdf = () => {
		const btn = document.querySelector('.btn-pdf');
		btn.addEventListener('click', () => {
			const [year, month, day] = document.querySelector('.date-from').value.split('-');
			const data = {
				orders: tempOrders,
				date: `${day}.${month}.${year}`,
			};
			const newWindow = window.open(`${BASE_URL}orderPdf.php`, 'blank');
			setTimeout(() => {
				newWindow.postMessage(data, BASE_URL);
			}, 500);
		});
	};

	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	let orders = [];
	let tempOrders = [];
	updateTable();
	addEventSelectChange();
	addEventDateChange();
	addEventBtnPdf();
});
