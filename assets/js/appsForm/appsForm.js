document.addEventListener('DOMContentLoaded', async () => {
	/**
	 * Асинхронная функция для получения ответственного пользователя(который откликнулся на заявку).
	 *
	 * Функция отправляет запрос на сервер для получения данных о пользователе,
	 * используя переданный идентификатор пользователя. Возвращает объект с данными пользователя.
	 * В случае ошибки, функция генерирует событие 'updateError' с сообщением об ошибке.
	 *
	 * @param {number} user_id - Идентификатор пользователя.
	 * @returns {Object} Объект с данными пользователя.
	 *
	 * @throws {Error} Если запрос не удался или произошла ошибка при обработке ответа, будет выброшена ошибка с кодом статуса или сообщением об ошибке.
	 */
	const getResponsiblePersonForResponse = async (user_id) => {
		try {
			const qparametr = `?id=${user_id}`; // Устанавливаем кверипараметры
			const response = await fetch(`${SERVER_URL}user.php${qparametr}`);
			const jsonResponse = await response.json(); // Получаем тело ответа
			return jsonResponse;
		} catch (e) {
			// Если была ошибка, то обновляем переменную
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
		}
	};
	/**
	 * Асинхронная функция для получения заявок.
	 *
	 * Функция отправляет запрос на сервер для получения данных о заявках,
	 * переворачивает полученный массив заявок и возвращает его.
	 * В случае ошибки, функция генерирует событие 'updateError' с сообщением об ошибке и возвращает пустой массив.
	 *
	 * @returns {Object} Объект с заявками.
	 *
	 * @throws {Error} Если запрос не удался или произошла ошибка при обработке ответа, будет выброшена ошибка с кодом статуса или сообщением об ошибке.
	 */
	const getApplications = async () => {
		try {
			const qparametr = `?id=${SESSION.id}`; // Устанавливаем кверипараметры
			const response = await fetch(`${SERVER_URL}appForm.php${qparametr}`);
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			jsonResponse.apps.reverse(); // Переворачиваем массив, чтобы новые заявки были в начале массива
			return jsonResponse;
		} catch (error) {
			// Если была ошибка, то обновляем переменную
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			return { apps: [] };
		}
	};
	/**
	 * Асинхронная функция, которая отправляет запрос на сервер для получения данных ответа по указанному идентификатору.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Отправляет HTTP GET запрос на сервер, используя идентификатор, переданный в параметре `id`.
	 * 2. Ожидает получения ответа от сервера и преобразует его в формат JSON.
	 * 3. Проверяет, успешен ли ответ сервера (статус ответа `ok`). Если нет, выбрасывает ошибку с кодом статуса.
	 * 4. Если запрос успешен, возвращает строку с данными ответа, извлечённую из первого элемента массива `response` в теле ответа.
	 * 5. В случае ошибки во время запроса или обработки ответа, создаёт и диспатчит событие `updateError` с деталями ошибки.
	 *
	 * @param {number} id - Идентификатор заявки, который будет использован для запроса данных с сервера. Это должно быть числовое значение, представляющее уникальный идентификатор.
	 *
	 * @returns {string} Строка, содержащая данные ответа (В случае успешного выполнения запроса, это строка из первого элемента массива `response` в ответе сервера).
	 *
	 * @throws {Error} Если запрос не удался или произошла ошибка при обработке ответа, будет выброшена ошибка с кодом статуса или сообщением об ошибке.
	 */
	const getResponse = async (id) => {
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
	 * Асинхронная функция для отправки новой заявки на сервер.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Извлекает данные из формы заявки на странице.
	 * 2. Проверяет, что введённый текст не пуст и имеет минимальную длину.
	 * 3. Формирует объект с параметрами для отправки на сервер.
	 * 4. Отправляет HTTP POST запрос на сервер с данными заявки в формате JSON.
	 * 5. Обрабатывает ответ сервера, проверяет статус и обновляет интерфейс.
	 * 6. Уведомляет пользователя об успехе или ошибке операции.
	 *
	 * @throws {Error} Если содержимое заявки пустое или имеет недостаточную длину или другая ошибка, выбрасывается ошибка с соответствующим сообщением.
	 */
	const postApplication = async () => {
		try {
			// Находим основные пункты заявки (заголовок/основной контент/email)
			const form = document.querySelector('.forma');
			const login = form.querySelector('.user').getAttribute('value');
			const title = form.querySelector('.title').value;
			const content = form.querySelector('.content').value;

			// Проверка данных
			if (title.length > 128) throw new Error(`Заголовок не может быть динее 128 символов!(${title.length})`);
			if (!content) throw new Error('Запрос не может быть пустым!');
			if (content.length < 5) throw new Error('Текст должен быть не менее 5ти символов!');

			// Формируем объект
			const params = {
				login: +login,
				title: title,
				content: content,
			};
			// Формируем запрос
			const response = await fetch(`${SERVER_URL}appForm.php`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(params), // Отправляем объект в JSON формате
			});
			const jsonResponse = await response.json(); // Достаём тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			// Если "Ok", то обнуляем поля формы
			form.querySelector('.title').value = '';
			form.querySelector('.content').value = '';

			// Создаём объект только что созданной заявки и добавляем в начало списка заявок на странице
			const obj = {
				id: +jsonResponse.id,
				user_id: SESSION.id,
				title: title,
				content: content,
				status: 0,
				date: formatDate(),
			};
			apps = [obj, ...apps];
			const bodyTable = document.querySelector('.tbody');
			const row = createRow(obj);
			bodyTable.insertBefore(row, bodyTable.firstChild); // Добавляем строчку в начало тела таблицы
			addEventAccordion(row); // Также добавляем слушатель на новую стрку, чтобы можно было раскрыть содержимое

			// Уведомляем пользователя об успехе
			document.dispatchEvent(
				new CustomEvent('updateError', {
					detail: 'Заявка отправлена!',
				})
			);
		} catch (error) {
			// Если была ошибка, то обновляем переменную
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
		}
	};
	/**
	 * Функция добавляет обработчик события для кнопки отправки заявки.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Находит элемент кнопки отправки заявки на странице.
	 * 2. Добавляет обработчик события клика на кнопку, который вызывает асинхронную функцию для отправки заявки.
	 */
	const addEventSend = () => {
		const sendBtn = document.querySelector('.send-btn');
		sendBtn.addEventListener('click', async () => await postApplication()); // Вешаем слушатель кликов на кнопку и привязываем функцию
	};
	/**
	 * Функция добавляет обработчик события для переданной строки.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Находит элемент заголовка в переданной строке таблицы.
	 * 2. Добавляет обработчик события клика на этот элемент.
	 * 3. При клике проверяет, существует ли уже содержимое аккордеона.
	 * 4. Если содержимое существует, оно удаляется.
	 * 5. Если содержимое отсутствует, создаётся новое содержимое и добавляется в строку.
	 *
	 * @param {HTMLElement} row - Строка таблицы, в которой нужно добавить обработчик.
	 *
	 */
	const addEventAccordion = (row) => {
		row.querySelector('.title-container').addEventListener('click', () => {
			// Находим элемент с содержимым аккордеона в той же строке
			const content = row.querySelector('.content-container');
			// Проверяем, существует ли элемент содержимого
			content ? row.removeChild(content) : createContent(row); // (Это тернарный оператор)
		});
	};
	/**
	 * Функция для отрисовки таблицы на основе массива заявок.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Находит тело таблицы на странице.
	 * 2. Для каждой заявки из массива `apps` создаёт строку таблицы.
	 * 3. Добавляет созданную строку в тело таблицы.
	 * 4. Добавляет обработчик аккордеона к каждой строке таблицы.
	 */
	const drowTable = () => {
		const tableBody = document.querySelector('.table-appsForm').querySelector('.tbody');
		apps.forEach((app) => {
			const row = createRow(app);
			tableBody.appendChild(row);
			addEventAccordion(row);
		});
	};
	/**
	 * Функция для создания строки таблицы на основе данных заявки.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Создаёт элементы для строки таблицы и её содержимого.
	 * 2. Добавляет классы и атрибуты к элементам.
	 * 3. Заполняет элементы текстовым содержимым.
	 * 4. Сборка элементов в единую строку и возвращение её.
	 *
	 * @param {Object} app - Объект, представляющий данные заявки.
	 * @param {number} app.id - Идентификатор заявки.
	 * @param {string} app.title - Заголовок заявки.
	 * @param {string} app.date - Дата создания заявки.
	 * @param {string} app.content - Содержание заявки.
	 * @param {number} app.status - Статус заявки.
	 *
	 * @returns {HTMLElement} Возвращает элемент `div`, представляющий строку таблицы с данными заявки.
	 */
	const createRow = (app) => {
		const row = document.createElement('div');
		const container = document.createElement('div');
		const tdTime = document.createElement('p');
		const tdTitle = document.createElement('p');
		const tdContent = document.createElement('p');
		const tdStatus = document.createElement('p');

		const statusObj = {
			0: { text: 'На рассмотрении', style: '' },
			1: { text: 'В работе', style: 'green' },
			2: { text: 'Выполнено', style: 'green' },
			3: { text: 'Отклонено', style: 'red' },
		};

		// Добавляем классы
		row.className = 'appForm d-flex flex-column';
		container.className = 'title-container d-flex flex-row';
		tdTime.className = 'col-2 text-center';
		tdTitle.className = 'col-2 text-center';
		tdContent.className = 'col-6 text-center';
		tdStatus.className = `col-2 text-center status ${statusObj[app.status].style}`;

		// Добавляем атрибуты
		row.setAttribute('value', app.id);

		// Добавляем текст
		tdTime.innerText = app.date;
		tdTitle.innerText = app.title ? formContent(app.title, 50) : 'Темы нет';
		tdContent.innerText = formContent(app.content, 170);
		tdStatus.innerText = statusObj[app.status].text;

		// Собираем части в единую строку
		container.appendChild(tdTime);
		container.appendChild(tdTitle);
		container.appendChild(tdContent);
		container.appendChild(tdStatus);
		row.appendChild(container);

		return row;
	};
	/**
	 * Функция для создания и добавления содержимого аккордеона в строку таблицы.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Создаёт элементы для содержимого аккордеона.
	 * 2. Заполняет элементы текстовым содержимым.
	 * 3. Добавляет элементы в строку таблицы.
	 *
	 * @param {HTMLElement} row - Строка таблицы, в которую нужно добавить аккордеон.
	 */
	const createContent = async (row) => {
		const container = document.createElement('div');
		const appTextContainer = document.createElement('div');
		const appTextTitle = document.createElement('p');
		const appText = document.createElement('p');
		const appPersonContainer = document.createElement('div');
		const appPersonTitle = document.createElement('p');
		const appPerson = document.createElement('p');
		const appTimeTitle = document.createElement('p');
		const appTime = document.createElement('p');
		const appResponseContainer = document.createElement('div');
		const appResponseTitle = document.createElement('p');
		const appResponse = document.createElement('p');

		// Добавляем классы
		container.className = 'content-container d-flex flex-column row-gap-4';
		appTextContainer.className = 'd-flex flex-row align-items-center';
		appPersonContainer.className = 'd-flex flex-row align-items-center';
		appResponseContainer.className = 'd-flex flex-row align-items-center';
		appTextTitle.className = 'col-2';
		appPersonTitle.className = 'col-2';
		appTimeTitle.className = 'col-2';
		appResponseTitle.className = 'col-2';
		appText.className = 'col-9';
		appPerson.className = 'col-2';
		appTime.className = 'col-3';
		appResponse.className = 'col-9';

		// Добавляем текст
		appTextTitle.innerText = 'Текст:';
		appPersonTitle.innerText = 'Ответственный:';
		appTimeTitle.innerText = 'Дата:';
		appResponseTitle.innerText = 'Ответ:';
		appText.innerText = apps.filter((obj) => obj.id === +row.getAttribute('value'))[0].content;
		appPerson.innerText = 'Отсутствует';
		appTime.innerText = 'Отсутствует';
		appResponse.innerText = 'Отсутствует';
		if (row.querySelector('.status').textContent !== 'На рассмотрении') {
			const response = await getResponse(+row.getAttribute('value'));
			const person = await getResponsiblePersonForResponse(response['user_id']);
			appPerson.innerText = person.login;
			appTime.innerText = response.date;
			appResponse.innerText = response.response === '' ? 'Отсутствует' : response.response;
		}

		// Собираем части в единую строку
		appTextContainer.appendChild(appTextTitle);
		appTextContainer.appendChild(appText);
		appPersonContainer.appendChild(appPersonTitle);
		appPersonContainer.appendChild(appPerson);
		appPersonContainer.appendChild(appTimeTitle);
		appPersonContainer.appendChild(appTime);
		appResponseContainer.appendChild(appResponseTitle);
		appResponseContainer.appendChild(appResponse);
		container.appendChild(appTextContainer);
		container.appendChild(appPersonContainer);
		container.appendChild(appResponseContainer);
		row.appendChild(container);
	};
	/**
	 * Функция для ограничения длины текста и добавления многоточия при необходимости.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Проверяет длину входного текста.
	 * 2. Если длина текста превышает установленный лимит, обрезает текст до лимита и добавляет многоточие.
	 * 3. Если длина текста не превышает лимит, возвращает текст без изменений.
	 *
	 * @param {string} text - Текст, который нужно обработать.
	 * @param {number} limit - Максимальная длина текста.
	 *
	 * @returns {string} Возвращает обработанный текст, который либо обрезан с многоточием, либо остается неизменным.
	 */
	const formContent = (text, limit) => {
		return text.length > limit ? text.substring(0, limit) + '...' : text; // (Тоже тернарный оператор)
	};
	/**
	 * Функция для форматирования текущей даты и времени в строку формата 'YYYY-MM-DD HH:MM:SS'.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Создает новый объект Date, представляющий текущую дату и время.
	 * 2. Извлекает год, месяц, день, часы, минуты и секунды из объекта Date.
	 * 3. Форматирует каждый компонент даты и времени, добавляя ведущие нули при необходимости.
	 * 4. Объединяет компоненты в строку формата 'YYYY-MM-DD HH:MM:SS' и возвращает её.
	 *
	 * @returns {string} Возвращает строку с текущей датой и временем в формате 'YYYY-MM-DD HH:MM:SS'.
	 */
	const formatDate = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы идут от 0 до 11, поэтому нужно добавить 1
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	};


	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	let { apps } = await getApplications();
	addEventSend();
	drowTable();
});
