document.addEventListener("DOMContentLoaded", () => {
    //
    const getOrders = async (param) => {
        try {
            const qparametr = `?id=${SESSION.id}&status=${param}`; // Устанавливаем кверипараметры
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
        const tdDate = document.createElement('td');
        const tdTime = document.createElement('td');
        const tdTechnique = document.createElement('td');
        const tdRoute = document.createElement('td');
        const tdWork = document.createElement('td');
        const tdRemark = document.createElement('td');
        const tdResponsible = document.createElement('td');
        const tdCreatedAt = document.createElement('td');

        tdDate.innerHTML = order.date;
        tdTime.innerHTML = order.time;
        tdTechnique.innerText = order.technique;
        tdRoute.innerText = order.route;
        tdWork.innerText = order.workActivity;
        tdRemark.innerText = order.remark;
        tdResponsible.innerText = order.responsiblePerson.lastname;
        tdCreatedAt.innerText = order.created_at;

        row.appendChild(tdDate);
        row.appendChild(tdTime);
        row.appendChild(tdTechnique);
        row.appendChild(tdRoute);
        row.appendChild(tdWork);
        row.appendChild(tdRemark);
        row.appendChild(tdResponsible);
        row.appendChild(tdCreatedAt);

        return row;
    };
    //
    const addEventSelectChange = () => {
       const select = document.querySelector('.form-select');
       select.addEventListener('change', () => {
           drawTable(select.value);
       });
    };


    // Основной блок кода, который выполняет начальные операции при загрузке скрипта.
    drawTable();
    addEventSelectChange();
});