document.addEventListener('DOMContentLoaded', async () => {
    //
    const getOneCrane = async () => {
        try {
            const url = new URL(window.location.href);
            const id = new URLSearchParams(url.search).get('id');
            const response = await fetch(`${SERVER_URL}/cranes/crane.php?id=${id}`);
            const jsonResponse = await response.json(); // Получаем тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

            return jsonResponse;
        } catch (error) {
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            return [];
        }
    };
    //
    const drawTableMalfunction = (crane) => {
        const bodyTable = document.querySelector('.table-malfunction').querySelector('.tbody');
        const obj = {
            result: 'Итоговое состояние',
            general_description: "Особенности",
            tightness: "Герметичность ШЗ",
            leakage: "Утечка по ТПА",
            act_leakage: "АКТ о негерметичности",
            drainage: "Наличие дренажных линий",
            pipelines: "Наличие набивочных линий",
        };

        for(const key in crane.secondary) {
            bodyTable.appendChild(createRowMalfunction(obj[key], crane.secondary[key]));
        };

    };
    //
    const collectContent = () => {
       const bodyTable = document.querySelector('.table-malfunction').querySelector('.tbody');
       const obj = {
           1: {
               name: 'result',
               func: craneData.list_results,
           },
           2: {
               name: 'general_description',
               func: craneData.general_description,
           },
           3: {
               name: 'tightness',
               func: craneData.tightness,
           },
           4: {
               name: 'leakage',
               func: craneData.list_leakages,
           },
           5: {
               name: 'act_leakage',
               func: craneData.list_results,
           },
           6: {
               name: 'drainage',
               func: craneData.list_strapping,
           },
           7: {
               name: 'packing_pipelines',
               func: craneData.list_strapping,
           },
       };

       const result = {};
       bodyTable.querySelectorAll('.t-row').forEach((elem, index) => { // ДОДЕЛАТЬ...
           if (elem.lastChild.value >= 0 && elem.lastChild.value !== '') {
               result[obj[index][name]] = obj[index][func].find((el) => +el.id === +elem.lastChild.value);
               console.log(obj[index][func].find((el) => +el.id === +elem.lastChild.value))
           };
       });
       console.log(result);
    };
    //
    const createRowMalfunction = (nameParameter, name_status) => {
        const row = document.createElement('div');
        const parameter = document.createElement('p');
        let status;
        if (nameParameter !== "Утечка по ТПА") {
            status = createSelect(nameParameter, name_status);
        } else {
            status = document.createElement('input');
            status.setAttribute('type', 'number');
            status.setAttribute('min', '0');
            status.setAttribute('max', '10');
        };

        row.className = 't-row d-flex flex-row justify-content-center';

        parameter.className = 'column th text-center';
        status.className = 'column th';

        parameter.innerText = nameParameter;

        row.appendChild(parameter);
        row.appendChild(status);

        return row
    };
    //
    const createSelect = (nameParameter, name_status) => {
        const obj = {
            "Итоговое состояние": craneData.list_results,
            "Особенности": craneData.general_description,
            "Герметичность ШЗ": craneData.tightness,
            "Утечка по ТПА": [],
            "АКТ о негерметичности": craneData.list_leakages,
            "Наличие дренажных линий": craneData.list_strapping,
            "Наличие набивочных линий": craneData.list_strapping,
        };

        const select = document.createElement('select');
        if (!name_status) {
            const option = document.createElement('option');
            option.innerText = '';
            option.value = -1;
            option.selected = true;
            select.appendChild(option);
        };
        obj[nameParameter].forEach((elem) => {
            const option = document.createElement('option');
            option.innerText = elem.name;
            option.value = elem.id;
            name_status == elem.name && (option.selected = true) && !name_status && (select.removeChild(select.firstChild));
            select.appendChild(option);
        });

        return select;
    };
    //
    const addEventBtnClick = () => {
        const btn = document.querySelector('.btn-save-malfunction');
        btn.addEventListener('click', () => {
            collectContent();
        });
    };


    //
    let craneData = await getOneCrane();
    // console.log(craneData);
    drawTableMalfunction(craneData);
    addEventBtnClick();
});