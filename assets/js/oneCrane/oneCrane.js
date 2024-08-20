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
		}
	};
	//
	const putCrane = async () => {
		try {
			const qparametr = `?id=${craneData['id_malfunction']}`;
			const data = collectContentChangeMalfunction();
			const response = await fetch(`${SERVER_URL}cranes/malfunction.php${qparametr}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			document.dispatchEvent(new CustomEvent('updateError', { detail: 'Кран изменён!' })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return jsonResponse;
		} catch (error) {
			console.log(error);
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

			document.dispatchEvent(new CustomEvent('updateError', { detail: 'Фото добавлено!' })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
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

			document.dispatchEvent(new CustomEvent('updateError', { detail: 'Фото удалено!' })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
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
		}
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

			document.dispatchEvent(new CustomEvent('updateError', { detail: 'Документ добавлен!' })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
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
		}
	};
	//
	const deleteDocument = async (id) => {
		try {
			const qparametr = `?id=${id}`;
			const response = await fetch(`${SERVER_URL}cranes/document.php${qparametr}`, {
				method: 'DELETE',
			});
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			document.dispatchEvent(new CustomEvent('updateError', { detail: 'Документ удален!' }));
			documentUrl = documentUrl.filter((elem) => +elem.id !== +jsonResponse);
			drawDocument(documentUrl);
			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return [];
		}
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

			jsonResponse.sort((a, b) => {
				return new Date(b.date) - new Date(a.date);
			});
			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return [];
		}
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
		}
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

			jsonResponse.sort((a, b) => {
				return new Date(b.date_detection) - new Date(a.date_detection);
			});
			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return [];
		}
	};
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

			document.dispatchEvent(new CustomEvent('updateError', { detail: 'ТОиР добавлен!' }));
			clearDataModalWindow();
			const newObj = {
				id: +jsonResponse,
				login: SESSION['login'],
				date: data.date,
				type_maintenance: data.typeWork,
				service: SESSION['service_name'].service,
				content_work: data.contentWork,
				result: data.result,
			};
			maintenance = [newObj, ...maintenance];
			if (indexListBodyInfo === 2) drawTableAffiliation(maintenance);
			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return false;
		}
	};
	//
	const postIdentifiedFaults = async () => {
		try {
			const data = collectContentIdentifiedFaults();
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

			document.dispatchEvent(new CustomEvent('updateError', { detail: 'Неисправность добавлена!' })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			clearDataIdentifiedFaults();
			const newObj = {
				id: +jsonResponse,
				id_fitting: id,
				possible_cause: data.possibleCause,
				login_detected: SESSION.login,
				login_troubleshooting: data.completeActivities ? SESSION.login : '',
				complete_activities: data.completeActivities ? data.completeActivities : '',
				note: data.note ? data.note : '',
				date_detection: data.dateDetection,
				date_troubleshooting: data.dateTroubleshooting ? data.dateTroubleshooting : '',
				status: data.status,
			};
			identifiedFaults = [newObj, ...identifiedFaults];
			if (indexListBodyInfo === 1) drawTableIdentifiedFaults(identifiedFaults);
			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return false;
		}
	};
	//
	const putIdentifiedFaults = async () => {
		try {
			const data = collectContentPutIdentifiedFaults();
			let requestData = {};
			for (const key in data) {
				if (key === 'id') continue;
				else if (key === 'login_troubleshooting') requestData['id_user_troubleshooting'] = data[key];
				else requestData[key] = data[key];
			}
			const url = new URL(window.location.href);
			const id = new URLSearchParams(url.search).get('id');
			const qparametr = `?id=${data.id}`;
			const response = await fetch(`${SERVER_URL}cranes/identifiedFaults.php${qparametr}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestData),
			});

			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			document.dispatchEvent(new CustomEvent('updateError', { detail: 'Неисправность изменена!' })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке

			for (let i = 0; i < identifiedFaults.length; i++) {
				let elem = identifiedFaults[i];
				if (+elem.id === +data.id) {
					const rewriteObj = {
						id: data.id,
						id_fitting: id,
						possible_cause: data.possible_cause ? data.possible_cause : elem.possible_cause,
						login_detected: data.login_detected ? data.login_detected : elem.login_detected,
						login_troubleshooting: data.login_troubleshooting
							? userData.find((elem) => +data.login_troubleshooting === +elem.id).name
							: elem.login_troubleshooting
							? elem.login_troubleshooting
							: '',
						complete_activities: data.complete_activities ? data.complete_activities : elem.complete_activities ? elem.complete_activities : '',
						note: data.note ? data.note : elem.note ? elem.note : '',
						date_detection: data.date_detection ? data.date_detection : elem.date_detection,
						date_troubleshooting: data.date_troubleshooting ? data.date_troubleshooting : elem.date_troubleshooting ? elem.date_troubleshooting : '',
						status: data.status,
					};
					identifiedFaults[i] = rewriteObj;
				}
			}

			drawTableIdentifiedFaults(identifiedFaults);
			return jsonResponse;
		} catch (error) {
			console.log(error);
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return false;
		}
	};
	//
	const getForChangeInfo = async () => {
		try {
			const response = await fetch(`${SERVER_URL}cranes/globalData.php`);
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			jsonResponse.result = craneData.list_result.map((elem) => ({
				key: elem.name,
				name: elem.description,
			}));
			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return {};
		}
	};
	//
	const putForChangeInfo = async (dataFitting, dataDrive) => {
		try {
			const idDrive = craneData.id_drive;
			const driveQparametr = `?id=${idDrive}`;
			const drivrResponse = await fetch(`${SERVER_URL}cranes/drive.php${driveQparametr}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dataDrive),
			});
			const driveJsonResponse = await drivrResponse.json(); // Получаем тело ответа
			if (!drivrResponse.ok) throw new Error(driveJsonResponse.status); // Проверяем HTTP статус ответа
			for (const key in dataDrive) {
				dataDrive[key] && (craneData.mainInfo['Привод'][key].value = dataDrive[key]);
			}

			const url = new URL(window.location.href);
			const idFitting = new URLSearchParams(url.search).get('id');
			const fittingQparametr = `?id=${idFitting}`;
			const fittingResponse = await fetch(`${SERVER_URL}cranes/crane.php${fittingQparametr}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dataFitting),
			});

			const fittingJsonResponse = await fittingResponse.json(); // Получаем тело ответа
			if (!fittingResponse.ok) throw new Error(fittingJsonResponse.status); // Проверяем HTTP статус ответа
			for (const key in dataFitting) {
				if (key === 'crane_class') dataFitting[key] && (craneData.mainInfo['Основное'][key].value = `${dataFitting[key]}, ${dataFitting['name_cranes']}`);
				else if (key != 'name_cranes') dataFitting[key] && (craneData.mainInfo['Основное'][key].value = dataFitting[key]);
			}

			document.dispatchEvent(new CustomEvent('updateError', { detail: 'Кран изменен!' })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return [fittingResponse, driveJsonResponse];
		} catch (error) {
			console.log(error);
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return false;
		}
	};
	//
	const getAllUser = async () => {
		try {
			const response = await fetch(`${SERVER_URL}myUsers.php`);
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			const result = jsonResponse.map((elem) => ({
				id: elem.id,
				name: elem.login,
			}));
			return result;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return {};
		}
	};
	//
	const drawTableMalfunction = (crane) => {
		const bodyTable = document.querySelector('.table-malfunction').querySelector('.tbody');
		for (const key in crane.secondary) {
			const title = crane.secondary[key].title;
			const value = crane.secondary[key].value;
			const list = crane[`list_${key}`];
			bodyTable.appendChild(createRowMalfunction(title, value, list, key));
		}
		addEventSelectOtherCheck(bodyTable.querySelectorAll('select'));
	};
	//
	const drawTableMainInfo = (crane) => {
		const body = document.querySelector('.content__body');
		const managmentBtn = body.querySelector('.switch');
		body.innerText = '';
		body.appendChild(managmentBtn);
		const mainContent = `
			<p class="mb-2 fs-5">Характеристики ТПА</p>
			<button class="btn-change-main-info btn-main-info btn btn-secondary mb-2" ${+SESSION.privilege !== 7 ? 'disabled' : ''}>Изменить</button>
			<div class="table table-main-info d-flex flex-column align-items-center">
				<div class="thead d-flex flex-column">
					<div class="t-row d-flex flex-row justify-content-center">
						<p class="column th">Характеристика</p>
						<p class="column th">Значение</p>
					</div>
				</div>
				<div class="tbody d-flex flex-column"></div>
			</div>
			<button class="btn-change-main-info btn-main-info btn btn-secondary mb-2" ${+SESSION.privilege !== 7 ? 'disabled' : ''}>Изменить</button>`;
		body.insertAdjacentHTML('beforeend', mainContent);

		const bodyTable = document.querySelector('.table-main-info').querySelector('.tbody');

		document.querySelectorAll('.btn-change-main-info').forEach((btn) => addEventBtnChangeMainInfo(btn));

		for (const key in crane.mainInfo) {
			bodyTable.appendChild(createSection(key));
			for (const keyTwo in crane.mainInfo[key]) {
				const title = crane.mainInfo[key][keyTwo].title;
				const value = key === 'Исправность' ? crane.mainInfo[key][keyTwo].description : crane.mainInfo[key][keyTwo].value;
				bodyTable.appendChild(createRowMainInfo(title, value, keyTwo));
			}
		}
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

		obj.name === '' ? (btnDelete.disabled = true) : (btnDelete.disabled = false);
		obj.file ? (btnSave.disabled = false) : (btnSave.disabled = true);

		if (urlImg.length < 2) {
			[arrowLeft, arrowRight].forEach((elem) => {
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
				[arrowLeft, arrowRight].forEach((elem) => {
					elem.disabled = false;
					elem.disabled = false;
					arrowRight.classList.add('arrow-active');
				});
			}
		}
	};
	//
	const drawDocument = (data) => {
		const body = document.querySelector('.content__body');
		const managmentBtn = body.querySelector('.switch');
		body.innerText = '';
		body.appendChild(managmentBtn);
		const mainContent = `
			<div class="document-container d-flex flex-column align-items-center px-3 py-2 mb-3">
				<p class="fs-5 mb-2">Файлы</p>
				<input type='file' class="input_document btn btn-secondary" />
			</div>`;
		body.insertAdjacentHTML('beforeend', mainContent);

		const container = document.querySelector('.document-container');
		data.forEach((obj) => container.appendChild(createRowDocument(obj.id, obj.document_url, obj.name)));
		addEventInputLoadDocument();
		addEventImgDeleteDocumentClick();
	};
	//
	const drawTableAffiliation = (maintenance) => {
		const body = document.querySelector('.content__body');
		const managmentBtn = body.querySelector('.switch');
		body.innerText = '';
		body.appendChild(managmentBtn);
		const mainContent = `
			<p class="fs-5 mb-2" id="affiliation">Информация по техническому обслуживанию и ремонту</p>
			<div class="table table-affiliation d-flex flex-column align-items-center">
				<div class="thead d-flex flex-column">
					<div class="t-row d-flex flex-row justify-content-center">
						<p class="column th">Дата</p>
						<p class="column th">Вид ТОиР</p>
						<p class="column th">Служба</p>
						<p class="column th">Содержание работ</p>
						<p class="column th">Итог</p>
						<p class="column th">ФИО</p>
					</div>
				</div>
				<div class="tbody d-flex flex-column"></div>
			</div>`;
		body.insertAdjacentHTML('beforeend', mainContent);

		const bodyTable = document.querySelector('.table-affiliation').querySelector('.tbody');
		bodyTable.innerText = '';
		maintenance.forEach((elem) => {
			const list = [elem.date.slice(0, 10), elem.type_maintenance, elem.service, elem.content_work, elem.result, elem.login];
			bodyTable.appendChild(createRowMaintenance(list, elem.id));
		});
	};
	//
	const drawDateOnAffiliationContainer = (types) => {
		const container = document.querySelector('.content__maintenance');
		const date = container.querySelector('.check-datetime');
		const select = container.querySelector('.form-select');

		const nowDate = new Date().toISOString().split('T')[0];
		date.value = nowDate;
		types.forEach((elem) => select.appendChild(createOption(elem.name)));
	};
	//
	const drawTableIdentifiedFaults = (identifiedFaults) => {
		const body = document.querySelector('.content__body');
		const managmentBtn = body.querySelector('.switch');
		body.innerText = '';
		body.appendChild(managmentBtn);
		const mainContent = `
			<p class="fs-5 mb-2" id="identified-faults">Выявленные неисправности</p>
			<div class="table table-identified-faults d-flex flex-column align-items-center">
				<div class="thead d-flex flex-column">
					<div class="t-row d-flex flex-row justify-content-center">
						<p class="column th">Дата выявления неисправности</p>
						<p class="column th">Фио обнаружевшего</p>
						<p class="column th">Характер и возможная причина</p>
						<p class="column th">Дата устранения неисправности</p>
						<p class="column th">Выполненные мероприятия</p>
						<p class="column th">ФИО устранившего</p>
						<p class="column th">Примечание</p>
						<p class="column th">Статус</p>
					</div>
				</div>
				<div class="tbody d-flex flex-column"></div>
			</div>`;
		body.insertAdjacentHTML('beforeend', mainContent);

		const bodyTable = document.querySelector('.table-identified-faults').querySelector('.tbody');
		bodyTable.innerText = '';
		identifiedFaults.forEach((elem) => {
			const list = [
				elem.date_detection,
				elem.login_detected,
				formContent(elem.possible_cause, 70),
				elem.date_troubleshooting ? elem.date_troubleshooting : '-',
				elem.complete_activities ? formContent(elem.complete_activities, 70) : '-',
				elem.login_troubleshooting ? elem.login_troubleshooting : '-',
				elem.note ? formContent(elem.note, 40) : '-',
				+elem.status ? 'Устранена' : 'Не устранена',
			];
			bodyTable.appendChild(createRowIdentifiedFaults(list, elem.id));
		});
	};
	//
	const drawIdentifiedFaultsContainer = () => {
		const place = document.querySelector('.temp-container');
		place.removeChild(place.lastChild);
		const container = `
							<div class="content__identified-faults d-flex flex-column row-gap-3 align-items-center col-12">
                                <p class="fs-4 text-center">Сообщить о неисправности</p>
                                <div class="d-flex flex-row justify-content-between col-10 column-gap-2">
                                    <div class="date d-flex flex-column row-gap-2">
                                        <p>Дата выявления неисправности</p>
                                        <input type="date" class="form-control identified-faults-date-from check-datetime" id="dateFrom">
                                    </div>
                                    <div class="types-work d-flex flex-column row-gap-2">
                                        <p>Характер и возможная причина</p>
                                        <textarea class="form-control possible-cause" id="possible-cause"></textarea>
                                    </div>
                                </div>
                                <div class="status d-flex flex-row justify-content-between col-10 column-gap-2">
                                	<p class="fs-6 text-center">Неисправность устранена?</p>
									<select class="form-select" aria-label="Default select example" disabled>
										<option value="0" selected>Нет</option>
										<option value="1">Да</option>
									</select>
								</div>
                                <div class="fault-fixed d-flex flex-row justify-content-between col-10 column-gap-2">
                                    <div class="d-flex flex-column row-gap-2">
                                        <p>Дата устранения неисправности</p>
                                        <input type="date" class="form-control identified-faults-date-to check-datetime" id="dateTo" disabled>
                                    </div>
                                    <div class="d-flex flex-column row-gap-2">
                                        <p>Выполненные мероприятия</p>
                                        <textarea class="form-control complete-activities" id="complete-activities" disabled></textarea>
                                    </div>
                                </div>
                                <div class="d-flex flex-column col-10 row-gap-2">
                                    <p>Примечания</p>
                                    <textarea class="form-control note" id="note" disabled></textarea>
                                </div>
                                <button class="btn btn-success btn-save-identified-faults" disabled>Сохранить</button>
                            </div>`;

		place.insertAdjacentHTML('beforeend', container);
		addEventInputPossibleCauseChange();
		addEventSelectStatusChange();
		addEventInputCompleteActivitiesChange();
		addEventBtnIdentifiedFaultsClick();
	};
	//
	const drawMaintenanceContainer = () => {
		const place = document.querySelector('.temp-container');
		place.removeChild(place.lastChild);
		const container = `
							<div class="content__maintenance d-flex flex-column row-gap-3 align-items-center col-12">
                                <p class="fs-4 text-center">ТОиР</p>
                                <div class="d-flex flex-row justify-content-between col-10 column-gap-2">
                                    <div class="date d-flex flex-column col-10">
                                        <p>Дата проведения</p>
                                        <input type="date" class="form-control date-from check-datetime" id="dateFrom">
                                    </div>
                                </div>
                                <div class="fault-fixed d-flex flex-row justify-content-between col-10 column-gap-2">
                                    <div class="types-work d-flex flex-column row-gap-2 col-10">
                                        <p>Вид работ</p>
                                        <select class="form-select" aria-label="Default select example">
                                            <option value="-1" selected></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="fault-fixed d-flex flex-row justify-content-between col-10 column-gap-2">
                                    <div class="d-flex flex-column row-gap-2 col-12">
                                        <p>Содержание работ</p>
                                        <textarea type="date" class="form-control content-work" id="content-work"></textarea>
                                    </div>
                                </div>
                                <div class="fault-fixed d-flex flex-row justify-content-between col-10 column-gap-2">
                                    <div class="d-flex flex-column row-gap-2 col-12">
                                        <p>Результат</p>
                                        <textarea type="date" class="form-control result-work" id="result-work"></textarea>
                                    </div>
                                </div>
                                <button class="btn btn-success btn-save-new-maintenance">Сохранить</button>
                            </div>`;

		place.insertAdjacentHTML('beforeend', container);
		addEventBtnSaveNewMaintenance();
		drawDateOnAffiliationContainer(typesWork);
	};
	//
	const drawModalWindowIdentifiedFault = (data) => {
		const window = document.querySelector('.modal-content');

		const modalHeader = window.querySelector('.modal-header');
		const modalTitle = modalHeader.querySelector('.modal-title');
		modalTitle.innerText = 'Информация о неисправности';

		const modalBody = window.querySelector('.modal-body');
		const managmentBtn = document.createElement('div');
		const mainBtn = document.createElement('button');
		const secondaryBtn = document.createElement('button');
		managmentBtn.className = 'switch d-flex flex-row column-gap-2 col-12';
		mainBtn.className = 'btn btn-secondary take-group selected-group';
		secondaryBtn.className = 'btn btn-secondary take-group';
		mainBtn.innerText = 'Информация о неисправности';
		secondaryBtn.innerText = 'Информация об исправлении';
		managmentBtn.appendChild(mainBtn);
		managmentBtn.appendChild(secondaryBtn);
		modalBody.innerText = '';
		modalBody.appendChild(managmentBtn);
		addEventWindowBtnSwitchClick(data);

		const statusContainer = document.createElement('div');
		const titleStatus = document.createElement('p');
		const status = document.createElement('select');
		const goodOption = document.createElement('option');
		const badOption = document.createElement('option');
		statusContainer.className = 'modal-status d-flex flex-row column-gap-4 pt-2 align-items-start';
		titleStatus.className = 'col-2 text-end';
		status.className = 'window-row-data';
		goodOption.className = 'green';
		badOption.className = 'red';
		goodOption.setAttribute('value', 1);
		badOption.setAttribute('value', 0);
		data.status ? (goodOption.selected = true) : (badOption.selected = true);
		titleStatus.innerText = 'Статус неисправности';
		goodOption.innerText = 'Устранена';
		badOption.innerText = 'Не устранена';
		status.appendChild(goodOption);
		status.appendChild(badOption);
		statusContainer.appendChild(titleStatus);
		statusContainer.appendChild(status);
		modalBody.appendChild(statusContainer);

		drawContentWindowIdentifiedFaultFirst(data);

		const modalFooter = window.querySelector('.modal-footer');
		const button = document.createElement('button');
		button.className = 'btn btn-success footer-btn-close';
		button.setAttribute('type', 'button');
		button.innerText = 'Сохранить';
		modalFooter.innerText = '';
		modalFooter.appendChild(button);
		addEventBtnSaveChanges(button);
	};
	//
	const drawContentWindowIdentifiedFaultFirst = (data) => {
		const window = document.querySelector('.modal-content');
		const modalBody = window.querySelector('.modal-body');
		const temp = document.createElement('div');
		temp.className = 'temp d-flex flex-column row-gap-4';
		const firstContainer = document.createElement('div');
		const titleDateDetection = document.createElement('p');
		const inputDateDetection = document.createElement('p');
		const titleNameDetection = document.createElement('p');
		const nameDetection = document.createElement('p');
		firstContainer.className = 'd-flex flex-row align-items-center column-gap-4';
		titleDateDetection.className = 'col-2 text-end';
		inputDateDetection.className = 'window-row-data';
		nameDetection.className = 'window-row-data';
		titleDateDetection.innerText = 'Дата:';
		inputDateDetection.innerText = data.date_detection;
		titleNameDetection.innerText = 'ФИО:';
		nameDetection.innerText = data.login_detected;
		firstContainer.appendChild(titleDateDetection);
		firstContainer.appendChild(inputDateDetection);
		firstContainer.appendChild(titleNameDetection);
		firstContainer.appendChild(nameDetection);

		const secondContainer = document.createElement('div');
		const titlePossibleCause = document.createElement('p');
		const possibleCause = document.createElement('p');
		secondContainer.className = 'd-flex flex-row align-items-center column-gap-4';
		titlePossibleCause.className = 'col-2 text-end';
		possibleCause.className = 'window-row-data col-8';
		titlePossibleCause.innerText = 'Описание неисправности:';
		possibleCause.innerText = data.possible_cause ? data.possible_cause : '-';
		secondContainer.appendChild(titlePossibleCause);
		secondContainer.appendChild(possibleCause);

		modalBody.setAttribute('id', data.id);

		const lastChild = modalBody.lastChild;
		if (modalBody.querySelector('.temp')) modalBody.removeChild(lastChild.previousElementSibling);
		temp.appendChild(firstContainer);
		temp.appendChild(secondContainer);
		modalBody.insertBefore(temp, lastChild);
	};
	//
	const drawContentWindowIdentifiedFaultSecond = (data) => {
		const window = document.querySelector('.modal-content');
		const modalBody = window.querySelector('.modal-body');
		const temp = document.createElement('div');
		temp.className = 'temp d-flex flex-column row-gap-4';
		const firstContainer = document.createElement('div');
		const titleDateTroubleshooting = document.createElement('p');
		const inputDateTroubleshooting = document.createElement('input');
		const titleNameTroubleshooting = document.createElement('p');
		// const nameTroubleshooting = document.createElement('input');
		const select = createSelect('', data.login_troubleshooting ? data.login_troubleshooting : '', userData);
		firstContainer.className = 'd-flex flex-row align-items-center column-gap-4';
		inputDateTroubleshooting.className = 'input-date-trouble form-control date-from col-3';
		titleDateTroubleshooting.className = 'col-2 text-end';
		select.classList.add('window-row-data');
		select.classList.add('input-name-trouble');
		// nameTroubleshooting.className = 'input-name-trouble form-control';
		inputDateTroubleshooting.setAttribute('type', 'date');
		// nameTroubleshooting.setAttribute('type', 'text');
		titleDateTroubleshooting.innerText = 'Дата:';
		inputDateTroubleshooting.value = data.date_troubleshooting ? data.date_troubleshooting : '';
		titleNameTroubleshooting.innerText = 'ФИО:';
		// nameTroubleshooting.value = data.login_troubleshooting ? data.login_troubleshooting : '';
		firstContainer.appendChild(titleDateTroubleshooting);
		firstContainer.appendChild(inputDateTroubleshooting);
		firstContainer.appendChild(titleNameTroubleshooting);
		firstContainer.appendChild(select);
		// firstContainer.appendChild(nameTroubleshooting);

		const secondContainer = document.createElement('div');
		const titleCompleteActivities = document.createElement('p');
		const completeActivities = document.createElement('textarea');
		secondContainer.className = 'd-flex flex-row column-gap-4';
		titleCompleteActivities.className = 'col-2 text-end';
		completeActivities.className = 'col-8';
		titleCompleteActivities.innerText = 'Содержание работы:';
		completeActivities.value = data.complete_activities ? data.complete_activities : '';
		secondContainer.appendChild(titleCompleteActivities);
		secondContainer.appendChild(completeActivities);

		const thirdContainer = document.createElement('div');
		const titleNote = document.createElement('p');
		const note = document.createElement('textarea');
		thirdContainer.className = 'd-flex flex-row column-gap-4';
		titleNote.className = 'col-2 text-end';
		note.className = 'col-8';
		titleNote.innerText = 'Примечание:';
		note.innerText = data.note ? data.note : '';
		thirdContainer.appendChild(titleNote);
		thirdContainer.appendChild(note);

		modalBody.setAttribute('id', data.id);

		const lastChild = modalBody.lastChild;
		modalBody.removeChild(lastChild.previousElementSibling);
		temp.appendChild(firstContainer);
		temp.appendChild(secondContainer);
		temp.appendChild(thirdContainer);
		modalBody.insertBefore(temp, lastChild);
	};
	//
	const drawModalWindowMaintenance = (data) => {
		const window = document.querySelector('.modal-content');

		const modalHeader = window.querySelector('.modal-header');
		const modalTitle = modalHeader.querySelector('.modal-title');
		modalTitle.innerText = 'Информация о ТОиР';

		drawContentWindowMaintenance(data);

		const modalFooter = window.querySelector('.modal-footer');
		const button = document.createElement('button');
		button.className = 'btn btn-secondary footer-btn-close';
		button.setAttribute('type', 'button');
		button.setAttribute('data-bs-dismiss', 'modal');
		button.innerText = 'Закрыть';
		modalFooter.innerText = '';
		modalFooter.appendChild(button);
	};
	//
	const drawContentWindowMaintenance = (data) => {
		const window = document.querySelector('.modal-content');
		const modalBody = window.querySelector('.modal-body');

		const firstContainer = document.createElement('div');
		const titleDate = document.createElement('p');
		const date = document.createElement('p');
		const titleName = document.createElement('p');
		const name = document.createElement('p');
		const titleService = document.createElement('p');
		const service = document.createElement('p');
		firstContainer.className = 'd-flex flex-row align-items-center column-gap-4 mt-3';
		titleDate.className = 'col-2 text-end';
		date.className = 'window-row-data';
		name.className = 'window-row-data';
		service.className = 'window-row-data';
		titleDate.innerText = 'Дата:';
		date.innerText = data.date.slice(0, 10);
		titleName.innerText = 'ФИО:';
		name.innerText = data.login;
		titleService.innerText = 'Служба:';
		service.innerText = data.service;
		firstContainer.appendChild(titleDate);
		firstContainer.appendChild(date);
		firstContainer.appendChild(titleName);
		firstContainer.appendChild(name);
		firstContainer.appendChild(titleService);
		firstContainer.appendChild(service);

		const secondContainer = document.createElement('div');
		const titleTypeWork = document.createElement('p');
		const typeWork = document.createElement('p');
		secondContainer.className = 'd-flex flex-row column-gap-4';
		titleTypeWork.className = 'col-2 text-end';
		typeWork.className = 'window-row-data col-8';
		titleTypeWork.innerText = 'Вид ТОиР:';
		typeWork.innerText = data.type_maintenance ? data.type_maintenance : '-';
		secondContainer.appendChild(titleTypeWork);
		secondContainer.appendChild(typeWork);

		const thirdContainer = document.createElement('div');
		const titleContentWork = document.createElement('p');
		const contentWork = document.createElement('p');
		thirdContainer.className = 'd-flex flex-row column-gap-4';
		titleContentWork.className = 'col-2 text-end';
		contentWork.className = 'window-row-data col-8';
		titleContentWork.innerText = 'Содержание работы:';
		contentWork.innerText = data.content_work ? data.content_work : '-';
		thirdContainer.appendChild(titleContentWork);
		thirdContainer.appendChild(contentWork);

		const fourthContainer = document.createElement('div');
		const titleResultWork = document.createElement('p');
		const resultWork = document.createElement('p');
		fourthContainer.className = 'd-flex flex-row column-gap-4';
		titleResultWork.className = 'col-2 text-end';
		resultWork.className = 'window-row-data col-8';
		titleResultWork.innerText = 'Заключение:';
		resultWork.innerText = data.result ? data.result : '-';
		fourthContainer.appendChild(titleResultWork);
		fourthContainer.appendChild(resultWork);

		modalBody.innerText = '';
		modalBody.appendChild(firstContainer);
		modalBody.appendChild(secondContainer);
		modalBody.appendChild(thirdContainer);
		modalBody.appendChild(fourthContainer);
	};
	//
	const drawBtnForMainInfo = (obj) => {
		const btnAll = document.querySelectorAll('.btn-main-info');
		btnAll.forEach((btn) => {
			const newBtn = document.createElement('button');

			newBtn.className = `${obj.style} btn-main-info btn btn-secondary mb-2`;
			newBtn.innerText = obj.value;

			btn.parentNode.replaceChild(newBtn, btn);

			const func = obj.func;
			func(newBtn);
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

		return row;
	};
	//
	const createRowMainInfo = (title, name, key) => {
		const row = document.createElement('div');
		const parameter = document.createElement('p');
		const status = document.createElement('p');

		row.className = 't-row d-flex flex-row justify-content-center';

		parameter.className = 'column th text-center';
		status.className = 'column th text-center';

		row.setAttribute('key', key);

		parameter.innerText = title;
		status.innerText = name;

		row.appendChild(parameter);
		row.appendChild(status);

		return row;
	};
	//
	const createRowDocument = (id, ref, name) => {
		const row = document.createElement('div');
		const link = document.createElement('a');
		const deleteDocument = document.createElement('img');

		row.className = 'document-row d-flex flex-row column-gap-4 my-1 py-1 fs-5';
		link.className = 'document-link';
		deleteDocument.className = 'delete-document';

		row.setAttribute('id', id);
		link.setAttribute('href', ref);
		link.setAttribute('download', name);
		deleteDocument.setAttribute('src', `${BASE_URL}assets/image/garbage.png`);
		link.innerText = name;

		row.appendChild(link);
		row.appendChild(deleteDocument);
		return row;
	};
	//
	const createRowMaintenance = (list, id) => {
		const row = document.createElement('div');

		row.className = 't-row open-win d-flex flex-row justify-content-center';
		row.setAttribute('data-bs-toggle', 'modal');
		row.setAttribute('data-bs-target', '#exampleModal');
		row.setAttribute('id', id);
		for (let i = 0; i < list.length; i++) {
			const content = document.createElement('p');
			content.className = `column th text-center`;
			content.innerText = list[i];
			row.appendChild(content);
		}

		addEventRowMaintenanceClick(row, maintenance);
		return row;
	};
	//
	const createRowIdentifiedFaults = (list, id) => {
		const row = document.createElement('div');

		row.className = 't-row open-win d-flex flex-row justify-content-center';
		row.setAttribute('data-bs-toggle', 'modal');
		row.setAttribute('data-bs-target', '#exampleModal');
		row.setAttribute('id', id);
		const names = { Устранена: 'green', 'Не устранена': 'red' };

		for (let i = 0; i < list.length; i++) {
			const content = document.createElement('p');
			let style = '';
			if (i === 7) {
				style = names[list[i]];
			}
			content.className = `${style} column th text-center`;
			content.innerText = list[i];
			row.appendChild(content);
		}

		addEventRowIdentifiedFaultsClick(row);
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
				name == elem.name && (option.selected = true) && select.removeChild(select.firstChild);
				select.appendChild(option);
			});
		}
		return select;
	};
	const createTextarea = (text) => {
		const textarea = document.createElement('textarea');
		textarea.className = 'column th';
		textarea.value = text;
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

		const resultTable = {};
		const allRow = bodyTable.querySelectorAll('.t-row');
		allRow.forEach((row) => {
			const key = row.getAttribute('key');
			const isTextarea = row.lastChild.tagName === 'TEXTAREA';
			if (row.lastChild.value >= 0 && !isTextarea) {
				resultTable[key] = craneData[`list_${key}`].find((el) => +el.id === +row.lastChild.value).name;
				if (key === 'result') {
					document.querySelector('.table-main-info').querySelector(' .tbody').querySelectorAll('.t-row')[1].querySelectorAll('p')[1].innerText =
						craneData.list_result.find((elem) => +elem.name === +resultTable[key]).description;
				}
			} else if (isTextarea && row.lastChild.value) {
				resultTable[key] = row.lastChild.value;
			}
		});

		return resultTable;
	};
	//
	const collectContentIdentifiedFaults = () => {
		const identifiedFaultsContainer = document.querySelector('.content__identified-faults');

		const possibleCause = identifiedFaultsContainer.querySelector('.possible-cause').value.trim();
		const dateDetection = identifiedFaultsContainer.querySelector('.identified-faults-date-from').value;
		const status = +identifiedFaultsContainer.querySelector('.form-select').value;
		const completeActivities = identifiedFaultsContainer.querySelector('.complete-activities').value.trim();
		const dateTroubleshooting = identifiedFaultsContainer.querySelector('.identified-faults-date-to').value;
		const note = identifiedFaultsContainer.querySelector('.note').value.trim();

		let obj = {};
		if (!possibleCause) throw new Error('Введите возможную причину!');
		if (!dateDetection) throw new Error('Введите дату обнаружения неисправности!');

		obj = {
			dateDetection: dateDetection,
			possibleCause: possibleCause,
			userDetectionId: SESSION['id'],
			status: status,
		};
		if (status) {
			if (!completeActivities) throw new Error('Введите выполненые мероприятия!');
			if (!dateTroubleshooting) throw new Error('Введите дату устранения неисправности!');
			obj.completeActivities = completeActivities;
			obj.dateTroubleshooting = dateTroubleshooting;
			if (note) obj.note = note;
		}

		return obj;
	};
	//
	const collectContentPostMaintenance = () => {
		const maintenanceContainer = document.querySelector('.content__maintenance');
		const date = maintenanceContainer.querySelector('.check-datetime').value;
		const typeWork = maintenanceContainer.querySelector('.form-select').value;
		const contentWork = maintenanceContainer.querySelector('.content-work').value;
		const result = maintenanceContainer.querySelector('.result-work').value;
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
	const collectContentPutIdentifiedFaults = () => {
		const body = document.querySelector('.modal-body');
		const position = body.querySelector('.temp').querySelectorAll('div').length === 3;
		const id = +body.getAttribute('id');
		const status = +body.querySelector('.modal-status').querySelector('select').value;
		let result = {
			id,
			status,
		};
		if (!position) return result;
		const dateTrouble = body.querySelector('.input-date-trouble').value.trim();
		const loginTrouble = body.querySelector('.input-name-trouble').value.trim();
		const allTextarea = body.querySelectorAll('textarea');
		const contentWork = allTextarea[0].value.trim();
		const note = allTextarea[1].value.trim();

		if (!dateTrouble) throw new Error('Введите дату устранения неисправности');
		if (loginTrouble == -1) throw new Error('Введите ФИО устранившего');
		if (!contentWork) throw new Error('Введите выполненные мероприятия');
		result = {
			id,
			status,
			login_troubleshooting: loginTrouble,
			complete_activities: contentWork,
			date_troubleshooting: dateTrouble,
		};
		if (note) result.note = note;
		return result;
	};
	//
	const clearDataModalWindow = () => {
		const modalBody = document.querySelector('.content__maintenance');
		modalBody.querySelector('.form-select').value = -1;
		modalBody.querySelector('.content-work').value = '';
		modalBody.querySelector('.result-work').value = '';
	};
	//
	const clearDataIdentifiedFaults = () => {
		const container = document.querySelector('.content__identified-faults');
		container.querySelector('.btn-save-identified-faults').disabled = true;
		const select = container.querySelector('.form-select');
		select.disabled = true;
		select.value = 0;
		container.querySelectorAll('textarea').forEach((elem, index) => {
			elem.value = '';
			if (index > 0) elem.disabled = true;
		});
		container.querySelectorAll('input').forEach((elem, index) => {
			elem.value = '';
			if (index > 0) elem.disabled = true;
		});
	};
	//
	const formContent = (text, limit) => {
		return text.length > limit ? text.substring(0, limit) + '...' : text; // (Тоже тернарный оператор)
	};
	//
	const addEventBtnMalfunctionClick = () => {
		const btn = document.querySelector('.btn-save-malfunction');
		btn.addEventListener('click', async () => await putCrane());
	};
	//
	const addEventBtnIdentifiedFaultsClick = () => {
		const btn = document.querySelector('.btn-save-identified-faults');
		btn.addEventListener('click', async () => await postIdentifiedFaults());
	};
	//
	const addEventSelectOtherCheck = (list) => {
		// const list = document.querySelectorAll('select');
		list.forEach((elem) => {
			elem.dataset.previousValue = elem.querySelector(`[value="${elem.value}"]`).textContent;
			elem.addEventListener('change', (e) => {
				const str = elem.querySelector(`[value="${elem.value}"]`).textContent;
				if (str === 'Ввести свое значение') {
					const previousValue = e.target.dataset.previousValue;
					const parent = elem.parentNode;
					parent.removeChild(elem);
					parent.appendChild(createTextarea(previousValue));
				}
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
					const imgData = { photo_url: reader.result, name: urlImg.length + 1, file: choosedFile };
					urlImg.push(imgData);
					indexListUrl = urlImg.length - 1;
					drawImage(imgData);
				});
				reader.readAsDataURL(choosedFile);
				// photoCrane = choosedFile;
			}
			e.target.value = '';
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
		const img = document.querySelector('.input__picture');
		btn.addEventListener('click', async () => {
			const name = img.getAttribute('name');
			if (!urlImg[indexListUrl].file) {
				await deletePhoto(name);
			}
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
			}
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
				newDocument && drawDocument([newDocument, ...documentUrl]);
				documentUrl.push(newDocument);
				e.target.value = '';
			}
		});
	};
	//
	const addEventImgDeleteDocumentClick = () => {
		const allRow = document.querySelectorAll('.document-row');
		allRow.forEach((elem) => {
			const img = elem.querySelector('.delete-document');
			img.addEventListener('click', async () => await deleteDocument(elem.getAttribute('id')));
		});
	};
	//
	const addEventBtnSaveNewMaintenance = () => {
		const btn = document.querySelector('.btn-save-new-maintenance');
		btn.addEventListener('click', async () => await postNewMaintenance());
	};
	//
	const addEventInputPossibleCauseChange = () => {
		const textarea = document.querySelector('.possible-cause');
		const container = document.querySelector('.content__identified-faults');
		textarea.addEventListener('input', () => {
			if (textarea.value.trim().length > 0) {
				container.querySelector('.form-select').disabled = false;
				container.querySelector('.btn-save-identified-faults').disabled = false;
			} else {
				const selectStatus = document.querySelector('.form-select');
				const dateTo = container.querySelector('.identified-faults-date-to');
				const complete = container.querySelector('.complete-activities');
				const note = container.querySelector('.note');
				container.querySelector('.btn-save-identified-faults').disabled = true;
				[selectStatus, dateTo, complete, note].forEach((elem) => {
					elem.disabled = true;
					elem.value = '';
				});
				selectStatus.value = 0;
			}
		});
	};
	//
	const addEventSelectStatusChange = () => {
		const selectStatus = document.querySelector('.form-select');
		const container = document.querySelector('.content__identified-faults');
		selectStatus.addEventListener('change', () => {
			if (+selectStatus.value) {
				container.querySelector('.identified-faults-date-to').disabled = false;
				container.querySelector('.complete-activities').disabled = false;
			} else {
				const dateTo = container.querySelector('.identified-faults-date-to');
				const complete = container.querySelector('.complete-activities');
				const note = container.querySelector('.note');
				[dateTo, complete, note].forEach((elem) => {
					elem.disabled = true;
					elem.value = '';
				});
			}
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
			}
		});
	};
	//
	const addEventBtnHeaderSwitchClick = () => {
		const switchBtn = document.querySelector('.temp-container').querySelector('.switch').querySelectorAll('button');
		switchBtn.forEach((elem, index) => {
			elem.addEventListener('click', () => {
				elem.classList.add('selected-group');
				elem.disabled = true;
				switchBtn[switchBtn.length - 1 - index].classList.remove('selected-group');
				switchBtn[switchBtn.length - 1 - index].disabled = false;
				index ? drawIdentifiedFaultsContainer() : drawMaintenanceContainer();
			});
		});
	};
	//
	const addEventRowIdentifiedFaultsClick = (row) => {
		row.addEventListener('click', () => {
			const data = identifiedFaults.find((elem) => elem.id === +row.id);
			drawModalWindowIdentifiedFault(data);
		});
	};
	//
	const addEventRowMaintenanceClick = (row) => {
		row.addEventListener('click', () => {
			const data = maintenance.find((elem) => elem.id === +row.id);
			drawModalWindowMaintenance(data);
		});
	};
	//
	const addEventBtnBodySwitchClick = () => {
		const switchBtn = document.querySelector('.content__body').querySelector('.switch').querySelectorAll('button');
		const list = [
			() => drawTableMainInfo(craneData),
			() => drawTableIdentifiedFaults(identifiedFaults),
			() => drawTableAffiliation(maintenance),
			() => drawDocument(documentUrl),
		];
		switchBtn.forEach((elem, index) => {
			elem.addEventListener('click', () => {
				elem.classList.add('selected-group');
				elem.disabled = true;

				switchBtn.forEach((btn) => {
					if (btn === elem) return;
					btn.classList.remove('selected-group');
					btn.disabled = false;
				});
				const func = list[index];
				indexListBodyInfo = index;
				func();
			});
		});
	};
	//
	const addEventBtnSaveChanges = (btn) => {
		btn.addEventListener('click', async () => await putIdentifiedFaults());
	};
	//
	const addEventWindowBtnSwitchClick = (data) => {
		const switchBtn = document.querySelector('.modal-body').querySelector('.switch').querySelectorAll('button');
		switchBtn.forEach((elem, index) => {
			elem.addEventListener('click', () => {
				elem.classList.add('selected-group');
				elem.disabled = true;
				switchBtn[switchBtn.length - 1 - index].classList.remove('selected-group');
				switchBtn[switchBtn.length - 1 - index].disabled = false;
				index ? drawContentWindowIdentifiedFaultSecond(data) : drawContentWindowIdentifiedFaultFirst(data);
			});
		});
	};
	//
	const addEventBtnChangeMainInfo = (btn) => {
		btn.addEventListener('click', async () => {
			const malfuncion = document.querySelector('.btn-save-malfunction');
			malfuncion.disabled = true;
			const data = allData ? allData : await getForChangeInfo();
			const obj = {
				style: 'btn-save-main-info',
				value: 'Сохранить',
				func: (el) => addEventBtnSaveMainInfo(el),
			};
			drawBtnForMainInfo(obj);
			const allRow = document.querySelector('.table-main-info').querySelector('.tbody').querySelectorAll('.t-row');
			allRow.forEach((row) => {
				const key = row.getAttribute('key');
				const select = document.createElement('select');
				const lastChild = row.lastChild;

				const option = document.createElement('option');
				const text = key === 'crane_class' ? lastChild.textContent.split(', ') : lastChild.textContent;
				const curText = key === 'crane_class' ? text[0] : text;
				option.innerText = curText;
				option.value = -1;
				option.selected = true;
				select.appendChild(option);
				data[key] &&
					data[key].forEach((elem) => {
						const option = document.createElement('option');
						option.innerText = elem.name;
						option.value = elem.key;
						curText == elem.name && (option.selected = true) && select.removeChild(select.firstChild);
						select.appendChild(option);
					});

				select.className = 'window-row-data column th';
				row.replaceChild(select, lastChild);

				if (key === 'crane_class') {
					const newRow = document.createElement('div');
					const firstColumn = document.createElement('p');
					const select = document.createElement('select');
					newRow.className = 't-row d-flex flex-row justify-content-center';
					newRow.setAttribute('key', 'name_cranes');
					firstColumn.className = 'column th text-center';
					firstColumn.innerText = 'Тип крана';
					select.className = 'window-row-data column th';

					const option = document.createElement('option');
					option.innerText = text[1];
					option.value = -1;
					option.selected = true;
					select.appendChild(option);
					data['name_cranes'] &&
						data['name_cranes'].forEach((elem) => {
							const option = document.createElement('option');
							option.innerText = elem.name;
							option.value = elem.key;
							text[1] == elem.name && (option.selected = true) && select.removeChild(select.firstChild);
							select.appendChild(option);
						});
					newRow.appendChild(firstColumn);
					newRow.appendChild(select);
					row.insertAdjacentElement('afterend', newRow);
				}
			});
			const selectAll = [];
			allRow.forEach((elem) => selectAll.push(elem.querySelector('select')));
			addEventSelectOtherCheck(selectAll);
		});
	};
	//
	const addEventBtnSaveMainInfo = (btn) => {
		btn.addEventListener('click', async () => {
			const malfuncion = document.querySelector('.btn-save-malfunction');
			malfuncion.disabled = false;
			const obj = {
				style: 'btn-change-main-info',
				value: 'Изменить',
				func: (el) => addEventBtnChangeMainInfo(el),
			};
			drawBtnForMainInfo(obj);
			const allRow = document.querySelector('.table-main-info').querySelector('.tbody').querySelectorAll('.t-row');
			const collectData = {};

			allRow.forEach((row) => {
				const key = row.getAttribute('key');
				if (key === 'crane_class') {
					const paragraph = document.createElement('p');
					paragraph.className = 'column th text-center';
					const nextRow = row.nextElementSibling;
					const lastChild = row.lastChild;
					const text = lastChild.options[lastChild.selectedIndex].text;
					const nextText = nextRow.querySelector('select').options[nextRow.querySelector('select').selectedIndex].text;
					paragraph.innerText = `${text}, ${nextText}`;
					row.replaceChild(paragraph, lastChild);
					if (lastChild.value != -1) collectData[key] = lastChild.value;
				} else if (key === 'name_cranes') {
					const lastChild = row.lastChild;
					if (lastChild.value != -1) collectData[key] = lastChild.value;
					row.remove();
				} else {
					const paragraph = document.createElement('p');
					const lastChild = row.lastChild;
					paragraph.className = 'column th text-center';
					const text = lastChild.tagName.toLowerCase() === 'select' ? lastChild.options[lastChild.selectedIndex].text : lastChild.value;
					paragraph.innerText = text;
					row.replaceChild(paragraph, lastChild);
					if (lastChild.value != -1) collectData[key] = lastChild.value;
				}
			});

			const fittingData = {
				name_highways: collectData.name_highways,
				crane_class: collectData.crane_class,
				name_cranes: collectData.name_cranes,
				location_crane: collectData.location_crane,
				technical_number: collectData.technical_number,
				company: collectData.company,
				f_manufacture: collectData.f_manufacture,
				factory_number: collectData.factory_number,
				dn: collectData.dn,
				ius: collectData.ius,
				type_reinforcement: collectData.type_reinforcement,
				pressure: collectData.pressure,
				execution: collectData.execution,
				f_commission: collectData.f_commission,
			};
			const driveData = {
				type_drive: collectData.type_drive,
				drive_company: collectData.drive_company,
				liquid: collectData.liquid,
				drive_factory_number: collectData.drive_factory_number,
				drive_year_commission: collectData.drive_year_commission,
			};
			await putForChangeInfo(fittingData, driveData);
		});
	};

	//
	let allData;
	const userData = await getAllUser();
	let photoCrane;
	let indexListUrl = 0;
	let indexListBodyInfo = 0;
	let urlImg = await getImage();
	let documentUrl = await getDocument();
	let craneData = await getOneCrane();
	let maintenance = await getMaintenance();
	const typesWork = await getTypesWork();
	let identifiedFaults = await getIdentifiedFaults();
	drawTableMalfunction(craneData);
	drawTableMainInfo(craneData);
	urlImg.length && drawImage(urlImg[0]);
	drawMaintenanceContainer();
	addEventBtnMalfunctionClick();
	addEventInputChang();
	addEventBtnSavePhoto();
	addEventBtnDeletePhoto();
	addEventBtnSlideClick();
	addEventBtnHeaderSwitchClick();
	addEventBtnBodySwitchClick();
});
