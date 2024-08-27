document.addEventListener('DOMContentLoaded', async () => {
	/**
	 * Асинхронная функция для получения данных о модулях с сервера.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Отправляет HTTP GET запрос на получение данных о модулях.
	 * 2. Ожидает получения ответа и преобразует его в формат JSON.
	 * 3. Проверяет успешность ответа сервера (статус ответа `ok`). Если нет, выбрасывает ошибку с кодом статуса.
	 * 4. Возвращает данные о модулях в формате JSON.
	 * 5. В случае ошибки во время запроса или обработки ответа, выводит сообщение об ошибке в консоль и генерирует событие `updateError` с деталями ошибки.
	 * 6. Возвращает пустой массив в случае ошибки.
	 *
	 * @returns {Array<Record<string, any>>} Возвращает массив объектов, представляющих модули, или пустой массив в случае ошибки.
	 */
	const getModules = async () => {
		try {
			const response = await fetch(`${SERVER_URL}modules.php`);
			const jsonResponse = await response.json(); // Достаём тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			return jsonResponse;
		} catch (error) {
			console.log(error);
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			return [];
		}
	};
	/**
	 * Функция для выхода из системы.
	 *
	 * Функция перенаправляет пользователя на страницу выхода из системы.
	 *
	 * @returns {void}
	 */
	const logout = async () => {
		window.location.href = `${BASE_URL}logout.php`;
	};
	/**
	 * Рисует основной блок с сервисами и элементами навигации для авторизованных пользователей.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Проверяет, авторизован ли пользователь, используя `SESSION['id']`.
	 * 2. Если пользователь авторизован, создаёт элементы интерфейса:
	 *    - Ссылку для отображения имени пользователя и меню.
	 *    - Список с пунктами меню, доступными в зависимости от роли и прав пользователя.
	 *    - Добавляет ссылки для смены пользователя и выхода.
	 * 3. Добавляет созданные элементы на страницу.
	 * 4. Если пользователь не авторизован, заменяет содержимое контейнера на ссылку для входа.
	 *
	 * @returns {void}
	 */
	const drowMainServeces = () => {
		const container = document.querySelector('.list-references');
		if (SESSION['id']) {
			const loginBlock = document.createElement('a');
			const listContainer = document.createElement('ul');
			const dividingLine = document.createElement('li');
			const line = document.createElement('hr');

			loginBlock.classList = 'nav-link dropdown-toggle';
			listContainer.classList = 'dropdown-menu';
			line.classList = 'dropdown-divider';

			loginBlock.setAttribute('href', '#');
			loginBlock.setAttribute('id', 'navbarDropdown');
			loginBlock.setAttribute('role', 'button');
			loginBlock.setAttribute('data-bs-toggle', 'dropdown');
			loginBlock.setAttribute('aria-expanded', 'false');
			listContainer.setAttribute('aria-labelledby', 'navbarDropdown');

			loginBlock.innerText = SESSION.login;
			let listLiElemetns = [];

			if (SESSION.accessibility[0].id_role === 2) {
				listLiElemetns = allModules.map((obj) => createRow(obj))
			} else {
				listLiElemetns = allModules
					.map((obj) => {
						if (!SESSION.accessibility.some((elem) => elem.name === obj.name)) return;
						if (SESSION.accessibility.some((elem) => elem.name === obj.name && elem.privilege < 1)) return;
						return createRow(obj);
					})
					.filter((elem) => elem !== undefined);
			};


			listLiElemetns = [...listLiElemetns, createRow({ style: 'change-user', link: 'log.php', description: 'Сменить пользователя' })];
			listLiElemetns = [...listLiElemetns, createRow({ style: 'btn-exit', link: '#', description: 'Выйти' })];

			dividingLine.appendChild(line);
			listLiElemetns.forEach((elem, index) => {
				if (index === listLiElemetns.length - 1) {
					listContainer.appendChild(dividingLine);
				}
				listContainer.appendChild(elem);
			});
			container.appendChild(loginBlock);
			container.appendChild(listContainer);
			addEventExitBtn(listContainer);
		} else {
			const component = `<li class="nav-item">
							<a class="nav-link" href="${BASE_URL}log.php">Вход</a>
						</li>`;
			container.innerHTML = component;
		}
	};
	/**
	 * Создаёт элемент списка для меню.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Создаёт элемент списка (`<li>`).
	 * 2. Создаёт ссылку (`<a>`) и настраивает её:
	 *    - Устанавливает классы для ссылки, включая возможный дополнительный стиль из объекта `obj`.
	 *    - Устанавливает атрибут `href` с URL из объекта `obj`.
	 *    - Устанавливает текст ссылки из объекта `obj`.
	 * 3. Добавляет ссылку в элемент списка.
	 * 4. Возвращает элемент списка.
	 *
	 * @param {Object} obj - Объект с данными для создания строки меню.
	 * @param {string} obj.style - Дополнительные классы для стилизации ссылки.
	 * @param {string} obj.link - URL, на который ведёт ссылка.
	 * @param {string} obj.description - Текст, отображаемый в ссылке.
	 *
	 * @returns {HTMLLIElement} - Элемент списка (`<li>`) с вложенной ссылкой (`<a>`).
	 */
	const createRow = (obj) => {
		const liContainer = document.createElement('li');
		const link = document.createElement('a');

		link.classList = `dropdown-item ${obj.style}`;

		link.setAttribute('href', obj.link);

		link.innerText = obj.description;
		liContainer.appendChild(link);
		return liContainer;
	};
	/**
	 * Добавляет обработчик события клика на кнопку выхода.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит кнопку выхода (`.btn-exit`) в переданном элементе списка.
	 * 2. Добавляет обработчик события `click` на кнопку.
	 * 3. При клике на кнопку вызывает асинхронную функцию `logout`, чтобы выполнить выход пользователя.
	 *
	 * @param {HTMLElement} list - Элемент списка, содержащий кнопку выхода.
	 *
	 * @returns {void}
	 */
	const addEventExitBtn = (list) => {
		const btnExit = list.querySelector('.btn-exit');
		btnExit.addEventListener('click', async () => await logout());
	};


	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	const allModules = await getModules();
	drowMainServeces(allModules);
});
