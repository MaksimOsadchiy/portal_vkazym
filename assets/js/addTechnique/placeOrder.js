document.addEventListener('DOMContentLoaded', () => {
  //
  const createOrder = async () => {
    try {
      const request = '0'; // Формируем тело запроса
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
      }
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
    const timeFrom = document.querySelector('.time-from').value;
    const timeTo = document.querySelector('.time-to').value;
    const shift = Array.from(
      document.querySelectorAll('.form-check-input')
    ).find((elem) => elem.checked)?.value;

    let flag = '';
    if (service) {
      // переписать либо на switch либо придумать логику
      if (technique.length) {
        if (responsiblePerson.length) {
          if (dateFrom && dateTo) {
            if (route) {
              if ((timeFrom && timeTo) || shift) {
                const combinedArray = [];
                technique.forEach((item, index) => {
                  if (item && responsiblePerson[index]) {
                    combinedArray.push([item, responsiblePerson[index]]);
                  }
                });
                const result = [];
                combinedArray.forEach((subArr) => {
                  const obj = {
                    service_id: service,
                    technique_id: subArr[0],
                    route_id: route,
                    responsible_person_id: subArr[1],
                    date_from: dateFrom,
                    date_to: dateTo,
                    time_from: timeFrom,
                    time_to: timeTo,
                  };
                  result.push(obj);
                });
                console.log(result);
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
      document.dispatchEvent(new CustomEvent('updateError', { detail: flag }));
    }

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
