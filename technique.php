<?php 
    include('path.php');
    include 'app/database/dbFunction.php';
    include 'app/controllers/technique_back.php';

    if (!isset($_SESSION['id'])) {
        header("Location:" . BASE_URL . "log.php");
        exit();
    };

    $filtered = array_filter($_SESSION['accessibility'], function($item) {
       return $item['name'] === "technique";
    });
    if (reset($filtered)['privilege'] < 1) {
        header("Location:" . BASE_URL);
        exit();
    };

    $pageTitle = "Свободная техника";
?>

<!doctype html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/normalize.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/mainStyles.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/style.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/modalWindowNotif/modalWindowNotif.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/header/header.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/modules/modules.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/appsForm/appsForm.css">
    <script>
        const SESSION = <?=json_encode($_SESSION)?>;
        const BASE_URL = <?=json_encode(BASE_URL)?>;
		const SERVER_URL = <?=json_encode(SERVER_URL)?>;
    </script>
    <script defer src="<?=BASE_URL?>assets/js/modalWindowNotif/modalWindowNotif.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/header/header.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/modules/modules.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/technique/technique.js"></script>
    <title>Портал В.Казым</title>
</head>
<body>
	<?php include("components/header.php")?>
    <?php include("components/modules.php")?>
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
	<?php require("components/modalWindowNotif.php")?>
	<script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>