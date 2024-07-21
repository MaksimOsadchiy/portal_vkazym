document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Функция сохраняет данные об ответственной персоне, отправляя их на сервер и обновляет таблицу.
	 *
	 * @param {HTMLElement} elem - Элемент, содержащий введенные данные.
	 * @param {string} query - Метод запроса ('PUT' или 'POST').
	 * @param {HTMLElement} bodyTable - Тело таблицы, в которую вставляется новая строка.
	 * @param {HTMLElement} oldRow - Старая строка, которую необходимо заменить.
	 *
	 */
	const savePerson = async (elem, query, bodyTable, oldRow) => {
		// Получаем введёные значения
		const lastname = elem.querySelector('.lastname').value.trim();
		const firstname = elem.querySelector('.firstname').value.trim();
		const patronymic = elem.querySelector('.patronymic').value.trim();
		const phone = elem.querySelector('.phone').value.trim();
		const nameService = elem.querySelector('.service').value.trim();
		const idService = SESSION['service']; // Получаем id сервиса, потом переделать на fetch ???

		if (lastname && firstname && patronymic && phone) {
			// Проверка введёных данных
			const request = {
				// Формируем тело запроса
				lastname: lastname,
				firstname: firstname,
				patronymic: patronymic,
				phone: phone,
				idService: idService,
			};

			query === 'PUT' && (request.id = +elem.getAttribute('value')); // Если метод 'PUT', то добавляем в тело id изменяемого элемента
			try {
				const response = await fetch(`${SERVER_URL}responsiblePersons.php`, {
					method: query,
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(request),
				});
				const jsonResponse = await response.json(); // Получаем тело ответа
				if (!response.ok) {
					throw new Error(jsonResponse.status);
				}
				const resRow = createDefaultRow(+jsonResponse.id, lastname, firstname, patronymic, nameService, phone); // Создаём обычную строку в таблицу
				const newElem = {
					id: +jsonResponse.id,
					firstname: firstname,
					patronymic: patronymic,
					lastname: lastname,
					service_id: idService,
					phone_number: phone,
				};
				responsiblePersons = responsiblePersons.some((obj) => obj.id === jsonResponse.id)
					? responsiblePersons.map((obj) => (obj.id === jsonResponse.id ? newElem : obj))
					: [...responsiblePersons, newElem];
				updateData();

				addEventEditPerson(resRow); // Вешаем на кнопку в новой строке слушатель
				bodyTable.replaceChild(resRow, oldRow); // Заменяем строку с инпутами новой обычной строкой
				query === 'POST' && (document.querySelector('.add-person').innerText = 'Добавить');
			} catch (error) {
				document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			}
		} else {
			document.dispatchEvent(new CustomEvent('updateError', { detail: 'Поля должны быть заполнены!' }));
		}
	};
	/**
	 * Функция создает строку таблицы с кнопкой "Редактировать" с заданными данными.
	 *
	 *	<tr class="appForm" value="ID">
	 *		<td>Фамилия</td>
	 *		<td>Имя</td>
	 *		<td>Отчиство</td>
	 *		<td>Служба</td>
	 *		<td>Номер</td>
	 *		<td>
	 *			<button class="btn btn-secondary edit-person-btn" type="button">Редактировать</button>
	 *		</td>
	 *	</tr>
	 *
	 * @param {number} id - Идентификатор записи.
	 * @param {string} lastname - Фамилия.
	 * @param {string} firstname - Имя.
	 * @param {string} patronymic - Отчество.
	 * @param {string} service - Название направления.
	 * @param {string} phone - Номер.
	 * @returns {HTMLElement} Созданная строка таблицы.
	 *
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
		button.innerText = 'Редактировать';

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
	 * Функция создает строку таблицы с кнопкой "Сохранить" с заданными данными.
	 *
	 *	<tr class="appForm new-person" value="ID">
	 *		<td>
	 *			<input type="text" class="form-control lastname">
	 *		</td>
	 *		<td>
	 *			<input type="text" class="form-control firstname">
	 *		</td>
	 *		<td>
	 *			<input type="text" class="form-control patronymic">
	 *		</td>
	 *		<td>
	 *			<input type="text" class="form-control service">
	 *		</td>
	 *		<td>
	 *			<input type="text" class="form-control phone">
	 *		</td>
	 *		<td>
	 *			<button type="button" class="btn btn-secondary save-new-person-btn">Сохранить</button>
	 *		</td>
	 *	</tr>
	 *
	 * @param {number} id - Идентификатор записи, по умолчанию '-1'.
	 * @param {string} lastname - Фамилия.
	 * @param {string} firstname - Имя.
	 * @param {string} patronymic - Отчество.
	 * @param {string} service - Название направления.
	 * @param {string} phone - Номер.
	 * @returns {HTMLElement} Созданная строка таблицы.
	 *
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
		button.innerText = 'Сохранить';

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
	};
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
				btnAddPerson.innerText = 'Отменить';
				const newRow = createInputRow();
				newRow.classList.add('tempClass');
				newRow.querySelector('.save-new-person-btn').addEventListener('click', async () => await savePerson(bodyTable, 'POST', bodyTable, newRow));
				bodyTable.appendChild(newRow);
			} else if (bodyTable.querySelector('.tempClass')) {
				btnAddPerson.innerText = 'Добавить';
				bodyTable.removeChild(bodyTable.lastChild);
			}
		});
	};
	/**
	 * Функция добавляет обработчик события на кнопку редактирования персоны в переданной строке.
	 *
	 * При клике на кнопку "Редактировать" строка заменяется на строку с
	 * полями ввода с текущими значениями. Добавляется обработчик события на кнопку
	 * сохранения изменений, которая отправляет обновленные данные на сервер.
	 *
	 * @param {HTMLElement} row - Строка таблицы, в которой содержиться кнопка, для которой добавляется обработчик события.
	 */
	const addEventEditPerson = (row) => {
		row.querySelector('.edit-person-btn').addEventListener('click', () => {
			const bodyTable = document.querySelector('.table-persons').querySelector('tbody');
			if (!bodyTable.querySelector('.new-person')) {
				const tdList = row.querySelectorAll('td');
				const newRow = createInputRow(
					row.getAttribute('value'),
					tdList[0].textContent,
					tdList[1].textContent,
					tdList[2].textContent,
					tdList[3].textContent,
					tdList[4].textContent
				);
				newRow.querySelector('.save-new-person-btn').addEventListener('click', async () => await savePerson(newRow, 'PUT', bodyTable, newRow));
				bodyTable.replaceChild(newRow, row);
			}
		});
	};
	/**
	 * Функция добавляет обработчики событий на кнопку, связанные с открытием модального окна.
	 *
	 * При клике на кнопку вызывает перерисовку таблицы с ответственными персонами и
	 * изменяет текст кнопки "Добавить".
	 *
	 */
	const addEventOpenWindow = () => {
		const btnOpenModalWindow = document.querySelector('.btn-open-modal-window-persons'); // Оставить только это
		btnOpenModalWindow.addEventListener('click', () => {
			drowTablePersons();
			const btnAddPerson = document.querySelector('.add-person');
			btnAddPerson.innerText = 'Добавить';
		});
	};
	/**
	 * Функция отображает таблицу с ответственными персонами, заполняя ее строками с данными из массива о. персон.
	 *
	 * Для каждой персоны создается строка таблицы с данными о персоне и сервисе,
	 * добавляется в таблицу, и для этой строки добавляется обработчик события на кнопку
	 * редактирования.
	 */
	const drowTablePersons = () => {
		const bodyTable = document.querySelector('.table-persons').querySelector('tbody');
		bodyTable.innerText = '';
		responsiblePersons.forEach((resPerson) => {
			const row = createDefaultRow(
				resPerson.id,
				resPerson['lastname'],
				resPerson['firstname'],
				resPerson['patronymic'],
				serviceFullName.service,
				resPerson['phone_number']
			);
			bodyTable.appendChild(row);
			addEventEditPerson(row);
		});
	};
	/**
	 * Функция обновляет данные в выпадающем списке (select) на странице.
	 *
	 * Очищает текущие опции в выпадающем списке и добавляет новые опции на основе массива responsiblePersons.
	 * Каждая опция представляет собой фамилию персоны (lastname) из объекта person, с установленным значением
	 * id в атрибуте value опции.
	 *
	 *	<option value="ID">"Путь"<option>
	 *
	 */
	const updateData = () => {
		const formSelect = document.querySelectorAll('.person-select');
		formSelect.forEach((elem) => {
			elem.innerHTML = `<option value="" class="default-option"></option>`;
			responsiblePersons.forEach((person) => {
				const option = document.createElement('option');
				option.setAttribute('value', person['id']);
				option.innerText = person['lastname'];
				elem.appendChild(option);
			});
		});
	};

	// Начало скрипта
	updateData();
	addEventEntry();
	addEventOpenWindow();
});
