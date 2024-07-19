document.addEventListener('DOMContentLoaded', () => {
  //
  const createOrder = async () => {
    try {
		const request = getContent(); // Формируем тело запроса
      const response = await fetch(`${SERVER_URL}orders.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      const jsonResponse = await response.json(); // Получаем тело ответа
      if (!response.ok) {
        throw new Error(jsonResponse.status);
      };
      document.dispatchEvent(
        new CustomEvent('updateError', { detail: 'Заказ отправлен на рассмотрение!' })
      );
    } catch (error) {
      document.dispatchEvent(
        new CustomEvent('updateError', { detail: error.message })
      );
    }
  };
  //
  const getContent = () => {
    const service = SESSION['service'];
    const technique = Array.from(document.querySelectorAll('.technique-select'))
      .map((elem) => elem.value)
      .filter((elem) => elem !== '');
    const route = document.querySelector('.route-select').value;
    const responsiblePerson = Array.from(
      document.querySelectorAll('.person-select')
    )
      .map((elem) => elem.value)
      .filter((elem) => elem !== '');
    const dateFrom = document.querySelector('.date-from').value;
    const dateTo = document.querySelector('.date-to').value;
    let timeFrom = document.querySelector('.time-from').value;
    let timeTo = document.querySelector('.time-to').value;
    const shift = Array.from(
      document.querySelectorAll('.form-check-input')
    ).find((elem) => elem.checked)?.value;

    // Обработчик времени
  	// const shiftFrom = new Date(`${dateFrom}T${shift.slice(0, 5)}`);
  	// const shiftTo = +shift[0] ? new Date(`${dateTo}T${shift.slice(0, 5)}`) : new Date(`${dateFrom}T${shift.slice(6, 11)}`);
  	// const fullDateFrom = new Date(`${dateFrom}T${timeFrom}`);
  	// const fullDateTo = new Date(`${dateTo}T${timeTo}`);
  	// console.log(shiftFrom);
  	// console.log(shiftTo);
  	// console.log(fullDateFrom);
  	// console.log(fullDateTo);
  	// if (shift) {
  	// 	let flag = fullDateFrom >= shiftFrom && fullDateTo <= shiftTo && fullDateFrom < fullDateTo
  	// 	flag ? console.log('Верно') : console.log('Не верно');;
  	// };
	
    let flag = '';
    if (service) {
      // переписать либо на switch либо придумать логику
      if (technique.length) {
        if (responsiblePerson.length) {
          if (dateFrom && dateTo) {
            if (route) {
              if ((timeFrom && timeTo) || shift) {
              	timeFrom = timeFrom ? timeFrom : shift.slice(0, 4);
              	timeTo = timeTo ? timeTo : shift.slice(6, 11);
                const combinedArray = [];
                technique.forEach((item, index) => {
                  if (item && responsiblePerson[index]) {
                    combinedArray.push([item, responsiblePerson[index]]);
                  }
                });
                const result = [];
                combinedArray.forEach((subArr) => {
                  const obj = {
                    service_id: +service,
                    technique_id: +subArr[0],
                    route_id: +route,
                    responsible_person_id: +subArr[1],
                    date_from: dateFrom,
                    date_to: dateTo,
                    time_from: timeFrom + ':00',
                    time_to: timeTo + ':00',
                  };
                  shift && (obj.shift = +shift[0] ? 1 : 0)
                  result.push(obj);
                });
                return result;
              } else {
                flag =
                  'Введите время начала и окончания работ или выберите смену!';
              }
            } else {
              flag = 'Выберите маршрут!';
            }
          } else {
            flag = 'Введите дату начала и окончания работ!';
          }
        } else {
          flag = 'Обязательное поле: Ответственный!';
        }
      } else {
        flag = 'Обязательное поле: Техника!';
      }
    } else {
      flag = 'В сессии нет ID сервиса!';
    }

    if (flag) {
      throw new Error(flag);
    }
  };
  //
  const addEventCreateOrder = () => {
    const btnCreateOrder = document.querySelector('.create-order');
    // btnCreateOrder.addEventListener('click', () => getContent());
    btnCreateOrder.addEventListener('click', async () => await createOrder());
  };

  // Начало скрипта
  addEventCreateOrder();
});
