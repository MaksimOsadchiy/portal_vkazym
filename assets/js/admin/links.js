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
//
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
//
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
//
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
//
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
//
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
//
const addEventCreateBtn = (btn, body, array, nameTo) => {
    btn.addEventListener('click', () => {
        const row = createDefaultRowApps('', {}, array);
        body.appendChild(row);
        addEventEditBtn(row, body, array, nameTo, 'POST');
    });
};
//
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