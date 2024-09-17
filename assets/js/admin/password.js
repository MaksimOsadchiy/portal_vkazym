document.addEventListener('DOMContentLoaded', () => {
    drawSelect();
    addEventResetPassBtn();
});

const updatePassword = async (id, params, table) =>{

    try {
        const response = await fetch(`${SERVER_URL}/admin/update_pass.php`, {
            method: 'PUT', // Используем PUT для изменения данных
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                table: table, //Название таблицы
                id: id, // ID пользователя, которого обновляем
                params: params  // Параметры для обновления
            }),
        });
        const jsonResponse = await response.json(); // Получаем тело ответа в формате JSON
        if (!response.ok) {
            throw new Error(jsonResponse.error || 'Ошибка обновления данных');
        }
        document.dispatchEvent(new CustomEvent('updateError', { detail: 'Пароль сохранен!' }));
        return true;
    } catch (error) {
        console.error('Ошибка:', error);
        document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
        return false;
    }
}



const addEventResetPassBtn = () => {

    document.querySelector('.btn-reset-password').addEventListener('click', () => {
        const selectElement = document.querySelector('.select-user');
        const selectedOption = selectElement.options[selectElement.selectedIndex];
       //Получаем id
        const selectedValue = selectedOption.value;
        const table = 'passwords'
        const userInput = document.querySelector('.input-password').value.trim();
        if (selectedValue === '-1') {
            document.dispatchEvent(new CustomEvent('updateError', { detail: 'Выберите пользователя!' }));
            return;
        }

        if (userInput === '') {
            document.dispatchEvent(new CustomEvent('updateError', { detail: 'Введите новый пароль!' }));
            return;
        }
        // Подготовка данных для отправки
        const params = {
            columnName: 'password',  // Имя колонки, которую обновляем (например, 'login')
            newValue: userInput   // Новое значение
        };
        updatePassword(selectedValue, params, table);
        console.log("Selected element:", selectElement);
        console.log("Selected value:", selectedValue);
        console.log("current input text:", userInput);
    });
}

//Присвоение Id каждому айтему dom-элемента
const createTypeRow = (id, content) => {
    const row = document.createElement('option');

    row.setAttribute('value', id);

    row.innerText = content;

    return row;
};

//Вывод списка учетных записей
const drawSelect = () => {
    const select = document.querySelector('.select-user');
    select.innerHTML = `<option value="-1" selected>Выберите учётную запись</option>`;
    const listUsers = {};
    all_users.forEach((obj) => {
        if (obj.id in listUsers) return;
        select.appendChild(createTypeRow(obj.id, obj.login));
        listUsers[obj.id] = obj.login;
    });
};


