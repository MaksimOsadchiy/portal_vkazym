document.addEventListener('DOMContentLoaded', async () => {
	//
	const getServices = async () => {
		try {
			const response = await fetch(`${NEW_SERVER_URL}service`);
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа
			return jsonResponse;
		} catch (error) {
			// Если была ошибка, то обновляем переменную
			// console.log(error);
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			return [];
		}
	};
	//
	const registration = async () => {
		try {
			const content = collectСontent();
			const response = await fetch(`${NEW_SERVER_URL}auth/registration`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(content),
			});
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа
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
		const passwordTo = document.querySelector('.password-to').value;
		const service = +document.querySelector('.service').value;
		const patternLogin = /^[a-zA-Z]{2}\.[a-zA-Z0-9]+$/;

		if (!login.trim()) throw new Error('Введите логин!');
		if (!patternLogin.test(login)) throw new Error('Логин должен иметь вид: aa.ivanov');
		if (!service) throw new Error('Выберите службу!');
		if (password.trim().length < 8) throw new Error('Длина паролья минимум 8 символов!');
		if (password !== passwordTo) throw new Error('Пароли должны совпадать!');

		const result = {
			login,
			password,
			service,
		};
		return result;
	};
	//
	const drawSelect = () => {
		const select = document.querySelector('.service');
		services.forEach((obj) => select.append(createOption(obj)));
	};
	//
	const createOption = (obj) => {
		const option = document.createElement('option');
		option.value = obj.id;
		option.innerText = obj.service;
		return option;
	};
	//
	const addEventEnterBtn = () => {
		const btnEnter = document.querySelector('.btn-registration');
		btnEnter.addEventListener('click', async () => await registration());
	};

	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	const services = await getServices();
	drawSelect();
	addEventEnterBtn();
});
