<?php
    session_start();
    include('path.php');

    if (!isset($_SESSION['id'])) {
        header("Location:" . BASE_URL . "log.php");
        exit();
    };
    if ($_SESSION['accessibility'][0]['id_role'] !== 2) {
        $filtered = array_filter($_SESSION['accessibility'], function($item) {
            return $item['name'] === "technique";
        });
        if (reset($filtered)['privilege'] < 3) {
            header("Location:" . BASE_URL);
            exit();
        };
    };

    $pageTitle = "Диаграмма Ганта";
?>


<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/normalize.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/mainStyles.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/style.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/modalWindowNotif/modalWindowNotif.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/header/header.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/modules/modules.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/chart/chart.css">
    <script>
        const SESSION = <?=json_encode($_SESSION)?>;
        const BASE_URL = <?=json_encode(BASE_URL)?>;
        const SERVER_URL = <?=json_encode(SERVER_URL)?>;
    </script>
    <script defer src="<?=BASE_URL?>assets/js/modalWindowNotif/modalWindowNotif.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/header/header.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/modules/modules.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/chart/chart.js"></script>
    <title>Портал В.Казым</title>
</head>
<body>
    <?php include("components/header.php")?>
    <?php include("components/modules.php")?>
    <div id="legend-container" class="d-flex flex-row justify-content-center my-3 col-12"></div>
    <div class="my-container"><canvas id="myChart"></canvas></div>
    <?php require("components/modalWindowNotif.php")?>
	<div class="my-window window-hidden d-flex justify-content-center align-items-center col-12">
		<div class="my-window__container d-flex flex-column row-gap-1 col-5 rounded-2 p-2">
			<div class="my-window__header text-center border-bottom">
				<h1>Окно изменений</h1>
			</div>
			<div class="my-window__body d-flex flex-column row-gap-2 py-2">
				<div class="body-service d-flex flex-row align-items-center column-gap-2">
					<p class="col-2 text-end">Служба:</p>
					<select name="service" class="form-select select-service"></select>
				</div>
                <div class="body-service d-flex flex-row align-items-center column-gap-2">
                    <p class="col-2 text-end">Ответственный:</p>
                    <select name="service" class="form-select responsible-service"></select>
                </div>
				<div class="body-technique d-flex flex-row align-items-center column-gap-2">
					<p class="col-2 text-end">Техника:</p>
					<select name="technique" class="form-select select-technique"></select>
				</div>
				<div class="body-date d-flex flex-row align-items-center column-gap-2">
					<p class="col-2 text-end">Дата с:</p>
					<input type="date" class="form-control date-from">
					<p class="col-2 text-end">Дата по:</p>
					<input type="date" class="form-control date-to">
				</div>
				<div class="body-time d-flex flex-row align-items-center column-gap-2">
					<p class="col-2 text-end">Время с:</p>
					<input type="time" class="form-control time-from">
					<p class="col-2 text-end">Время по:</p>
					<input type="time" class="form-control time-to">
				</div>
			</div>
			<div class="my-window__footer text-end border-top pt-2">
				<button class="btn-save-changes btn btn-outline-success">Сохранить</button>
			</div>
		</div>
	</div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>
