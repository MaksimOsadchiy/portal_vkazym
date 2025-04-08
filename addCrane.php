<?php
    include('path.php');
    include 'app/database/dbFunction.php';

    if (!isset($_SESSION['id'])) {
        header("Location:" . BASE_URL . "log.php");
        exit();
    };
    if ($_SESSION['accessibility'][0]['id_role'] !== 2) {
        $filtered = array_filter($_SESSION['accessibility'], function($item) {
            return $item['name'] === "cranes";
        });
        if (reset($filtered)['privilege'] < 1) {
            header("Location:" . BASE_URL);
            exit();
        };
        if (reset($filtered)['privilege'] < 3) {
            header("Location:" . BASE_URL . "allCranes.php");
            exit();
        };
    };

    $pageTitle = "Добавить кран";
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
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/oneCrane/oneCrane.css">
    <script>
        const SERVER_URL = <?=json_encode(SERVER_URL)?>;
        const BASE_URL = <?=json_encode(BASE_URL)?>;
        const SESSION = <?=json_encode($_SESSION)?>;
    </script>
    <script defer src="<?=BASE_URL?>assets/js/modalWindowNotif/modalWindowNotif.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/header/header.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/modules/modules.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/addCrane/addCrane.js"></script>
    <title>Портал В.Казым</title>
</head>
<body>
	<?php include("components/header.php")?>
    <div class="main-container d-flex flex-column align-items-center pt-3">
        <?php include("components/modules.php");?>
        <div class="content d-flex flex-column align-items-center p-3 pb-5">
            <div class="content__header d-flex flex-row justify-content-between pb-2">
            </div>
            <div class="content__body d-flex flex-column align-items-center">
                <div class="switch d-flex flex-row column-gap-2 col-12 ps-5 mb-3">
                    <button class="btn btn-secondary take-group selected-group" disabled>Паспорт</button>
                </div>
                <p class="mb-2 fs-5">Характеристики ТПА</p>
                <div class="table table-main-info d-flex flex-column align-items-center">
                    <div class="thead d-flex flex-column">
                        <div class="t-row d-flex flex-row justify-content-center">
                            <p class="column th">Характеристика</p>
                            <p class="column th">Значение</p>
                        </div>
                    </div>
                    <div class="tbody d-flex flex-column"></div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex flex-column row-gap-4 pb-4"></div>
                    <div class="modal-footer"></div>
                </div>
            </div>
        </div>
    </div>
	<?php require("components/modalWindowNotif.php"); ?>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>
