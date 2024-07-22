document.addEventListener('DOMContentLoaded', async () => {
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
			const params = {
				'application_id': document.querySelector('.modal-body-id').value,
				'response': document.querySelector('.textRes').value,
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
			
			data = data.filter((elem) => elem.id != document.querySelector('.modal-body-id').value); // Обновляем таблицу, удаляя элемент с отправленным ответом
			drawContent(); // Перерисовываем контент таблицы
			document.dispatchEvent(new CustomEvent('updateError', { detail: 'Ответ отправлен!' }));
		} catch(error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если была ошибка, то обновляем переменную
		};
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
	* Функция для добавления обработчика события на строку элемента.
	*
	* Функция добавляет обработчик события 'click' на переданный элемент.
	* При клике на элемент, данные заявки и пользователя используются для заполнения полей в модальном окне.
	*
	* @param {HTMLElement} elem - Элемент, на который добавляется обработчик события.
	*/
	const addEventRow = (elem) => {
		elem.addEventListener('click', () => { // Вешаем слушатель на событие 'click'
			const id = elem.id;	// Получаем id из атрибута элемента
			const app = data.find(obj => obj.id === +id); // Находим заявку по id
			const user = users[app.user_id]; // Находим пользователя по user_id заявки
			const login = user.login;
			const title = app.title;
			const phone = 'Пока нет!';
			const content = app.content;

			// Заполняем поля в модальном окне
			const modalBodyId = document.querySelector('.modal-body-id');
			modalBodyId.value = id;

			const modalTitle = document.querySelector('.modal-title');
			modalTitle.innerText = title !== "" ? title : login;

			const modalBodyTitle = document.querySelector('.modal-body-title');
			modalBodyTitle.innerText = title !== "" ? title : "Темы нет!";

			const modalBodyPhone = document.querySelector('.modal-body-phone');
			modalBodyPhone.innerText = phone;

			const modalBodyContent = document.querySelector('.modal-body-content');
			modalBodyContent.innerText = content;
		});
	};
	/**
	* Функция для отрисовки содержимого таблицы заявок.
	*
	* Функция очищает содержимое таблицы, добавляет заголовки колонок,
	* затем для каждой заявки создает строку таблицы с данными и добавляет к ней обработчик событий.
	*/
	const drawContent = () => {
		const table = document.querySelector('.table').querySelector('tbody');
		const columns = table.querySelector('.title'); // Запоминаем строку с заголовками колонок
		table.innerHTML = ''; // Очищаем содержимое таблицы
		table.appendChild(columns); // Добавляем заголовки колонок обратно в таблицу

		// Пробегаемся по заявкам и для каждой создаём строку с данными по заявке, навешиваем обработчик событий на эту строку
		data.forEach((el, i) => {
			const row = document.createElement('tr');
			row.className = 'appForm fs-6';
			row.id = el['id'];
			row.setAttribute('data-bs-target', '#exampleModalToggle');
			row.setAttribute('data-bs-toggle', 'modal');
			row.innerHTML = `<td>Пока нет</td>
						        <td id="login">${users[el['user_id']]['login']}</td>
						        <td>Пока нет</td>
						        <td>${el['title']}</td>
						        <td>${formContent(el['content'])}</td>`;
			addEventRow(row);
			table.appendChild(row);
		});
	};
	/**
	* Функция для отрисовки таблицы заявок с заголовками колонок.
	*
	* Функция создает строку заголовков колонок, добавляет её в таблицу,
	* затем вызывает функцию drawContent для отрисовки содержимого таблицы.
	*/
	const drawTable = () => {
		const table = document.querySelector('.table').querySelector('tbody');
		const columns = document.createElement('tr');
		columns.className = 'title';
		columns.innerHTML = `<th class="col-1 text-center">ФИО</th>
						<th class="col-2 text-center login">Логин</th>
						<th class="col-2 text-center">Телефон</th>
						<th class="col-3 text-center">Тема</th>
						<th class="col-4 text-center">Содержание</th>`;
		table.appendChild(columns); // Добавляем строку заголовков колонок в таблиц
		drawContent(); // Вызываем функцию для отрисовки содержимого таблицы
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
	const formContent = (text) => {
		const limit = 170;
		return text.length > limit ? text.substring(0, limit) + '...' : text;
	};

	
	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	let {apps: data, users} = await getData(); // Получаем data и users
	drawTable(); // Отрисовываем таблицу(с названием колонок и контентом)
	addEventRes(); // Вешаем слушатель на кнопку по клику для оправки ответа на сервер
});