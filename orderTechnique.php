<?php
    // session_start();
    include('path.php');
    $pageTitle = "Мои заказы";
    $menuItems = [
        ['url' => BASE_URL . 'technique.php', 'label' => 'Техника'],
        ['url' => BASE_URL . 'about.php', 'label' => 'Справочники'],
        ['url' => BASE_URL . 'lkri.php', 'label' => 'График'],
    ];
    // if (+$_SESSION['privilege'] !== 5 and +$_SESSION['privilege'] !== 2) {
    //     array_unshift($menuItems, ['url' => BASE_URL . 'allOrders.php', 'label' => 'Заказанная техника']);
    // };

?>

<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/normalize.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/style.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/header/header.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/modalWindowNotif/modalWindowNotif.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/orderTechnique/orderTechnique.css">
    <script>
        const BASE_URL = <?=json_encode(BASE_URL); ?>;
        const NEW_SERVER_URL = <?=json_encode(NEW_SERVER_URL); ?>;
    </script>
	<script defer type="module" src="<?=BASE_URL?>assets/js/headerMain/headerMain.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/modalWindowNotif/modalWindowNotif.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/orderTechnique/orderTechnique.js"></script>
</head>
<body>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
    <?php include("components/header.php"); ?>
    <section>
        <div class="table-container d-flex flex-column align-items-center pt-3">
            <select class="form-select choice" aria-label="Default select example">
                <option value="0" selected>Заявки на рассмотрении</option>
                <option value="1">Подтверждённые заявки</option>
                <option value="2">Отклонённые заявки</option>
            </select>
            <table class="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th class="col-1">Дата</th>
                        <th class="col-1">Время</th>
                        <th class="col-2">Техника</th>
                        <th class="col-1">Маршрут</th>
                        <th class="col-2">Вид работ</th>
                        <th class="col-2">Примечания</th>
                        <th class="col-1">Ответственный</th>
                        <th class="col-1">Дата создания</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </section>
	<?php require("components/modalWindowNotif.php"); ?>
</body>
</html>