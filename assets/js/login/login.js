document.addEventListener('DOMContentLoaded', () => {
	//
	const login = async () => {
		try {
			const content = collectСontent();
			const response = await fetch(`${NEW_SERVER_URL}auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(content),
			});
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа
			console.log(jsonResponse);
			window.location.href = BASE_URL;
		} catch (error) {
			// Если была ошибка, то обновляем переменную
			// console.log(error);
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
		}
	};
	//
	const collectСontent = () => {
		const login = document.querySelector('.login').value;
		const password = document.querySelector('.password').value;

		if (!login.trim()) throw new Error('Введите логин!');
		if (!password.trim().length) throw new Error('Введите пароль');

		const result = {
			login,
			password,
		};
		return result;
	};
	//
	const addEventEnterBtn = () => {
		const btnEnter = document.querySelector('.btn-login');
		btnEnter.addEventListener('click', async () => await login());
	};

	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	addEventEnterBtn();
});
