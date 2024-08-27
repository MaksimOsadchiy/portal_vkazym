document.addEventListener("DOMContentLoaded", async () => {
	/**
	 * Асинхронная функция, которая отправляет запрос на сервер для получения данных о всей технике.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Отправляет HTTP GET запрос на сервер.
	 * 2. Ожидает получения ответа от сервера и преобразует его в формат JSON.
	 * 3. Проверяет, успешен ли ответ сервера (статус ответа `ok`). Если ответ не успешен, выбрасывает ошибку с кодом статуса.
	 * 4. Если запрос успешен, возвращает массив, содержащий данные о технике в виде объектов.
	 * 5. В случае возникновения ошибки во время запроса или обработки ответа, создаёт и диспатчит событие `updateError` с сообщением об ошибке, а также возвращает пустой массив.
	 *
	 * @returns {Array<Object>|[]} Массив, содержащий данные о технике, в случае успешного выполнения запроса. Если произошла ошибка, возвращается пустой массив.
	 *
	 * @throws {Error} Если запрос не удался или произошла ошибка при обработке ответа, будет выброшена ошибка с кодом статуса или сообщением об ошибке.
	 */
	const getAllTechnique = async () => {
		try{
			const response = await fetch(`${SERVER_URL}technique.php`);
			const jsonResponse = await response.json();
			if (!response.ok) throw new Error(jsonResponse.status);
			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			return [];
		}
	};
	/**
	 * Асинхронная функция, которая отправляет запрос на сервер для получения данных о технике с учётом фильтров.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Формирует строку запроса `qparametr`, добавляя переданные параметры `params` к базовому URL.
	 * 2. Отправляет HTTP GET запрос на сервер с фильтрами.
	 * 3. Ожидает получения ответа от сервера и преобразует его в формат JSON.
	 * 4. Проверяет, успешен ли ответ сервера (статус ответа `ok`). Если ответ не успешен, выбрасывает ошибку с кодом статуса.
	 * 5. Если запрос успешен, возвращает массив, содержащий отфильтрованные данные о технике в виде объектов.
	 * 6. В случае возникновения ошибки во время запроса или обработки ответа, создаёт и диспатчит событие `updateError` с сообщением об ошибке, а также возвращает пустой массив.
	 *
	 * @param {string} params - Строка параметров запроса, используемая для фильтрации данных о технике. Строка в виде "key=value&key2=value2".
	 *
	 * @returns {Array<Object>|[]} Массив, содержащий отфильтрованные данные о технике, в случае успешного выполнения запроса. Если произошла ошибка, возвращается пустой массив.
	 *
	 * @throws {Error} Если запрос не удался или произошла ошибка при обработке ответа, будет выброшена ошибка с кодом статуса или сообщением об ошибке.
	 */
	const getFilterTechnique = async (params) => {
		try{
			const qparametr = `?${params}`;
			const response = await fetch(`${SERVER_URL}technique.php${qparametr}`);
			const jsonResponse = await response.json();
			if (!response.ok) throw new Error(jsonResponse.status);
			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
			return [];
		}
	};
	/**
	 * Функция, которая заполняет все элементы `<select>` с классом `.technique-select` опциями, основанными на переданных данных о технике.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит все элементы `<select>` с классом `.technique-select` на странице.
	 * 2. Для каждого найденного элемента `<select>` очищает его содержимое и добавляет пустую опцию по умолчанию, которая неактивна и не может быть выбрана.
	 * 3. Проходит по каждому объекту в массиве `allTechnique` и добавляет соответствующую опцию в каждый элемент `<select>` с помощью функции `createOption`.
	 *
	 * @param {Array<Object>} allTechnique - Массив объектов, содержащих данные о технике, которые будут использоваться для создания опций в элементах `<select>`.
	 *
	 * @returns {void}
	 */
	const drowSelect = (allTechnique) => {
		const allSelect = document.querySelectorAll(".technique-select");
		allSelect.forEach((select) => {
			select.innerHTML = `<option value="-1" class="default-option" selected disabled></option>`;
			allTechnique.forEach((technique) => select.appendChild(createOption(technique)));
		});
	};
	/**
	 * Функция, которая создает элемент `<option>` для `<select>`, основываясь на переданных данных о технике.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Создаёт новый элемент `<option>`.
	 * 2. Устанавливает атрибут `value` этого элемента в значение `id_technique` из объекта `technique`.
	 * 3. Устанавливает текстовое содержимое элемента `<option>` на значение `name_technique` из объекта `technique`.
	 * 4. Возвращает созданный элемент `<option>`.
	 *
	 * @param {Object} technique - Объект, содержащий данные о технике.
	 * @param {number} technique.id_technique - Уникальный идентификатор техники.
	 * @param {string} technique.name_technique - Название техники.
	 *
	 * @returns {HTMLOptionElement} Элемент `<option>`.
	 */
	const createOption = (technique) => {
		const row = document.createElement('option');

		row.setAttribute('value', technique.id_technique);

		row.innerText = technique.name_technique;

		return row;
	}
	/**
	 * Функция, которая добавляет обработчики событий на элементы с классом `.check-datetime` для отслеживания изменений в их состоянии.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит все элементы с классом `.check-datetime` на странице.
	 * 2. Для каждого найденного элемента добавляет обработчик события `change`.
	 * 3. При срабатывании события `change`, вызывается асинхронная функция, которая:
	 *    - Собирает параметры из формы с помощью функции `collectDateTimeContent`.
	 *    - Если параметры не были собраны (например, форма заполнена некорректно), функция прекращает выполнение.
	 *    - Если параметры собраны, выполняет запрос на сервер для фильтрации техники с помощью функции `getFilterTechnique`.
	 *    - Полученные данные о технике передаются в функцию `drowSelect`, которая обновляет список доступных опций в выпадающих списках.
	 *
	 * @returns {void}
	 */
	const addEventDateTimeChange = () => {
		const allElementDateTime = document.querySelectorAll(".check-datetime");
		allElementDateTime.forEach((elem) => {
			elem.addEventListener('change', async () => {
				const params = collectDateTimeContent();
				if (!params) return;
				allTechnique = await getFilterTechnique(params);
				drowSelect(allTechnique);
			});
		});
	};
	/**
	 * Функция, которая собирает и форматирует данные о дате, времени и смене из формы для дальнейшего использования в запросе.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Извлекает значения даты начала (`.date-from`), даты окончания (`.date-to`), времени начала (`.time-from`) и времени окончания (`.time-to`) из соответствующих полей ввода на странице.
	 * 2. Находит выбранную смену, если она была установлена, и получает её значение.
	 * 3. Проверяет валидность введённых данных с помощью функции `validateInputs`. Если проверка не пройдена, функция завершает выполнение и возвращает `undefined`.
	 * 4. Если поля времени не заполнены, устанавливает их значения на основе выбранной смены (`shift`).
	 * 5. Формирует строку с параметрами даты и времени в формате `datetimeFrom=дата_время_начала&datetimeTo=дата_время_окончания`.
	 * 6. Возвращает сформированную строку с параметрами для дальнейшего использования.
	 *
	 * @returns {string|undefined} Строка с параметрами даты и времени, если все данные корректны. Если данные не прошли валидацию, возвращает `undefined`.
	 */
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
	};
	/**
	 * Функция, которая проверяет валидность введённых данных о дате, времени и смене.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Проверяет, заполнены ли поля даты начала (`dateFrom`) и даты окончания (`dateTo`). Если хотя бы одно из них пустое, возвращает `false`.
	 * 2. Проверяет, заполнены ли либо поля времени (`timeFrom` и `timeTo`), либо выбрана смена (`shift`). Если ни время, ни смена не указаны, возвращает `false`.
	 * 3. Если все проверки пройдены, функция возвращает `true`, указывая, что введённые данные корректны.
	 *
	 * @param {string} dateFrom - Дата начала, которая должна быть указана для успешной проверки.
	 * @param {string} dateTo - Дата окончания, которая должна быть указана для успешной проверки.
	 * @param {string} timeFrom - Время начала, которое может быть пустым, если выбрана смена.
	 * @param {string} timeTo - Время окончания, которое может быть пустым, если выбрана смена.
	 * @param {string} shift - Значение смены, которое может заменить время начала и окончания.
	 *
	 * @returns {boolean} `true` если все обязательные поля заполнены, иначе `false`.
	 */
	const validateInputs = (dateFrom, dateTo, timeFrom, timeTo, shift) => {
		if (!dateFrom || !dateTo) return false;
		if (!(timeFrom || shift) || !(timeTo || shift)) return false;

		return true;
	};


	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	let allTechnique = await getAllTechnique();
	drowSelect(allTechnique);
	addEventDateTimeChange();
});