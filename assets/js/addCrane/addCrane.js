document.addEventListener('DOMContentLoaded', async () => {
	//
	const postCrane = async (newCrane) => {
		try {
			const response = await fetch(`${SERVER_URL}cranes/crane.php`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newCrane),
			});
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			document.dispatchEvent(
				new CustomEvent('updateError', { detail: 'Кран Создан!' })
			); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			window.location.href = `${BASE_URL}oneCrane.php?id=${jsonResponse}`;
		} catch (error) {
			console.log(error);
			document.dispatchEvent(
				new CustomEvent('updateError', { detail: error.message })
			); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return [];
		}
	};
	// НУЖНО
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
			document.dispatchEvent(
				new CustomEvent('updateError', { detail: error.message })
			); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return {};
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
			document.dispatchEvent(
				new CustomEvent('updateError', { detail: error.message })
			); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return {};
		}
	};
	//
	const drawTableMainInfo = (crane) => {
		const body = document.querySelector('.content__body');
		const managmentBtn = body.querySelector('.switch');
		body.innerText = '';
		body.appendChild(managmentBtn);
		const mainContent = `
			<p class="mb-2 fs-5">Характеристики ТПА</p>
			<button class="btn-change-main-info btn-main-info btn btn-secondary mb-2" ${
				SESSION.accessibility[0].id_role === 2 ||
				+SESSION.accessibility.find((obj) => obj.name === 'cranes')
					.privilege === 3
					? ''
					: 'disabled'
			}>Изменить</button>
			<div class="table table-main-info d-flex flex-column align-items-center">
				<div class="thead d-flex flex-column">
					<div class="t-row d-flex flex-row justify-content-center">
						<p class="column th">Характеристика</p>
						<p class="column th">Значение</p>
					</div>
				</div>
				<div class="tbody d-flex flex-column"></div>
			</div>
			<button class="btn-change-main-info btn-main-info btn btn-secondary mb-2" ${
				SESSION.accessibility[0].id_role === 2 ||
				+SESSION.accessibility.find((obj) => obj.name === 'cranes')
					.privilege === 3
					? ''
					: 'disabled'
			}>Изменить</button>`;
		body.insertAdjacentHTML('beforeend', mainContent);
		const bodyTable = document
			.querySelector('.table-main-info')
			.querySelector('.tbody');

		document
			.querySelectorAll('.btn-change-main-info')
			.forEach((btn) => addEventBtnChangeMainInfo(btn));

		for (const key in crane.mainInfo) {
			bodyTable.appendChild(createSection(key));
			for (const keyTwo in crane.mainInfo[key]) {
				const title = crane.mainInfo[key][keyTwo].title;
				const value =
					key === 'Исправность'
						? crane.mainInfo[key][keyTwo].description
						: crane.mainInfo[key][keyTwo].value;
				bodyTable.appendChild(
					createRowMainInfo(
						title,
						value,
						keyTwo,
						crane.mainInfo[key][keyTwo].required
					)
				);
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
		data.forEach((obj) =>
			container.appendChild(
				createRowDocument(obj.id, obj.document_url, obj.name)
			)
		);
		addEventInputLoadDocument();
		addEventImgDeleteDocumentClick();
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
		statusContainer.className =
			'modal-status d-flex flex-row column-gap-4 pt-2 align-items-start';
		titleStatus.className = 'col-2 text-end';
		status.className = 'window-row-data';
		goodOption.className = 'green';
		badOption.className = 'red';
		goodOption.setAttribute('value', 1);
		badOption.setAttribute('value', 0);
		data.status
			? (goodOption.selected = true)
			: (badOption.selected = true);
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
		firstContainer.className =
			'd-flex flex-row align-items-center column-gap-4';
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
		secondContainer.className =
			'd-flex flex-row align-items-center column-gap-4';
		titlePossibleCause.className = 'col-2 text-end';
		possibleCause.className = 'window-row-data col-8';
		titlePossibleCause.innerText = 'Описание неисправности:';
		possibleCause.innerText = data.possible_cause
			? data.possible_cause
			: '-';
		secondContainer.appendChild(titlePossibleCause);
		secondContainer.appendChild(possibleCause);

		modalBody.setAttribute('id', data.id);

		const lastChild = modalBody.lastChild;
		if (modalBody.querySelector('.temp'))
			modalBody.removeChild(lastChild.previousElementSibling);
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
		const select = createSelect(
			'',
			data.login_troubleshooting ? data.login_troubleshooting : '',
			userData
		);
		firstContainer.className =
			'd-flex flex-row align-items-center column-gap-4';
		inputDateTroubleshooting.className =
			'input-date-trouble form-control date-from col-3';
		titleDateTroubleshooting.className = 'col-2 text-end';
		select.classList.add('window-row-data');
		select.classList.add('input-name-trouble');
		// nameTroubleshooting.className = 'input-name-trouble form-control';
		inputDateTroubleshooting.setAttribute('type', 'date');
		// nameTroubleshooting.setAttribute('type', 'text');
		titleDateTroubleshooting.innerText = 'Дата:';
		inputDateTroubleshooting.value = data.date_troubleshooting
			? data.date_troubleshooting
			: '';
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
		completeActivities.value = data.complete_activities
			? data.complete_activities
			: '';
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
		firstContainer.className =
			'd-flex flex-row align-items-center column-gap-4 mt-3';
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
		typeWork.innerText = data.type_maintenance
			? data.type_maintenance
			: '-';
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
	const createRowMainInfo = (title, name, key, required) => {
		const row = document.createElement('div');
		const parameterBlock = document.createElement('div');
		const parameterText = document.createElement('p');
		const status = document.createElement('p');

		row.className = 't-row d-flex flex-row justify-content-center';

		parameterBlock.className = 'column th text-center';
		parameterText.className = required ? 'row_required' : '';
		status.className = 'column th text-center';

		row.setAttribute('key', key);

		parameterText.innerText = title;
		status.innerText = name;

		parameterBlock.appendChild(parameterText);
		row.appendChild(parameterBlock);
		row.appendChild(status);

		return row;
	};
	//
	const createRowDocument = (id, ref, name) => {
		const row = document.createElement('div');
		const link = document.createElement('a');
		const deleteDocument = document.createElement('img');

		row.className =
			'document-row d-flex flex-row column-gap-4 my-1 py-1 fs-5';
		link.className = 'document-link';
		deleteDocument.className = 'delete-document';

		row.setAttribute('id', id);
		link.setAttribute('href', ref);
		link.setAttribute('download', name);
		deleteDocument.setAttribute(
			'src',
			`${BASE_URL}assets/image/garbage.png`
		);
		link.innerText = name;

		row.appendChild(link);
		row.appendChild(deleteDocument);
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
				name == elem.name &&
					(option.selected = true) &&
					select.removeChild(select.firstChild);
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
	const addEventSelectOtherCheck = (list) => {
		// const list = document.querySelectorAll('select');
		list.forEach((elem) => {
			elem.dataset.previousValue = elem.querySelector(
				`[value="${elem.value}"]`
			).textContent;
			elem.addEventListener('change', (e) => {
				const str = elem.querySelector(
					`[value="${elem.value}"]`
				).textContent;
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
			img.addEventListener(
				'click',
				async () => await deleteDocument(elem.getAttribute('id'))
			);
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
	const addEventBtnSaveChanges = (btn) => {
		btn.addEventListener('click', async () => await putIdentifiedFaults());
	};
	//
	const addEventWindowBtnSwitchClick = (data) => {
		const switchBtn = document
			.querySelector('.modal-body')
			.querySelector('.switch')
			.querySelectorAll('button');
		switchBtn.forEach((elem, index) => {
			elem.addEventListener('click', () => {
				elem.classList.add('selected-group');
				elem.disabled = true;
				switchBtn[switchBtn.length - 1 - index].classList.remove(
					'selected-group'
				);
				switchBtn[switchBtn.length - 1 - index].disabled = false;
				index
					? drawContentWindowIdentifiedFaultSecond(data)
					: drawContentWindowIdentifiedFaultFirst(data);
			});
		});
	};
	//
	const addEventBtnChangeMainInfo = (btn) => {
		btn.addEventListener('click', async () => {
			const data = allData ? allData : await getForChangeInfo();
			const obj = {
				style: 'btn-save-main-info',
				value: 'Сохранить',
				func: (el) => addEventBtnSaveMainInfo(el),
			};
			drawBtnForMainInfo(obj);
			const allRow = document
				.querySelector('.table-main-info')
				.querySelector('.tbody')
				.querySelectorAll('.t-row');
			allRow.forEach((row) => {
				const key = row.getAttribute('key');
				const select = document.createElement('select');
				const lastChild = row.lastChild;

				const option = document.createElement('option');
				const text =
					key === 'crane_class'
						? lastChild.textContent.split(', ')
						: lastChild.textContent;
				const curText = key === 'crane_class' ? text[0] : text;
				option.innerText = curText;
				option.value = curText.length ? text : -1;
				option.selected = true;
				select.appendChild(option);
				data[key] &&
					data[key].forEach((elem) => {
						const option = document.createElement('option');
						option.innerText = elem.name;
						option.value = elem.key;
						curText == elem.name &&
							(option.selected = true) &&
							select.removeChild(select.firstChild);
						select.appendChild(option);
					});

				select.className = 'window-row-data column th';
				row.replaceChild(select, lastChild);

				if (key === 'crane_class') {
					const newRow = document.createElement('div');
					const firstColumn = document.createElement('div');
					const firstColumnText = document.createElement('p');
					const select = document.createElement('select');
					newRow.className =
						't-row d-flex flex-row justify-content-center';
					newRow.setAttribute('key', 'name_cranes');
					firstColumn.className = 'column th text-center';
					firstColumnText.className = 'row_required';
					firstColumnText.innerText = 'Тип крана';
					select.className = 'window-row-data column th';

					const option = document.createElement('option');
					option.innerText = text[1] ? text[1] : null;
					option.value = -1;
					option.selected = true;
					select.appendChild(option);
					data['name_cranes'] &&
						data['name_cranes'].forEach((elem) => {
							const option = document.createElement('option');
							option.innerText = elem.name;
							option.value = elem.key;
							text[1] == elem.name &&
								(option.selected = true) &&
								select.removeChild(select.firstChild);
							select.appendChild(option);
						});
					firstColumn.appendChild(firstColumnText);
					newRow.appendChild(firstColumn);
					newRow.appendChild(select);
					row.insertAdjacentElement('afterend', newRow);
				}
			});
			const selectAll = [];
			allRow.forEach((elem) =>
				selectAll.push(elem.querySelector('select'))
			);
			addEventSelectOtherCheck(selectAll);
		});
	};
	//
	const addEventBtnSaveMainInfo = (btn) => {
		btn.addEventListener('click', async () => {
			const obj = {
				style: 'btn-change-main-info',
				value: 'Изменить',
				func: (el) => addEventBtnChangeMainInfo(el),
			};
			drawBtnForMainInfo(obj);
			const allRow = document
				.querySelector('.table-main-info')
				.querySelector('.tbody')
				.querySelectorAll('.t-row');
			const collectData = {};

			allRow.forEach((row) => {
				const key = row.getAttribute('key');
				if (key === 'crane_class') {
					const paragraph = document.createElement('p');
					paragraph.className = 'column th text-center';
					const nextRow = row.nextElementSibling;
					const lastChild = row.lastChild;
					const text =
						lastChild.options[lastChild.selectedIndex].text;
					const nextText =
						nextRow.querySelector('select').options[
							nextRow.querySelector('select').selectedIndex
						].text;
					paragraph.innerText =
						text && nextText
							? `${text}, ${nextText}`
							: `${text ? text : 'Класс крана не выбран'}, ${
									nextText ? nextText : 'тип крана не выбран'
							  }`;
					row.replaceChild(paragraph, lastChild);
					if (lastChild.value != -1)
						collectData[key] = lastChild.value;
				} else if (key === 'name_cranes') {
					const lastChild = row.lastChild;
					if (lastChild.value != -1)
						collectData[key] = lastChild.value;
					row.remove();
				} else {
					const paragraph = document.createElement('p');
					const lastChild = row.lastChild;
					paragraph.className = 'column th text-center';
					const text =
						lastChild.tagName.toLowerCase() === 'select'
							? lastChild.options[lastChild.selectedIndex].text
							: lastChild.value;
					paragraph.innerText = text;
					row.replaceChild(paragraph, lastChild);
					if (lastChild.value != -1)
						collectData[key] = lastChild.value;
				}
			});
			console.log(collectData);
			const newCrane = {
				name_highways: collectData.name_highways,
				crane_class: collectData.crane_class,
				name_crane: collectData.name_cranes,
				location_crane: collectData.location_crane,
				technical_number: collectData.technical_number,
				company: collectData.company,
				year_manufacture: collectData.f_manufacture,
				Dn: collectData.dn,
				IUS: collectData.ius,
				unification_crane: collectData.unification_crane,
				type_reinforcement: collectData.type_reinforcement,
				pressure: collectData.pressure,
				execution: collectData.execution,
				year_commission: collectData.f_commission,
				type_drive_d: collectData.type_drive,
				company_d: collectData.drive_company,
				year_commission_d: collectData.drive_year_commission,
			};
			await postCrane(newCrane);
		});
	};

	//
	let allData;
	const userData = await getAllUser();
	let craneData = {
		list_result: [
			{
				id: 1,
				name: '0',
				description: 'Неработающие краны',
			},
			{
				id: 2,
				name: '1',
				description: 'Работающие краны',
			},
			{
				id: 3,
				name: '2',
				description: 'Дефективные краны',
			},
		],
		mainInfo: {
			Основное: {
				ius: {
					title: 'ИУС',
					value: '',
					required: false,
				},
				unification_crane: {
					title: 'КРУ',
					value: '',
					required: false,
				},
				lpumg: {
					title: 'Наименование ЛПУМГ',
					value: 'Верхнеказымское',
					required: true,
				},
				name_highways: {
					title: 'Наименование газопровода',
					value: '',
					required: true,
				},
				crane_class: {
					title: 'Класс крана',
					value: '',
					required: true,
				},
				location_crane: {
					title: 'Местонахождения крана',
					value: null,
					required: true,
				},
				technical_number: {
					title: 'Технологический номер крана',
					value: '',
					required: true,
				},
				type_reinforcement: {
					title: 'ТИП',
					value: '',
					required: false,
				},
				company: {
					title: 'Фирма, завод изготовитель',
					value: '',
					required: true,
				},
				factory_number: {
					title: 'Заводской номер',
					value: null,
					required: false,
				},
				dn: {
					title: 'Dn,мм',
					value: null,
					required: true,
				},
				pressure: {
					title: 'Р, кгс/см2',
					value: null,
					required: false,
				},
				execution: {
					title: 'Исполнение',
					value: '',
					required: false,
				},
				f_manufacture: {
					title: 'Год изготовления',
					value: '',
					required: false,
				},
				f_commission: {
					title: 'Дата ввода в эксплуатацию',
					value: '',
					required: false,
				},
			},
			Привод: {
				type_drive: {
					title: 'ТИП',
					value: '',
					required: true,
				},
				drive_company: {
					title: 'Фирма, завод',
					value: '',
					required: true,
				},
				drive_factory_number: {
					title: 'Заводской номер',
					value: null,
					required: false,
				},
				liquid: {
					title: 'Гидравлическая жидкость',
					value: null,
					required: false,
				},
				drive_year_commission: {
					title: 'Дата ввода в эксплуатацию',
					value: '',
					required: false,
				},
			},
		},
	};
	drawTableMainInfo(craneData);
});
