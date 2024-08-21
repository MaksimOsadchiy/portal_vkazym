<?php
    session_start();
    include('path.php');

    if (!isset($_SESSION['id'])) {
        header("Location:" . BASE_URL . "log.php");
        exit();
    };

    $filtered = array_filter($_SESSION['accessibility'], function($item) {
        return $item['name'] === "technique";
    });
    if (reset($filtered)['privilege'] < 3) {
        header("Location:" . BASE_URL);
        exit();
    };

    $pageTitle = "Заказаная техника";
?>


<!doctype html>
<html lang='ru'>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/normalize.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/mainStyles.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/style.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/modalWindowNotif/modalWindowNotif.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/header/header.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/modules/modules.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/orderTechnique/orderTechnique.css">
    <script>
        const SESSION = <?=json_encode($_SESSION)?>;
        const BASE_URL = <?=json_encode(BASE_URL)?>;
        const SERVER_URL = <?=json_encode(SERVER_URL)?>;
    </script>
    <script defer src="<?=BASE_URL?>assets/js/modalWindowNotif/modalWindowNotif.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/header/header.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/modules/modules.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/allOrders/allOrders.js"></script>
    <title>Портал В.Казым</title>
</head>
<body>
	<?php include("components/header.php")?>
    <section>
        <?php include("components/modules.php")?>
        <div class="table-container d-flex flex-column align-items-center pt-3">
            <div class="management-container d-flex flex-row justify-content-between column-gap-2">
                <div class="date-container d-flex flex-row align-items-center column-gap-2">
                    <label for="dateFrom">Дата</label>
                        <input type="date" class="form-control date-from" id="dateFrom">
                </div>
                <select class="form-select choice" aria-label="Default select example">
                    <option value="0">Заявки на рассмотрении</option>
                    <option value="1">Подтвержденные заявки</option>
                    <option value="2">Отклоненные заявки</option>
                </select>
                <button class="btn btn-secondary btn-pdf" disabled>Сформировать PDF</button>
            </div>
            <table class="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th class="col-1">Служба</th>
                        <th class="col-1">Дата</th>
                        <th class="col-1">Время</th>
                        <th class="col-2">Техника</th>
                        <th class="col-1">Маршрут</th>
                        <th class="col-1">Вид работ</th>
                        <th class="col-1">Примечания</th>
                        <th class="col-1">Ответственный</th>
                        <th class="col-2">Дата создания</th>
                        <th class="col-1">Статус</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </section>
	<?php require("components/modalWindowNotif.php")?>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>
