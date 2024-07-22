document.addEventListener('DOMContentLoaded', async () => {
	// Получение данных о заявках и пользователях
	const getData = async () => {
		try {
			// Формируем запрос
			const response = await fetch(`${SERVER_URL}appForms.php`);
			const jsonResponse = await response.json();		// Получаем тело ответа
			// если вернулась ошибка - обрабатываем
			if (!response.ok) {
				throw new Error(jsonResponse.status);
			};
			jsonResponse.apps.reverse();
			return jsonResponse;
        } catch (error) {
			// Если была ошибка, то обновляем переменную
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
        }
	};
	// Функция для добавления слушателя для отправки ответа
	const addEventRes = () => {
		const resBtn = document.querySelector('.res-btn');
		resBtn.addEventListener('click', async () => {
			try {
				const params = {
					'application_id': document.querySelector('.modal-body-id').value,
					'response': document.querySelector('.textRes').value,
				};
				// Формируем запрос
				const response = await fetch(`${SERVER_URL}appResponse.php`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						},
					body: JSON.stringify(params),
				});

				const jsonResponse = await response.json();		// Получаем тело ответа
				// если вернулась ошибка - обрабатываем
				if (!response.ok) {
					throw new Error(jsonResponse.status);
				};
				// Обновляем таблицу
				data = data.filter((elem) => elem.id != document.querySelector('.modal-body-id').value);
				drawContent();
				document.dispatchEvent(new CustomEvent('updateError', { detail: 'Ответ отправлен!' }));
			} catch(error) {
				// Если была ошибка, то обновляем переменную
				document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			};
		});
	};

	// Функция для добавления слушателя на строку из таблицы
	const addEventRow = (elem) => {
		elem.addEventListener('click', () => {		// Вешаем слушатель по клику
			const id = elem.id;		// Присваеваем id из атрибутов элемента
			const app = data.find(obj => obj.id === +id);
			const user = users[app.user_id];
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

	// Функция для отрисовки заявок в таблице
	const drawContent = () => {
		const table = document.querySelector('.table').querySelector('tbody');
		const columns = table.querySelector('.title');		// Запоминаем строку с названием колонок
		table.innerHTML = '';
		table.appendChild(columns);		// Сразу добавляем колонки в tbody

		data.forEach((el, i) => {		// Пробегаемся по заявкам и для каждой создаём строку, на которую навешиваем слушатель
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
			addEventRow(row);		// Функция со слушателем
			table.appendChild(row);
		});
	}

	// Функция отрисовки таблицы (строка с названием колонок и строки с заявками)
	const drawTable = () => {
		const table = document.querySelector('.table').querySelector('tbody');
		const columns = document.createElement('tr');
		columns.className = 'title';
		columns.innerHTML = `<th class="col-1 text-center">ФИО</th>
						<th class="col-2 text-center login">Логин</th>
						<th class="col-2 text-center">Телефон</th>
						<th class="col-3 text-center">Тема</th>
						<th class="col-4 text-center">Содержание</th>`;
		table.appendChild(columns);
		drawContent();
	};

	// Функция для ограничения контента в таблице
	const formContent = (value) => {
		const limit = 170;
		return value.length > limit ? value.substring(0, limit) + '...' : value;
	};

	// Функция для сравнения введёное значение(substring) и объекта с ФИО(obj)
	const startsWithFullName = (obj, substring) => {
		// Проверка на ввод данных
		if (!obj || !obj.FIO || !obj.FIO.lastname || !obj.FIO.firstname) {
			return false;
		};

		const { lastname, firstname } = obj.FIO;
		const fullName = `${lastname.toLowerCase()} ${firstname.toLowerCase()}`;
		return fullName.startsWith(substring.toLowerCase());
	};

	// Начало скрипта
	// Получим data и users
	let {apps: data, users} = await getData();
	drawTable(); // Отрисовываем всю таблицу
	addEventRes(); // Слушатель на кнопку для оправки ответа
});