document.addEventListener('DOMContentLoaded', async () => {
    //
    const getOneCrane = async () => {
        try {
            const url = new URL(window.location.href);
            const id = new URLSearchParams(url.search).get('id');
            const qparametr = `?id=${id}`;
            const response = await fetch(`${SERVER_URL}cranes/crane.php${qparametr}`);
            const jsonResponse = await response.json(); // Получаем тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

            return jsonResponse;
        } catch (error) {
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            return [];
        };
    };
    //
    const putCrane = async (data) => {
        try {
            const url = new URL(window.location.href);
            const id = new URLSearchParams(url.search).get('id');
            const qparametr = `?id=${id}`;
            const response = await fetch(`${SERVER_URL}cranes/malfunction.php${qparametr}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const jsonResponse = await response.json(); // Получаем тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

            document.dispatchEvent(new CustomEvent('updateError', { detail: 'Кран изменён!'})); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            return jsonResponse;
        } catch (error) {
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            return [];
        }
    };
    //
    const postImage = async (data) => {
        try {
            console.log(data);
            const url = new URL(window.location.href);
            const id = new URLSearchParams(url.search).get('id');
            const qparametr = `?id=${id}`;
            const formData = new FormData();
            formData.append('image', data);
            const response = await fetch(`${SERVER_URL}cranes/image.php${qparametr}`, {
                method: 'POST',
                body: formData,
            });
            const jsonResponse = await response.json(); // Получаем тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

            document.dispatchEvent(new CustomEvent('updateError', { detail: 'Фото добавленно!'})); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            return jsonResponse;
        } catch (error) {
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            return [];
        }
    };
    //
    const getImage = async () => {
        try {
            const url = new URL(window.location.href);
            const id = new URLSearchParams(url.search).get('id');
            const qparametr = `?id=${id}`;
            const response = await fetch(`${SERVER_URL}cranes/image.php${qparametr}`);
            const jsonResponse = await response.json(); // Получаем тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

            return jsonResponse;
        } catch (error) {
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            return [];
        };
    };
    //
    const drawTableMalfunction = (crane) => {
        const bodyTable = document.querySelector('.table-malfunction').querySelector('.tbody');
        for(const key in crane.secondary) {
            const title = crane.secondary[key].title;
            const value = crane.secondary[key].value;
            const list = crane[`list_${key}`];
            bodyTable.appendChild(createRowMalfunction(title, value, list, key));
        };
    };
    //
    const drawTableMainInfo = (crane) => {
        const bodyTable = document.querySelector('.table-main-info').querySelector('.tbody');
        for(const key in crane.mainInfo) {
            bodyTable.appendChild(createSection(key));
            for (const keyTwo in crane.mainInfo[key]){
                const title = crane.mainInfo[key][keyTwo].title;
                const value = crane.mainInfo[key][keyTwo].value;
               bodyTable.appendChild(createRowMainInfo(title, value));
            };
        };
    };
    //
    const drawImage = (url) => {
        const img = document.querySelector('.content__img-container').querySelector('.input__picture');
        img.setAttribute('src', url);
    };
    //
    const createSection = (name) => {
        const row = document.createElement('div');
        row.className = 'row-section text-center py-2';
        row.innerText = name;

        return row;
    };
    //
    const collectContent = () => {
       const bodyTable = document.querySelector('.table-malfunction').querySelector('.tbody');

       const result = {};
       const allRow = bodyTable.querySelectorAll('.t-row');
        allRow.forEach((row) => {
            const key = row.getAttribute('key');
            const isTextarea = row.lastChild.tagName === 'TEXTAREA';
            if (row.lastChild.value >= 0 && !isTextarea) {
                result[key] = craneData[`list_${key}`]
                    .find((el) => +el.id === +row.lastChild.value)
                    .name;
                if (key === 'result') {
                    document.querySelector('.table-main-info').querySelector(' .tbody').querySelectorAll('.t-row')[1].querySelectorAll('p')[1].innerText = result[key];
                };
            } else if (isTextarea && row.lastChild.value){
                result[key] = row.lastChild.value;
            };
        });

       return result;
    };
    //
    const createRowMalfunction = (title, name, list, attr) => {
        const row = document.createElement('div');
        const parameter = document.createElement('p');
        const status = createSelect(title, name, list);

        row.className = 't-row d-flex flex-row justify-content-center';
        row.setAttribute('key', attr);

        parameter.className = 'column th text-center';
        status.className = 'column th';

        parameter.innerText = title;

        row.appendChild(parameter);
        row.appendChild(status);

        return row
    };
    //
    const createRowMainInfo = (title, name) => {
        const row = document.createElement('div');
        const parameter = document.createElement('p');
        const status = document.createElement('p');

        row.className = 't-row d-flex flex-row justify-content-center';

        parameter.className = 'column th text-center';
        status.className = 'column th text-center';

        parameter.innerText = title;
        status.innerText = name;

        row.appendChild(parameter);
        row.appendChild(status);

        return row;
    };
    //
    const createSelect = (title, name, list) => {
        const select = document.createElement('select');
        const option = document.createElement('option');
        if (title === 'Итоговое состояние') {
            list.forEach((elem) => {
                const option = document.createElement('option');
                option.innerText = elem.description;
                option.value = elem.id;
                name == elem.name && (option.selected = true);
                select.appendChild(option);
            });
        } else {
            option.innerText = name;
            option.value = -1;
            option.selected = true;
            select.appendChild(option);
            list.forEach((elem) => {
                const option = document.createElement('option');
                option.innerText = elem.name;
                option.value = elem.id;
                name == elem.name && (option.selected = true) && (select.removeChild(select.firstChild));
                select.appendChild(option);
            });
        };
        return select;
    };
    const createTextarea = () => {
        const textarea = document.createElement('textarea');
        textarea.className = "column th";
        return textarea;
    };
    //
    const addEventBtnClick = () => {
        const btn = document.querySelector('.btn-save-malfunction');
        btn.addEventListener('click', async () => {
            const data = collectContent();
            await putCrane(data);
        });
    };
    //
    const addEventSelectOtherCheck = () => {
       const allSelect = document.querySelector('.table-malfunction').querySelectorAll('select');
        const list = [allSelect[1], allSelect[4]];
        list.forEach((elem) => {
            elem.addEventListener('change', () => {
                const str = elem.querySelector(`[value="${elem.value}"]`).textContent;
                if (str === 'Ввести свое значение') {
                    const parent = elem.parentNode;
                    parent.removeChild(elem);
                    parent.appendChild(createTextarea());
                };
            });
        });
    };
    //
    const addEventInputChang = () => {
        const input = document.querySelector('.input__file');
        input.addEventListener('change', (e) => {
            const choosedFile = e.target.files[0];
            if (choosedFile) {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    document
                        .querySelector('.input__picture')
                        .setAttribute('src', reader.result);
                    urlImg.push({photo_url: reader.result});
                    indexListUrl += 1;
                });
                reader.readAsDataURL(choosedFile)
                photoCrane = choosedFile;
            };
        });
    };
    //
    const addEventBtnSavePhoto = () => {
       const btn = document.querySelector('.btn-save-img');
       btn.addEventListener('click', async () => await postImage(photoCrane));
    };
    //
    const addEventBtnSlideClick = () => {
        const left = document.querySelector('.arrow-left');
        const right = document.querySelector('.arrow-right');
        urlImg.length > 1 && (right.disabled = false);
        left.addEventListener('click', () => {
            right.disabled = false;
            indexListUrl -= 1;
            drawImage(urlImg[indexListUrl].photo_url);
            indexListUrl - 1 < 0 && (left.disabled = true);
            console.log(urlImg);
        });
        right.addEventListener('click', () => {
            left.disabled = false;
            indexListUrl += 1;
            drawImage(urlImg[indexListUrl].photo_url);
            indexListUrl + 1 > urlImg.length - 1 && (right.disabled = true);
        });
    };


    //
    let photoCrane;
    let indexListUrl = 0;
    const urlImg = await getImage();
    let craneData = await getOneCrane();
    drawTableMalfunction(craneData);
    drawTableMainInfo(craneData);
    if (urlImg.length) drawImage(urlImg[0].photo_url);
    addEventBtnClick();
    addEventSelectOtherCheck();
    addEventInputChang();
    addEventBtnSavePhoto();
    addEventBtnSlideClick();
});