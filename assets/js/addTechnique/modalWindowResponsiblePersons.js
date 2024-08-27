document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Асинхронная функция, которая сохраняет данные о человеке, отправляя их на сервер, и обновляет таблицу с этими данными на странице.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Извлекает введённые значения из полей формы, таких как фамилия, имя, отчество, телефон и название службы.
	 * 2. Проверяет, заполнены ли обязательные поля. Если поля не заполнены, вызывает событие `updateError` с сообщением об ошибке.
	 * 3. Формирует тело запроса для отправки на сервер, добавляя идентификатор (`id`), если метод запроса - `PUT`.
	 * 4. Отправляет запрос на сервер с указанным методом (`query`) и телом запроса в формате JSON.
	 * 5. Получает ответ от сервера и преобразует его в JSON. Если запрос не успешен, выбрасывает ошибку с кодом статуса.
	 * 6. Создаёт новую строку таблицы с введёнными данными и добавляет её в массив `responsiblePersons`.
	 * 7. Обновляет данные на странице, добавляя обработчики событий для новой строки и заменяя старую строку с полями ввода на новую.
	 * 8. Если метод запроса был `POST`, сбрасывает текст кнопки на "Добавить".
	 * 9. В случае ошибки отправляет событие `updateError` с сообщением об ошибке.
	 *
	 * @param {HTMLElement} elem - HTML-элемент, содержащий форму для ввода данных о человеке.
	 * @param {string} query - Метод HTTP-запроса (`POST` или `PUT`), указывающий, следует ли создать новую запись или обновить существующую.
	 * @param {HTMLElement} bodyTable - HTML-элемент таблицы, в которой будут отображены данные.
	 * @param {HTMLElement} oldRow - HTML-элемент строки таблицы, которая будет заменена новой строкой с сохранёнными данными.
	 *
	 * @returns {void}
	 */
	const savePerson = async (elem, query, bodyTable, oldRow) => {
		// Получаем введёные значения
		const lastname = elem.querySelector('.lastname').value.trim();
		const firstname = elem.querySelector('.firstname').value.trim();
		const patronymic = elem.querySelector('.patronymic').value.trim();
		const phone = elem.querySelector('.phone').value.trim();
		const nameService = elem.querySelector('.service').value.trim();
		const idService =  SESSION['service'];		// Получаем id сервиса, потом переделать на fetch ???
		if (lastname && firstname && patronymic && phone){		// Проверка введёных данных
			const request = {		// Формируем тело запроса 
				'lastname': lastname,
				'firstname': firstname,
				'patronymic': patronymic,
				'phone_number': phone,
				'service_id': idService,
			};
			query === 'PUT' && (request.id = +elem.getAttribute('value'));		// Если метод 'PUT', то добавляем в тело id изменяемого элемента
			try {
				const response = await fetch(`${SERVER_URL}responsiblePersons.php`, {
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
				const resRow = createDefaultRow(+jsonResponse.id, lastname, firstname, patronymic, nameService, phone);		// Создаём обычную строку в таблицу
				const newElem = {
					'id': +jsonResponse.id,
					'firstname': firstname,
					'patronymic': patronymic,
					'lastname': lastname,
					'service_id': idService,
					'phone_number': phone,
				};
				responsiblePersons = responsiblePersons.some((obj) => obj.id === jsonResponse.id)
					? responsiblePersons.map((obj) => obj.id === jsonResponse.id ? newElem : obj)
					: [...responsiblePersons, newElem];
				updateData();

				addEventEditPerson(resRow);		// Вешаем на кнопку в новой строке слушатель
				bodyTable.replaceChild(resRow, oldRow);		// Заменяем строку с инпутами новой обычной строкой
				query === 'POST' && (document.querySelector('.add-person').innerText = 'Добавить');
			} catch(error) {
				document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			};
		} else {
			document.dispatchEvent(new CustomEvent('updateError', { detail: "Поля должны быть заполнены!" }));
		}
	};
	/**
	 * Функция, которая создаёт и возвращает строку таблицы (`<tr>`), содержащую данные о человеке и кнопку для редактирования.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Создаёт DOM-элементы (`<tr>`, `<td>`, `<button>`).
	 * 2. Добавляет классы к элементам для стилизации.
	 * 3. Устанавливает необходимые атрибуты для строки и кнопки.
	 * 4. Заполняет ячейки таблицы переданными данными (фамилия, имя, отчество, служба, телефон).
	 * 5. Добавляет текст "Редактировать" на кнопку.
	 * 6. Собирает все ячейки в одну строку и добавляет кнопку в последнюю ячейку.
	 * 7. Возвращает готовую строку таблицы.
	 *
	 * @param {number} id - Идентификатор человека, который будет использоваться для установки атрибута строки.
	 * @param {string} lastname - Фамилия человека, которая будет отображена в первой ячейке.
	 * @param {string} firstname - Имя человека, которое будет отображено во второй ячейке.
	 * @param {string} patronymic - Отчество человека, которое будет отображено в третьей ячейке.
	 * @param {string} service - Название службы, которое будет отображено в четвёртой ячейке.
	 * @param {string} phone - Телефонный номер, который будет отображен в пятой ячейке.
	 *
	 * @returns {HTMLElement} DOM-элемент `<tr>`, представляющий строку таблицы с данными о человеке и кнопкой для редактирования.
	 */
	const createDefaultRow = (id, lastname, firstname, patronymic, service, phone) => {
		// Создаём DOM элементы
		const row = document.createElement('tr');
		const tdLastname = document.createElement('td');
		const tdFirstname = document.createElement('td');
		const tdPatronymic = document.createElement('td');
		const tdService = document.createElement('td');
		const tdPhone = document.createElement('td');
		const tdBtnContainer = document.createElement('td');
		const button = document.createElement('button');

		// Добавляем классы
		row.className = 'appForm';
		button.className = 'btn btn-secondary edit-person-btn';

		// Добавляем атрибуты
		row.setAttribute('value', id);
		button.setAttribute('type', 'button');

		// Добавляем текст
		tdLastname.innerText = lastname;
		tdFirstname.innerText = firstname;
		tdPatronymic.innerText = patronymic;
		tdService.innerText = service;
		tdPhone.innerText = phone;
		button.innerText = "Редактировать";

		// Собираем части в единую строку
		tdBtnContainer.appendChild(button);
		row.appendChild(tdLastname);
		row.appendChild(tdFirstname);
		row.appendChild(tdPatronymic);
		row.appendChild(tdService);
		row.appendChild(tdPhone);
		row.appendChild(tdBtnContainer);

		return row;
	};
	/**
	 * Функция, которая создаёт строку таблицы с полями ввода для данных о человеке.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Создаёт строку таблицы (`<tr>`) и необходимые ячейки (`<td>`) для каждого поля.
	 * 2. В каждой ячейке создаётся соответствующий элемент `<input>` для ввода данных: фамилия, имя, отчество, служба и телефон.
	 * 3. Создаёт кнопку "Сохранить" и добавляет её в последнюю ячейку строки.
	 * 4. Присваивает созданным элементам соответствующие классы и атрибуты, включая ID строки и типы для полей ввода.
	 * 5. Устанавливает значения полей ввода, если они были переданы в функцию.
	 * 6. Собирает и возвращает готовую строку таблицы, содержащую поля ввода и кнопку.
	 *
	 * @param {number} [id=-1] - Идентификатор строки, используется для идентификации элемента. По умолчанию равен -1, если не передан.
	 * @param {string} [lastname=''] - Фамилия для предзаполнения поля ввода. По умолчанию пустая строка.
	 * @param {string} [firstname=''] - Имя для предзаполнения поля ввода. По умолчанию пустая строка.
	 * @param {string} [patronymic=''] - Отчество для предзаполнения поля ввода. По умолчанию пустая строка.
	 * @param {string} [service=''] - Название службы для предзаполнения поля ввода. По умолчанию пустая строка.
	 * @param {string} [phone=''] - Номер телефона для предзаполнения поля ввода. По умолчанию пустая строка.
	 *
	 * @returns {HTMLElement} Возвращает HTML-элемент строки таблицы (`<tr>`), содержащей поля ввода для данных о человеке и кнопку "Сохранить".
	 */
	const createInputRow = (id = -1, lastname = '', firstname = '', patronymic = '', service = '', phone = '') => {
		// Создаём DOM элементы
		const row = document.createElement('tr');
		// Контейнеры для инпутов
		const tdLastnameContainer = document.createElement('td');
		const tdFirstnameContainer = document.createElement('td');
		const tdPatronymicContainer = document.createElement('td');
		const tdServiceContainer = document.createElement('td');
		const tdPhoneContainer = document.createElement('td');
		const tdBtnContainer = document.createElement('td');
		// Инпуты
		const lastnameInput = document.createElement('input');
		const firstnameInput = document.createElement('input');
		const patronymicInput = document.createElement('input');
		const serviceInput = document.createElement('input');
		const phoneInput = document.createElement('input');
		const button = document.createElement('button');

		// Добавляем классы
		row.className = 'appForm new-person';
		lastnameInput.className = 'form-control lastname';
		firstnameInput.className = 'form-control firstname';
		patronymicInput.className = 'form-control patronymic';
		serviceInput.className = 'form-control service';
		phoneInput.className = 'form-control phone';
		button.className = 'btn btn-secondary save-new-person-btn';

		// Добавляем атрибуты
		row.setAttribute('value', id);
		lastnameInput.setAttribute('type', 'text');
		firstnameInput.setAttribute('type', 'text');
		patronymicInput.setAttribute('type', 'text');
		serviceInput.setAttribute('type', 'text');
		phoneInput.setAttribute('type', 'text');
		button.setAttribute('type', 'button');

		// Добавляем текст
		lastnameInput.value = lastname;
		firstnameInput.value = firstname;
		patronymicInput.value = patronymic;
		serviceInput.value = service;
		phoneInput.value = phone;
		button.innerText = "Сохранить";

		// Собираем части в единую строку
		tdLastnameContainer.appendChild(lastnameInput);
		tdFirstnameContainer.appendChild(firstnameInput);
		tdPatronymicContainer.appendChild(patronymicInput);
		tdServiceContainer.appendChild(serviceInput);
		tdPhoneContainer.appendChild(phoneInput);
		tdBtnContainer.appendChild(button);
		row.appendChild(tdLastnameContainer);
		row.appendChild(tdFirstnameContainer);
		row.appendChild(tdPatronymicContainer);
		row.appendChild(tdServiceContainer);
		row.appendChild(tdPhoneContainer);
		row.appendChild(tdBtnContainer);

		return row;
	}
	/**
	 * Функция, которая добавляет обработчик события на кнопку добавления нового человека и управляет отображением строки ввода.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит кнопку с классом `.add-person`, которая используется для добавления нового человека.
	 * 2. Добавляет обработчик события `click` на кнопку.
	 * 3. При нажатии на кнопку:
	 *    - Если в таблице нет строки ввода (`.new-person`):
	 *      - Изменяет текст кнопки на "Отменить".
	 *      - Создаёт новую строку с полями ввода, используя функцию `createInputRow`.
	 *      - Добавляет класс `tempClass` к новой строке для временного отображения.
	 *      - Добавляет обработчик события `click` на кнопку "Сохранить" в новой строке, который вызывает функцию `savePerson` с методом `POST`.
	 *      - Добавляет новую строку в тело таблицы.
	 *    - Если в таблице уже есть строка ввода с классом `tempClass` (т.е. строка была создана ранее):
	 *      - Изменяет текст кнопки обратно на "Добавить".
	 *      - Удаляет последнюю строку из тела таблицы (т.е. строку с классом `tempClass`).
	 *
	 * @returns {void}
	 */
	const addEventEntry = () => {
		const btnAddPerson = document.querySelector('.add-person');
		btnAddPerson.addEventListener('click', () => {
			const bodyTable = document.querySelector('.table-persons').querySelector('tbody');
			if (!bodyTable.querySelector('.new-person')) {
				btnAddPerson.innerText="Отменить";
				const newRow = createInputRow();
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
	 * Функция, которая добавляет обработчик события на кнопку редактирования в строке таблицы и управляет заменой строки ввода.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Добавляет обработчик события `click` на кнопку с классом `.edit-person-btn` внутри переданной строки `row`.
	 * 2. При нажатии на кнопку:
	 *    - Проверяет, что в таблице нет строки ввода (`.new-person`), чтобы избежать множественного редактирования одновременно.
	 *    - Извлекает данные из текущей строки (имя, фамилия, отчество, служба, телефон) для заполнения полей ввода.
	 *    - Создаёт новую строку с полями ввода, используя функцию `createInputRow`, и заполняет её извлечёнными данными.
	 *    - Добавляет обработчик события `click` на кнопку "Сохранить" в новой строке, который вызывает функцию `savePerson` с методом `PUT` для обновления существующей записи.
	 *    - Заменяет текущую строку в таблице на новую строку с полями ввода.
	 *
	 * @param {HTMLElement} row - Строка таблицы (`<tr>`), в которой находится кнопка редактирования и данные для редактирования.
	 *
	 * @returns {void}
	 */
	const addEventEditPerson = (row) => {
		row.querySelector('.edit-person-btn').addEventListener('click', () => {
			const bodyTable = document.querySelector('.table-persons').querySelector('tbody');
			if (!bodyTable.querySelector('.new-person')) {
				const tdList = row.querySelectorAll('td');
				const newRow = createInputRow(row.getAttribute('value'), tdList[0].textContent, tdList[1].textContent, tdList[2].textContent, tdList[3].textContent, tdList[4].textContent);
				newRow.querySelector('.save-new-person-btn').addEventListener('click', async () => await savePerson(newRow, 'PUT', bodyTable, newRow));
				bodyTable.replaceChild(newRow, row);
			};
		});
	};
	/**
	 * Функция, которая добавляет обработчик события на кнопку открытия модального окна и управляет отображением таблицы персон.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит кнопку с классом `.btn-open-modal-window-persons` на странице.
	 * 2. Добавляет обработчик события `click` на найденную кнопку.
	 * 3. При нажатии на кнопку:
	 *    - Вызывает функцию `drowTablePersons`, которая отображает таблицу с данными о персонале.
	 *    - Устанавливает текст кнопки добавления персонала с классом `.add-person` на "Добавить".
	 *
	 * @returns {void}
	 */
	const addEventOpenWindow = () => {
		const btnOpenModalWindow = document.querySelector('.btn-open-modal-window-persons');		// Оставить только это
		btnOpenModalWindow.addEventListener('click', () => {
			drowTablePersons();
			const btnAddPerson = document.querySelector('.add-person');
			btnAddPerson.innerText="Добавить";
		});
	};
	/**
	 * Функция, которая отображает таблицу с данными о персонале в элементе с классом `.table-persons`.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент `<tbody>` внутри таблицы с классом `.table-persons`.
	 * 2. Очищает текущее содержимое таблицы (удаляет все строки).
	 * 3. Перебирает массив `responsiblePersons`, содержащий данные о персонале.
	 *    - Для каждого объекта в массиве:
	 *      - Создаёт строку таблицы с помощью функции `createDefaultRow`, передавая данные из объекта.
	 *      - Добавляет созданную строку в таблицу.
	 *      - Добавляет обработчик события редактирования на кнопку в созданной строке с помощью функции `addEventEditPerson`.
	 *
	 * @returns {void}
	 */
	const drowTablePersons = () => {
		const bodyTable = document.querySelector('.table-persons').querySelector('tbody');
		bodyTable.innerText = '';
		responsiblePersons.forEach((resPerson) => {
			const row = createDefaultRow(resPerson.id, resPerson['lastname'], resPerson['firstname'], resPerson['patronymic'], serviceFullName.service, resPerson['phone_number']);
			bodyTable.appendChild(row);
			addEventEditPerson(row);
		});
	};
	/**
	 * Функция, которая обновляет содержимое элементов `<select>` с классом `.person-select` данными о персонале.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит все элементы `<select>` на странице с классом `.person-select`.
	 * 2. Для каждого найденного элемента:
	 *    - Очищает текущее содержимое, заменяя его на пустую опцию по умолчанию.
	 *    - Перебирает массив `responsiblePersons`, содержащий данные о персонале.
	 *      - Для каждого объекта в массиве:
	 *        - Создаёт новый элемент `<option>`.
	 *        - Устанавливает значение опции на `id` персонала и текст на фамилию персонала.
	 *        - Добавляет созданную опцию в элемент `<select>`.
	 *
	 * @returns {void}
	 */
	const updateData = () => {
		const formSelect = document.querySelectorAll('.person-select');
		formSelect.forEach((elem) => {
			elem.innerHTML = `<option value="" class="default-option"></option>`
			responsiblePersons.forEach((person) => {
				const option = document.createElement('option');
				option.setAttribute('value', person['id']);
				option.innerText = person['lastname'];
				elem.appendChild(option);
			});
		});
	};


	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	updateData();
	addEventEntry();
	addEventOpenWindow();
});