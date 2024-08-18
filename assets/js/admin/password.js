document.addEventListener('DOMContentLoaded', () => {
    drawSelect();
    addEventResetPassBtn();
});

const addEventResetPassBtn = () => {



    document.querySelector('.btn-reset-password').addEventListener('click', () => {
// Получаем выбранное значение из <select>
        const selectElement = document.getElementById('select-user');
        const selectedType = selectElement.options[selectElement.selectedIndex].id;
        alert(selectElement)
        console.log(selectElement);
        console.log(selectedType);
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


