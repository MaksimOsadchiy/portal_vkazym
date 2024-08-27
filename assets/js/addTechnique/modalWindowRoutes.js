document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Асинхронная функция для сохранения или обновления данных сервиса и маршрута на сервере.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Извлекает введённые значения из элементов формы: название направления (`nameDir`) и название сервиса (`nameService`).
	 * 2. Получает идентификатор сервиса (`idService`) из сессии.
	 * 3. Проверяет, что все обязательные поля формы заполнены. Если поля пусты, функция генерирует событие с ошибкой.
	 * 4. Формирует тело запроса, включая `route_to` (название направления) и `service_id` (идентификатор сервиса). Если используется метод `PUT`, добавляет идентификатор элемента, который нужно обновить.
	 * 5. Отправляет запрос на сервер с использованием метода `fetch` и заданного HTTP метода (`POST` или `PUT`).
	 * 6. Обрабатывает ответ от сервера:
	 *    - Преобразует ответ в формат JSON.
	 *    - Проверяет успешность ответа. Если ответ не успешен, выбрасывает ошибку с кодом статуса.
	 * 7. Создаёт новую строку таблицы с обновлёнными данными с помощью функции `createDefaultRow`.
	 * 8. Обновляет массив `routes`, добавляя новый элемент или заменяя существующий, и обновляет данные на странице с помощью функции `updateData`.
	 * 9. Добавляет обработчик событий для кнопки редактирования в новой строке.
	 * 10. Заменяет старую строку формы с инпутами на новую строку с данными.
	 * 11. Если метод запроса `POST`, обновляет текст кнопки добавления записи на "Добавить запись".
	 * 12. В случае ошибки во время запроса или обработки ответа, создаёт и диспатчит событие `updateError` с деталями ошибки.
	 *
	 * @param {HTMLElement} elem - Элемент формы, содержащий данные, которые нужно сохранить или обновить. Это должно быть DOM-элемент, содержащий инпуты для названия направления и названия сервиса.
	 * @param {string} query - Метод HTTP-запроса (`'POST'` для создания или `'PUT'` для обновления).
	 * @param {HTMLElement} bodyTable - Контейнер таблицы, в котором будет заменён ряд с инпутами на новый ряд с данными.
	 * @param {HTMLElement} oldRow - Старая строка таблицы, которая будет заменена новой строкой с данными.
	 *
	 * @returns {void}
	 */
	const saveService = async (elem, query, bodyTable, oldRow) => {
		// Получаем введёные значения
		const nameDir = elem.querySelector('.name-dir').value.trim();
		const nameService = elem.querySelector('.name-service').value.trim();

		const idService =  SESSION['service'];		// Получаем id введённого сервиса, потом переделать на fetch ???
		
		if (nameDir && nameService){		// Проверка введёных данных
			const request = {		// Формируем тело запроса 
				'route_to': nameDir,
				'service_id': idService,
			};
			query === 'PUT' && (request.id = +elem.getAttribute('value'));		// Если метод 'PUT', то добавляем в тело id изменяемого элемента
			try {
				const response = await fetch(`${SERVER_URL}itinerary.php`, {
					method: query,
					headers: {
						'Content-Type': 'application/json',
						},
					body: JSON.stringify(request),
				});
				const jsonResponse = await response.json();		// Получаем тело ответа
				if (!response.ok) {
					throw new Error(jsonResponse.status);
				};
				const resRow = createDefaultRow(+jsonResponse.id, nameDir, nameService);		// Создаём обычную строку в таблицу
				const newElem = {
					'id': +jsonResponse.id,
					'route_to': nameDir,
					'service_id': idService,
				};

				routes = routes.some((obj) => obj.id === jsonResponse.id)
					? routes.map((obj) => obj.id === jsonResponse.id ? newElem : obj)
					: [...routes, newElem];
				updateData();

				addEventEditService(resRow);		// Вешаем на кнопку в новой строке слушатель
				bodyTable.replaceChild(resRow, oldRow);		// Заменяем строку с инпутами новой обычной строкой
				query === 'POST' && (document.querySelector('.add-entry').innerText = 'Добавить запись');
			} catch(error) {
				document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			}
		} else {
			document.dispatchEvent(new CustomEvent('updateError', { detail: "Поля должны быть заполнены!" }));
		}
	};
	/**
	 * Создаёт строку таблицы с данными о сервисе и кнопкой редактирования.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Создаёт DOM-элементы для строки таблицы и её ячеек.
	 * 2. Заполняет ячейки данными о сервисе и добавляет кнопку редактирования.
	 * 3. Устанавливает классы и атрибуты для созданных элементов.
	 * 4. Добавляет текстовое содержимое в ячейки и кнопку.
	 * 5. Собирает все элементы в строку таблицы.
	 *
	 * @param {number} id - Идентификатор сервиса, который будет установлен как значение атрибута `value` строки таблицы.
	 * @param {string} dir - Название направления, которое будет отображаться в первой ячейке строки таблицы.
	 * @param {string} service - Название сервиса, которое будет отображаться во второй ячейке строки таблицы.
	 *
	 * @returns {HTMLTableRowElement} Возвращает элемент `<tr>`, представляющий собой строку таблицы с данными о сервисе и кнопкой редактирования.
	 */
	const createDefaultRow = (id, dir, service) => {
		// Создаём DOM элементы
		const row = document.createElement('tr');
		const tdDir = document.createElement('td');
		const tdService = document.createElement('td');
		const tdBtnContainer = document.createElement('td');
		const button = document.createElement('button');

		// Добавляем классы
		row.className = 'appForm';
		button.className = 'btn btn-secondary edit-service-btn';

		// Добавляем атрибуты
		row.setAttribute('value', id);
		button.setAttribute('type', 'button');

		// Добавляем текст
		tdDir.innerText = dir;
		tdService.innerText = service;
		button.innerText = "Редактировать";

		// Собираем части в единую строку
		tdBtnContainer.appendChild(button);
		row.appendChild(tdDir);
		row.appendChild(tdService);
		row.appendChild(tdBtnContainer);

		return row;
	};
	/**
	 * Создаёт строку таблицы с полями ввода для редактирования данных о сервисе и кнопкой сохранения.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Создаёт DOM-элементы для строки таблицы и её ячеек, включая поля ввода и кнопку.
	 * 2. Заполняет поля ввода значениями, если они предоставлены.
	 * 3. Устанавливает классы и атрибуты для созданных элементов.
	 * 4. Добавляет текстовое содержимое для кнопки.
	 * 5. Собирает все элементы в строку таблицы.
	 *
	 * @param {string} dir - Название направления, которое будет установлено как значение поля ввода для направления.
	 * @param {string} service - Название сервиса, которое будет установлено как значение поля ввода для сервиса.
	 * @param {number} [id=-1] - Идентификатор записи. Значение по умолчанию -1 указывает на новый элемент.
	 *
	 * @returns {HTMLTableRowElement} Возвращает элемент `<tr>`, представляющий собой строку таблицы с полями ввода и кнопкой сохранения.
	 */
	const createInputRow = (dir, service, id = -1) => {
		// Создаём DOM элементы
		const row = document.createElement('tr');
		const tdDirContainer = document.createElement('td');
		const tdServiceContainer = document.createElement('td');
		const tdBtnContainer = document.createElement('td');
		const dirInput = document.createElement('input');
		const serviceInput = document.createElement('input');
		const button = document.createElement('button');

		// Добавляем классы
		row.className = 'appForm new-service';
		dirInput.className = 'form-control name-dir';
		serviceInput.className = 'form-control name-service';
		button.className = 'btn btn-secondary save-new-service-btn';

		// Добавляем атрибуты
		row.setAttribute('value', id);
		dirInput.setAttribute('type', 'text');
		serviceInput.setAttribute('type', 'text');
		button.setAttribute('type', 'button');

		// Добавляем текст
		dirInput.value = dir;
		serviceInput.value = service;
		button.innerText = "Сохранить";

		// Собираем части в единую строку
		tdDirContainer.appendChild(dirInput);
		tdServiceContainer.appendChild(serviceInput);
		tdBtnContainer.appendChild(button);
		row.appendChild(tdDirContainer);
		row.appendChild(tdServiceContainer);
		row.appendChild(tdBtnContainer);

		return row;
	}
	/**
	 * Добавляет обработчик события для кнопки добавления записи.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит кнопку добавления записи по классу `.add-entry`.
	 * 2. При клике на кнопку проверяет, существует ли в таблице уже строка с полями ввода для новой записи.
	 *    - Если строка с полями ввода отсутствует, функция:
	 *      - Изменяет текст кнопки на "Отменить".
	 *      - Создаёт новую строку таблицы с полями ввода, используя функцию `createInputRow`.
	 *      - Добавляет класс `tempClass` для стилизации или идентификации новой строки.
	 *      - Добавляет обработчик события для кнопки сохранения в новой строке, который вызывает функцию `saveService` для сохранения новой записи.
	 *      - Добавляет новую строку в таблицу.
	 *    - Если строка с полями ввода уже существует, функция:
	 *      - Изменяет текст кнопки на "Добавить запись".
	 *      - Удаляет последнюю строку таблицы (предполагается, что это временная строка для ввода данных).
	 *
	 * @returns {void}
	 */
	const addEventEntry = () => {
		const btnEntry = document.querySelector('.add-entry');
		btnEntry.addEventListener('click', () => {
			const bodyTable = document.querySelector('.table-users').querySelector('tbody');
			if (!bodyTable.querySelector('.new-service')) {
				btnEntry.innerText="Отменить";
				const newRow = createInputRow('', '');
				newRow.classList.add('tempClass');
				newRow.querySelector('.save-new-service-btn').addEventListener('click', async () => await saveService(bodyTable, 'POST', bodyTable, newRow));
				bodyTable.appendChild(newRow);
			} else if (bodyTable.querySelector('.tempClass')) {
				btnEntry.innerText="Добавить запись";
				bodyTable.removeChild(bodyTable.lastChild);
			};
		});
	};
	/**
	 * Добавляет обработчик события для кнопки редактирования записи.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит кнопку редактирования в указанной строке `row` по классу `.edit-service-btn`.
	 * 2. При клике на кнопку:
	 *    - Получает все ячейки (`<td>`) из строки `row`, чтобы извлечь значения для полей редактируемой записи.
	 *    - Создаёт новую строку с полями ввода, используя функцию `createInputRow`, с заполненными значениями из текущей строки и идентификатором записи (`id`).
	 *    - Находит тело таблицы по классу `.table-users` и выбирает её `<tbody>`.
	 *    - Проверяет, существует ли в таблице уже строка для ввода новой записи (`.new-service`).
	 *      - Если строки для ввода нет, добавляет обработчик события для кнопки сохранения в новой строке, который вызывает функцию `saveService` с методом `'PUT'`, чтобы обновить существующую запись.
	 *      - Заменяет старую строку с данными (редактируемую) на новую строку с полями ввода.
	 *
	 * @param {HTMLTableRowElement} row - Строка таблицы, содержащая кнопку редактирования и данные для редактируемой записи.
	 * @returns {void}
	 */
	const addEventEditService = (row) => {
		row.querySelector('.edit-service-btn').addEventListener('click', () => {
			const tdList = row.querySelectorAll('td');
			const newRow = createInputRow(tdList[0].textContent, tdList[1].textContent, row.getAttribute('value'));
			const bodyTable = document.querySelector('.table-users').querySelector('tbody');
			if (!bodyTable.querySelector('.new-service')) {
				newRow.querySelector('.save-new-service-btn').addEventListener('click', async () => await saveService(newRow, 'PUT', bodyTable, newRow));
				bodyTable.replaceChild(newRow, row);
			};
		});
	};
	/**
	 * Добавляет обработчик события для кнопки открытия модального окна.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит кнопку, открывающую модальное окно, по классу `.btn-open-modal-window-services`.
	 * 2. При клике на эту кнопку:
	 *    - Вызывает функцию `drowTableRoutes`, чтобы отобразить таблицу маршрутов.
	 *    - Находит кнопку добавления записи в таблице по классу `.add-entry`.
	 *    - Устанавливает текст кнопки добавления записи на "Добавить запись", чтобы пользователь мог добавить новую запись.
	 *
	 * @returns {void}
	 */
	const addEventOpenWindow = () => {
		const btnOpenModalWindow = document.querySelector('.btn-open-modal-window-services');
		btnOpenModalWindow.addEventListener('click', () => {
			drowTableRoutes();
			const btnEntry = document.querySelector('.add-entry');
			btnEntry.innerText="Добавить запись";
		});
	};
	/**
	 * Отображает таблицу маршрутов в модальном окне.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит тело таблицы, где будут отображаться маршруты, используя классы `.table-users` и `tbody`.
	 * 2. Очищает текущее содержимое тела таблицы, устанавливая его текстовое содержимое в пустую строку.
	 * 3. Проходит по каждому маршруту в массиве `routes` и для каждого маршрута:
	 *    - Создаёт строку таблицы с помощью функции `createDefaultRow`, передавая данные маршрута.
	 *    - Добавляет созданную строку в тело таблицы.
	 *    - Добавляет обработчик события для кнопки редактирования в новой строке, вызывая функцию `addEventEditService`.
	 *
	 * @returns {void}
	 */
	const drowTableRoutes = () => {
		const bodyTable = document.querySelector('.table-users').querySelector('tbody');
		bodyTable.innerText = '';
		routes.forEach((route) => {
			const row = createDefaultRow(route.id, route['route_to'], serviceFullName.service);
			bodyTable.appendChild(row);
			addEventEditService(row);
		});
	};
	/**
	 * Обновляет элементы выбора маршрутов на странице.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент выбора маршрутов по классу `.route-select`.
	 * 2. Очищает текущие опции в элементе выбора, устанавливая только одну пустую опцию по умолчанию.
	 * 3. Проходит по каждому маршруту в массиве `routes` и для каждого маршрута:
	 *    - Создаёт новый элемент `<option>`.
	 *    - Устанавливает значение элемента `<option>` равным идентификатору маршрута.
	 *    - Устанавливает текст элемента `<option>` равным маршруту.
	 *    - Добавляет элемент `<option>` в элемент выбора маршрутов.
	 *
	 * @returns {void} Не возвращает значений.
	 */
	const updateData = () => {
		const formSelect = document.querySelector('.route-select');
		formSelect.innerHTML = `<option value="" class="default-option"></option>`
		routes.forEach((route) => {
			const option = document.createElement('option');
			option.setAttribute('value', route['id']);
			option.innerText = route['route_to'];
			formSelect.appendChild(option);
		});
	};


	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	addEventEntry();
	addEventOpenWindow();
});