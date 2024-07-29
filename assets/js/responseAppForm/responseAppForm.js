document.addEventListener('DOMContentLoaded', async () => {
	/**
	* Асинхронная функция для получения ответа на заявку.
	*
	* Функция отправляет запрос на сервер для получения данных о заявке,
	* используя переданный идентификатор заявки. Возвращает последний элемент из массива ответов.
	* В случае ошибки, функция генерирует событие 'updateError' с сообщением об ошибке.
	*
	* @param {number} id - Идентификатор заявки.
	* @returns {Object} Последний объект ответа из массива ответов.
	*
	* @throws {Error} Если запрос не удался или произошла ошибка при обработке ответа, будет выброшена ошибка с кодом статуса или сообщением об ошибке.
	*/
	const getAppResponse = async (id) => {
		try {
			const qparametr = `?id=${id}`;
			const response = await fetch(`${SERVER_URL}appResponse.php${qparametr}`);
			const jsonResponse = await response.json(); // Достаём тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			return jsonResponse.response[jsonResponse.response.length - 1];
		} catch (error) {
			// Если была ошибка, то обновляем переменную
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
		}
	};
	/**
	* Асинхронная функция для получения данных о заявках и их отправителей.
	*
	* Функция отправляет запрос на сервер для получения данных,
	* переворачивает полученный массив заявок(чтобы еовые заявки были вверху таблицы)
	* и возвращает заявки и пользователей. В случае ошибки, функция генерирует событие 'updateError'
	* с сообщением об ошибке.
	*
	* @returns {Object} Объект с данными.
	*
	* @throws {Error} Если запрос не удался или произошла ошибка при обработке ответа, будет выброшена ошибка с кодом статуса или сообщением об ошибке.
	*/
	const getData = async () => {
		try {
			// Формируем запрос к серверу
			const response = await fetch(`${SERVER_URL}appForms.php`);
			const jsonResponse = await response.json();	// Получаем тело ответа в формате JSON
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа
			jsonResponse.apps.reverse(); // Переворачиваем массив, чтобы новые данные были в начале массива
			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если была ошибка, то обновляем переменную
		};
	};
	/**
	* Асинхронная функция для отправки ответа на заявку.
	*
	* Функция собирает данные ответа из элементов DOM, отправляет POST-запрос на сервер,
	* и обновляет таблицу заявок в случае успешного выполнения запроса.
	* В случае ошибки, функция генерирует событие 'updateError' с сообщением об ошибке.
	*
	* @throws {Error} Если запрос не удался или произошла ошибка при обработке ответа, будет выброшена ошибка с кодом статуса или сообщением об ошибке.
	*/
	const postAppResponse = async () => {
		try {
			const status = +document.querySelector('.form-select').value;
			if (!status) throw new Error('Укажите статус!');
			const params = {
				'user_id': SESSION.id,
				'application_id': document.querySelector('.modal-body-id').value,
				'response': document.querySelector('.textRes').value.trim(),
				'status': status,
			};
			// Формируем запрос к серверу
			const response = await fetch(`${SERVER_URL}appResponse.php`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					},
				body: JSON.stringify(params),
			});

			const jsonResponse = await response.json();	// Получаем тело ответа в формате JSON
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа
			
			data = data.map((elem) => {
				if (elem.id === +document.querySelector('.modal-body-id').value) {
					const newObj = {
						content: elem.content,
						id: elem.id,
						status: status,
						title: elem.title,
						user_id: elem.user_id,
						date: elem.date,
					};

					console.log(newObj.date.substring(0, 5));
					const row = createRow(
						newObj.id,
						newObj.date.substring(0, 10),
						users[newObj['user_id']]['login'],
						'Пока нет',
						formContent(newObj.title, 10),
						formContent(newObj.content, 70),
						newObj.status,
						'appForm fs-6',
					);
					addEventRow(row);
					insertTableNewRow(row, newObj.id);
					return newObj;
				};
				return elem;

			});
			document.dispatchEvent(new CustomEvent('updateError', { detail: 'Ответ отправлен!' }));
		} catch(error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если была ошибка, то обновляем переменную
		};
	};
	// 
	const insertTableNewRow = (newRow, id) => {
		const oldRow = document.querySelector(`.appForm[id="${id}"]`);
		oldRow.replaceWith(newRow);
	};
	/**
	* Функция для добавления обработчика события на кнопку ответа.
	*
	* Функция находит кнопку с классом 'res-btn' и добавляет обработчик события 'click'.
	* При клике на кнопку асинхронно вызывается функция postAppResponse для отправки ответа на заявку.
	*/
	const addEventRes = () => {
		const resBtn = document.querySelector('.res-btn');
		resBtn.addEventListener('click', async () => await postAppResponse());
	};
	/**
	* Функция, добавляющая обработчик события клика к элементу строки.
	*
	* Функция выполняет следующие шаги:
	* 1. Вешает обработчик события 'click' на переданный элемент.
	* 2. Получает идентификатор элемента и находит соответствующую заявку в массиве данных.
	* 3. Извлекает информацию о пользователе, связанном с заявкой, и другие данные заявки.
	* 4. Если статус заявки больше 0, запрашивает данные ответа для этой заявки с сервера.
	* 5. Заполняет модальное окно соответствующей информацией из заявки.
	* 6. Вешает обработчик события 'change' на элемент выбора статуса в модальном окне, чтобы отслеживать изменения и включать/отключать кнопку отправки.
	*
	* @param {HTMLElement} elem - Элемент строки, к которому добавляется обработчик события.
	*/
	const addEventRow = (elem) => {
		elem.addEventListener('click', async () => { // Вешаем слушатель на событие 'click'
			const id = elem.id;	// Получаем id из атрибута элемента
			const app = data.find(obj => obj.id === +id); // Находим заявку по id
			const user = users[app.user_id]; // Находим пользователя по user_id заявки
			const login = user.login;
			const title = app.title;
			const phone = 'Пока нет!';
			const content = app.content;
			let comment = '';
			const status = app.status;
			if (status > 0) {
				comment = (await getAppResponse(app.id)).response;
			};

			// Заполняем поля в модальном окне
			const modalBodyId = document.querySelector('.modal-body-id');
			modalBodyId.value = id;

			const modalTitle = document.querySelector('.modal-title');
			modalTitle.innerText = title !== "" ? formContent(title, 35) : login;

			const modalBodyTitle = document.querySelector('.modal-body-title');
			modalBodyTitle.innerText = title !== "" ? title : "Темы нет!";

			const modalBodyPhone = document.querySelector('.modal-body-phone');
			modalBodyPhone.innerText = phone;

			const modalBodyContent = document.querySelector('.modal-body-content');
			modalBodyContent.innerText = content;

			const modalBodyComment = document.querySelector('.textRes');
			modalBodyComment.value = comment;

			const modalBodyStatus = document.querySelector('.form-select');
			modalBodyStatus.value = status;

	        const initialStatus = modalBodyStatus.value; // Сохраняем начальное значение
	        const sendBtn = document.querySelector('.res-btn');
			sendBtn.disabled = true;
	        modalBodyStatus.addEventListener('change', (event) => sendBtn.disabled = event.target.value === initialStatus);
	        modalBodyStatus.querySelectorAll('option').forEach((elem) => +elem.value <= initialStatus || +initialStatus === 2 ? elem.disabled = true : elem.disabled = false);
		});
	};
	/**
	* Функция для отрисовки содержимого таблицы заявок.
	*
	* Функция очищает содержимое таблицы, добавляет заголовки колонок,
	* затем для каждой заявки создает строку таблицы с данными и добавляет к ней обработчик событий.
	*/
	const drawContent = () => {
		const tableBody = document.querySelector('.table').querySelector('.tbody');
		tableBody.innerHTML = ''; // Очищаем содержимое таблицы

		// Пробегаемся по заявкам и для каждой создаём строку с данными по заявке, навешиваем обработчик событий на эту строку
		data.forEach((el, i) => {
			const row = createRow(
				el.id,
				el.date.substring(0, 10),
				users[el['user_id']]['login'],
				'Пока нет',
				formContent(el.title, 10),
				formContent(el.content, 70),
				el.status,
				'appForm fs-6',
			);
			addEventRow(row);
			tableBody.appendChild(row);
		});
	};
	/**
	* Функция для отрисовки таблицы заявок с заголовками колонок.
	*
	* Функция создает строку заголовков колонок, добавляет её в таблицу,
	* затем вызывает функцию drawContent для отрисовки содержимого таблицы.
	*/
	const drawTable = () => {
		const tableTitle = document.querySelector('.table').querySelector('.tb-title');
		const columnsName = createRow();
		tableTitle.appendChild(columnsName); // Добавляем строку заголовков колонок в таблиц
		drawContent(); // Вызываем функцию для отрисовки содержимого таблицы
	};
	/**
	* Функция для создания строки с данными.
	*
	* Функция выполняет следующие действия:
	* 1. Создает контейнеры для каждого поля данных.
	* 2. Добавляет соответствующие классы к каждому контейнеру.
	* 3. Устанавливает атрибуты для модального окна, если id больше 0.
	* 4. Заполняет контейнеры переданными данными.
	* 5. Объединяет все контейнеры в одну строку и возвращает её.
	*
	* @param {number} id - Идентификатор строки, по умолчанию -1.
	* @param {string} date - Дата создания заявки.
	* @param {string} login - Логин пользователя, по умолчанию 'Логин'.
	* @param {string} phone - Телефон пользователя, по умолчанию 'Телефон'.
	* @param {string} title - Тема заявки, по умолчанию 'Тема'.
	* @param {string} content - Содержание заявки, по умолчанию 'Содержание'.
	* @param {string} style - Стиль строки, по умолчанию 'tb-title'.
	*
	* @returns {HTMLElement} Возвращает строку с данными в виде div элемента.
	*/
	const createRow = (id = -1, date = 'Дата', login = 'Логин', phone = 'Телефон', title = 'Тема', content = 'Содержание', status = 'Статус', style = '') => {
		const row = document.createElement('div');
		const dateContainer = document.createElement('p');
		const loginContainer = document.createElement('p');
		const phoneContainer = document.createElement('p');
		const titleContainer = document.createElement('p');
		const contentContainer = document.createElement('p');
		const statusContainer = document.createElement('p');

		// Добавляем классы
		row.className = `${style} d-flex flex-row`;
		dateContainer.className = 'col-1 text-center';
		loginContainer.className = 'col-1 text-center login';
		phoneContainer.className = 'col-1 text-center';
		titleContainer.className = 'col-3 text-center';
		contentContainer.className = 'col-4 text-center';
		statusContainer.className = 'col-2 text-center';

		// 
		const statusObj = {
			0: {text: 'Не рассмотрено', style: ''},
			1: {text: 'В работе', style: 'yellow'},
			2: {text: 'Выполнено', style: 'green'},
			3: {text: 'Отклонено', style: 'red'},
		};
		// 
		row.id = id;
		if (id > 0) {
			statusContainer.className = `col-2 text-center ${statusObj[status].style}`;
			row.setAttribute('data-bs-target', '#exampleModalToggle');
			row.setAttribute('data-bs-toggle', 'modal');
			loginContainer.setAttribute('id', 'login');
		};

		// Добавляем текст
		dateContainer.innerText = date;
		loginContainer.innerText = login;
		phoneContainer.innerText = phone;
		titleContainer.innerText = title;
		contentContainer.innerText = content;
		statusContainer.innerText = status !== 'Статус' ? statusObj[status].text : status;

		// Собираем части в единую строку
		row.appendChild(dateContainer);
		row.appendChild(loginContainer);
		row.appendChild(phoneContainer);
		row.appendChild(titleContainer);
		row.appendChild(contentContainer);
		row.appendChild(statusContainer);

		return row;
	};
	/**
	* Функция для ограничениея текста по длине.
	*
	* Функция выполняет следующие действия:
	* 1. Проверяет длину входного текста.
	* 2. Если длина текста превышает установленный лимит, обрезает текст и добавляет многоточие.
	* 3. Если длина текста не превышает лимит, возвращает текст без изменений.
	*
	* @param {string} text - Текст, который нужно обработать.
	*
	* @returns {string} Возвращает обработанный текст, который либо обрезан с многоточием, либо остается неизменным.
	*/
	const formContent = (text, limit) => {
		return text.length > limit ? text.substring(0, limit) + '...' : text;
	};

	
	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	let {apps: data, users} = await getData(); // Получаем data и users
	drawTable(); // Отрисовываем таблицу(с названием колонок и контентом)
	addEventRes(); // Вешаем слушатель на кнопку по клику для оправки ответа на сервер
});