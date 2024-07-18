document.addEventListener('DOMContentLoaded', () => {
	// 
	const createOrder = async () => {
		try {
			const request = '0';		// Формируем тело запроса
			const response = await fetch(`${SERVER_URL}orders.php`, {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
						},
					body: JSON.stringify(request),
				});
			const jsonResponse = await response.json();		// Получаем тело ответа
				if (!response.ok) {
					throw new Error(jsonResponse.status);
				};
		} catch(error) {
			document.dispatchEvent(new CustomEvent('updateError', { detail: error.message }));
		}
	};
	// 
	const getContent = () => {
		const service = SESSION['service'];	
		const technique = document.querySelectorAll('.technique-select');
		const route = document.querySelector('.route-select').value;
		const responsiblePerson = document.querySelectorAll('.person-select');
		const dateFrom = document.querySelector('.date-from');
		const dateTo = document.querySelector('.date-to');
		const timeFrom = document.querySelector('.time-from');
		const timeTo = document.querySelector('.time-to');

		const combinedArray = [];
		technique.forEach((item, index) => {
			if (item.value){
				combinedArray.push([item.value, responsiblePerson[index].value]);
			};
		});
		console.log(combinedArray);
		// const result = {};		// Продолжить...
		// combinedArray.forEach((subArr) => {
		// 	if (elem.value){
		// 		console.log(elem.value);
		// 		const obj = {
		// 			'service_id': service,
		// 			'technique_id': technique,
		// 			'route_id': route,
		// 			'responsible_person_id': responsiblePerson,
		// 			'date_from': dateFrom,
		// 			'date_to': dateTo,
		// 			'time_from': timeFrom,
		// 			'time_to': timeTo,
		// 		};
		// 	};
		// });
		// console.log(obj);
		/*
		'service_id' => service_id,
		'technique_id' => technique_id,
		'route_id' => route_id,
		'responsible_person_id' => responsible_person_id,
		'date_from' => date_from,
		'date_to' => date_to,
		'time_from' => time_from,
		'time_to' => time_to,
		*/
		return {};
	};
	// 
	const addEventCreateOrder = () => {
		const btnCreateOrder = document.querySelector('.create-order');
		btnCreateOrder.addEventListener('click', () => getContent());
		// btnCreateOrder.addEventListener('click', await createOrder());
	};


	// Начало скрипта
	addEventCreateOrder();
});