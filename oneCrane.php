<?php
    include('path.php');
    include 'app/database/dbFunction.php';

    $pageTitle = "Краны";
    $menuItems = [];
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
            <div class="content__header d-flex flex-row justify-content-between">
                <div class="content__img-container">
                    <img src="<?=BASE_URL?>/assets/image/кран.png" alt="Фото ТПА">
<!--                    <img src="#" alt="Фото ТПА">-->
<!--                    <img src="#" alt="Фото ТПА">-->
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
            <div class="content__body d-flex flex-column align-items-center"></div>
        </div>
    </div>
</body>
</html>
