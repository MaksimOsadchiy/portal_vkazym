document.addEventListener('DOMContentLoaded', () => {
	/**
	* Функция сохраняет данные о сервисе, отправляя их на сервер и обновляет таблицу.
	* 
	* @param {HTMLElement} elem - Элемент, содержащий введенные данные.
	* @param {string} query - Метод запроса ('PUT' или 'POST').
	* @param {HTMLElement} bodyTable - Тело таблицы, в которую вставляется новая строка.
	* @param {HTMLElement} oldRow - Старая строка, которую необходимо заменить.
	* 
	*/
	const savePerson = async (elem, query, bodyTable, oldRow) => {
		// Получаем введёные значения
		const lastname = elem.querySelector('.lastname').value;
		const firstname = elem.querySelector('.firstname').value;
		const patronymic = elem.querySelector('.patronymic').value;
		const phone = elem.querySelector('.phone-number').value;
		const idService =  SESSION['service'];		// Получаем id сервиса, потом переделать на fetch ???
		
		if (lastname && firstname && patronymic && phone){		// Проверка введёных данных
			const request = {		// Формируем тело запроса 
				'lastname': lastname,
				'firstname': firstname,
				'patronymic': patronymic,
				'phone': phone,
				'idService': idService,
			};
			// админ, 
			// 0 - пользов.
			// 1 - адмни
			// в технике 
			// 0 - не может зайти
			// 1 - может заказывать
			// 2 - может согласовывать
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
				const resRow = createDefaultRow(jsonResponse.id, lastname, firstname, patronymic, phone, );		// Создаём обычную строку в таблицу
				const newElem = {
					'id': jsonResponse.id,
					'route_to': nameDir,
					'service_id': idService,
				};
				routes = routes.some((obj) => obj.id === jsonResponse.id)
					? routes.map((obj) => obj.id === jsonResponse.id ? newElem : obj)
					: [...routes, newElem];

				addEventEditService(resRow);		// Вешаем на кнопку в новой строке слушатель
				bodyTable.replaceChild(resRow, oldRow);		// Заменяем строку с инпутами новой обычной строкой
				query === 'POST' && (document.querySelector('.add-person').innerText = 'Добавить');
			} catch(error) {
				document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			}
		};
	};
	/**
	* Функция создает строку таблицы с кнопкой "Редактировать" с заданными данными.
	* 
	*	<tr class="appForm" value="ID">
	*		<td>"Например ДЛО"</td>
	*		<td>"Например АиМО"</td>
	*		<td>
	*			<button type="button" class="btn btn-secondary edit-service-btn">Редактировать</button>
	*		</td>
	*	</tr>
	* 
	* @param {number} id - Идентификатор записи.
	* @param {string} dir - Название направления.
	* @param {string} service - Название сервиса.
	* @returns {HTMLElement} Созданная строка таблицы.
	* 
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
	* Функция создает строку таблицы с кнопкой "Сохранить" с заданными данными.
	*
	*	<tr class="appForm new-person" value="ID">
	*		<td>
	*			<input type="text" class="form-control name-dir">
	*		</td>
	*		<td>
	*			<input type="text" class="form-control name-service">
	*		</td>
	*		<td>
	*			<button type="button" class="btn btn-secondary save-new-person-btn">Сохранить</button>
	*		</td>
	*	</tr>
	* 
	* @param {string} dir - Название направления.
	* @param {string} service - Название сервиса.
	* @param {number} id - Идентификатор записи, по умолчанию '-1'.
	* @returns {HTMLElement} Созданная строка таблицы.
	* 
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
		row.className = 'appForm new-person';
		dirInput.className = 'form-control name-dir';
		serviceInput.className = 'form-control name-service';
		button.className = 'btn btn-secondary save-new-person-btn';

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
	* Функция добавляет обработчик события на кнопку добавления новой записи.
	* 
	* При клике на кнопку "Добавить" проверяется, не существует ли уже 
	* строки для ввода новой записи. Если такой строки нет, создается новая строка
	* для ввода данных, добавляется обработчик события на кнопку сохранения, и строка
	* добавляется в тело таблицы.
	* 
	*/
	const addEventEntry = () => {
		const btnAddPerson = document.querySelector('.add-person');
		btnAddPerson.addEventListener('click', () => {
			const bodyTable = document.querySelector('.table-persons').querySelector('tbody');
			if (!bodyTable.querySelector('.new-person')) {
				btnAddPerson.innerText="Отменить";
				const newRow = createInputRow('', '');
				newRow.classList.add('tempClass');
				newRow.querySelector('.save-new-person-btn').addEventListener('click', async () => await savePerson(bodyTable, 'POST', bodyTable, newRow));
				bodyTable.appendChild(newRow);
			} else if (bodyTable.querySelector('.tempClass')) {
				btnAddPerson.innerText="Добавить";
				bodyTable.removeChild(bodyTable.lastChild);
			};
		});
	};
	/**
	* Функция добавляет обработчик события на кнопку редактирования сервиса в указанной строке.
	* 
	* При клике на кнопку "Редактировать" строка заменяется на строку с
	* полями ввода с текущими значениями. Добавляется обработчик события на кнопку
	* сохранения изменений, которая отправляет обновленные данные на сервер.
	* 
	* @param {HTMLElement} row - Строка таблицы, в которой содержиться кнопка, для которой добавляется обработчик события.
	*/
	const addEventEditService = (row) => {
		row.querySelector('.edit-service-btn').addEventListener('click', () => {
			const tdList = row.querySelectorAll('td');
			const newRow = createInputRow(tdList[0].textContent, tdList[1].textContent, row.getAttribute('value'));
			const bodyTable = document.querySelector('.table-persons').querySelector('tbody');
			if (!bodyTable.querySelector('.new-person')) {
				newRow.querySelector('.save-new-person-btn').addEventListener('click', async () => await savePerson(newRow, 'PUT', bodyTable, newRow));
				bodyTable.replaceChild(newRow, row);
			};
		});
	};
	/**
	* Функция добавляет обработчики событий на кнопки, связанные с открытием и закрытием модального окна.
	* 
	* При клике на одну из кнопок (закрытие окна или открытие окна) вызывает перерисовку
	* таблицы маршрутов и изменяет текст кнопки "Добавить".
	*/
	const addEventCloseWindow = () => {
		const btnClose = document.querySelector('.modal-footer').querySelector('.btnСlose');		// По идее можно убрать
		const btnCross = document.querySelector('.modal-header').querySelector('.btn-close');		// По идее можно убрать
		const btnOpenModalWindow = document.querySelector('.btn-open-modal-window');		// Оставить только это
		const arr = [btnClose, btnCross, btnOpenModalWindow];
		arr.forEach((btn) => {
			btn.addEventListener('click', () => {
				drowTableRoutes();
				const btnAddPerson = document.querySelector('.add-person');
				btnAddPerson.innerText="Добавить";
			});
		});
	};
	/**
	* Функция отображает таблицу маршрутов, заполняя ее строками с данными из массива маршрутов.
	* 
	* Для каждого маршрута создается строка таблицы с данными о маршруте и сервисе,
	* добавляется в таблицу, и для этой строки добавляется обработчик события на кнопку
	* редактирования.
	*/
	const drowTableRoutes = () => {
		const bodyTable = document.querySelector('.table-persons').querySelector('tbody');
		bodyTable.innerText = '';
		routes.forEach((route) => {
			const row = createDefaultRow(route.id, route['route_to'], serviceFullName.service);
			bodyTable.appendChild(row);
			addEventEditService(row);
		});
	};


	// Начало скрипта
	addEventEntry();
	drowTableRoutes();
	addEventCloseWindow();
});