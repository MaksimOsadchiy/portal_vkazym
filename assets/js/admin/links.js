document.addEventListener('DOMContentLoaded', () => {
    drowTableLinks();
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
        } catch(error) {
            console.log(error);
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
        }
    } else {
        document.dispatchEvent(new CustomEvent('updateError', { detail: "Поля должны быть заполнены!" }));
    }
};
//
const drowTableLinks = () => {
    const bodyTable = document.querySelector('.table-apps').querySelector('tbody');
    bodyTable.innerText = '';
    all_modules.forEach((value) => {
        const row = createDefaultRowApps(value.id, value.color, value.link, value.description);
        bodyTable.appendChild(row);
        addEventEditBtn(row, bodyTable, 'portalModules');
    });
    const bodyTableSec = document.querySelector('.table-microApps').querySelector('tbody');
    bodyTableSec.innerText = '';
    all_micro_modules.forEach((value) => {
        const row = createDefaultRowApps(value.id, value.color, value.link, value.description);
        bodyTableSec.appendChild(row);
        addEventEditBtn(row, bodyTableSec, 'microservices');
    });
    const bodyTableThird = document.querySelector('.table-links').querySelector('tbody');
    bodyTableThird.innerText = '';
    allLinks.forEach((value) => {
        const row = createDefaultRowApps(value.id, value.color, value.link, value.description);
        bodyTableThird.appendChild(row);
        addEventEditBtn(row, bodyTableThird, 'links');
    });
};
//
const createDefaultRowApps = (id, color, link, text) => {
    // Создаём DOM элементы
    const row = document.createElement('tr');
    const tdColor = document.createElement('td');
    const tdLink = document.createElement('td');
    const tdText = document.createElement('td');
    const tdBtnContainer = document.createElement('td');
    const button = document.createElement('button');
    // Добавляем классы
    row.className = 'linkTable';
    button.className = 'btn btn-secondary edit-apps-btn';

    // Добавляем атрибуты
    row.setAttribute('value', id);
    tdColor.innerText = color;
    tdLink.innerText = link;
    tdText.innerText = text;
    button.setAttribute('type', 'button');

    button.innerText = "Редактировать";

    // Собираем части в единую строку
    tdBtnContainer.appendChild(button);
    row.appendChild(tdColor);
    row.appendChild(tdLink);
    row.appendChild(tdText);
    row.appendChild(tdBtnContainer);

    return row;
};
//
const addEventEditBtn = (row, body, nameTo) => {
    row.querySelector('.edit-apps-btn').addEventListener('click', () => {
        const tdList = row.querySelectorAll('td');
        const newRow = createInputRow(row.getAttribute('value'), tdList[0].textContent, tdList[1].textContent, tdList[2].textContent);

        if (!body.querySelector('.new-app')) {
            body.replaceChild(newRow, row);
            addEventSaveBtn(newRow, body, nameTo);
        };
    });
};
//
const addEventSaveBtn = (row, body, nameTo) => {
    row.querySelector('.save-apps-btn').addEventListener('click', async () => {
        await saveService(row, 'PUT', nameTo);

        const inputList = row.querySelectorAll('input');
        const newRow = createDefaultRowApps(row.getAttribute('value'), inputList[0].value, inputList[1].value, inputList[2].value);

        body.replaceChild(newRow, row);
        addEventEditBtn(newRow, body, nameTo);
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