document.addEventListener('DOMContentLoaded', async () => {
	//
	const getMicroservices = async () => {
		try {
			const response = await fetch(`${SERVER_URL}microservices.php`);
			const jsonResponse = await response.json(); // Достаём тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			return jsonResponse;
		} catch (error) {
			console.log(error);
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			return [];
		}
	};
	//
	const drawApps = (modules) => {
		const bodyTable = document.querySelector('.row-modules');
		const pathList = new URL(window.location.href).pathname.split("/");
		const namePage = pathList[pathList.length - 1];
		let moduleName = modules.find((obj) => obj.link === namePage)?.name;
		if (moduleName === undefined && namePage === 'oneCrane.php') moduleName = modules.find((obj) => obj.link === 'allCranes.php').name;
		const userPrivilegeThisModule = SESSION.accessibility.find((obj) => obj.name === moduleName)?.privilege;
		bodyTable.innerText = '';
		bodyTable.appendChild(createApps('blue', 'index.php', 'Главная'));
		if (SESSION.accessibility[0].id_role === 2) {
			modules.forEach((value) => {
				if (namePage === value.link) return;
				if (moduleName !== value.name) return;
				const row = createApps(value.color, value.link, value.description);
				bodyTable.appendChild(row);
			});
		} else {
			modules.forEach((value) => {
				if (namePage === value.link) return;
				if (moduleName !== value.name) return;
				if (userPrivilegeThisModule < value.privilege || userPrivilegeThisModule === undefined) return;
				const row = createApps(value.color, value.link, value.description);
				bodyTable.appendChild(row);
			});
		};
	};
	//
	const createApps = (color, link, text) => {
		const divCol3 = document.createElement('div');
		const buttonApp = document.createElement('a');

		divCol3.className = 'col-3';
		buttonApp.className = 'btn btn-custom ' + color;

		buttonApp.setAttribute('href', link);

		buttonApp.innerText = text;

		divCol3.appendChild(buttonApp);
		return divCol3;
	}


	//
	const allModules = await getMicroservices();
	drawApps(allModules);
});