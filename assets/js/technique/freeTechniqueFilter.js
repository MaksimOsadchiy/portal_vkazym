document.addEventListener('DOMContentLoaded', () => {
    /**
     * Функция создает строку таблицы с заданными данными.
     *
     *	<tr class="techTable" value="ID">
     *		<td>номер</td>
     *		<td>модель</td>
     *		<td>Тип авто</td>
     *	</tr>
     *
     *
     */
    const createDefaultRow = (id, techniqueNumber, model, type) => {

        // Создаём DOM элементы
        const row = document.createElement('tr');
        const tdTechniqueNumber = document.createElement('td');
        const tdModel = document.createElement('td');
        const tdType = document.createElement('td');

        // Добавляем классы
        row.className = 'techTable';

        // Добавляем атрибуты
        row.setAttribute('value', id);
        tdTechniqueNumber.innerText = techniqueNumber;
        tdModel.innerText = model;
        tdType.innerText = type;

        // Собираем части в единую строку
        row.appendChild(tdTechniqueNumber);
        row.appendChild(tdModel);
        row.appendChild(tdType);


        return row;
    }
    /**
     * Функция отображает таблицу с выбранными параметрами
     * Добавляет фильтр по выбранному типу техники
     */
    const drowTableTechnique = () => {
        const bodyTable = document.querySelector('.technique-table').querySelector('tbody');

        // Получаем выбранное значение из <select>
        const selectElement = document.getElementById('technique-select');
        const selectedType = selectElement.options[selectElement.selectedIndex].text;

        // Фильтрация данных по выбранному типу
        const filteredData = allTechnique.filter(value => value['name'] === selectedType);

        bodyTable.innerText = '';
        filteredData.forEach((value) => {
            const row = createDefaultRow(value.id, value['state_number'], value['name_technique'], value['name']);
            bodyTable.appendChild(row);
        });


    };


    const selectTechnique = () =>{

    }


    document.getElementById('technique-select').addEventListener('change', drowTableTechnique);
    drowTableTechnique();
});

