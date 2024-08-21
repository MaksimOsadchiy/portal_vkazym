document.addEventListener("DOMContentLoaded", async () => {
	//
	const getAllTechnique = async () => {
		try{
			const response = await fetch(`${SERVER_URL}technique.php`);
			const jsonResponse = await response.json(); // Достаём тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа
			return jsonResponse;
		} catch (error) {
			// Если была ошибка, то обновляем переменную
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			return [];
		}
	};
	const getFilterTechnique = async (params) => {
		try{
			const qparametr = `?${params}`;
			const response = await fetch(`${SERVER_URL}technique.php${qparametr}`);
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
	const drowSelect = (allTechnique) => {
		const allSelect = document.querySelectorAll(".technique-select");
		allSelect.forEach((select) => {
			select.innerHTML = `<option value="-1" class="default-option" selected disabled></option>`;
			allTechnique.forEach((technique) => select.appendChild(createSelectRow(technique)));
		});
	};
	//
	const createSelectRow = (technique) => {
		const row = document.createElement('option');

		row.setAttribute('value', technique.id_technique);

		row.innerText = technique.name_technique;

		return row;
	}
	//
	const addEventDateTimeChange = () => {
		const allElementDateTime = document.querySelectorAll(".check-datetime");
		allElementDateTime.forEach((elem) => {
			elem.addEventListener('change', async () => {
				const params = collectDateTimeContent();
				if (!params) return;
				allTechnique = await getFilterTechnique(params);
				drowSelect(allTechnique);
			});
		})
	}
	//
	const collectDateTimeContent = () => {
		const dateFrom = document.querySelector('.date-from').value;
		const dateTo = document.querySelector('.date-to').value;
		let timeFrom = document.querySelector('.time-from').value;
		let timeTo = document.querySelector('.time-to').value;
		const shift = Array.from(document.querySelectorAll('.form-check-input')).find((elem) => elem.checked)?.value;

		if (!validateInputs(dateFrom, dateTo, timeFrom, timeTo, shift)) return;

		timeFrom = timeFrom ? timeFrom : shift.slice(0, 5);
		timeTo = timeTo ? timeTo : shift.slice(6, 11);

		const result = `datetimeFrom=${dateFrom} ${timeFrom}&datetimeTo=${dateTo} ${timeTo}`;
		return result;
		// console.log(dateFrom, timeFrom);
		// console.log(dateTo, timeTo);
	}
	//
	const validateInputs = (dateFrom, dateTo, timeFrom, timeTo, shift) => {
		if (!dateFrom || !dateTo) return false;
		if (!(timeFrom || shift) || !(timeTo || shift)) return false;

		return true;
	};
	//
	let allTechnique = await getAllTechnique();
	drowSelect(allTechnique);
	addEventDateTimeChange();
});