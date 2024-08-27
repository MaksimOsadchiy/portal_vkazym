document.addEventListener('DOMContentLoaded', () => {
    const mainList = [
        {
            name: 'color',
            description: 'класс цвета',
        },
        {
            name: 'link',
            description: 'адрес',
        },
        {
            name: 'description',
            description: 'Название',
        },
    ];
    const tables = [
        {
            className: 'table-apps',
            mainArray: all_modules,
            columsName: [
                ...mainList,
                {
                    name: 'name',
                    description: 'Латинское название',
                },
            ],
            nameTo: 'portalModules'
        },
        {
            className: 'table-microApps',
            mainArray: all_micro_modules,
            columsName: [
                ...mainList,
                {
                    name: 'name',
                    description: 'Латинское название',
                },
                {
                    name: 'privilege',
                    description: 'Права',
                },
            ],
            nameTo: 'microservices'
        },
        {
            className: 'table-links',
            mainArray: allLinks,
            columsName: [
                {
                    name: 'color',
                    description: 'класс цвета',
                },
                {
                    name: 'link',
                    description: 'адрес',
                },
                {
                    name: 'description',
                    description: 'Название',
                },

            ],
            nameTo: 'links'
        },
    ];
    tables.forEach((obj) => drowTableLinks(obj));
});
/**
 * Отправляет запрос на сервер для сохранения данных о сервисе.
 *
 * Функция выполняет следующие шаги:
 * 1. Проверяет, что все значения в объекте `newObj` заполнены (нет пустых строк).
 * 2. Отправляет запрос на сервер с использованием метода `fetch` с указанным HTTP-методом (`query`).
 * 3. Ожидает получения ответа и преобразует его в JSON.
 * 4. Если ответ успешный, генерирует событие об успешном обновлении данных.
 * 5. Если произошла ошибка, выводит сообщение об ошибке в консоль и генерирует событие с деталями ошибки.
 *
 * @param {Object} newObj - Объект с данными, которые необходимо отправить на сервер. Все значения должны быть строками.
 * @param {string} query - HTTP-метод запроса. Могут быть использованы значения 'POST', 'PUT' и другие.
 * @param {string} nameTo - Имя файла на сервере для обработки запроса.
 *
 * @returns {boolean} Возвращает `true`, если запрос выполнен успешно, и `false`, если произошла ошибка.
 */
const saveService = async (newObj, query, nameTo) => {
	try {
		if (Object.values(newObj).some((elem) => elem.trim() === '')) throw new Error('Поля должны быть заполнены!')		// Проверка введёных данных
		const response = await fetch(`${SERVER_URL}${nameTo}.php`, {
			method: query,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newObj),
		});
		const jsonResponse = await response.json();		// Получаем тело ответа
		if (!response.ok) {
			throw new Error(jsonResponse.status);
		}
		document.dispatchEvent(new CustomEvent('updateError', { detail: query === 'PUT' ? 'Изменено успешно!' : 'Создано успешно!' }));
		return true;
	} catch(error) {
		console.log(error);
		document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
		return false;
	}
};
/**
 * Отображает таблицу на основе переданных параметров.
 *
 * Функция выполняет следующие шаги:
 * 1. Заполняет заголовок таблицы названиями столбцов, предоставленными в объекте `obj`.
 * 2. Создаёт и добавляет в заголовок таблицы колонку для кнопки редактирования.
 * 3. Заполняет тело таблицы строками данных, предоставленными в массиве `obj.mainArray`, и добавляет обработчики событий для кнопок редактирования и создания.
 *
 * @param {Object} obj - Объект с параметрами для построения таблицы.
 * @param {string} obj.className - Класс таблицы, в которую будут добавлены данные.
 * @param {Array<Object>} obj.columsName - Массив объектов, содержащих описание названий столбцов таблицы.
 * @param {Array<Object>} obj.mainArray - Массив объектов с данными для заполнения строк таблицы.
 * @param {string} obj.nameTo - Имя таблицы (или целевого ресурса), используемое для обработки данных.
 *
 * @returns {void}
 */
const drowTableLinks = (obj) => {
    const table = document.querySelector(`.${obj.className}`);
    const headTable = table.querySelector('thead').querySelector('tr');
    obj.columsName.forEach((elem) => {
        const thElem = document.createElement('th');
        thElem.innerText = elem.description;
        headTable.appendChild(thElem);
    });
    const thElem = document.createElement('th');
    thElem.innerText = 'Редактировать';
    headTable.appendChild(thElem);

    const bodyTable = table.querySelector('tbody');
    const btn = table.querySelector('.btn-create');
    bodyTable.innerText = '';
    obj.mainArray.forEach((value) => {
        const row = createDefaultRowApps(value.id, value, obj.columsName);
        bodyTable.appendChild(row);
        addEventEditBtn(row, bodyTable, obj.columsName, obj.nameTo);
    });
    addEventCreateBtn(btn, bodyTable, obj.columsName, obj.nameTo);
};
/**
 * Создаёт строку таблицы с данными и кнопкой редактирования.
 *
 * Функция выполняет следующие шаги:
 * 1. Создаёт строку таблицы и добавляет в неё ячейки с данными.
 * 2. Добавляет кнопку редактирования в отдельную ячейку и добавляет её в строку таблицы.
 * 3. Возвращает созданную строку таблицы.
 *
 * @param {number} id - Идентификатор строки. Используется для установки атрибута `value` строки.
 * @param {Object} elem - Объект с данными, которые будут отображаться в строке таблицы.
 * @param {Array<Object>} colums - Массив объектов, каждый из которых содержит информацию о названиях столбцов и соответствующих данных.
 *
 * @returns {HTMLTableRowElement} - Созданная строка таблицы с данными и кнопкой редактирования.
 */
const createDefaultRowApps = (id, elem, colums) => {
    // Создаём DOM элементы
    const row = document.createElement('tr');
    const tdBtnContainer = document.createElement('td');
    const button = document.createElement('button');

    // Добавляем классы
    row.className = 'linkTable';
    button.className = 'btn btn-secondary edit-apps-btn';

    // Добавляем атрибуты
    row.setAttribute('value', id);
    button.setAttribute('type', 'button');

    button.innerText = "Редактировать";

    // Собираем части в единую строку
    colums.forEach((obj) => {
        const tdElem = document.createElement('td');
        tdElem.innerText = elem[obj.name] ? elem[obj.name] : '';
        row.appendChild(tdElem);
    })
    tdBtnContainer.appendChild(button);
    row.appendChild(tdBtnContainer);

    return row;
};
/**
 * Добавляет обработчик события на кнопку редактирования в строке таблицы.
 * При нажатии на кнопку редактирования строка заменяется на форму для редактирования.
 *
 * @param {HTMLTableRowElement} row - Строка таблицы, содержащая кнопку редактирования.
 * @param {HTMLTableSectionElement} body - Тело таблицы, где происходит замена строки.
 * @param {Array<Object>} array - Массив объектов, содержащих информацию о колонках для формы редактирования.
 * @param {string} nameTo - Имя сущности для сохранения изменений.
 * @param {string} [query='PUT'] - HTTP метод для отправки запроса (по умолчанию 'PUT').
 *
 * @returns {void}
 */
const addEventEditBtn = (row, body, array, nameTo, query = 'PUT') => {
    row.querySelector('.edit-apps-btn').addEventListener('click', () => {
        const tdList = row.querySelectorAll('td');
        const newRow = createInputRow(row.getAttribute('value'), tdList, array);

        if (!body.querySelector('.new-app')) {
            body.replaceChild(newRow, row);
            addEventSaveBtn(newRow, body, array, nameTo, query);
        };
    });
};
/**
 * Добавляет обработчик события на кнопку сохранения в строке таблицы.
 * При нажатии на кнопку собирает данные из формы, отправляет их на сервер и обновляет таблицу.
 *
 * @param {HTMLTableRowElement} row - Строка таблицы, содержащая кнопку сохранения.
 * @param {HTMLTableSectionElement} body - Тело таблицы, где происходит замена строки.
 * @param {Array<Object>} array - Массив объектов, содержащих информацию о колонках для создания новой строки.
 * @param {string} nameTo - Имя сущности для сохранения изменений.
 * @param {string} query - HTTP метод для отправки запроса (например, 'PUT' или 'POST').
 *
 * @returns {void}
 */
const addEventSaveBtn = (row, body, array, nameTo, query) => {
    row.querySelector('.save-apps-btn').addEventListener('click', async () => {
        const inputList = row.querySelectorAll('input');
		let newObj = query === "PUT" ? {id: row.getAttribute('value')} : {};

		inputList.forEach((elem) => {
			newObj[elem.getAttribute('key')] = elem.value;
		});

		if (await saveService(newObj, query, nameTo)){
			const newRow = createDefaultRowApps(row.getAttribute('value'), newObj, array);

			body.replaceChild(newRow, row);
			addEventEditBtn(newRow, body, array, nameTo);
		};
    });
};
/**
 * Добавляет обработчик события на кнопку создания новой записи.
 * При нажатии на кнопку создаётся новая строка формы и добавляется в таблицу.
 *
 * @param {HTMLButtonElement} btn - Кнопка создания новой записи.
 * @param {HTMLTableSectionElement} body - Тело таблицы, где добавляется новая строка.
 * @param {Array<Object>} array - Массив объектов, содержащих информацию о колонках для создания новой строки.
 * @param {string} nameTo - Имя сущности для сохранения новой записи.
 *
 * @returns {void}
 */
const addEventCreateBtn = (btn, body, array, nameTo) => {
    btn.addEventListener('click', () => {
        const row = createDefaultRowApps('', {}, array);
        body.appendChild(row);
        addEventEditBtn(row, body, array, nameTo, 'POST');
    });
};
/**
 * Создаёт строку таблицы с формой для ввода данных, предназначенную для редактирования или создания новых записей.
 *
 * Функция выполняет следующие шаги:
 * 1. Создаёт элементы строки таблицы (`<tr>`), контейнера для кнопки (`<td>`) и кнопку (`<button>`).
 * 2. Присваивает строке и кнопке соответствующие классы для стилизации.
 * 3. Устанавливает атрибуты для строки и кнопки:
 *    - `value` для строки устанавливает идентификатор записи (если предоставлен).
 *    - `type` для кнопки устанавливает тип `button`.
 * 4. Заполняет кнопку текстом "Сохранить".
 * 5. Проходит по массиву `array`, создаёт инпуты для каждого элемента и заполняет их значениями из старых данных (`oldTdList`):
 *    - Каждый инпут получает класс для стилизации, тип `text` и ключ `key`, соответствующий имени элемента.
 *    - Значение инпута устанавливается на основе текста из старой ячейки таблицы.
 * 6. Добавляет созданные инпуты и кнопку в строку таблицы.
 * 7. Возвращает строку таблицы с инпутами и кнопкой.
 *
 * @param {string} id - Идентификатор строки (если есть), устанавливаемый как атрибут `value` для строки.
 * @param {NodeList} oldTdList - Список ячеек таблицы, содержащих старые данные, которые будут использоваться для начального заполнения инпутов.
 * @param {Array<Object>} array - Массив объектов, содержащих информацию о колонках таблицы. Каждый объект должен иметь свойство `name`, которое используется для создания ключей и классов инпутов.
 *
 * @returns {HTMLTableRowElement} Созданная строка таблицы (`<tr>`), готовая для вставки в таблицу.
 */
const createInputRow = (id, oldTdList, array) => {
    // Создаём DOM элементы
    const row = document.createElement('tr');
    const tdBtnContainer = document.createElement('td');
    const button = document.createElement('button');

    // Добавляем классы
    row.className = 'linkTable new-app';
    button.className = 'btn btn-secondary save-apps-btn';

    // Добавляем атрибуты
    row.setAttribute('value', id);
    button.setAttribute('type', 'button');

	// Заполняем теги
    button.innerText = "Сохранить";

    tdBtnContainer.appendChild(button);
	array.forEach((elem, index) => {
		const tdContainer = document.createElement('td');
		const tdInput = document.createElement('input');
		tdInput.className = `form-control bg-light bg-gradient name-${elem.name}`;
		tdInput.setAttribute('type', 'text');
		tdInput.setAttribute('key', elem.name);
		tdInput.value = oldTdList[index].textContent;
		tdContainer.appendChild(tdInput);
		row.appendChild(tdContainer);
	});
    row.appendChild(tdBtnContainer);
    return row;
};