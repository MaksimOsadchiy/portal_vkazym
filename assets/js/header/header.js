document.addEventListener('DOMContentLoaded', async () => {
	//
	const getModules = async () => {
		try {
			const response = await fetch(`${SERVER_URL}modules.php`);
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
	const logout = async () => {
		window.location.href = `${BASE_URL}logout.php`;
	};
	//
	const drowMainServeces = () => {
		const container = document.querySelector('.list-references');
		if (SESSION['id']) {
			const loginBlock = document.createElement('a');
			const listContainer = document.createElement('ul');
			const dividingLine = document.createElement('li');
			const line = document.createElement('hr');

			loginBlock.classList = 'nav-link dropdown-toggle';
			listContainer.classList = 'dropdown-menu';
			line.classList = 'dropdown-divider';

			loginBlock.setAttribute('href', '#');
			loginBlock.setAttribute('id', 'navbarDropdown');
			loginBlock.setAttribute('role', 'button');
			loginBlock.setAttribute('data-bs-toggle', 'dropdown');
			loginBlock.setAttribute('aria-expanded', 'false');
			listContainer.setAttribute('aria-labelledby', 'navbarDropdown');

			loginBlock.innerText = SESSION.login;
			let listLiElemetns = [];

			if (SESSION.accessibility[0].id_role === 2) {
				listLiElemetns = allModules.map((obj) => createRow(obj))
			} else {
				listLiElemetns = allModules
					.map((obj) => {
						if (!SESSION.accessibility.some((elem) => elem.name === obj.name)) return;
						if (SESSION.accessibility.some((elem) => elem.name === obj.name && elem.privilege < 1)) return;
						return createRow(obj);
					})
					.filter((elem) => elem !== undefined);
			};


			listLiElemetns = [...listLiElemetns, createRow({ style: 'change-user', link: 'log.php', description: 'Сменить пользователя' })];
			listLiElemetns = [...listLiElemetns, createRow({ style: 'btn-exit', link: '#', description: 'Выйти' })];

			dividingLine.appendChild(line);
			listLiElemetns.forEach((elem, index) => {
				if (index === listLiElemetns.length - 1) {
					listContainer.appendChild(dividingLine);
				}
				listContainer.appendChild(elem);
			});
			container.appendChild(loginBlock);
			container.appendChild(listContainer);
			addEventExitBtn(listContainer);
		} else {
			const component = `<li class="nav-item">
							<a class="nav-link" href="${BASE_URL}log.php">Вход</a>
						</li>`;
			container.innerHTML = component;
		}
	};
	//
	const createRow = (obj) => {
		const liContainer = document.createElement('li');
		const link = document.createElement('a');

		link.classList = `dropdown-item ${obj.style}`;

		link.setAttribute('href', obj.link);

		link.innerText = obj.description;
		liContainer.appendChild(link);
		return liContainer;
	};
	//
	const addEventExitBtn = (list) => {
		const btnExit = list.querySelector('.btn-exit');
		btnExit.addEventListener('click', async () => await logout());
	};

	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	const allModules = await getModules();
	drowMainServeces(allModules);
});
