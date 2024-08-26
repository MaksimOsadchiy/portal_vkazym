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
const saveService = async (row, query, nameTo) => {
    // Получаем введёные значения
    const nameColor = row.querySelector('.name-color').value.trim();
    const nameLink = row.querySelector('.name-link').value.trim();
    const nameText = row.querySelector('.name-text').value.trim();
    if (nameColor && nameLink && nameText){		// Проверка введёных данных
        const request = {		// Формируем тело запроса
            'color': nameColor,
            'link': nameLink,
            'description' : nameText,
        };
        query === 'PUT' && (request.id = +row.getAttribute('value'));		// Если метод 'PUT', то добавляем в тело id изменяемого элемента
        try {
            const response = await fetch(`${SERVER_URL}${nameTo}.php`, {
                method: query,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });
            const jsonResponse = await response.json();		// Получаем тело ответа
            if (!response.ok) {
                throw new Error(jsonResponse.status);
            }
            document.dispatchEvent(new CustomEvent('updateError', { detail: query === 'PUT' ? 'Изменено успешно!' : 'Создано успешно!' }));
        } catch(error) {
            console.log(error);
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
        }
    } else {
        document.dispatchEvent(new CustomEvent('updateError', { detail: "Поля должны быть заполнены!" }));
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
        addEventEditBtn(row, bodyTable, obj.nameTo);
    });
    addEventCreateBtn(btn, bodyTable, obj.nameTo);
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
        tdElem.innerText = elem[obj.name];
        row.appendChild(tdElem);
    })
    tdBtnContainer.appendChild(button);
    row.appendChild(tdBtnContainer);

    return row;
};
//
const addEventEditBtn = (row, body, nameTo, query = 'PUT') => {
    row.querySelector('.edit-apps-btn').addEventListener('click', () => {
        const tdList = row.querySelectorAll('td');
        const newRow = createInputRow(row.getAttribute('value'), tdList[0].textContent, tdList[1].textContent, tdList[2].textContent);

        if (!body.querySelector('.new-app')) {
            body.replaceChild(newRow, row);
            addEventSaveBtn(newRow, body, nameTo, query);
        };
    });
};
//
const addEventSaveBtn = (row, body, nameTo, query) => {
    row.querySelector('.save-apps-btn').addEventListener('click', async () => {
        await saveService(row, query, nameTo);

        const inputList = row.querySelectorAll('input');
        const newRow = createDefaultRowApps(row.getAttribute('value'), inputList[0].value, inputList[1].value, inputList[2].value);

        body.replaceChild(newRow, row);
        addEventEditBtn(newRow, body, nameTo);
    });
};
//
const addEventCreateBtn = (btn, body, nameTo) => {
    btn.addEventListener('click', () => {
        const row = createDefaultRowApps('', '', '', '');
        body.appendChild(row);
        addEventEditBtn(row, body, nameTo, 'POST');
    });
};
//
const createInputRow = (id, color, link, text) => {
    // Создаём DOM элементы
    const row = document.createElement('tr');
    const tdColorContainer = document.createElement('td');
    const tdColorInput = document.createElement('input');
    const tdLinkConteiner = document.createElement('td');
    const tdLinkInput = document.createElement('input');
    const tdTextContainer = document.createElement('td');
    const tdTextInput = document.createElement('input');
    const tdBtnContainer = document.createElement('td');
    const button = document.createElement('button');
    // Добавляем классы
    row.className = 'linkTable new-app';
    button.className = 'btn btn-secondary save-apps-btn';
    tdColorInput.className = 'form-control bg-light bg-gradient name-color';
    tdLinkInput.className = 'form-control bg-light bg-gradient name-link';
    tdTextInput.className = 'form-control bg-light bg-gradient name-text';

    // Добавляем атрибуты
    row.setAttribute('value', id);
    tdColorInput.setAttribute('type', 'text');
    tdLinkInput.setAttribute('type', 'text');
    tdTextInput.setAttribute('type', 'text');
    button.setAttribute('type', 'button');

    tdColorInput.value = color;
    tdLinkInput.value = link;
    tdTextInput.value = text;
    button.innerText = "Сохранить";

    // Собираем части в единую строку
    tdColorContainer.appendChild(tdColorInput);
    tdLinkConteiner.appendChild(tdLinkInput);
    tdTextContainer.appendChild(tdTextInput);
    tdBtnContainer.appendChild(button);
    row.appendChild(tdColorContainer);
    row.appendChild(tdLinkConteiner);
    row.appendChild(tdTextContainer);
    row.appendChild(tdBtnContainer);

    return row;
};