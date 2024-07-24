document.addEventListener('DOMContentLoaded', function() {
	/**
	* Функция для обработки изменений состояния ошибки и отображения блока с ошибкой.
	*
	* Функция выполняет следующие действия:
	* 1. Находит элемент блока ошибки в документе.
	* 2. Проверяет, есть ли ошибка в состоянии `state.err`.
	* 3. Если ошибка присутствует и блок ошибки не отображается:
	*    - Обновляет текст ошибки в блоке ошибки.
	*    - Показывает блок ошибки, добавляя соответствующий класс.
	*    - Устанавливает таймер для скрытия блока ошибки через 3 секунды и сбрасывает состояние ошибки.
	*/
	const handleErrorChange = () => {
		let errBlock = document.querySelector('.error-block');

		if (state.err !== '') {
			if (!errBlock.classList.contains('show-block')) {
				errBlock.querySelector('.err-text').innerText = state.err;
				errBlock.classList.add('show-block');
				setTimeout(function() {
					errBlock.classList.remove('show-block');
					state.err = '';
				}, 3000);
			};
		};
	};


	const state = {
		err: ""
	};

	/**
	* Создание прокси для объекта состояния с обработкой изменения состояния ошибки.
	*
	* Прокси выполняет следующие действия:
	* 1. Перехватывает установки значений в объект состояния `state`.
	* 2. Обновляет значение в целевом объекте.
	* 3. Если изменяемый ключ равен 'err', вызывает функцию `handleErrorChange` для обработки изменения ошибки.
	*
	* @param {Object} state - Объект состояния.
	*
	* @returns {Proxy} Возвращает прокси для объекта состояния.
	*/
	const stateProxy = new Proxy(state, {
		set(target, key, value) {
			target[key] = value;
			if (key === 'err') {
				handleErrorChange();
			};
			return true;
		}
	});

	handleErrorChange();

	document.addEventListener('updateError', (event) => {
        stateProxy.err = event.detail;
    });
});