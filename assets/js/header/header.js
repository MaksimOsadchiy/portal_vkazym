document.addEventListener('DOMContentLoaded', () => {
    //
    const drawHeaderInfo = () => {
        const header = document.querySelector('header');
        const urlList = new URL(window.location.href).pathname.split("/");
        const namePage = urlList[urlList.length - 1].split(".")[0];

        const href = namePage === "log" ? `${BASE_URL}reg.php` : `${BASE_URL}log.php`
        const text = namePage === "log" ? `Регистрация` : `Войти`

        SESSION.length != 0 ? header.appendChild(drawDataAcc()) : header.appendChild(drawLink(href, text));
    };
    //
    const drawLink = (href, text, style = 'header-link') => {
        const link = document.createElement('a');
        link.className = style;
        link.setAttribute('href', href);
        link.innerText = text;
        return link;
    };
    //
    const drawDataAcc = () => {
        const container = document.createElement('div');
        const nickName = document.createElement('p');

        container.className = 'd-flex flex-row align-items-center column-gap-3';
        // nickName.className = '';

        nickName.innerText = SESSION.login;

        const href = `${BASE_URL}logout.php`;
        container.appendChild(nickName);
        container.appendChild(drawLink(href, 'Выход', 'header-link link-danger'));
        return container;
    };


    //
    drawHeaderInfo();
});