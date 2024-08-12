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
    const putCrane = async () => {
        try {
            const url = new URL(window.location.href);
            const id = new URLSearchParams(url.search).get('id');
            const qparametr = `?id=${id}`;
            const [data, obj] = collectContentChangeMalfunction();
            if (Object.keys(obj).length) await postIdentifiedFaults(obj);
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
            formData.append('crane_class', craneData.mainInfo['Основное'].crane_class.value);
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
            formData.append('crane_class', craneData.mainInfo['Основное'].crane_class.value);
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
    const getMaintenance = async () => {
        try {
            const url = new URL(window.location.href);
            const id = new URLSearchParams(url.search).get('id');
            const qparametr = `?id=${id}`;
            const response = await fetch(`${SERVER_URL}cranes/maintenance.php${qparametr}`);
            const jsonResponse = await response.json(); // Получаем тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

            jsonResponse.reverse();
            return jsonResponse;
        } catch (error) {
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            return [];
        };
    };
    //
    const getTypesWork = async () => {
        try {
            const response = await fetch(`${SERVER_URL}cranes/typesMaintenance.php`);
            const jsonResponse = await response.json(); // Получаем тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

            return jsonResponse;
        } catch (error) {
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            return [];
        };
    };
    //
    const getIdentifiedFaults = async () => {
        try {
            const url = new URL(window.location.href);
            const id = new URLSearchParams(url.search).get('id');
            const qparametr = `?id=${id}`;
            const response = await fetch(`${SERVER_URL}cranes/identifiedFaults.php${qparametr}`);
            const jsonResponse = await response.json(); // Получаем тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

            return jsonResponse;
        } catch (error) {
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            return [];
        };
    }
    //
    const postNewMaintenance = async () => {
        try {
            const url = new URL(window.location.href);
            const id = new URLSearchParams(url.search).get('id');
            const qparametr = `?id=${id}`;
            const data = collectContentPostMaintenance();

            const response = await fetch(`${SERVER_URL}cranes/maintenance.php${qparametr}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const jsonResponse = await response.json(); // Получаем тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

            document.dispatchEvent(new CustomEvent('updateError', { detail: 'ТОиР добавлен!'})); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            clearDataModalWindow();
            const newObj = {
                id: +jsonResponse,
                login: SESSION['login'],
                date: data.date,
                type_maintenance: data.typeWork,
                service: SESSION['service'],
                content_work: data.contentWork,
                result: data.result,
            };
            maintenance = [newObj, ...maintenance];
            drawTableAffiliation(maintenance);
            return jsonResponse;
        } catch (error) {
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            return false;
        }
    };
    //
    const postIdentifiedFaults = async (data) => {
        try {
            const url = new URL(window.location.href);
            const id = new URLSearchParams(url.search).get('id');
            const qparametr = `?id=${id}`;

            const response = await fetch(`${SERVER_URL}cranes/identifiedFaults.php${qparametr}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const jsonResponse = await response.json(); // Получаем тело ответа
            if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

            document.dispatchEvent(new CustomEvent('updateError', { detail: 'Неисправность добавлена!'})); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            clearDataIdentifiedFaults();
            const newObj = {
                id: +jsonResponse,
                id_fitting: 6,
                possible_cause: data.possibleCause,
                id_user_detection: data.userDetectionId,
                id_user_troubleshooting: data.completeActivities ? data.userDetectionId : '',
                complete_activities: data.completeActivities ? data.completeActivities : '',
                note: data.note ? data.note : '',
                date_detection: data.dateDetection,
                date_troubleshooting: data.dateTroubleshooting ? data.dateTroubleshooting : '',
            };
            identifiedFaults = [newObj, ...identifiedFaults];
            drawTableIdentifiedFaults(identifiedFaults);
            return jsonResponse;
        } catch (error) {
            document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
            return false;
        }
    }
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
    const drawImage = (obj) => {
        const img = document.querySelector('.content__img-container').querySelector('.input__picture');

        const btnSave = document.querySelector('.btn-save-img');
        const btnDelete = document.querySelector('.btn-delete-img');

        const arrowLeft = document.querySelector('.arrow-left');
        const arrowRight = document.querySelector('.arrow-right');

        img.setAttribute('src', obj.photo_url);
        img.setAttribute('name', obj.name);

        obj.name === '' ? btnDelete.disabled = true : btnDelete.disabled = false;
        obj.file ? btnSave.disabled = false : btnSave.disabled = true;

        if (urlImg.length < 2) {
            [arrowLeft, arrowRight].forEach(elem => {
                elem.disabled = true;
                elem.classList.remove('arrow-active');
            });
        } else {
            if (urlImg.length - 1 === indexListUrl) {
                arrowLeft.disabled = false;
                arrowRight.disabled = true;
                arrowLeft.classList.add('arrow-active');
                arrowRight.classList.remove('arrow-active');
            } else if (!indexListUrl) {
                arrowLeft.disabled = true;
                arrowRight.disabled = false;
                arrowLeft.classList.remove('arrow-active');
                arrowRight.classList.add('arrow-active');
            } else {
                [arrowLeft, arrowRight].forEach(elem => {
                    elem.disabled = false;
                    elem.disabled = false;
                    arrowRight.classList.add('arrow-active');
                });
            };
        };
    };
    //
    const drawDocument = (data) => {
        const container = document.querySelector('.document-container');
        data.forEach((obj) => container.appendChild(createRowDocument(obj.document_url, obj.name)));
    };
    //
    const drawTableAffiliation = (maintenance) => {
        const bodyTable = document.querySelector('.table-affiliation').querySelector('.tbody');
        bodyTable.innerText = '';
        maintenance.forEach((elem) => {
            const list = [
                elem.date.slice(0,10),
                elem.type_maintenance,
                elem.service,
                elem.content_work,
                elem.result,
                elem.login,
            ];
            bodyTable.appendChild(createRowMaintenanceIdentifiedFaults(list));
        });
    };
    //
    const drawDataOnWindowAffiliation = (types) => {
        const modalWindow = document.querySelector('.modal-content');
        const date = modalWindow.querySelector('.check-datetime');
        const select = modalWindow.querySelector('.form-select');

        const nowDate = new Date().toISOString().split('T')[0];
        date.value = nowDate;
        types.forEach((elem) => select.appendChild(createOption(elem.name)));
    };
    //
    const drawTableIdentifiedFaults = (identifiedFaults) => {
        const bodyTable = document.querySelector('.table-identified-faults').querySelector('.tbody');
        bodyTable.innerText = '';
        identifiedFaults.forEach((elem) => {
            const list = [
                elem.date_detection,
                elem.id_user_detection,
                elem.possible_cause,
                elem.date_troubleshooting ? elem.date_troubleshooting : '-',
                elem.complete_activities ? elem.complete_activities : '-',
                elem.id_user_troubleshooting ? elem.id_user_troubleshooting : '-',
                elem.note ? elem.note : '-',
            ];
            bodyTable.appendChild(createRowMaintenanceIdentifiedFaults(list));
        });
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
    const createRowMaintenanceIdentifiedFaults = (list) => {
        const row = document.createElement('div');

        row.className = 't-row d-flex flex-row justify-content-center';
        for (let i = 0; i < list.length; i++) {
            const content = document.createElement('p');
            content.className = 'column th text-center';
            content.innerText = list[i];
            row.appendChild(content);
        };

        return row;
    };
    //
    const createOption = (name) => {
       const option = document.createElement('option');
       option.setAttribute('value', name);
       option.innerText = name;
       return option;
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
                name == elem.description && (option.selected = true);
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
    const collectContentChangeMalfunction = () => {
        const bodyTable = document.querySelector('.table-malfunction').querySelector('.tbody');
        const identifiedFaultsContainer = document.querySelector('.content__identified-faults');

        const resultTable = {};
        const allRow = bodyTable.querySelectorAll('.t-row');
        allRow.forEach((row) => {
            const key = row.getAttribute('key');
            const isTextarea = row.lastChild.tagName === 'TEXTAREA';
            if (row.lastChild.value >= 0 && !isTextarea) {
                resultTable[key] = craneData[`list_${key}`]
                    .find((el) => +el.id === +row.lastChild.value)
                    .name;
                if (key === 'result') {
                    document.querySelector('.table-main-info')
                        .querySelector(' .tbody')
                        .querySelectorAll('.t-row')[1]
                        .querySelectorAll('p')[1]
                        .innerText = craneData.list_result.find((elem) => +elem.name === +resultTable[key])
                        .description;
                };
            } else if (isTextarea && row.lastChild.value){
                resultTable[key] = row.lastChild.value;
            };
        });
        // -----
        const possibleCause = identifiedFaultsContainer.querySelector('.possible-cause').value.trim();
        let obj = {};
        if (possibleCause) {
            const dateDetection = identifiedFaultsContainer.querySelector('.identified-faults-date-from').value;
            if (!dateDetection) throw new Error('Введите дату обнаружения неисправности!');
            obj = {
                dateDetection: dateDetection,
                possibleCause: possibleCause,
                userDetectionId: SESSION['id'],
            };
            const completeActivities = identifiedFaultsContainer.querySelector('.complete-activities').value.trim();
            if (completeActivities) {
                const dateTroubleshooting =  identifiedFaultsContainer.querySelector('.identified-faults-date-to').value;
                const note =  identifiedFaultsContainer.querySelector('.note').value.trim();
                if (!dateTroubleshooting) throw new Error('Введите дату устранения неисправности!');
                obj.completeActivities = completeActivities;
                obj.dateTroubleshooting = dateTroubleshooting;
                if (note) obj.note = note;
            };
        };

        return [resultTable, obj];
    };
    //
    const collectContentPostMaintenance = () => {
        const modalBody = document.querySelector('.modal-body');
        const date = modalBody.querySelector('.check-datetime').value;
        const typeWork = modalBody.querySelector('.form-select').value;
        const contentWork = modalBody.querySelector('.content-work').value;
        const result = modalBody.querySelector('.result-work').value;
        const userId = SESSION.id;

        if (!date) throw new Error('Введите дату!');
        if (typeWork == -1) throw new Error('Введите вид работы!');
        if (!contentWork) throw new Error('Введите содержание работы!');
        if (!result) throw new Error('Введите заключение работы!');

        const obj = {
            date,
            typeWork,
            contentWork,
            result,
            userId,
        };

        return obj;
    };
    //
    const clearDataModalWindow = () => {
        const modalBody = document.querySelector('.modal-body');
        modalBody.querySelector('.form-select').value = -1;
        modalBody.querySelector('.content-work').value = '';
        modalBody.querySelector('.result-work').value = '';
    };
    //
    const clearDataIdentifiedFaults = () => {
        const container = document.querySelector('.content__identified-faults');
        container.querySelectorAll('textarea').forEach((elem) => elem.value = '');
        container.querySelectorAll('input').forEach((elem) => elem.value = '');
    };
    //
    const addEventBtnMalfunctionClick = () => {
        const btn = document.querySelector('.btn-save-malfunction');
        btn.addEventListener('click', async () => await putCrane());
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
                    const imgData = {photo_url: reader.result, name: urlImg.length + 1, file: choosedFile};
                    urlImg.push(imgData);
                    indexListUrl = urlImg.length - 1;
                    drawImage(imgData);
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
           const imgData = await postImage(urlImg[indexListUrl].file);
           urlImg[indexListUrl] = imgData;
           drawImage(imgData);
       });
    };
    //
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
                indexListUrl -= 1;
                drawImage(urlImg[indexListUrl]);
            } else if (urlImg.length) {
                drawImage(urlImg[indexListUrl]);
            } else {
                const imgData = {
                    photo_url: `${BASE_URL}assets/image/tempImg.png`,
                    name: '',
                };
                drawImage(imgData);
            };
        });
    };
    //
    const addEventBtnSlideClick = () => {
        const left = document.querySelector('.arrow-left');
        const right = document.querySelector('.arrow-right');
        left.addEventListener('click', () => {
            indexListUrl -= 1;
            drawImage(urlImg[indexListUrl]);
        });
        right.addEventListener('click', () => {
            indexListUrl += 1;
            drawImage(urlImg[indexListUrl]);
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
    const addEventBtnSaveNewMaintenance = () => {
        const btn = document.querySelector('.btn-save-new-maintenance');
        btn.addEventListener('click', () => postNewMaintenance());
    };
    //
    const addEventInputPossibleCauseChange = () => {
       const textarea = document.querySelector('.possible-cause');
       const container = document.querySelector('.content__identified-faults');
       textarea.addEventListener('input', () => {
           if (textarea.value.trim().length > 0){
               container.querySelector('.identified-faults-date-to').disabled = false;
               container.querySelector('.complete-activities').disabled = false;
           } else {
               const dateTo = container.querySelector('.identified-faults-date-to');
               const complete = container.querySelector('.complete-activities');
               const note = container.querySelector('.note');
               [dateTo, complete, note].forEach((elem) =>{
                   elem.disabled = true;
                   elem.value = '';
               });
           };
       });
    };
    //
    const addEventInputCompleteActivitiesChange = () => {
        const textarea = document.querySelector('.complete-activities');
        const container = document.querySelector('.content__identified-faults');
        textarea.addEventListener('input', () => {
            const note = container.querySelector('.note');
            if (textarea.value.trim().length > 0) {
                note.disabled = false;
            } else {
                note.disabled = true;
                note.value = '';
            };
        });
    };



    //
    let photoCrane;
    let indexListUrl = 0;
    let urlImg = await getImage();
    const documentUrl = await getDocument();
    let craneData = await getOneCrane();
    let maintenance = await getMaintenance();
    const typesWork = await getTypesWork();
    let identifiedFaults = await getIdentifiedFaults();
    drawTableMalfunction(craneData);
    drawTableMainInfo(craneData);
    urlImg.length && drawImage(urlImg[0]);
    documentUrl.length && drawDocument(documentUrl);
    drawTableAffiliation(maintenance);
    drawDataOnWindowAffiliation(typesWork);
    drawTableIdentifiedFaults(identifiedFaults);
    addEventBtnMalfunctionClick();
    addEventSelectOtherCheck();
    addEventInputChang();
    addEventBtnSavePhoto();
    addEventBtnDeletePhoto();
    addEventBtnSlideClick();
    addEventInputLoadDocument();
    addEventBtnSaveNewMaintenance();
    addEventInputPossibleCauseChange();
    addEventInputCompleteActivitiesChange();
});