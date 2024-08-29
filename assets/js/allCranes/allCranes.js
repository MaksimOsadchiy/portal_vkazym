// import * as XLSX from 'https://cdn.sheetjs.com/xlsx-0.18.5/package/xlsx.mjs';
import * as XLSX from '../xlsx.mjs';
document.addEventListener('DOMContentLoaded', async () => {
	/**
	 * Асинхронная функция для получения списка всех кранов с сервера.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Отправляет HTTP GET запрос на сервер.
	 * 2. Ожидает ответа от сервера и преобразует его тело в формат JSON.
	 * 3. Проверяет статус ответа сервера:
	 *    - Если статус ответа не `ok`, выбрасывает ошибку с кодом статуса, содержащимся в ответе.
	 * 4. Если запрос успешен, возвращает полученные данные в формате JSON.
	 * 5. В случае ошибки во время запроса или обработки ответа:
	 *    - Вызывает событие `updateError`, передавая сообщение об ошибке в качестве детали события.
	 *    - Возвращает пустой массив, чтобы избежать дальнейших проблем в коде, который ожидает данные.
	 *
	 * @throws {Error} Если запрос не удался или произошла ошибка при обработке ответа, будет выброшена ошибка с сообщением об ошибке.
	 *
	 * @returns {Record<string, Array<Object>>|[]} Возвращает объект, где ключи — это строки, представляющие секции,
	 * а значения — массивы объектов, представляющих данные кранов.
	 * Или пустой массив в случае ошибки.
	 */
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
	/**
	 * Асинхронная функция для получения списка всех магистралей с сервера.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Отправляет HTTP GET запрос на сервер.
	 * 2. Ожидает ответа от сервера и преобразует его тело в формат JSON.
	 * 3. Проверяет статус ответа сервера:
	 *    - Если статус ответа не `ok`, выбрасывает ошибку с кодом статуса, содержащимся в ответе.
	 * 4. Если запрос успешен, возвращает полученные данные в формате JSON.
	 * 5. В случае ошибки во время запроса или обработки ответа:
	 *    - Вызывает событие `updateError`, передавая сообщение об ошибке в качестве детали события.
	 *    - Возвращает пустой массив, чтобы избежать дальнейших проблем в коде, который ожидает данные.
	 *
	 * @throws {Error} Если запрос не удался или произошла ошибка при обработке ответа, будет выброшена ошибка с сообщением об ошибке.
	 *
	 * @returns {Array<Record<string, (string|number)>>|[]} Возвращает массив. Или пустой массив в случае ошибки.
	 */
	const getAllHighways = async () => {
		try {
			const response = await fetch(`${SERVER_URL}/cranes/highways.php`);
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return [];
		}
	};
	/**
	 * Асинхронная функция для получения списка классов кранов с сервера.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Отправляет HTTP GET запрос на сервер.
	 * 2. Ожидает ответа от сервера и преобразует его тело в формат JSON.
	 * 3. Проверяет статус ответа сервера:
	 *    - Если статус ответа не `ok`, выбрасывает ошибку с кодом статуса, содержащимся в ответе.
	 * 4. Если запрос успешен, возвращает полученные данные.
	 * 5. В случае ошибки во время запроса или обработки ответа:
	 *    - Вызывает событие `updateError`, передавая сообщение об ошибке в качестве детали события.
	 *    - Возвращает пустой массив, чтобы избежать дальнейших проблем в коде, который ожидает данные.
	 *
	 * @throws {Error} Если запрос не удался или произошла ошибка при обработке ответа, будет выброшена ошибка с сообщением об ошибке.
	 *
	 * @returns {Array<Record<string, (string|number)>>|[]} Возвращает массив. Или пустой массив в случае ошибки.
	 */
	const getAllClassCranes = async () => {
		try {
			const response = await fetch(`${SERVER_URL}/cranes/classCranes.php`);
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return [];
		}
	};
	/**
	 * Асинхронная функция для получения списка типов кранов с сервера.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Отправляет HTTP GET запрос на сервер.
	 * 2. Ожидает ответа от сервера и преобразует его тело в формат JSON.
	 * 3. Проверяет статус ответа сервера:
	 *    - Если статус ответа не `ok`, выбрасывает ошибку с кодом статуса, содержащимся в ответе.
	 * 4. Если запрос успешен, возвращает полученные данные.
	 * 5. В случае ошибки во время запроса или обработки ответа:
	 *    - Вызывает событие `updateError`, передавая сообщение об ошибке в качестве детали события.
	 *    - Возвращает пустой массив, чтобы избежать дальнейших проблем в коде, который ожидает данные.
	 *
	 * @throws {Error} Если запрос не удался или произошла ошибка при обработке ответа, будет выброшена ошибка с сообщением об ошибке.
	 *
	 * @returns {Array<Record<string, (string|number)>>|[]} Возвращает массив. Или пустой массив в случае ошибки.
	 */
	const getAllTypeCranes = async () => {
		try {
			const response = await fetch(`${SERVER_URL}/cranes/typeCranes.php`);
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return [];
		}
	};
	/**
	 * Асинхронная функция для получения списка всех компаний с сервера.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Отправляет HTTP GET запрос на сервер.
	 * 2. Ожидает ответа от сервера и преобразует его тело в формат JSON.
	 * 3. Проверяет статус ответа сервера:
	 *    - Если статус ответа не `ok`, выбрасывает ошибку с кодом статуса, содержащимся в ответе.
	 * 4. Если запрос успешен, возвращает полученные данные.
	 * 5. В случае ошибки во время запроса или обработки ответа:
	 *    - Вызывает событие `updateError`, передавая сообщение об ошибке в качестве детали события.
	 *    - Возвращает пустой массив, чтобы избежать дальнейших проблем в коде, который ожидает данные.
	 *
	 * @throws {Error} Если запрос не удался или произошла ошибка при обработке ответа, будет выброшена ошибка с сообщением об ошибке.
	 *
	 * @returns {Array<Record<string, (string|number)>>|[]} Возвращает массив. Или пустой массив в случае ошибки.
	 */
	const getAllCompany = async () => {
		try {
			const response = await fetch(`${SERVER_URL}/cranes/companies.php`);
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return [];
		}
	};
	/**
	 * Асинхронная функция для получения списка всех стран производителей с сервера.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Отправляет HTTP GET запрос на сервер.
	 * 2. Ожидает ответа от сервера и преобразует его тело в формат JSON.
	 * 3. Проверяет статус ответа сервера:
	 *    - Если статус ответа не `ok`, выбрасывает ошибку с кодом статуса, содержащимся в ответе.
	 * 4. Если запрос успешен, возвращает полученные данные.
	 * 5. В случае ошибки во время запроса или обработки ответа:
	 *    - Вызывает событие `updateError`, передавая сообщение об ошибке в качестве детали события.
	 *    - Возвращает пустой массив, чтобы избежать дальнейших проблем в коде, который ожидает данные.
	 *
	 * @throws {Error} Если запрос не удался или произошла ошибка при обработке ответа, будет выброшена ошибка с сообщением об ошибке.
	 *
	 * @returns {Array<Record<string, (string|number)>>|[]} Возвращает массив. Или пустой массив в случае ошибки.
	 */
	const getAllLocations = async () => {
		try {
			const response = await fetch(`${SERVER_URL}/cranes/firmLocations.php`);
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return [];
		}
	};
	/**
	 * Асинхронная функция для получения списка всех неустранённых неисправностей с сервера.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Отправляет HTTP GET запрос на сервер.
	 * 2. Ожидает ответа от сервера и преобразует его тело в формат JSON.
	 * 3. Проверяет статус ответа сервера:
	 *    - Если статус ответа не `ok`, выбрасывает ошибку с кодом статуса, содержащимся в ответе.
	 * 4. Если запрос успешен, возвращает полученные данные.
	 * 5. В случае ошибки во время запроса или обработки ответа:
	 *    - Вызывает событие `updateError`, передавая сообщение об ошибке в качестве детали события.
	 *    - Возвращает пустой массив, чтобы избежать дальнейших проблем в коде, который ожидает данные.
	 *
	 * @throws {Error} Если запрос не удался или произошла ошибка при обработке ответа, будет выброшена ошибка с сообщением об ошибке.
	 *
	 * @returns {Record<number, Array<Object>>|[]} Возвращает массив. Или пустой массив в случае ошибки.
	 */
	const getIdentifiedFaults = async () => {
		try {
			const response = await fetch(`${SERVER_URL}/cranes/allIdentifiedFaults.php`);
			const jsonResponse = await response.json(); // Получаем тело ответа
			if (!response.ok) throw new Error(jsonResponse.status); // Проверяем HTTP статус ответа

			return jsonResponse;
		} catch (error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message })); // Если произошла ошибка, генерируем событие 'updateError' с сообщением об ошибке
			return [];
		}
	};
	/**
	 * Функция для заполнения выпадающего списка значениями из объекта `cranes`.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит HTML элемент выпадающего списка с классом `affiliation`.
	 * 2. Проходит по каждому ключу объекта `cranes` и для каждого ключа:
	 *    - Создает элемент `<option>` с помощью функции `createOption`.
	 *    - Добавляет созданный элемент `<option>` в выпадающий список.
	 *
	 * @returns {void}
	 */
	const drawSelectAffiliation = () => {
		const select = document.querySelector('.affiliation');
		for (const key in cranes) {
			select.appendChild(createOption(key));
		};
	};
	/**
	 * Функция для заполнения выпадающего списка значениями из массива `highways`.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит HTML элемент выпадающего списка с классом `highways`.
	 * 2. Проходит по каждому элементу массива `highways` и для каждого элемента:
	 *    - Создает элемент `<option>` с помощью функции `createOption`.
	 *    - Добавляет созданный элемент `<option>` в выпадающий список.
	 *
	 * @returns {void}
	 */
	const drawSelectHigways = () => {
		const select = document.querySelector('.highways');
		highways.forEach((elem) => {
			select.appendChild(createOption(elem.name));
		});
	};
	/**
	 * Функция для заполнения выпадающего списка значениями из массива `classCranes`.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит HTML элемент выпадающего списка с классом `class-cranes`.
	 * 2. Проходит по каждому элементу массива `classCranes` и для каждого элемента:
	 *    - Создает элемент `<option>` с помощью функции `createOption`.
	 *    - Добавляет созданный элемент `<option>` в выпадающий список.
	 *
	 * @returns {void}
	 */
	const drawSelectClassCranes = () => {
		const select = document.querySelector('.class-cranes');
		classCranes.forEach((elem) => {
			select.appendChild(createOption(elem.name));
		});
	};
	/**
	 * Функция для заполнения выпадающего списка значениями из массива `typeCranes`.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит HTML элемент выпадающего списка с классом `type-cranes`.
	 * 2. Проходит по каждому элементу массива `classCranes` и для каждого элемента:
	 *    - Создает элемент `<option>` с помощью функции `createOption`.
	 *    - Добавляет созданный элемент `<option>` в выпадающий список.
	 *
	 * @returns {void}
	 */
	const drawSelectTypeCranes = () => {
		const select = document.querySelector('.type-cranes');
		typeCranes.forEach((elem) => {
			select.appendChild(createOption(elem.name));
		});
	};
	/**
	 * Функция для заполнения выпадающего списка значениями из массива `companies`.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит HTML элемент выпадающего списка с классом `company`.
	 * 2. Проходит по каждому элементу массива `classCranes` и для каждого элемента:
	 *    - Создает элемент `<option>` с помощью функции `createOption`.
	 *    - Добавляет созданный элемент `<option>` в выпадающий список.
	 *
	 * @returns {void}
	 */
	const drawSelectCompanies = () => {
		const select = document.querySelector('.company');
		companies.forEach((elem) => {
			select.appendChild(createOption(elem.firm));
		});
	};
	/**
	 * Функция для заполнения выпадающего списка значениями из массива `firmLocations`.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит HTML элемент выпадающего списка с классом `location`.
	 * 2. Проходит по каждому элементу массива `classCranes` и для каждого элемента:
	 *    - Создает элемент `<option>` с помощью функции `createOption`.
	 *    - Добавляет созданный элемент `<option>` в выпадающий список.
	 *
	 * @returns {void}
	 */
	const drawSelectFirmLocations = () => {
		const select = document.querySelector('.location');
		firmLocations.forEach((elem) => {
			select.appendChild(createOption(elem.name));
		});
	};
	/**
	 * Функция для отрисовки таблицы с данными из объекта `cranes`.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит HTML элемент `<tbody>` таблицы с классом `tbody` и очищает его содержимое.
	 * 2. Проходит по каждому разделу (секции) в объекте `cranes`:
	 *    - Если раздел содержит данные (массив не пуст), создает и добавляет заголовок секции в таблицу с помощью функции `createSection`.
	 *    - Для каждого элемента в разделе создает и добавляет строку в таблицу с помощью функции `createRow`.
	 * 3. После добавления всех строк, пронумеровывает каждую строку в таблице:
	 *    - Проходит по всем строкам таблицы с классом `t-row` и обновляет текстовое содержимое столбца с классом
	 */
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
		allRow.forEach((row, index) => (row.querySelector('.column').innerText = index + 1 + numberPage * maxValue));
	};
	/**
	 * Создаёт и отображает кнопки для переключения между страницами таблицы.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Очищает контейнер, содержащий кнопки страниц.
	 * 2. Создаёт кнопки в количестве, равном переданному числу страниц.
	 * 3. Устанавливает класс для выделения кнопки текущей страницы.
	 * 4. Добавляет обработчик события на каждую кнопку для обработки клика.
	 *
	 * @param {number} count - Общее количество страниц, для которых необходимо создать кнопки.
	 *
	 * @returns {void}
	 */
	const drawNumbersPages = (count) => {
		const container = document.querySelector('.table-pages');
		container.innerText = '';
		for (let i = 0; i < count; i++) {
			const btn = document.createElement('button');
			const style = numberPage === i ? 'currentPage' : '';
			btn.className = `${style} btn btn-outline-secondary`;

			btn.innerText = i + 1;

			container.appendChild(btn);
			addEventBtnNumberPagesClick(btn);
		}
	};
	/**
	 * Функция для отрисовки списка данных о кране в HTML-элементе.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Находит HTML элемент со списком, используя селектор `.craneData__list` внутри переданного `window`.
	 * 2. Очищает содержимое списка перед добавлением новых элементов, устанавливая `innerText` в пустую строку.
	 * 3. Проходит по массиву `data` и добавляет до 10 элементов в список:
	 *    - Для первых 10 элементов массива создает элементы списка `<li>`, используя функцию `createLiElement`.
	 *    - Каждый элемент списка содержит текст, созданный с помощью функции `formContent`, и порядковый номер `index`.
	 *    - Если элементов больше 10, добавляет один элемент с текстом "Неисправностей больше 10, подробнее на странице крана".
	 * 4. Если данных в массиве меньше 10, функция прерывает цикл и завершает работу.
	 *
	 * @param {HTMLElement} window - HTML элемент, содержащий список для отображения данных.
	 * @param {Array<string>} data - Массив данных о кране, которые будут отображены в списке.
	 *
	 * @returns {void}
	 */
	const drawCraneDatalist = (window, data)  => {
		const list = window.querySelector('.craneData__list');
		list.innerText = '';
		for (let index = 0; index < 11; index++) {
			if (data[index]){
				if (index < 10) list.appendChild(createLiElement(formContent(data[index], 70), index+1));
				else list.appendChild(createLiElement('Неисправностей больше 10, подробнее на странице крана', 11));
			} else {
				break;
			}
		};
	};
	/**
	 * Создаёт и возвращает элемент опции (`<option>`) для выпадающего списка.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Создаёт элемент `<option>`.
	 * 2. Устанавливает значение атрибута `value` для этой опции.
	 * 3. Устанавливает текстовое содержимое опции.
	 *
	 * @param {string} name - Значение, которое будет установлено в атрибуте `value` и отображено в качестве текста опции.
	 *
	 * @returns {HTMLOptionElement} Возвращает созданный элемент опции (`<option>`).
	 */
	const createOption = (name) => {
		const option = document.createElement('option');
		option.setAttribute('value', name);
		option.innerText = name;
		return option;
	};
	/**
	 * Создаёт и возвращает элемент секции (`<div>`) для отображения названия секции.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Создаёт элемент `<div>`.
	 * 2. Устанавливает класс `row-section text-center py-2` для стилизации секции.
	 * 3. Устанавливает текстовое содержимое секции.
	 *
	 * @param {string} name - Название секции, которое будет отображено внутри элемента.
	 *
	 * @returns {HTMLDivElement} Возвращает созданный элемент секции (`<div>`), который содержит название секции.
	 */
	const createSection = (name) => {
		const row = document.createElement('div');

		row.className = 'row-section text-center py-2';

		row.innerText = name;

		return row;
	};
	/**
	 * Создаёт и возвращает элемент строки (`<div>`) для отображения информации о кране.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Создаёт элемент `<div>` для строки, устанавливает класс `t-row d-flex flex-row justify-content-center`.
	 * 2. Создаёт несколько элементов `<p>` для отображения различных свойств крана.
	 * 3. Устанавливает атрибут `value` для строки с идентификатором крана.
	 * 4. Заполняет элементы `<p>` значениями из объекта `crane`.
	 * 5. Добавляет созданные элементы `<p>` в строку.
	 * 6. Добавляет обработчик клика на строку.
	 *
	 * @param {Object} crane - Объект, представляющий информацию о кране. Должен содержать следующие свойства:
	 * @param {string} crane.id - Идентификатор крана.
	 * @param {string} crane.lpumg - ЛПУМГ.
	 * @param {string} crane.highways - Автомагистрали.
	 * @param {string} crane.crane_class - Класс крана.
	 * @param {string} crane.location - Местоположение.
	 * @param {string} crane.technical_number - Технический номер.
	 * @param {string} crane.company - Компания.
	 * @param {string} crane.f_manufacture - Фирма-производитель.
	 * @param {string} crane.DN - DN.
	 * @param {string} crane.general_description - Общие сведения о кране.
	 * @param {string} crane.drainage - Дренаж.
	 * @param {string} crane.pipelines - Трубопроводы.
	 * @param {string} crane.replacement - Замена.
	 * @param {string} crane.act_leakage - Акт утечки.
	 *
	 * @returns {HTMLDivElement} Возвращает созданный элемент строки (`<div>`), который содержит информацию о кране.
	 */
	const createRow = (crane) => {
		const row = document.createElement('div');
		const id = document.createElement('p');
		const lpumg = document.createElement('p');
		const highways = document.createElement('p');
		const craneClass = document.createElement('p');
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
			craneClass,
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

		lpumg.innerText = crane.lpumg;
		highways.innerText = crane.highways;
		craneClass.innerText = crane.crane_class;
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

		const select = document.querySelector('.choice-identified_faults');
		if (select.value != -1) {
			let timer;
			let secTimer;
			const tooltip = document.querySelector('.craneData');

			row.addEventListener('mouseenter', (event) => {
				timer = setTimeout(() => {
					drawCraneDatalist(tooltip, identifiedFaults[crane.id].map((elem) => elem.possible_cause));
					tooltip.style.left = `${event.pageX + 15}px`;
					tooltip.style.top = `calc(${event.pageY}px - ${tooltip.offsetHeight / 1.8}px)`;
					tooltip.classList.remove('my-d-none');
				}, 450);
			});

			row.addEventListener('mousemove', (event) => {
				clearTimeout(timer);

				if (tooltip.classList.contains('my-d-none')) {
					timer = setTimeout(() => {
						drawCraneDatalist(tooltip, identifiedFaults[crane.id].map((elem) => elem.possible_cause));
						tooltip.style.left = `${event.pageX + 15}px`;
						tooltip.style.top = `calc(${event.pageY}px - ${tooltip.offsetHeight / 1.8}px)`;
						tooltip.classList.remove('my-d-none');
					}, 250);
				} else {
					secTimer = setTimeout(() => {
						tooltip.style.left = `${event.pageX + 15}px`;
						tooltip.style.top = `calc(${event.pageY}px - ${tooltip.offsetHeight / 1.8}px)`;
					}, 100);
				}
			});

			row.addEventListener('mouseleave', () => {
				clearTimeout(timer);
				clearTimeout(secTimer);
				!tooltip.classList.contains('my-d-none') && tooltip.classList.add('my-d-none');
				tooltip.style.top = '';
				tooltip.style.left = '';
			});
		}

		return row;
	};
	/**
	 * Функция для создания HTML элемента списка `<li>`.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Создает новый элемент `<li>`.
	 * 2. Устанавливает класс элемента в зависимости от значения `index`:
	 *    - Если `index` равно 11, устанавливает класс `fs-5`.
	 *    - В противном случае устанавливает класс `col-6`.
	 * 3. Устанавливает текстовое содержимое элемента в формате `${index}) ${data}`, где `index` и `data` — информация о неисправности.
	 * 4. Возвращает созданный элемент `<li>`.
	 *
	 * @param {string} data - Текстовое содержимое элемента списка.
	 * @param {number} index - Индекс элемента, который используется для форматирования текста и для добавления класса.
	 *
	 * @returns {HTMLLIElement} Созданный элемент списка `<li>`.
	 */
	const createLiElement = (data, index) => {
		const liElem = document.createElement('li');
		liElem.className = `craneData__list-element ${index === 11 ? 'fs-5' : 'col-6'}`;
		liElem.innerText = `${index}) ${data}`;
		return liElem;
	}
	/**
	 * Добавляет обработчик события изменения выбора для элемента `<select>`, чтобы вызывать функцию фильтрации.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент `<select>` с классом `choice`.
	 * 2. Добавляет обработчик события `change` на этот элемент.
	 * 3. При изменении выбора вызывает функцию `filterFunc()`, которая выполняет действия по фильтрации данных.
	 *
	 * @returns {void}
	 */
	const addEventSelectChoiceChange = () => {
		const select = document.querySelector('.choice');
		select.addEventListener('change', () => filterFunc());
	};
	/**
	 * Добавляет обработчик события изменения выбора для элемента `<select>`, чтобы вызывать функцию фильтрации.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент `<select>` с классом `affiliation`.
	 * 2. Добавляет обработчик события `change` на этот элемент.
	 * 3. При изменении выбора вызывает функцию `filterFunc()`, которая выполняет действия по фильтрации данных.
	 *
	 * @returns {void}
	 */
	const addEventSelectAffiliationChange = () => {
		const select = document.querySelector('.affiliation');
		select.addEventListener('change', () => filterFunc());
	};
	/**
	 * Добавляет обработчик события ввода для элемента `<input>`, чтобы вызывать функцию фильтрации при изменении значения.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент `<input>` с классом `input-number`.
	 * 2. Добавляет обработчик события `input` на этот элемент.
	 * 3. При каждом изменении значения в поле ввода вызывает функцию `filterFunc()`, которая выполняет действия по фильтрации данных.
	 *
	 * @returns {void}
	 */
	const addEventInputNumberChang = () => {
		const input = document.querySelector('.input-number');
		input.addEventListener('input', () => {
			setTimeout(() => {
				filterFunc();
			}, 500);
		});
	};
	/**
	 * Добавляет обработчик события ввода для элемента `<input>`, чтобы вызывать функцию фильтрации при изменении значения.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент `<input>` с классом `input-diameter`.
	 * 2. Добавляет обработчик события `input` на этот элемент.
	 * 3. При каждом изменении значения в поле ввода вызывает функцию `filterFunc()`, которая выполняет действия по фильтрации данных.
	 *
	 * @returns {void}
	 */
	const addEventInputDiameterChang = () => {
		const inputFirst = document.querySelector('.input-diameter-min');
		const inputSec = document.querySelector('.input-diameter-max');
		[inputFirst, inputSec].forEach((elem) =>
			elem.addEventListener('input', () => {
				+elem.value === 0 && (elem.value = '');
				setTimeout(() => {
					filterFunc();
				}, 700);
			})
		);
	};
	/**
	 * Добавляет обработчик события изменения выбора для элемента `<select>`, чтобы вызывать функцию фильтрации.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент `<select>` с классом `highways`.
	 * 2. Добавляет обработчик события `change` на этот элемент.
	 * 3. При изменении выбора вызывает функцию `filterFunc()`, которая выполняет действия по фильтрации данных.
	 *
	 * @returns {void}
	 */
	const addEventSelectNameHighways = () => {
		const input = document.querySelector('.highways');
		input.addEventListener('change', () => filterFunc());
	};
	/**
	 * Добавляет обработчик события изменения выбора для элемента `<select>`, чтобы вызывать функцию фильтрации.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент `<select>` с классом `class-cranes`.
	 * 2. Добавляет обработчик события `change` на этот элемент.
	 * 3. При изменении выбора вызывает функцию `filterFunc()`, которая выполняет действия по фильтрации данных.
	 *
	 * @returns {void}
	 */
	const addEventSelectClassCranes = () => {
		const input = document.querySelector('.class-cranes');
		input.addEventListener('change', () => filterFunc());
	};
	/**
	 * Добавляет обработчик события изменения выбора для элемента `<select>`, чтобы вызывать функцию фильтрации.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент `<select>` с классом `type-cranes`.
	 * 2. Добавляет обработчик события `change` на этот элемент.
	 * 3. При изменении выбора вызывает функцию `filterFunc()`, которая выполняет действия по фильтрации данных.
	 *
	 * @returns {void}
	 */
	const addEventSelectTypeCranes = () => {
		const input = document.querySelector('.type-cranes');
		input.addEventListener('change', () => filterFunc());
	};
	/**
	 * Добавляет обработчик события изменения выбора для элемента `<select>`, чтобы вызывать функцию фильтрации.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент `<select>` с классом `company`.
	 * 2. Добавляет обработчик события `change` на этот элемент.
	 * 3. При изменении выбора вызывает функцию `filterFunc()`, которая выполняет действия по фильтрации данных.
	 *
	 * @returns {void}
	 */
	const addEventSelectCompanies = () => {
		const input = document.querySelector('.company');
		input.addEventListener('change', () => filterFunc());
	};
	/**
	 * Добавляет обработчик события изменения выбора для элемента `<select>`, чтобы вызывать функцию фильтрации.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент `<select>` с классом `location`.
	 * 2. Добавляет обработчик события `change` на этот элемент.
	 * 3. При изменении выбора вызывает функцию `filterFunc()`, которая выполняет действия по фильтрации данных.
	 *
	 * @returns {void}
	 */
	const addEventSelectFirmLocations = () => {
		const input = document.querySelector('.location');
		input.addEventListener('change', () => filterFunc());
	};
	/**
	 * Добавляет обработчик события изменения выбора для элемента `<select>`, чтобы вызывать функцию фильтрации.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит элемент `<select>` с классом `choice-identified_faults`.
	 * 2. Добавляет обработчик события `change` на этот элемент.
	 * 3. При изменении выбора вызывает функцию `filterFunc()`, которая выполняет действия по фильтрации данных.
	 *
	 * @returns {void}
	 */
	const addEventSelectIdentifiedFaults = () => {
		const input = document.querySelector('.choice-identified_faults');
		input.addEventListener('change', () => filterFunc());
	};
	/**
	 * Функция `addEventInputCountCranes` добавляет обработчик события ввода (input) к элементу ввода количества кранов.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит HTML элемент с классом `input-count-cranes`.
	 * 2. Инициализирует переменную `timerTo`, которая будет использоваться для хранения ID таймера.
	 * 3. Добавляет обработчик события `input` на элемент, который выполняется каждый раз, когда значение в поле изменяется.
	 * 4. В обработчике проверяется, находится ли введенное значение в диапазоне от 10 до 250:
	 *    - Если значение не соответствует диапазону, устанавливается значение `maxValue` в 15 и создается таймер, который через 3 секунды сбросит значение поля ввода на 15.
	 *    - Если значение соответствует диапазону, таймер очищается, и `maxValue` устанавливается в значение, введенное пользователем.
	 * 5. Вызывает функцию `filterFunc`, чтобы обновить данные в соответствии с новым значением `maxValue`.
	 *
	 * @returns {void}
	 */
	const addEventInputCountCranes = () => {
		const input = document.querySelector('.input-count-cranes');
		let timerTo;
		input.addEventListener('input', () => {
			if (+input.value < 10 || +input.value > 250) {
				maxValue = 15;
				clearTimeout(timerTo);
				timerTo = setTimeout(() => {input.value = 15;}, 3000);
			} else {
				clearTimeout(timerTo);
				maxValue = +input.value;
			};
			filterFunc();
		});
	};
	/**
	 * Функция для добавления события клика на заголовок столбца таблицы, что позволяет сортировать данные по этому столбцу.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит HTML элементы заголовка таблицы и столбца по имени `name`.
	 * 2. Добавляет класс `pointer` к элементу столбца, чтобы указать, что на него можно кликнуть.
	 * 3. Добавляет обработчик события `click` к элементу столбца, который:
	 *    - Удаляет классы сортировки (`aToB`, `bToA`) у всех других столбцов.
	 *    - Переключает классы сортировки на элементе столбца:
	 *      - Если у элемента уже есть класс `aToB`, он заменяется на `bToA`.
	 *      - Если у элемента уже есть класс `bToA`, он удаляется.
	 *      - Если у элемента нет ни одного из этих классов, ему добавляется `aToB`.
	 * 4. Обновляет глобальную переменную `globalName` на имя текущего столбца для сортировки.
	 * 5. Вызывает функцию `filterFunc`, которая обновляет данные в таблице в соответствии с выбранным порядком сортировки.
	 *
	 * @param {string} name - Имя столбца, по которому нужно добавить возможность сортировки.
	 *
	 * @returns {void}
	 */
	const addEventColumnClick = (name) => {
		const headTable = document.querySelector('.thead').querySelector('.t-row');
		const sortElem = document.querySelector(`.column-${name}`);
		sortElem.classList.add('pointer');
		sortElem.addEventListener('click', () => {
			headTable.querySelectorAll('.column').forEach((elem) => {
				if (!elem.classList.contains(`column-${name}`)) {
					elem.classList.remove('aToB');
					elem.classList.remove('bToA');
				}
			});
			if (sortElem.classList.contains('aToB')) {
				sortElem.classList.remove('aToB');
				sortElem.classList.add('bToA');
			} else if (sortElem.classList.contains('bToA')) {
				sortElem.classList.remove('bToA');
			} else {
				sortElem.classList.add('aToB');
			}
			globalName = name;
			filterFunc();
		});
	};
	/**
	 * Добавляет обработчик события клика на строку таблицы, который перенаправляет пользователя на страницу с подробной информацией о кране.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Добавляет обработчик события `click` к переданной строке `row`.
	 * 2. При клике на строку изменяет адрес текущей страницы, перенаправляя пользователя на страницу `oneCrane.php`, передавая ID крана как параметр запроса.
	 *
	 * @param {HTMLElement} row - Элемент строки таблицы, на который добавляется обработчик события клика.
	 *
	 * @returns {void}
	 */
	const addEventRowClick = (row) => {
		row.addEventListener('click', () => {
			window.location.href = `${BASE_URL}oneCrane.php?id=${+row.getAttribute('value')}`;
		});
	};
	/**
	 * Функция для фильтрации кранов на основе выбранных критериев.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Получает выбранные значения из выпадающих списков с классами `choice`, `affiliation`, и `highways`, а также из текстового поля `input-number`.
	 * 2. Создает копию глобального массива `cranes` для дальнейшей фильтрации.
	 * 3. Применяет различные фильтры:
	 *    - Если выбрано значение в `choice`, фильтрует краны по результату работы.
	 *    - Если выбрано значение в `affiliation`, оставляет краны только от выбранного подразделения.
	 *    - Если выбрано значение в `highways`, фильтрует краны по выбранной магистрали.
	 *    - Если введен номер, фильтрует краны, проверяя начинается ли их технический номер с введенной строки.
	 *
	 * @returns {void}
	 */
	const filterFunc = () => {
		const selectChoice = document.querySelector('.choice');
		const selectAffiliation = document.querySelector('.affiliation');
		const selectHighways = document.querySelector('.highways');
		const selectClassCranes = document.querySelector('.class-cranes');
		const selectTypeCranes = document.querySelector('.type-cranes');
		const inputNumber = document.querySelector('.input-number');
		const inputDiameterMin = document.querySelector('.input-diameter-min');
		const inputDiameterMax = document.querySelector('.input-diameter-max');
		const selectCompanies = document.querySelector('.company');
		const selectFirmLocations = document.querySelector('.location');
		const selectIdentifiedFaults = document.querySelector('.choice-identified_faults');

		let filterCranes = JSON.parse(JSON.stringify(cranes));
		if (+selectChoice.value >= 0) {
			for (const key in filterCranes) {
				filterCranes[key] = filterCranes[key].filter((item) => item.result === +selectChoice.value);
			}
		}
		if (selectAffiliation.value != -1) {
			filterCranes = { [selectAffiliation.value]: filterCranes[selectAffiliation.value] };
		}
		if (selectHighways.value != -1) {
			for (const key in filterCranes) {
				filterCranes[key] = filterCranes[key].filter((item) => item.highways === selectHighways.value);
			}
		}
		if (selectClassCranes.value != -1) {
			for (const key in filterCranes) {
				filterCranes[key] = filterCranes[key].filter((item) => item.crane_class.split(', ')[0] === selectClassCranes.value);
			}
		}
		if (selectTypeCranes.value != -1) {
			for (const key in filterCranes) {
				filterCranes[key] = filterCranes[key].filter((item) => item.crane_class.split(', ')[1] === selectTypeCranes.value);
			}
		}
		if (inputNumber.value.trim()) {
			for (const key in filterCranes) {
				// filterCranes[key] = filterCranes[key].filter((item) => item.technical_number.includes(inputNumber.value)); // Так мы просто проверяем является ли введённая строка подстрокой
				filterCranes[key] = filterCranes[key].filter((item) => item.technical_number.startsWith(inputNumber.value)); // Так мы проверяем является ли введённая строка началом главной строки
			}
		}
		if (inputDiameterMin.value.trim()) {
			for (const key in filterCranes) {
				filterCranes[key] = filterCranes[key].filter((item) => item.DN >= inputDiameterMin.value);
			}
		}
		if (inputDiameterMax.value.trim()) {
			for (const key in filterCranes) {
				filterCranes[key] = filterCranes[key].filter((item) => item.DN <= inputDiameterMax.value);
			}
		}
		if (selectCompanies.value != -1) {
			for (const key in filterCranes) {
				filterCranes[key] = filterCranes[key].filter((item) => item.company.split(', ')[0] === selectCompanies.value);
			}
		}
		if (selectFirmLocations.value != -1) {
			for (const key in filterCranes) {
				// filterCranes[key] = filterCranes[key].filter((item) => item.company.split(', ')[1] === selectFirmLocations.value); // Можно и так, всё работает, но идёт сравнение с undefined
				filterCranes[key] = filterCranes[key].filter((item) => item.company.split(', ').length > 1 && item.company.split(', ')[1] === selectFirmLocations.value);
			}
		}
		if (selectIdentifiedFaults.value != -1) {
			for (const key in filterCranes) {
				filterCranes[key] = filterCranes[key].filter((item) => {
					let flag = false;
					for (const keySec in identifiedFaults) {
						if (+keySec === +item.id) {
							flag = true;
							break;
						}
					}
					return flag;
				});
			}
		}

		filterCranes = sortFunc(filterCranes);

		let temp = 0;
		globalList = [];
		let obj = {};
		for (const key in filterCranes) {
			filterCranes[key].forEach((elem) => {
				if (maxValue - temp === 0) {
					globalList.push(obj);
					obj = {};
					temp = 0;
				}
				if (!obj[key]) obj[key] = [];
				obj[key].push(elem);
				temp += 1;
			});
		}
		globalList.push(obj);
		drawNumbersPages(globalList.length);
		numberPage = globalList.length - numberPage > 0 ? numberPage : 0;
		drawTable(globalList[numberPage]);
	};
	/**
	 * Функция для сортировки объектов в массиве `filterCranes` на основе глобальной переменной `globalName`.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Проверяет, если `globalName` не является пустой строкой, что означает, что был выбран столбец для сортировки.
	 * 2. Определяет HTML элемент столбца с классом `column-${globalName}`.
	 * 3. Если элемент столбца имеет класс `aToB`, выполняется сортировка по возрастанию:
	 *    - Проходится по всем ключам объекта `filterCranes`.
	 *    - Для каждого ключа выполняется сортировка массива:
	 *      - Если значение `globalName` является строкой, элементы сортируются по длине строки.
	 *      - Если значение `globalName` является числом, элементы сортируются по числовому значению.
	 * 4. Если элемент столбца имеет класс `bToA`, выполняется сортировка по убыванию:
	 *    - Проходится по всем ключам объекта `filterCranes`.
	 *    - Для каждого ключа выполняется сортировка массива:
	 *      - Если значение `globalName` является строкой, элементы сортируются по длине строки в обратном порядке.
	 *      - Если значение `globalName` является числом, элементы сортируются по числовому значению в обратном порядке.
	 * 5. Возвращает отсортированный объект `filterCranes`.
	 *
	 * @param {Object} filterCranes - Объект, содержащий массивы объектов, которые нужно отсортировать.
	 *
	 * @returns {Object} - Отсортированный объект `filterCranes`.
	 */
	const sortFunc = (filterCranes) => {
		if (globalName !== '') {
			const sortElem = document.querySelector(`.column-${globalName}`);
			if (sortElem.classList.contains('aToB')) {
				for (const key in filterCranes) {
					filterCranes[key].sort((a, b) => {
						if (typeof a[globalName] === 'string') return a[globalName].length - b[globalName].length;
						return a[globalName] - b[globalName];
					});
				}
			} else if (sortElem.classList.contains('bToA')) {
				for (const key in filterCranes) {
					filterCranes[key].sort((a, b) => {
						if (typeof a[globalName] === 'string') return b[globalName].length - a[globalName].length;
						return b[globalName] - a[globalName];
					});
				}
			}
		}

		return filterCranes;
	};
	/**
	 * Функция для форматирования текста с учетом ограничения по длине.
	 *
	 * Функция выполняет следующие действия:
	 * 1. Проверяет, превышает ли длина текста заданное значение `limit`.
	 * 2. Если длина текста больше `limit`, возвращает подстроку текста, обрезанную до `limit` символов, и добавляет многоточие (`'...'`) в конце.
	 * 3. Если длина текста не превышает `limit`, возвращает текст без изменений.
	 *
	 * @param {string} text - Исходный текст, который необходимо отформатировать.
	 * @param {number} limit - Максимальная длина текста, после которой он будет обрезан.
	 * @returns {string} Отформатированный текст, обрезанный до `limit` символов с добавлением многоточия, если необходимо.
	 */
	const formContent = (text, limit) => {
		return text.length > limit ? text.substring(0, limit) + '...' : text;
	};
	/**
	 * Добавляет обработчик события клика для кнопки переключения страниц.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Устанавливает обработчик события `click` для кнопки.
	 * 2. При клике на кнопку обновляет текущий номер страницы (`numberPage`), основываясь на тексте кнопки.
	 * 3. Вызывает функцию `filterFunc`, чтобы отобразить данные для выбранной страницы с применением текущих фильтров.
	 *
	 * @param {HTMLButtonElement} btn - Кнопка, на которую добавляется обработчик события клика. Ожидается, что текст кнопки представляет номер страницы.
	 *
	 * @returns {void}
	 */
	const addEventBtnNumberPagesClick = (btn) => {
		btn.addEventListener('click', () => {
			const allBtn = btn.parentNode.querySelectorAll('button');
			allBtn.forEach((elem) => elem !== btn && elem.classList.remove('currentPage'));
			numberPage = +btn.textContent - 1;
			!btn.classList.contains('currentPage') && btn.classList.add('currentPage');
			drawTable(globalList[numberPage]);
		});
	};
	/**
	 * Функция для экспорта таблицы из HTML в Excel-файл.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Инициализирует массивы `headers` и `data` для хранения заголовков и данных таблицы.
	 * 2. Извлекает заголовки таблицы из элементов с классом `column th` внутри элемента с классом `thead`, и добавляет их в массив `headers`.
	 * 3. Проходит по всем строкам таблицы с классом `t-row`, извлекает данные из элементов с классами `column th` и `text-center`, и добавляет их в массив `data`.
	 * 4. Создает новый лист Excel с использованием заголовков и данных, преобразованных в формат, поддерживаемый библиотекой `XLSX`.
	 * 5. Создает новый рабочий файл Excel и добавляет к нему созданный лист.
	 * 6. Генерирует и сохраняет Excel-файл под именем `output.xlsx`.
	 *
	 * @returns {void}
	 */
	const exportTableToExcel = () => {
		// Инициализация данных
		let headers = [];
		let data = [];

		// Извлечение заголовков
		document.querySelectorAll('.table-cranes .thead p.column.th').forEach((element) => headers.push(element.textContent.trim()));

		// Извлечение данных строк
		document.querySelectorAll('.t-row').forEach((row) => {
			let rowData = [];
			row.querySelectorAll('p.column.th.text-center').forEach(col => rowData.push(col.textContent.trim()));
			if (rowData.length > 0) data.push(rowData);
		});

		// Создание Excel-книги и листа
		const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

		// Генерация и скачивание Excel-файла
		XLSX.writeFile(workbook, 'cranes_P-VK.xlsx');
	};
	/**
	 * Функция для добавления обработчика события на кнопку, инициирующую экспорт таблицы в Excel.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Находит кнопку с классом `btnToExcel` в документе.
	 * 2. Добавляет обработчик события `click` на найденную кнопку.
	 * 3. При нажатии на кнопку вызывает функцию `exportTableToExcel` для экспорта данных таблицы в Excel-файл.
	 *
	 * @returns {void}
	 */
	const addEventBtnToExcel = () => {
		const btn = document.querySelector('.btnToExcel');
		btn.addEventListener('click', () => exportTableToExcel());
	};


	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	let maxValue = 15;
	let numberPage = 0;
	let globalList = [];
	let globalName = '';
	const cranes = await getAllCreanes();
	const highways = await getAllHighways();
	const classCranes = await getAllClassCranes();
	const typeCranes = await getAllTypeCranes();
	const companies = await getAllCompany();
	const firmLocations = await getAllLocations();
	const identifiedFaults = await getIdentifiedFaults();
	drawSelectAffiliation();
	drawSelectHigways();
	drawSelectClassCranes();
	drawSelectTypeCranes();
	drawSelectCompanies();
	drawSelectFirmLocations();
	filterFunc();
	addEventSelectChoiceChange();
	addEventSelectAffiliationChange();
	addEventInputNumberChang();
	addEventSelectNameHighways();
	addEventSelectClassCranes();
	addEventSelectTypeCranes();
	addEventInputDiameterChang();
	addEventSelectCompanies();
	addEventSelectFirmLocations();
	addEventSelectIdentifiedFaults();
	addEventBtnToExcel();
	addEventInputCountCranes();
	['highways', 'location', 'DN'].forEach((elem) => addEventColumnClick(elem));
});
