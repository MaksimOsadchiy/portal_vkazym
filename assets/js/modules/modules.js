document.addEventListener('DOMContentLoaded', async () => {
	/**
	 * Получает список микросервисов с сервера.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Отправляет запрос на сервер для получения данных о микросервисах.
	 * 2. Ожидает ответа и преобразует его в формат JSON.
	 * 3. Проверяет статус ответа. Если статус ответа не OK, выбрасывает ошибку с кодом статуса из ответа.
	 * 4. В случае успешного получения данных, возвращает полученный JSON.
	 * 5. В случае ошибки, выводит ошибку в консоль, генерирует событие `updateError` с сообщением об ошибке и возвращает пустой массив.
	 *
	 * @returns {Array<Record<string, any>>} - Возвращает промис, который резолвится в массив микросервисов.
	 */
	const getMicroservices = async () => {
		try {
			const response = await fetch(`${SERVER_URL}microservices.php`);
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
	 * Отображает доступные модули в виде кнопок на странице, основываясь на привилегиях пользователя и текущем модуле.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент с классом `row-modules` для добавления кнопок.
	 * 2. Получает имя текущей страницы из URL.
	 * 3. Определяет название модуля, соответствующее текущей странице или альтернативной странице 'oneCrane.php'.
	 * 4. Извлекает уровень привилегий пользователя для найденного модуля.
	 * 5. Очищает содержимое контейнера для модулей.
	 * 6. Добавляет кнопку для главной страницы.
	 * 7. В зависимости от роли пользователя:
	 *    - Для администраторов (роль с id 2) добавляет кнопки для всех модулей с тем же названием, что и у текущего модуля.
	 *    - Для обычных пользователей добавляет кнопки для модулей с тем же названием, что и у текущего модуля, при условии, что их привилегии не превышают привилегии текущего модуля.
	 *
	 * @param {Array<Record<string, any>>} modules - Массив объектов, представляющих модули. Каждый объект содержит свойства `color`, `link`, `description`, `name` и `privilege`.
	 *
	 * @returns {void}
	 */
	const drawApps = (modules) => {
		const bodyTable = document.querySelector('.row-modules');
		const pathList = new URL(window.location.href).pathname.split("/");
		const namePage = pathList[pathList.length - 1];
		let moduleName = modules.find((obj) => obj.link === namePage)?.name;
		if (moduleName === undefined && namePage === 'oneCrane.php') moduleName = modules.find((obj) => obj.link === 'allCranes.php').name;
		const userPrivilegeThisModule = SESSION.accessibility.find((obj) => obj.name === moduleName)?.privilege;
		bodyTable.innerText = '';
		bodyTable.appendChild(createApps('blue', 'index.php', 'Главная'));
		if (SESSION.accessibility[0].id_role === 2) {
			modules.forEach((value) => {
				if (namePage === value.link) return;
				if (moduleName !== value.name) return;
				const row = createApps(value.color, value.link, value.description);
				bodyTable.appendChild(row);
			});
		} else {
			modules.forEach((value) => {
				if (namePage === value.link) return;
				if (moduleName !== value.name) return;
				if (userPrivilegeThisModule < value.privilege || userPrivilegeThisModule === undefined) return;
				const row = createApps(value.color, value.link, value.description);
				bodyTable.appendChild(row);
			});
		};
	};
	/**
	 * Создаёт элемент приложения с заданным стилем, ссылкой и текстом.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Создаёт элемент `div` с классом `col-2`, который будет содержать кнопку приложения.
	 * 2. Создаёт элемент `a` для кнопки приложения, задаёт ему класс `btn btn-custom link` и атрибут `href` со ссылкой.
	 * 3. Устанавливает текст кнопки.
	 * 4. Добавляет кнопку в созданный `div`.
	 * 5. Возвращает `div` с кнопкой приложения.
	 *
	 * @param {string} color - Не используется в текущей версии функции, но может быть предназначен для дальнейшего использования.
	 * @param {string} link - Ссылка, на которую будет вести кнопка.
	 * @param {string} text - Текст, который будет отображаться на кнопке.
	 *
	 * @returns {HTMLElement} Возвращает элемент `div` с кнопкой приложения внутри.
	 */
	const createApps = (color, link, text) => {
		const divCol3 = document.createElement('div');
		const buttonApp = document.createElement('a');

		divCol3.className = 'col-2';
		buttonApp.className = 'btn btn-custom link';

		buttonApp.setAttribute('href', link);

		buttonApp.innerText = text;

		divCol3.appendChild(buttonApp);
		return divCol3;
	}


	//
	const allModules = await getMicroservices();
	drawApps(allModules);
});