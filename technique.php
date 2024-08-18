<?php 
    include('path.php');
    $pageTitle = "Заказ техники";
    $menuItems = [
        ['url' => BASE_URL . 'orderTechnique.php', 'label' => 'Мои заказы'],
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
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/normalize.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/style.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/header/header.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/modalWindowNotif/modalWindowNotif.css">
    <script>
        const BASE_URL = <?=json_encode(BASE_URL); ?>;
		const NEW_SERVER_URL = <?=json_encode(NEW_SERVER_URL) ?>;
    </script>
	<script defer type="module" src="<?=BASE_URL?>assets/js/headerMain/headerMain.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/modalWindowNotif/modalWindowNotif.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/technique/technique.js"></script>
	<title>Портал В-Казым</title>
</head>
<body>
	<script src="assets/js/bootstrap.bundle.min.js"></script>
    <?php include("components/header.php"); ?>
    <section>
        <div class="container-xl">
            <div class="d-grid gap-5 col-2 ">
                <a href="<?=BASE_URL?>Add_technique.php" class="btn btn-outline-success mt-4" role="button">Заказать
                    технику</a>
            </div>
        </div>
    </section>
    <div class="container-xl container-technique">
        <h2>Свободная техника</h2>
        <div class="d-flex flex-column row-gap-2 form-row mb-3">
            <div class="row">
                <div class="col">
                    <label for="timeFrom">Время с</label>
                    <input type="time" class="form-control" id="timeFrom">
                </div>
                <div class="col">
                    <label for="timeTo">Время по</label>
                    <input type="time" class="form-control" id="timeTo">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="route">Техника</label>
                    <select class="form-select"></select>
                </div>
                <div class="col">
                    <div class="col">
                        <label for="dateFrom">Дата</label>
                        <input type="date" class="form-control" id="dateFrom">
                    </div>
                </div>
            </div>
            <div class="row d-flex flex-row justify-content-end pe-2">
                <button class="col col-2 btn btn-secondary me-1 btn-search">Найти</button>
            </div>
        </div>
        <table class="table table-bordered mt-4">
            <thead>
            <tr>
                <th>Гос номер</th>
                <th>Модель</th>
                <th>Тип</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
	<?php require("components/modalWindowNotif.php"); ?>
</body>
</html>