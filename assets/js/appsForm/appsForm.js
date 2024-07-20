document.addEventListener('DOMContentLoaded', async () => {
	// 
	const getApplications = async () => {
		try {
			const response = await fetch(`${SERVER_URL}appForm.php`);
			const jsonResponse = await response.json();		// Достаём тело ответа 
			// console.log(jsonResponse);
			if (!response.ok) {
				throw new Error(jsonResponse.status);
			};
			return jsonResponse;
		} catch(error) {
			// Если была ошибка, то обновляем переменную
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
		};
	};
	//
	const getResponse = async (id) => {
		try {
			const response = await fetch(`${SERVER_URL}appResponse.php?id=${id}`);
			const jsonResponse = await response.json();		// Достаём тело ответа 
			// console.log(jsonResponse);
			if (!response.ok) {
				throw new Error(jsonResponse.status);
			};

			return jsonResponse.response[0].response;
		} catch(error) {
			// Если была ошибка, то обновляем переменную
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
		};
	};
	// Функция отправки заявки
	const postApplication = async () => {
		try {
			// Находим основные пункты заявки (заголовок/основной контент/email)
			const form = document.querySelector('.forma');
			const login = form.querySelector('.user').getAttribute('value');
			const title = form.querySelector('.title').value;
			const content = form.querySelector('.content').value;

			if (!content) throw new Error('Запрос не может быть пустым!');
			if (content.length < 5) throw new Error('Текст должен быть не менее 5ти символов!');
			// Формируем словарь для удобной работы
			const params = {
				'login': +login,
				'title': title,
				'content': content, 
			};

			// Формируем запрос 
			const response = await fetch(`${SERVER_URL}appForm.php`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					},
				body: JSON.stringify(params),		// В тело кладём "параметры" в JSON формате
			});
			const jsonResponse = await response.json();		// Достаём тело ответа 
			// Если вернулась ошибка - обрабатываем
			if (!response.ok){
				throw new Error(jsonResponse.status);
			};

			// Если "Ok", то обнуляем поля формы
			form.querySelector('.title').value =  "";
			form.querySelector('.content').value =  "";
			// Уведомляем пользователя об успехе
			document.dispatchEvent(new CustomEvent('updateError', { detail: 'Заявка отправлена!' }));
		} catch (error) {
			// Если была ошибка, то обновляем переменную
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
		};
	};
	// Функция для добавления слушателя на кнопку "Отправить" (для запроса)
	const addEventSend = () => {
		const sendBtn = document.querySelector('.send-btn');
		sendBtn.addEventListener('click', async () => await postApplication());		// Вешаем слушатель кликов на кнопку и привязываем функцию
	};
	// 
	const addEventAccordion = (row) => {
		row.querySelector('.title-container').addEventListener('click', () => {
			const content = row.querySelector('.content-container');
			if (content) {
				row.removeChild(content);
			} else {
				createContent(row);
			};
		});
	};
	//
	const drowTable = () => {
		const tableBody = document.querySelector('.table-appsForm').querySelector('.tbody');
		apps.forEach((app) => {
			const row = createRow(app);
			tableBody.appendChild(row);
			addEventAccordion(row);
		});
	};
	// 
	const createRow = (app) => {
		const row = document.createElement('div');
		const container = document.createElement('div');
		const tdTitle = document.createElement('p');
		const tdContent = document.createElement('p');
		const tdStatus = document.createElement('p');

		// Добавляем классы
		row.className = 'appForm d-flex flex-column';
		container.className = 'title-container d-flex flex-row';
		tdTitle.className = 'col-3 text-center';
		tdContent.className = 'col-8 text-center';
		tdStatus.className = 'col-1 text-center status';

		// Добавляем атрибуты
		row.setAttribute('value', app.id);

		// Добавляем текст
		tdTitle.innerText = app.title ? app.title : 'Темы нет';
		tdContent.innerText = app.content;
		tdStatus.innerText = app.status;

		// Собираем части в единую строку
		container.appendChild(tdTitle);
		container.appendChild(tdContent);
		container.appendChild(tdStatus);
		row.appendChild(container);

		return row;
	};
	// 
	const createContent = async (row) => {
		const container = document.createElement('div');
		const appTextContainer = document.createElement('div');
		const appTextTitle = document.createElement('p');
		const appText = document.createElement('p');
		const appResponseContainer = document.createElement('div');
		const appResponseTitle = document.createElement('p');
		const appResponse = document.createElement('p');

		// Добавляем классы
		container.className = 'content-container d-flex flex-column row-gap-4';
		appTextContainer.className = 'd-flex flex-row align-items-center column-gap-3';
		appResponseContainer.className = 'd-flex flex-row align-items-center column-gap-3';

		// 
		appTextTitle.innerText = 'Текст:';
		appResponseTitle.innerText = 'Ответ:';
		appText.innerText = apps.filter((obj) => obj.id === +row.getAttribute('value'))[0].content;
		appResponse.innerText = +row.querySelector('.status').textContent ? await getResponse(+row.getAttribute('value')) : 'Ответа нет!'; // Продолжить...

		// 
		appTextContainer.appendChild(appTextTitle);
		appTextContainer.appendChild(appText);
		appResponseContainer.appendChild(appResponseTitle);
		appResponseContainer.appendChild(appResponse);
		container.appendChild(appTextContainer);
		container.appendChild(appResponseContainer);
		row.appendChild(container);
	};


	// Начало скрипта
	let {apps} = await getApplications();
	addEventSend();
	drowTable();
});