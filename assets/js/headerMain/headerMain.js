// Импорт
import { jwtDecode } from '../../../node_modules/jwt-decode/build/esm/index.js';
document.addEventListener('DOMContentLoaded', () => {
	// Функция для получения значения куки по имени
	const getCookie = (name) => {
		const cookies = document.cookie.split('; ').map((cookie) => cookie.trim().split('='));
		const cookieMap = Object.fromEntries(cookies);
		const refreshToken = cookieMap[name];
		if (refreshToken) return refreshToken;
	};
	//
	function deleteCookie(name) {
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
	}
	//
	const logout = async () => {
		try {
			const response = await fetch(`${NEW_SERVER_URL}auth/logout`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа
			deleteCookie('auth_token');
			window.location.href = `${BASE_URL}log.php`;
		} catch (error) {
			// Если была ошибка, то обновляем переменную
			// console.log(error);
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
		}
	};
	//
	const drowMainServeces = (user) => {
		const container = document.querySelector('.list-references');
		if (user) {
			const loginBlock = document.createElement('a');
			const listContainer = document.createElement('ul');
			const listElemens = [
				{ href: '#', text: 'Администрирование', style: '' },
				{ href: `${BASE_URL}index.php`, text: 'Главная', style: '' },
				{ href: `${BASE_URL}technique.php`, text: 'Заказ техник', style: '' },
				{ href: `${BASE_URL}log.php`, text: 'Печать ЛКРИ', style: '' },
				{ href: `#`, text: 'Сменить пользователя', style: 'change-user' },
				{ href: `#`, text: 'Выйти', style: 'btn-exit' },
			];
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

			loginBlock.innerText = user.login;
			//
			const listLiElemetns = listElemens
				.map((obj) => {
					if (user.privilege === 1) {
						const liContainer = document.createElement('li');
						const link = document.createElement('a');

						link.classList = `dropdown-item ${obj.style}`;

						link.setAttribute('href', obj.href);

						link.innerText = obj.text;
						liContainer.appendChild(link);
						return liContainer;
					} else {
						if (obj.text !== 'Администрирование') {
							const liContainer = document.createElement('li');
							const link = document.createElement('a');

							link.classList = `dropdown-item ${obj.style}`;

							link.setAttribute('href', obj.href);

							link.innerText = obj.text;
							liContainer.appendChild(link);
							return liContainer;
						}
					}
				})
				.filter((elem) => elem !== undefined);

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
	const addEventExitBtn = (list) => {
		const btnExit = list.querySelector('.btn-exit');
		const btnChangeUser = list.querySelector('.change-user');
		[btnExit, btnChangeUser].forEach((elem) => elem.addEventListener('click', async () => await logout()));
	};

	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	const user = getCookie('auth_token') ? jwtDecode(getCookie('auth_token')) : '';
	drowMainServeces(user);
});
