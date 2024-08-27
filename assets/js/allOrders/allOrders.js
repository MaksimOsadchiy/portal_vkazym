document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Функция сохраняет изменения для указанного заказа и обновляет таблицу.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Формирует параметры запроса на основе переданных значений.
	 * 2. Отправляет PUT-запрос на сервер для обновления данных.
	 * 3. Обрабатывает ответ от сервера, проверяет успешность операции.
	 * 4. Если операция успешна, удаляет соответствующую строку из таблицы.
	 * 5. В случае ошибки, генерирует событие 'updateError' с описанием ошибки.
	 *
	 * @param {number} newStatus - новый статус заказа, который нужно сохранить на сервере.
	 * @param {number} id - Уникальный идентификатор заказы, данные которого нужно обновить.
	 *
	 * @returns {void}
	 */
	const saveChanges = async (newStatus, id) => {
		try {
			const qparametr = `?id=${id}`; // Устанавливаем кверипараметры
			const params = {
				status: newStatus,
			};
			const response = await fetch(`${SERVER_URL}orders.php${qparametr}`, {
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
	 * 3. Обрабатывает ответ от сервера, проверяет успешность операции.
	 * 4. В случае успешного ответа возвращает данные заказов.
	 * 5. В случае ошибки генерирует событие 'updateError' с описанием ошибки и возвращает пустой объект.
	 *
	 * @param {number|string} status - Статус заказов, по которому нужно выполнить запрос.
	 *
	 * @returns {Record<int, Object>|{}} - Объект с данными заказов или пустой объект в случае ошибки.
	 */
	const getOrders = async (status) => {
		try {
			const qparametr = `?status=${status}`; // Устанавливаем кверипараметры
			const response = await fetch(`${SERVER_URL}orders.php${qparametr}`);
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
	 * @param {number}  [status=0] - Статус для фильтрации заказов при запросе на сервер. По умолчанию 0.
	 *
	 * @returns {void}
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
		filterOrders();
	};
	/**
	 * Отображает таблицу, создавая строки таблицы на основе переданных данных заказов.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент `<tbody>` в документе, который используется в качестве контейнера для строк таблицы.
	 * 2. Очищает текущее содержимое `<tbody>`, чтобы удалить любые ранее отображенные строки.
	 * 3. Перебирает массив заказов, переданный в качестве аргумента.
	 * 4. Для каждого заказа вызывает функцию `createRow`, чтобы создать новую строку таблицы с данными заказа.
	 * 5. Добавляет созданную строку в `<tbody>`, чтобы она была отображена в таблице.
	 *
	 * @param {Array<Object>} orders Массив объектов заказов, где каждый объект представляет данные заказа.
	 *
	 * @returns {void}
	 */
	const drawTable = (orders) => {
		const bodyTable = document.querySelector('tbody');
		bodyTable.innerText = '';
		orders.forEach((order) => bodyTable.appendChild(createRow(order))); // Перебираем массив данных заказов и создаем строки таблицы для каждого заказа, сразу добавляем созданную строку в таблицу
	};
	/**
	 * Создаёт строку таблицы HTML на основе данных заказа.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Создаёт новый элемент `<tr>` для строки таблицы.
	 * 2. Создаёт несколько элементов `<td>`, каждый из которых представляет собой ячейку таблицы для разных данных заказа.
	 * 3. Заполняет каждую ячейку данными заказа, которые передаются в функцию в виде объекта.
	 * 4. Создаёт элемент `<td>` для статуса заказа, используя функцию `createSelect`, которая возвращает элемент выбора со статусом.
	 * 5. Добавляет все ячейки в строку таблицы.
	 * 6. Устанавливает атрибут `id` строки таблицы в значение `id` заказа.
	 * 7. Возвращает созданную строку таблицы.
	 *
	 * @param {Object} order Объект заказа, содержащий данные, которые будут отображены в строке таблицы.
	 * @param {string} order.id Идентификатор заказа.
	 * @param {string} order.service Название услуги, связанной с заказом.
	 * @param {string} order.date Дата выполнения заказа.
	 * @param {string} order.time Время выполнения заказа.
	 * @param {string} order.technique Техника, используемая в заказе.
	 * @param {string} order.route Маршрут заказа.
	 * @param {string} order.workActivity Вид работы, выполняемой в рамках заказа.
	 * @param {string} order.remark Примечания к заказу.
	 * @param {Object} order.responsiblePerson Информация о лице, ответственном за заказ.
	 * @param {string} order.responsiblePerson.lastname Фамилия ответственного лица.
	 * @param {string} order.responsiblePerson.firstname Имя ответственного лица.
	 * @param {string} order.responsiblePerson.patronymic Отчество ответственного лица.
	 * @param {string} order.created_at Дата и время создания заказа.
	 *
	 * @returns {HTMLTableRowElement} Созданная строка таблицы `<tr>`, содержащая данные заказа.
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
	 * Создаёт элемент выбора (селект) для отображения и изменения статуса заказа.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Создаёт контейнер `<td>` и внутренний контейнер `<div>` для размещения селекта и кнопки.
	 * 2. Создаёт элемент `<select>` для выбора статуса заказа и кнопку для сохранения изменений.
	 * 3. Устанавливает классы и атрибуты для элементов, чтобы стилизовать и улучшить доступность.
	 * 4. Заполняет элемент `<select>` опциями для различных статусов заказа. Если статус заказа совпадает с текущим индексом, устанавливает опцию как выбранную.
	 * 5. Добавляет обработчики событий на изменение статуса и нажатие кнопки для сохранения изменений.
	 * 6. Добавляет элементы `<select>` и кнопку в контейнер, возвращает контейнер `<td>`, который будет добавлен в строку таблицы.
	 *
	 * @param {Object} order Объект заказа, содержащий информацию о текущем статусе заказа.
	 * @param {string} order.status Текущий статус заказа, который используется для установки выбранной опции в селекте.
	 *
	 * @returns {HTMLTableCellElement} Возвращает элемент `<td>`, содержащий селект и кнопку для изменения статуса заказа.
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
	 * Фильтрует заказы по выбранной дате и обновляет таблицу с заказами.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Извлекает значение даты из элемента ввода с классом `.date-from` и кнопку с классом `.btn-pdf`.
	 * 2. Проверяет, задана ли дата. Если нет, отключает кнопку и отображает все заказы в таблице.
	 * 3. Если дата задана, форматирует её в формат `dd.MM.yyyy`.
	 * 4. Фильтрует массив заказов, оставляя только те заказы, у которых дата соответствует выбранной.
	 * 5. Проверяет, следует ли активировать кнопку в зависимости от наличия отфильтрованных заказов и их статуса.
	 * 6. Обновляет таблицу с отфильтрованными заказами.
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
	 * Добавляет обработчик события изменения даты на элемент ввода даты.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Извлекает элемент ввода даты с классом `.date-from` из DOM.
	 * 2. Добавляет обработчик события `change` на этот элемент.
	 * 3. При изменении значения в элементе ввода даты вызывает функцию `filterOrders` для фильтрации заказов по новой дате.
	 *
	 * @returns {void}
	 */
	const addEventDateChange = () => {
		const dateElem = document.querySelector('.date-from');
		dateElem.addEventListener('change', () => filterOrders());
	};
	/**
	 * Добавляет обработчик события клика на кнопку сохранения, который обновляет статус заказа.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Прикрепляет обработчик события `click` к кнопке `btn`.
	 * 2. При клике на кнопку вызывает асинхронную функцию `saveChanges` с текущим значением `select` и идентификатором заказа `order.id`.
	 * 3. Ожидает завершения выполнения `saveChanges` перед завершением обработки события.
	 *
	 * @param {HTMLButtonElement} btn - Кнопка сохранения, на которую будет добавлен обработчик события.
	 * @param {HTMLSelectElement} select - Элемент выбора, значение которого будет передано функции `saveChanges`.
	 * @param {Object} order - Объект заказа
	 * @param {string|number} order.id , содержащий его `id`, который будет использован для обновления данных.
	 *
	 * @returns {void}
	 */
	const addEventBtnSave = (btn, select, order) => {
		btn.addEventListener('click', async () => await saveChanges(+select.value, +order.id));
	};
	/**
	 * Добавляет обработчик события изменения значения в элементе выбора, который управляет состоянием кнопки.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Сохраняет начальное значение выбранного пункта в элементе выбора `select` в переменную `initialStatus`.
	 * 2. При изменении значения в элементе выбора добавляет обработчик события `change`, который проверяет текущее значение.
	 * 3. Если новое значение в элементе выбора совпадает с начальным значением, кнопка `btn` становится недоступной (disabled).
	 * 4. В противном случае, кнопка становится доступной.
	 *
	 * @param {HTMLSelectElement} select - Элемент выбора, изменение значения в котором отслеживается.
	 * @param {HTMLButtonElement} btn - Кнопка, состояние активности которой зависит от изменения значения в элементе выбора.
	 *
	 * @returns {void}
	 */
	const addEventSelectStatusChange = (select, btn) => {
		const initialStatus = select.value; // Сохраняем начальное значение
		select.addEventListener('change', (event) => (btn.disabled = event.target.value === initialStatus));
	};
	/**
	 * Добавляет обработчик события изменения значения в элементе выбора для обновления таблицы.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент выбора с классом `.form-select` в документе.
	 * 2. Добавляет обработчик события `change` к найденному элементу выбора.
	 * 3. При изменении значения в элементе выбора вызывает функцию `updateTable`, передавая ей текущее значение элемента выбора, преобразованное в число.
	 *
	 * @returns {void}
	 */
	const addEventSelectChange = () => {
		const select = document.querySelector('.form-select');
		select.addEventListener('change', () => updateTable(+select.value));
	};
	/**
	 * Добавляет обработчик события клика на кнопку для генерации и открытия PDF-файла с заказами.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит кнопку с классом `.btn-pdf` в документе.
	 * 2. Добавляет обработчик события `click` к найденной кнопке.
	 * 3. При нажатии на кнопку извлекает дату из поля ввода с классом `.date-from`, преобразует её в формат `ДД.ММ.ГГГГ`.
	 * 4. Создаёт объект `data`, содержащий массив заказов `tempOrders` и дату.
	 * 5. Открывает новое окно или вкладку с URL-адресом для генерации PDF-файла.
	 * 6. Использует `setTimeout` для задержки в 500 миллисекунд, чтобы дать время новому окну загрузиться.
	 * 7. Отправляет объект `data` в новое окно через `postMessage`, указывая `BASE_URL` в качестве источника сообщения.
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
