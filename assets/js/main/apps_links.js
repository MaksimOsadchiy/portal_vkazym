document.addEventListener('DOMContentLoaded', () => {
    createFrame();
    drawApps();
    drawLinks();
});

function createFrame() {
    let container = document.createElement('div');
    container.innerHTML = `
    <div class="container-xl pt-4 overflow-hidden text-center apps">
                <h2>Приложения для вас</h2>
                <div class="row row-apps gy-2"></div>
    </div>
    <div class="container-xl pt-4 overflow-hidden text-center links">
                <h2>Полезные ссылки</h2>
                <div class="row row-links gy-2"></div>
    </div>
    `;
    document.body.appendChild(container);
}

const createApps = (id, color, link, text) => {

    // Создаём DOM элементы
    const divCol3 = document.createElement('div');
    const buttonApp = document.createElement('a');
    // Добавляем классы
    divCol3.className = 'col-3';

    if(privilege === 2 & link ==='appsForm.php' || privilege === 2 & link ==='technique.php'){
        buttonApp.className = 'btn btn-custom disabled';
    }
else{
        buttonApp.className = 'btn btn-custom ' + color;
    }





    // Добавляем атрибуты
    // buttonApp.setAttribute('type', 'button');
    buttonApp.setAttribute('href', link);


    buttonApp.innerText = text;


    // Собираем части в единую строку
    divCol3.appendChild(buttonApp);

    return divCol3;
}

const createLinks = (id, link, text) => {

    // Создаём DOM элементы
    const divCol3 = document.createElement('div');
    const buttonApp = document.createElement('a');

    // Добавляем классы
    divCol3.className = 'col-3';
    buttonApp.className = 'btn link';


    // Добавляем атрибуты
    // buttonApp.setAttribute('type', 'button');
    buttonApp.setAttribute('href', link);


    buttonApp.innerText = text;


    // Собираем части в единую строку
    divCol3.appendChild(buttonApp);

    return divCol3;
}
const drawApps = () => {
    const bodyTable = document.querySelector('.row-apps');
    bodyTable.innerText = '';
    const filteredDataApps = allLinks.filter((type) => type.type === 1);
    filteredDataApps.forEach((value) => {
        const row = createApps(value.id, value['color'], value['link'], value['text']);
        bodyTable.appendChild(row);
    });
};
const drawLinks = () => {
    const bodyTable1 = document.querySelector('.row-links');
    bodyTable1.innerText = '';
    const filteredDataApps = allLinks.filter((type) => type.type === 2);
    filteredDataApps.forEach((value) => {
        const row = createLinks(value.id, value['link'], value['text']);
        bodyTable1.appendChild(row);
    });
};

