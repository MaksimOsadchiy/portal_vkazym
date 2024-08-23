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
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>
