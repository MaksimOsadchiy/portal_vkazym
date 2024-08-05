document.addEventListener("DOMContentLoaded", async () => {
    //
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

    //
    const cranes = await getAllCreanes();
    console.log(cranes);
})