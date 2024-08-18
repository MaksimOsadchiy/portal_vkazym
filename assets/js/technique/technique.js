document.addEventListener('DOMContentLoaded', async () => {
	//
	const getAllTechnique = async () => {
		try {
			const response = await fetch(`${NEW_SERVER_URL}techniques`);
			const jsonResponse = await response.json(); // Достаём тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа
			return jsonResponse;
		} catch (error) {
			// Если была ошибка, то обновляем переменную
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			return [];
		}
	};
	//
	const getFilterTechnique = async (params) => {
		try {
			const qparametr = `?${params}`;
			const response = await fetch(`${NEW_SERVER_URL}techniques${qparametr}`);
			const jsonResponse = await response.json(); // Достаём тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа
			return jsonResponse;
		} catch (error) {
			// Если была ошибка, то обновляем переменную
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			return [];
		}
	};
	//
	const drawTable = (technique) => {
		const bodyTable = document.querySelector('tbody');
		bodyTable.innerText = '';
		technique.forEach((technique) => {
			const row = createDefaultRow(technique);
			bodyTable.appendChild(row);
		});
	};
	//
	const drowSelect = () => {
		const select = document.querySelector('.form-select');
		select.innerHTML = `<option value="-1" selected>Выберите тип техники</option>`;
		const listTypes = {};
		allTechnique.forEach((obj) => {
			if (obj.id_type_of_techniques in listTypes) return;
			select.appendChild(createTypeRow(obj.id_type_of_techniques, obj.name));
			listTypes[obj.id_type_of_techniques] = obj.name;
		});
	};
	//
	const createDefaultRow = (technique) => {
		// Создаём DOM элементы
		const row = document.createElement('tr');
		const tdTechniqueNumber = document.createElement('td');
		const tdModel = document.createElement('td');
		const tdType = document.createElement('td');

		// Добавляем классы
		row.className = 'techTable';

		// Добавляем атрибуты
		row.setAttribute('value', technique.id);
		tdTechniqueNumber.innerText = technique.state_number;
		tdModel.innerText = technique.name_technique;
		tdType.innerText = technique.name;

		// Собираем части в единую строку
		row.appendChild(tdTechniqueNumber);
		row.appendChild(tdModel);
		row.appendChild(tdType);

		return row;
	};
	//
	const createTypeRow = (id, content) => {
		const row = document.createElement('option');

		row.setAttribute('value', id);

		row.innerText = content;

		return row;
	};
	//
	const addEventBtnSearch = () => {
		const btn = document.querySelector('.btn-search');
		btn.addEventListener('click', async () => {
			try {
				const select = document.querySelector('.form-select');
				const { datetimeFrom, datetimeTo } = collectData();
				const params = `date_from=${datetimeFrom}&date_to=${datetimeTo}`;
				allTechnique = await getFilterTechnique(params);
				filterDataTable(select.value);
			} catch (error) {
				console.log(error);
				document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			}
		});
	};
	//
	const addEventSelectChange = () => {
		const select = document.querySelector('.form-select');
		select.addEventListener('change', () => filterDataTable(select.value));
	};
	//
	const filterDataTable = (typeId) => {
		let filterTechnique = allTechnique;
		if (+typeId >= 0) filterTechnique = allTechnique.filter((technique) => +technique.id_type_of_techniques === +typeId);
		drawTable(filterTechnique);
	};
	//
	const collectData = () => {
		const timeFrom = document.querySelector('#timeFrom').value;
		const timeTo = document.querySelector('#timeTo').value;
		const dateFrom = document.querySelector('#dateFrom').value;
		let dateTo = document.querySelector('#dateFrom').value;

		if (!timeFrom) throw new Error('Введите время С!');
		if (!timeTo) throw new Error('Введите время ПО!');
		if (!dateFrom) throw new Error('Введите дату!');

		if (new Date(`1970-01-01T${timeFrom}:00Z`) > new Date(`1970-01-01T${timeTo}:00Z`)) {
			dateTo = addOneDay(dateTo);
		}

		const datetimeFrom = `${dateFrom} ${timeFrom}`;
		const datetimeTo = `${dateTo} ${timeTo}`;

		return { datetimeFrom, datetimeTo };
	};
	//
	const addOneDay = (dateString) => {
		const date = new Date(dateString);

		date.setDate(date.getDate() + 1);

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	};

	//
	let allTechnique = await getAllTechnique();
	drawTable(allTechnique);
	drowSelect();
	addEventSelectChange();
	addEventBtnSearch();
});
