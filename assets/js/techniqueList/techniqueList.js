document.addEventListener('DOMContentLoaded', () => {
    //
    const drawList = (list) => {
        const ulElement = document.querySelector('.list');
        list.forEach((obj, index) => ulElement.appendChild(createLiElement(obj.description, obj.text, index, obj.href, list.length)));
    };
    //
    const createLiElement = (descr, text, index, href, len) => {
        const liElement = document.createElement('li');
        const descrElement = document.createElement('p');
        const textElement = document.createElement('p');
        const indexElement = document.createElement('span');

        liElement.className = (index === len - 1 && len % 2 !== 0) ? 'list__item list__item-last item d-flex flex-column row-gap-2 rounded-3' : 'list__item item d-flex flex-column row-gap-2 rounded-3';
        descrElement.className = 'item__description';
        textElement.className = 'item__text';
        indexElement.className = 'item__number';

        descrElement.innerText = descr;
        textElement.innerText = text;
        indexElement.innerText = index + 1;

        liElement.appendChild(descrElement);
        liElement.appendChild(textElement);
        liElement.appendChild(indexElement);

        addEventListElementClick(liElement, href);
        return liElement;
    };
    //
    const addEventListElementClick = (elem, href) => {
        elem.addEventListener('click', () => window.location.href = `${BASE_URL}${href}`);
    };


    //
    const list = [
        {
            description: 'УЗНАЙТЕ ДОСТУПНУЮ ТЕХНИКУ НА НУЖНЫЕ ДАТЫ.',
            text: 'Свободная техника',
            href: 'technique.php',
        },
        {
            description: 'ЗАКАЖИТЕ ТЕХНИКУ НА НУЖНЫЕ ДАТЫ.',
            text: 'Заказать технику',
            href: 'Add_technique.php',
        },
        {
            description: 'ВАШИ ЗАКАЗЫ ПО ТЕХНИКЕ, ИХ СТАТУСЫ И ДЕТАЛИ',
            text: 'Мои заказы',
            href: 'orderTechnique.php',
        },
        {
            description: 'КОНТРОЛЬ И УПРАВЛЕНИЕ ВСЕМИ ЗАКАЗАМИ ТЕХНИКИ',
            text: 'Заказанная техника',
            href: 'allOrders.php',
        },
    ];
    drawList(list);
});