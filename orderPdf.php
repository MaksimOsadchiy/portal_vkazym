<?php
    include('path.php');
?>


<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/normalize.css">
    <link rel="stylesheet" href="assets/css/mainStyles.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/orderPdf/orderPdf.css">
    <title>PDF</title>
</head>
<body>
    <section>
        <div class="table-container d-flex flex-column align-items-center pt-3">
            <h4 class="align-self-end text-end mb-5">Начальнику<br>Верхнеказымского ЛПУМГ<br>А.В. Митину</h4>
            <h4 class="title"></h4>
            <h4>на выезд техники для работ в Верхнеказымском ЛПУМГ</h4>
            <table class="table table-bordered mt-4">
                <thead>
                <tr>
                    <th>Транспорт</th>
                    <th>Гос&nbsp;Номер</th>
                    <th>Служба</th>
                    <th>Время с</th>
                    <th>Время по</th>
                    <th>Ответственный</th>
                    <th>Телефон</th>
                    <th>Маршрут</th>
                    <th>Краткое содержание работ</th>
                    <th>Примечание</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </section>
    <script src="<?php echo BASE_URL ?>assets/js/orderPdf/orderPdf.js"></script>
</body>
</html>
