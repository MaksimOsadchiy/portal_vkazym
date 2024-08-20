document.addEventListener('DOMContentLoaded', () => {
    drowTableLinks();
});

const saveService = async (elem, query, bodyTable, oldRow) => {
    // Получаем введёные значения
    const nameColor = elem.querySelector('.name-color').value.trim();
    const nameLink = elem.querySelector('.name-link').value.trim();
    const nameText = elem.querySelector('.name-text').value.trim();
    //const idService =  SESSION['service'];		// Получаем id введённого сервиса, потом переделать на fetch ???
    if (nameColor && nameLink && nameText){		// Проверка введёных данных
        console.log(nameColor);
        const request = {		// Формируем тело запроса
            'color': nameColor,
            'link': nameLink,
            'text' : nameText,
        };
        query === 'PUT' && (request.id = +elem.getAttribute('value'));		// Если метод 'PUT', то добавляем в тело id изменяемого элемента
        console.log(request);
        try {
            const response = await fetch(`${SERVER_URL}mainApps.php`, {
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
          //  const resRow = createDefaultRow(+jsonResponse.id, nameDir, nameService);		// Создаём обычную строку в таблицу
         //   const newElem = {
         //       'id': +jsonResponse.id,
          //      'route_to': nameDir,
          //      'service_id': idService,
          //  };

          //  routes = routes.some((obj) => obj.id === jsonResponse.id)
            //    ? routes.map((obj) => obj.id === jsonResponse.id ? newElem : obj)
              //  : [...routes, newElem];
           // updateData();

           // addEventEditService(resRow);		// Вешаем на кнопку в новой строке слушатель
          //  bodyTable.replaceChild(resRow, oldRow);		// Заменяем строку с инпутами новой обычной строкой
          //  query === 'POST' && (document.querySelector('.add-entry').innerText = 'Добавить запись');
        } catch(error) {
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
        }
    } else {
        document.dispatchEvent(new CustomEvent('updateError', { detail: "Поля должны быть заполнены!" }));
    }
};

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
    all_modules.forEach((value) => {
        const row = createDefaultRowApps(value.id, value.color, value.link, value.description);
        bodyTable.appendChild(row);
        addEventEditApps(row);
    });
    const bodyTablel = document.querySelector('.table-links').querySelector('tbody');
    bodyTablel.innerText = '';
    allLinks.forEach((value) => {
        const row = createDefaultRowApps(value.id, value.color, value.link, value.description);
        bodyTablel.appendChild(row);
    });
};

const addEventEditApps = (row) => {
    row.querySelector('.edit-apps-btn').addEventListener('click', () => {
        const tdList = row.querySelectorAll('td');
        const newRow = createInputRow(row.getAttribute('value'), tdList[0].textContent, tdList[1].textContent, tdList[2].textContent);
        const bodyTable = document.querySelector('.table-apps').querySelector('tbody');

        if (!bodyTable.querySelector('.new-app')) {
            newRow.querySelector('.save-apps-btn').addEventListener('click', async () => await saveService(newRow, 'PUT', bodyTable, newRow));
            bodyTable.replaceChild(newRow, row);
        }



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