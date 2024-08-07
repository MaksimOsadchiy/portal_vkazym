document.addEventListener('DOMContentLoaded', async () => {
	//
	const getAllCreanes = async () => {
		try {
			const response = await fetch(`${SERVER_URL}/cranes/temp.php`);
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return [];
		}
	};
	//
	const drawTable = (cranes) => {
		const tbody = document.querySelector('.tbody');
		tbody.innerText = '';
		for (const section in cranes) {
			if (cranes[section].length) {
				tbody.appendChild(createSection(section));
				cranes[section].forEach((crane) => tbody.appendChild(createRow(crane)));
			}
		}
		const allRow = tbody.querySelectorAll('.t-row');
		allRow.forEach((row, index) => (row.querySelector('.column').innerText = index + 1));
	};
	//
	const createSection = (name) => {
		const row = document.createElement('div');

		row.className = 'row-section text-center py-2';

		row.innerText = name;

		return row;
	};
	//
	const createRow = (crane) => {
		const row = document.createElement('div');
		const id = document.createElement('p');
		const lpumg = document.createElement('p');
		const highways = document.createElement('p');
		const accessories = document.createElement('p');
		const location = document.createElement('p');
		const technical_number = document.createElement('p');
		const company = document.createElement('p');
		const f_manufacture = document.createElement('p');
		const DN = document.createElement('p');
		const generalDescription = document.createElement('p');
		const drainage = document.createElement('p');
		const pipelines = document.createElement('p');
		const replacement = document.createElement('p');
		const act_leakage = document.createElement('p');

		row.className = 't-row d-flex flex-row justify-content-center';
		row.setAttribute('value', crane.id);
		addEventRowClick(row);

		const list = [
			id,
			lpumg,
			highways,
			accessories,
			location,
			technical_number,
			company,
			f_manufacture,
			DN,
			generalDescription,
			drainage,
			pipelines,
			replacement,
			act_leakage,
		];

		list.forEach((elem) => {
			elem.className = 'column th text-center';
			row.appendChild(elem);
		});

		// id.innerText = crane.id;
		lpumg.innerText = crane.lpumg;
		highways.innerText = crane.highways;
		accessories.innerText = crane.accessories;
		location.innerText = crane.location;
		technical_number.innerText = crane.technical_number;
		company.innerText = crane.company;
		f_manufacture.innerText = crane.f_manufacture;
		DN.innerText = crane.DN;
		generalDescription.innerText = crane.general_description ? crane.general_description : 'Не указано';
		drainage.innerText = crane.drainage ? crane.drainage : 'Не указано';
		pipelines.innerText = crane.pipelines ? crane.pipelines : 'Не указано';
		replacement.innerText = crane.replacement ? crane.replacement : 'Не указано';
		act_leakage.innerText = crane.act_leakage ? crane.act_leakage : 'Не указано';

		return row;
	};
	//
	const addEventSelectChange = () => {
		const select = document.querySelector('.choice');
		select.addEventListener('change', () => {
			if (+select.value >= 0) {
				let newCranes = JSON.parse(JSON.stringify(cranes));
				for (const key in newCranes) {
					newCranes[key] = newCranes[key].filter((item) => item.result === +select.value);
				}
				drawTable(newCranes);
			} else {
				drawTable(cranes);
			}
		});
	};
	//
	const addEventRowClick = (row) => {
		row.addEventListener('click', () => {
			window.location.href = `${BASE_URL}oneCrane.php?id=${+row.getAttribute('value')}`;
		});
	};

	//
	const cranes = await getAllCreanes();
	console.log(cranes);
	drawTable(cranes);
	addEventSelectChange();
});
