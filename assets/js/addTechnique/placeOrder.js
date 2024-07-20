document.addEventListener('DOMContentLoaded', () => {
    //
    const createOrder = async () => {
        try {
            const request = getContent(); // Формируем тело запроса
            const response = await fetch(`${SERVER_URL}orders.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });
            const jsonResponse = response.json(); // Получаем тело ответа
            if (!response.ok) {
                throw new Error(jsonResponse.status);
            }
            ;
            document.dispatchEvent(
                new CustomEvent('updateError', {detail: 'Заказ отправлен на рассмотрение!'})
            );
        } catch (error) {
            document.dispatchEvent(
                new CustomEvent('updateError', {detail: error.message})
            );
        }
    };
    //
    const getContent = () => {
        const service = SESSION['service'];
        const technique = Array.from(document.querySelectorAll('.technique-select'))
            .map((elem) => elem.value)
            .filter((elem) => elem !== '');
        const route = document.querySelector('.route-select').value;
        const responsiblePerson = Array.from(
            document.querySelectorAll('.person-select')
        )
            .map((elem) => elem.value)
            .filter((elem) => elem !== '');
        const dateFrom = document.querySelector('.date-from').value;
        const dateTo = document.querySelector('.date-to').value;
        let timeFrom = document.querySelector('.time-from').value;
        let timeTo = document.querySelector('.time-to').value;
        const shift = Array.from(
            document.querySelectorAll('.form-check-input')
        ).find((elem) => elem.checked)?.value;

        // Обработчик времени
        // const shiftFrom = new Date(`${dateFrom}T${shift.slice(0, 5)}`);
        // const shiftTo = +shift[0] ? new Date(`${dateTo}T${shift.slice(0, 5)}`) : new Date(`${dateFrom}T${shift.slice(6, 11)}`);
        // const fullDateFrom = new Date(`${dateFrom}T${timeFrom}`);
        // const fullDateTo = new Date(`${dateTo}T${timeTo}`);
        // console.log(shiftFrom);
        // console.log(shiftTo);
        // console.log(fullDateFrom);
        // console.log(fullDateTo);
        // if (shift) {
        // 	let flag = fullDateFrom >= shiftFrom && fullDateTo <= shiftTo && fullDateFrom < fullDateTo
        // 	flag ? console.log('Верно') : console.log('Не верно');;
        // };

        if (!service) throw new Error('В сессии нет ID сервиса!')
        if (!technique.length) throw new Error('Обязательное поле: Техника!')
        if (!responsiblePerson.length) throw new Error('Обязательное поле: Ответственный!')
        if (!dateFrom || !dateTo) throw new Error('Введите дату начала и окончания работ!')
        if (!route) throw new Error('Выберите маршрут!')
        if (!(timeFrom && timeTo) && !shift) throw new Error('Введите время начала и окончания работ или выберите смену!')

        timeFrom = timeFrom ? timeFrom : shift.slice(0, 5);
        timeTo = timeTo ? timeTo : shift.slice(6, 11);

        const techniquePersonArray = technique.map((item, index) =>
            [item, responsiblePerson[index]]
        )

        // technique.forEach((item, index) => {
        //     if (item && responsiblePerson[index]) {
        //         techniquePersonArray.push([item, responsiblePerson[index]]);
        //     }
        // });
        const result =
            techniquePersonArray.map((subArr) => {
                const obj = {
                    service_id: +service,
                    technique_id: +subArr[0],
                    route_id: +route,
                    responsible_person_id: +subArr[1],
                    date_from: dateFrom,
                    date_to: dateTo,
                    time_from: timeFrom,
                    time_to: timeTo,
                };
                shift && (obj.shift = +shift[0] ? 1 : 0)
            });
        return result;
    };
    //
    const addEventCreateOrder = () => {
        const btnCreateOrder = document.querySelector('.create-order');
        // btnCreateOrder.addEventListener('click', () => getContent());
        btnCreateOrder.addEventListener('click', async () => await createOrder());
    };

    // Начало скрипта
    addEventCreateOrder();
});
