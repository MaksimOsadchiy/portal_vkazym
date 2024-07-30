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
            <h1>00.00.0000</h1>
            <table class="table table-bordered mt-4">
                <thead>
                <tr>
                    <th class="col-2">Транспорт</th>
                    <th class="col-1">Гос&nbsp;Номер</th>
                    <th class="col-1">Служба</th>
                    <th class="col-1">Время с</th>
                    <th class="col-1">Время по</th>
                    <th class="col-1">Ответственный</th>
                    <th class="col-1">Телефон</th>
                    <th class="col-1">Маршрут</th>
                    <th class="col-2">Краткое содержание работ</th>
                    <th class="col-1">Примечание</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </section>
    <script src="<?php echo BASE_URL ?>assets/js/orderPdf/orderPdf.js"></script>
</body>
</html>
