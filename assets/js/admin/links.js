document.addEventListener('DOMContentLoaded', () => {
    drowTableLinks();
});

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
}
const drowTableLinks = () => {
    const bodyTable = document.querySelector('.table-apps').querySelector('tbody');
    bodyTable.innerText = '';
    const filteredDataApps = allLinks.filter((type) => type.type === 1);
    filteredDataApps.forEach((value) => {
        const row = createDefaultRowApps(value.id, value['color'], value['link'], value['text']);
        bodyTable.appendChild(row);
        addEventEditApps(row);
    });
    const bodyTable1 = document.querySelector('.table-links').querySelector('tbody');
    bodyTable1.innerText = '';
    const filteredDataLinks = allLinks.filter((type) => type.type === 2);
    filteredDataLinks.forEach((value) => {
        const row = createDefaultRowApps(value.id, value['color'], value['link'], value['text']);
        bodyTable1.appendChild(row);
    });
};

const addEventEditApps = (row) => {
    row.querySelector('.edit-apps-btn').addEventListener('click', () => {
        const tdList = row.querySelectorAll('td');
        const newRow = createInputRow(row.getAttribute('value'), tdList[0].textContent, tdList[1].textContent, tdList[2].textContent);
        const bodyTable = document.querySelector('.table-apps').querySelector('tbody');
        bodyTable.replaceChild(newRow, row);

    });
};

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
    tdColorInput.className = 'name-color';
    tdLinkInput.className = 'name-link';
    tdTextInput.className = 'name-text';

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
}