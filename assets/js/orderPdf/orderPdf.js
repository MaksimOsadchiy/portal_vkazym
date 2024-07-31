window.addEventListener('message', (event) => {
    /**
     * Функция `drowTable` отвечает за обновление таблицы на странице с данными заказов.
     * Она устанавливает заголовок таблицы и заполняет ее строками на основе переданных данных заказов.
     *
     * Функция выполняет следующие действия:
     * 1. Обновляет текст заголовка таблицы, используя переменную `date`.
     * 2. Очищает тело таблицы от предыдущих данных.
     * 3. Для каждого заказа из массива `orders` создается строка таблицы с помощью функции `createRow`.
     * 4. Добавляет созданные строки в таблицу.
     *
     * @returns {void}
     */
    const drowTable = () => {
        const title = document.querySelector('.title');
        title.innerText = `Заявка на ${date}`;
        const bodyTable = document.querySelector('tbody');
        bodyTable.innerText = '';
        orders.forEach((order) => bodyTable.appendChild(createRow(order))); // Перебираем массив данных заказов и создаем строки таблицы для каждого заказа, сразу добавляем созданную строку в таблицу
    };
    /**
     * Функция `createRow` создает и возвращает строку таблицы с информацией о заказе.
     * Она формирует HTML-элементы для каждой ячейки строки и заполняет их данными из объекта `order`.
     *
     * Функция выполняет следующие действия:
     * 1. Создает HTML-элемент строки таблицы `<tr>`.
     * 2. Создает HTML-элементы `<td>` для каждой колонки таблицы (например, техника, номер, услуга, время, ответственный, маршрут, работа, замечания).
     * 3. Заполняет ячейки таблицы данными из объекта `order`.
     * 4. Добавляет ячейки в строку таблицы.
     * 5. Возвращает созданную строку таблицы.
     *
     * @param {Object} order - Объект, содержащий данные заказа.
     * @param {string} order.id - Идентификатор заказа.
     * @param {string} order.technique - Название техники.
     * @param {string} order.stateNumber - Государственный номер техники.
     * @param {string} order.service - Название услуги.
     * @param {string} order.time - Время начала и окончания работ в формате "начало<br>-<br>окончание".
     * @param {Object} order.responsiblePerson - Объект, содержащий данные о ответственном лице.
     * @param {string} order.responsiblePerson.lastname - Фамилия ответственного лица.
     * @param {string} order.responsiblePerson.firstname - Имя ответственного лица.
     * @param {string} order.responsiblePerson.patronymic - Отчество ответственного лица.
     * @param {string} order.responsiblePerson.phone_number - Номер телефона ответственного лица.
     * @param {string} order.route - Маршрут.
     * @param {string} order.workActivity - Описание работы.
     * @param {string} order.remark - Замечания.
     * @returns {HTMLTableRowElement} - Созданный элемент строки таблицы `<tr>`.
     */
    const createRow = (order) => {
        const row = document.createElement('tr');
        const tdTechnique = document.createElement('td');
        const stateNumber = document.createElement('td');
        const tdService = document.createElement('td');
        const tdTimeFrom = document.createElement('td');
        const tdTimeTo = document.createElement('td');
        const tdResponsible = document.createElement('td');
        const phone = document.createElement('td');
        const tdRoute = document.createElement('td');
        const tdWork = document.createElement('td');
        const tdRemark = document.createElement('td');

        row.setAttribute('id', order.id)

        tdTechnique.innerText = order.technique;
        stateNumber.innerText = order.stateNumber;
        tdService.innerHTML = order.service;
        tdTimeFrom.innerHTML = order.time.split('<br>-<br>')[0].substring(0, 5);
        tdTimeTo.innerHTML = order.time.split('<br>-<br>')[1].substring(0, 5);
        tdResponsible.innerHTML = `${order.responsiblePerson.lastname}<br>${order.responsiblePerson.firstname}<br>${order.responsiblePerson.patronymic}`;
        phone.innerHTML = order.responsiblePerson.phone_number;
        tdRoute.innerText = order.route;
        tdWork.innerText = order.workActivity;
        tdRemark.innerText = order.remark;

        row.appendChild(tdTechnique);
        row.appendChild(stateNumber);
        row.appendChild(tdService);
        row.appendChild(tdTimeFrom);
        row.appendChild(tdTimeTo);
        row.appendChild(tdResponsible);
        row.appendChild(phone);
        row.appendChild(tdRoute);
        row.appendChild(tdWork);
        row.appendChild(tdRemark);

        return row;
    };


    // Основной блок кода, который выполняет начальные операции при загрузке скрипта.
    let orders = [];
    let date = ''

    if (event.origin === 'http://localhost') {
        const data = event.data;
        if (data && data.orders) {
            orders = data.orders;
            date = data.date;
            drowTable(orders);
            window.onafterprint = function() {
                window.close();
            };
            window.print();
        };
    };
});