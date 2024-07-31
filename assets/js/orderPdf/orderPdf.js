window.addEventListener('message', (event) => {
    //
    const drowTable = () => {
        const title = document.querySelector('.title');
        title.innerText = `Заявка на ${date}`;
        const bodyTable = document.querySelector('tbody');
        bodyTable.innerText = '';
        orders.forEach((order) => bodyTable.appendChild(createRow(order))); // Перебираем массив данных заказов и создаем строки таблицы для каждого заказа, сразу добавляем созданную строку в таблицу
    };
    //
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


    //
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