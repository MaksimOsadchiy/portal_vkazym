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
			};
		};
		const allRow = tbody.querySelectorAll('.t-row');
		allRow.forEach((row, index) => (row.querySelector('.column').innerText = (index + 1)+(numberPage*maxValue)));
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

			btn.innerText = i+1;

			container.appendChild(btn);
			addEventBtnNumberPagesClick(btn);
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

		return row;
	};
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
	}
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
		input.addEventListener('input', () => filterFunc())
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
	 * Функция фильтрует и отображает данные кранов в зависимости от выбранных пользователем фильтров и поискового запроса.
	 *
	 * Функция выполняет следующие шаги:
	 * 1. Получает значения из полей выбора и ввода на странице.
	 * 2. Создаёт копию исходного набора данных кранов.
	 * 3. Применяет фильтры к данным:
	 *    - Фильтрует по значению выбора в поле `.choice`, если оно задано.
	 *    - Фильтрует по значению выбора в поле `.affiliation`, если оно задано.
	 *    - Фильтрует по значению в поле `.input-number`, проверяя, является ли это значение началом номера крана.
	 * 4. Разбивает отфильтрованные данные на страницы, основываясь на максимальном количестве элементов на страницу (`maxValue`).
	 * 5. Обновляет отображение номеров страниц и текущей страницы.
	 * 6. Отображает данные для текущей страницы.
	 *
	 * @returns {void}
	 */
	const filterFunc = () => {
		const selectChoice = document.querySelector('.choice');
		const selectAffiliation = document.querySelector('.affiliation');
		const inputNumber = document.querySelector('.input-number');

		let filterCranes = JSON.parse(JSON.stringify(cranes));
		if (+selectChoice.value >= 0) {
			for (const key in filterCranes){
				filterCranes[key] = filterCranes[key].filter((item) => item.result === +selectChoice.value);
			};
		};
		if (selectAffiliation.value != -1) {
			filterCranes = {[selectAffiliation.value]: filterCranes[selectAffiliation.value]}
		};
		if (inputNumber.value.trim()) {
			for (const key in filterCranes){
				// filterCranes[key] = filterCranes[key].filter((item) => item.technical_number.includes(inputNumber.value)); // Так мы просто проверяем является ли введённая строка подстрокой
				filterCranes[key] = filterCranes[key].filter((item) => item.technical_number.startsWith(inputNumber.value)); // Так мы проверяем является ли введённая строка началом главной строки
			};
		};

		let temp = 0;
		const list = [];
		let obj = {};
		for (const key in filterCranes){
			filterCranes[key].forEach((elem) => {
				if (maxValue - temp === 0) {
					list.push(obj);
					obj = {};
					temp = 0;
				};
				if (!obj[key]) obj[key] = [];
				obj[key].push(elem);
				temp +=1;
			});
		};
		list.push(obj);
		drawNumbersPages(list.length);
		numberPage = list.length - numberPage >= 0 ? numberPage : 0;
		drawTable(list[numberPage]);
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
			numberPage = +btn.textContent - 1;
			filterFunc();
		});
	};

	// Основной блок кода, который выполняет начальные операции при загрузке скрипта.
	const maxValue = 15;
	let numberPage = 0;
	const cranes = await getAllCreanes();
	drawSelectAffiliation();
	filterFunc();
	addEventSelectChoiceChange();
	addEventSelectAffiliationChange();
	addEventInputNumberChang();
});
