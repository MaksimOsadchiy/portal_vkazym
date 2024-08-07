<?php
    include('path.php');
    include 'app/database/dbFunction.php';

    $pageTitle = "Краны";
    $menuItems = [
        ['url' => BASE_URL . 'allCranes.php', 'label' => 'Краны'],
    ];
?>


<!doctype html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/normalize.css">
    <link rel="stylesheet" href="assets/css/mainStyles.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/oneCrane/oneCrane.css">
    <link rel="stylesheet" href="assets/css/modalWindowNotif/modalWindowNotif.css">
    <script>
        const SERVER_URL = <?php echo json_encode(SERVER_URL); ?>;
        const BASE_URL = <?php echo json_encode(BASE_URL); ?>;
        const SESSION = <?php echo json_encode($_SESSION); ?>;
    </script>
    <script src="<?php echo BASE_URL ?>assets/js/checkauth.js"></script>
    <script defer src="assets/js/oneCrane/oneCrane.js"></script>
    <script defer src="assets/js/modalWindowNotif/modalWindowNotif.js"></script>
</head>
<body>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
    <?php include("app/include/header.php"); ?>
    <div class="main-container d-flex flex-column align-items-center pt-3">
        <div class="content d-flex flex-column align-items-center p-3">
            <div class="content__header d-flex flex-row justify-content-between pb-2">
                <div class="content__img-managment d-flex flex-column align-items-center row-gap-3">
                    <div class="content__img-container d-flex flex-row justify-content-center">
                        <button class="arrow-slider arrow-left d-flex flex-row justify-content-center align-items-center" disabled><</button>
                        <img src='<?=BASE_URL?>assets/image/tempImg.png' class="input__picture" alt="Фото ТПА"/>
                        <input type="file" accept="image/*, .png, .jpg, .web" class="input__file" id="file"/>
                        <label for="file" class="d-flex justify-content-center align-items-center input__uploadbtn">
                            <img src='<?=BASE_URL?>assets/image/downArrow.png' class="arrow"/>
                        </label>
                        <button class="arrow-slider arrow-right d-flex flex-row justify-content-center align-items-center" disabled>></button>
                    </div>
                    <button class="btn btn-secondary btn-save-img">Сохраить фото</button>
                </div>
                <div class="content__malfunction-info">
                    <div class="table table-malfunction d-flex flex-column align-items-center">
                        <div class="thead d-flex flex-column">
                            <div class="t-row d-flex flex-row justify-content-center">
                                <p class="column th">Характеристика</p>
                                <p class="column th">Состояние</p>
                            </div>
                        </div>
                        <div class="tbody d-flex flex-column"></div>
                    </div>
                    <button class="btn btn-secondary btn-save-malfunction">Сохранить</button>
                </div>
            </div>
            <div class="content__body d-flex flex-column align-items-center py-3">
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
        <?php require("components/modalWindowNotif.php"); ?>
    </div>
</body>
</html>
