document.addEventListener('DOMContentLoaded', () => {
    createFrame();
    drawApps();
    drawLinks();
});

function createFrame() {
    let container = document.createElement('div');
    container.innerHTML = `
    <div class="container-xl pt-4 overflow-hidden text-center modules">
                <h2>Приложения для вас</h2>
                <div class="row row-modules gy-2"></div>
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

        buttonApp.className = 'btn btn-custom ' + color;

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
    buttonApp.className = 'btn link btn-custom';


    // Добавляем атрибуты
    // buttonApp.setAttribute('type', 'button');
    buttonApp.setAttribute('href', link);


    buttonApp.innerText = text;


    // Собираем части в единую строку
    divCol3.appendChild(buttonApp);

    return divCol3;
}
const drawApps = () => {
    const bodyTable = document.querySelector('.row-modules');
    bodyTable.innerText = '';
    all_modules.forEach((value) => {
        if (!SESSION.accessibility.some((elem) => elem.name === value.name)) return;
        if (SESSION.accessibility.some((elem) => elem.name === value.name && elem.privilege < 1)) return;
        const row = createApps(value.id, value.color, value.link, value.description);
        bodyTable.appendChild(row);
    });
};
const drawLinks = () => {
    const bodyTablel = document.querySelector('.row-links');
    bodyTablel.innerText = '';
    allLinks.forEach((value) => {
        const row = createLinks(value.id, value.link, value.description);
        bodyTablel.appendChild(row);
    });
};

