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
	const createCSV = async (file) => {
		try {
			const formData = new FormData();
			formData.append('file', file);
			const response = await fetch(`${SERVER_URL}cranes/crane.php`, {
				method: 'POST',
				body: formData,
			});
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok || response.status == 207)
				throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			document.dispatchEvent(
				new CustomEvent('updateError', { detail: 'Краны Созданы!' })
			); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
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
	const drawInputFileBlock = () => {
		const body = document.querySelector('.content__body');
		const managmentBtn = body.querySelector('.switch');
		body.innerText = '';
		body.appendChild(managmentBtn);
		const mainContent = `
			<div class="document-container d-flex flex-column align-items-center px-3 py-2 mb-3">
				<p class="fs-5 mb-2">Выберите csv файл</p>
				<input type='file' accept=".csv" class="input_document btn btn-secondary" /> 
			</div>`;
		body.insertAdjacentHTML('beforeend', mainContent);
		addEventInputLoadDocument();
		// addEventImgDeleteDocumentClick();
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
	const addEventBtnBodySwitchClick = () => {
		const switchBtn = document
			.querySelector('.content__body')
			.querySelector('.switch')
			.querySelectorAll('button');
		const list = [
			() => drawTableMainInfo(craneData),
			() => drawInputFileBlock(),
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
				const newDocument = await createCSV(documentCrane);
				console.log(newDocument);
				e.target.value = '';
			}
		});
	};
	//
	// const addEventImgDeleteDocumentClick = () => {
	// 	const allRow = document.querySelectorAll('.document-row');
	// 	allRow.forEach((elem) => {
	// 		const img = elem.querySelector('.delete-document');
	// 		img.addEventListener(
	// 			'click',
	// 			async () => await deleteDocument(elem.getAttribute('id'))
	// 		);
	// 	});
	// };
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
	addEventBtnBodySwitchClick();
});
