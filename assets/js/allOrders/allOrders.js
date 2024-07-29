document.addEventListener("DOMContentLoaded", () => {
    //
    const saveChanges = async (value, order) => {
        try {
            const qparametr = `?id=${order.id}`
            const params = {
                value: value,
            };
            const response = await fetch(`${SERVER_URL}orders.php${qparametr}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params), // Отправляем объект в JSON формате
            });
            const jsonResponse = await response.json(); // Получаем тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа
            const tbody = document.querySelector('tbody');
            const childRow = document.querySelector(`tr#${order.id}`);
            tbody.removeChild(childRow);
        } catch (error) {
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
        };
    };
    //
    const getOrders = async (param) => {
        try {
            const qparametr = `?status=${param}`; // Устанавливаем кверипараметры
            const response = await fetch(`${SERVER_URL}orders.php${qparametr}`);
            const jsonResponse = await response.json(); // Получаем тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

            return jsonResponse;
        } catch (error) {
            // Если была ошибка, то обновляем переменную
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
            return {};
        };
    };
    //
    const drawTable = async (param = 0) => {
        const bodyTable = document.querySelector('tbody');
        bodyTable.innerHTML = `
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div> 
        `;
        const dataOrders = Object.values(await getOrders(param));
        bodyTable.innerText = '';
        dataOrders.forEach((order) => {
            const row = createRow(order);
            bodyTable.appendChild(row);
        });
    };
    //
    const createRow = (order) => {
        const row = document.createElement('tr');
        const tdService = document.createElement('td');
        const tdDate = document.createElement('td');
        const tdTime = document.createElement('td');
        const tdTechnique = document.createElement('td');
        const tdRoute = document.createElement('td');
        const tdWork = document.createElement('td');
        const tdRemark = document.createElement('td');
        const tdResponsible = document.createElement('td');
        const tdCreatedAt = document.createElement('td');
        const tdStatus = createSelect(order);

        row.setAttribute('id', order.id)

        tdService.innerHTML = order.service;
        tdDate.innerHTML = order.date;
        tdTime.innerHTML = order.time;
        tdTechnique.innerText = order.technique;
        tdRoute.innerText = order.route;
        tdWork.innerText = order.workActivity;
        tdRemark.innerText = order.remark;
        tdResponsible.innerText = order.responsiblePerson.lastname;
        tdCreatedAt.innerText = order.created_at;

        row.appendChild(tdService);
        row.appendChild(tdDate);
        row.appendChild(tdTime);
        row.appendChild(tdTechnique);
        row.appendChild(tdRoute);
        row.appendChild(tdWork);
        row.appendChild(tdRemark);
        row.appendChild(tdResponsible);
        row.appendChild(tdCreatedAt);
        row.appendChild(tdStatus);

        return row;
    };
    //
    const createSelect = (order) => {
        const tdSelect =  document.createElement('td');
        const container = document.createElement('div');
        const select = document.createElement('select');
        const btn = createBtn();

        container.classList = 'd-flex flex-row align-items-center column-gap-2';
        select.classList = 'form-select choice-status';

        select.setAttribute('aria-label', 'Default select example');

        const list = [
            'В рассмотрении',
            'Подтвердить',
            'Отклонить',
        ];
        list.forEach((elem, index) => {
            const option = document.createElement('option');
            option.setAttribute('value', (index).toString());
            if (+index === +order.status) option.selected = true;
            option.innerText = elem;
            select.appendChild(option);
        });

        addEventSelectStatusChange(select, btn);
        addEventBtnSave(btn, select, order);

        container.appendChild(select);
        container.appendChild(btn);
        tdSelect.appendChild(container);
        return tdSelect;
    };
    //
    const createBtn = () => {
        const btn = document.createElement('button');
        btn.classList = 'btn btn-secondary';
        btn.disabled = true;
        btn.innerHTML = '<img src="assets/image/save.png"/>';
        return btn;
    };
    //
    const addEventBtnSave = (btn, select, order) => {
        btn.addEventListener('click', async () => await saveChanges(select.value, order.id));
    };
    //
    const addEventSelectStatusChange = (select, btn) => {
        const initialStatus = select.value; // Сохраняем начальное значение
        select.addEventListener('change', (event) => btn.disabled =  event.target.value === initialStatus);
    };
    //
    const addEventSelectChange = () => {
        const select = document.querySelector('.form-select');
        select.addEventListener('change', () => {
            drawTable(select.value);
        });
    };


    // Основной блок кода, который выполняет начальные операции при загрузке скрипта.
    drawTable(0);
    addEventSelectChange();
});