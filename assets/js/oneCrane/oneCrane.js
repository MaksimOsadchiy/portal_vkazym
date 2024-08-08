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
            const url = new URL(window.location.href);
            const id = new URLSearchParams(url.search).get('id');
            const qparametr = `?id=${id}`;
            const formData = new FormData();
            formData.append('image', data);
            formData.append('accessories', craneData.mainInfo['Основное'].accessories.value);
            formData.append('name_highways', craneData.mainInfo['Основное'].name_highways.value);
            formData.append('location_crane', craneData.mainInfo['Основное'].location_crane.value);
            formData.append('technical_number', craneData.mainInfo['Основное'].technical_number.value);

            const response = await fetch(`${SERVER_URL}cranes/image.php${qparametr}`, {
                method: 'POST',
                body: formData,
            });
            const jsonResponse = await response.json(); // Получаем тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

            document.dispatchEvent(new CustomEvent('updateError', { detail: 'Фото добавлено!'})); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            return jsonResponse;
        } catch (error) {
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            return [];
        }
    };
    //
    const deletePhoto = async (name) => {
        try {
            const url = new URL(window.location.href);
            const id = new URLSearchParams(url.search).get('id');
            console.log(name);
            const qparametr = `?id=${id}&name=${name}`;

            const response = await fetch(`${SERVER_URL}cranes/image.php${qparametr}`, {
                method: 'DELETE',
            });
            const jsonResponse = await response.json(); // Получаем тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

            document.dispatchEvent(new CustomEvent('updateError', { detail: 'Фото удалено!'})); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
        } catch (error) {
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
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
    const postDocument = async (data) => {
        try {
            const url = new URL(window.location.href);
            const id = new URLSearchParams(url.search).get('id');
            const qparametr = `?id=${id}`;
            const formData = new FormData();
            formData.append('image', data);
            formData.append('accessories', craneData.mainInfo['Основное'].accessories.value);
            formData.append('name_highways', craneData.mainInfo['Основное'].name_highways.value);
            formData.append('location_crane', craneData.mainInfo['Основное'].location_crane.value);
            formData.append('technical_number', craneData.mainInfo['Основное'].technical_number.value);

            const response = await fetch(`${SERVER_URL}cranes/document.php${qparametr}`, {
                method: 'POST',
                body: formData,
            });
            const jsonResponse = await response.json(); // Получаем тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

            document.dispatchEvent(new CustomEvent('updateError', { detail: 'Документ добавлен!'})); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            return jsonResponse;
        } catch (error) {
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            return false;
        }
    };
    //
    const getDocument = async () => {
        try {
            const url = new URL(window.location.href);
            const id = new URLSearchParams(url.search).get('id');
            const qparametr = `?id=${id}`;
            const response = await fetch(`${SERVER_URL}cranes/document.php${qparametr}`);
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
                const value = key === 'Исправность' ? crane.mainInfo[key][keyTwo].description : crane.mainInfo[key][keyTwo].value;
               bodyTable.appendChild(createRowMainInfo(title, value));
            };
        };
    };
    //
    const drawImage = (url, name) => {
        const img = document.querySelector('.content__img-container').querySelector('.input__picture');
        img.setAttribute('src', url);
        img.setAttribute('name', name);
    };
    //
    const drawDocument = (data) => {
        const container = document.querySelector('.document-container');
        data.forEach((obj) => container.appendChild(createRowDocument(obj.document_url, obj.name)));
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
    const createRowDocument = (ref, name) => {
       const row = document.createElement('div');
       const link = document.createElement('a');

       row.className = 'document-row my-1 py-1 fs-5';
       link.className = 'document-link';

       link.setAttribute('href', ref);
       link.setAttribute('download', name);

       link.innerText = name;

       row.appendChild(link);
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
                    document.querySelector('.table-main-info')
                        .querySelector(' .tbody')
                        .querySelectorAll('.t-row')[1]
                        .querySelectorAll('p')[1]
                        .innerText = craneData.list_result.find((elem) => +elem.name === +result[key])
                        .description;
                };
            } else if (isTextarea && row.lastChild.value){
                result[key] = row.lastChild.value;
            };
        });

        return result;
    };
    //
    const addEventBtnMalfunctionClick = () => {
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
                    document
                        .querySelector('.input__picture')
                        .setAttribute('name', urlImg.length + 1);
                    document.querySelector('.btn-save-img')
                        .disabled = false;
                    document.querySelector('.btn-delete-img')
                        .disabled = false;
                    const obj = {photo_url: reader.result, name: urlImg.length + 1, file: choosedFile};
                    urlImg.push(obj);
                    if (urlImg.length > 1) {
                        document.querySelector('.arrow-left').disabled = false;
                        document.querySelector('.arrow-right').disabled = true;
                        document.querySelector('.arrow-right').classList.remove('arrow-active');
                    };
                    indexListUrl = urlImg.length - 1;
                });
                reader.readAsDataURL(choosedFile);
                photoCrane = choosedFile;
            };
        });
    };
    //
    const addEventBtnSavePhoto = () => {
       const btn = document.querySelector('.btn-save-img');
       btn.addEventListener('click', async () => {
           const data = await postImage(urlImg[indexListUrl].file);
           urlImg[indexListUrl] = data;
           drawImage(data.photo_url, data.name);
           btn.disabled = true;
       });
    };
    // Переделать логику !!!!!!!!
    const addEventBtnDeletePhoto = () => {
       const btn = document.querySelector('.btn-delete-img');
       const img =  document.querySelector('.input__picture');
        btn.addEventListener('click', async () => {
            const name = img.getAttribute('name');
            if (!urlImg[indexListUrl].file) {
                await deletePhoto(name);
            };
            urlImg = urlImg.filter((elem) => elem.name != name);
            if (indexListUrl - 1 >= 0) {
                drawImage(urlImg[indexListUrl - 1].photo_url, urlImg[indexListUrl - 1].name);
                const btnSave = document.querySelector('.btn-save-img');
                urlImg[indexListUrl - 1].file ? btnSave.disabled = false : btnSave.disabled = true;
                indexListUrl -= 1;
                if (+indexListUrl === 0) {
                    const arrow = document.querySelector('.arrow-left');
                    arrow.classList.remove('arrow-active');
                    arrow.disabled = true;
                };
            } else if (urlImg.length) {
                drawImage(urlImg[indexListUrl].photo_url, urlImg[indexListUrl].name);
                const btnSave = document.querySelector('.btn-save-img');
                urlImg[indexListUrl].file ? btnSave.disabled = false : btnSave.disabled = true;
                const arrow = document.querySelector('.arrow-left');
                arrow.classList.remove('arrow-active');
                arrow.disabled = true;
                if (+indexListUrl === urlImg.length - 1) {
                    const arrow = document.querySelector('.arrow-right');
                    arrow.classList.remove('arrow-active');
                    arrow.disabled = true;
                };
            } else {
                img.setAttribute('src', `${BASE_URL}assets/image/tempImg.png`);
                img.setAttribute('name', '');
                btn.disabled = true;
                document.querySelector('.btn-save-img').disabled = true;
            };
        });
    };
    //
    const addEventBtnSlideClick = () => {
        const left = document.querySelector('.arrow-left');
        const right = document.querySelector('.arrow-right');
        const saveBtn = document.querySelector('.btn-save-img');
        const deleteBtn = document.querySelector('.btn-delete-img');
        if (urlImg.length === 0) deleteBtn.disabled = true
        if (urlImg.length > 1) {
            right.classList.add('arrow-active');
            right.disabled = false;
        };
        left.addEventListener('click', () => {
            right.disabled = false;
            right.classList.add('arrow-active');
            indexListUrl -= 1;
            drawImage(urlImg[indexListUrl].photo_url, urlImg[indexListUrl].name);
            indexListUrl - 1 < 0 && (left.disabled = true) && (left.classList.remove('arrow-active'));
            urlImg[indexListUrl].file ? saveBtn.disabled = false : saveBtn.disabled = true;
        });
        right.addEventListener('click', () => {
            left.disabled = false;
            left.classList.add('arrow-active');
            indexListUrl += 1;
            drawImage(urlImg[indexListUrl].photo_url, urlImg[indexListUrl].name);
            indexListUrl + 1 > urlImg.length - 1 && (right.disabled = true) && (right.classList.remove('arrow-active'));
            urlImg[indexListUrl].file ? saveBtn.disabled = false : saveBtn.disabled = true;
        });
    };
    //
    const addEventInputLoadDocument = () => {
        const input = document.querySelector('.input_document');
        input.addEventListener('change', async (e) => {
            const choosedFile = e.target.files[0];
            if (choosedFile) {
                const documentCrane = choosedFile;
                const newDocument = await postDocument(documentCrane);
                newDocument && drawDocument([newDocument]);
                e.target.value = '';
            };
        });
    };


    //
    let photoCrane;
    let indexListUrl = 0;
    let urlImg = await getImage();
    const documentUrl = await getDocument();
    let craneData = await getOneCrane();
    drawTableMalfunction(craneData);
    drawTableMainInfo(craneData);
    urlImg.length && drawImage(urlImg[0].photo_url, urlImg[0].name);
    documentUrl.length && drawDocument(documentUrl);
    addEventBtnMalfunctionClick();
    addEventSelectOtherCheck();
    addEventInputChang();
    addEventBtnSavePhoto();
    addEventBtnDeletePhoto();
    addEventBtnSlideClick();
    addEventInputLoadDocument();
});