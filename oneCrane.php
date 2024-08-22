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
    };

    $pageTitle = "Краны";
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
    <script defer src="<?=BASE_URL?>assets/js/oneCrane/oneCrane.js"></script>
    <title>Портал В.Казым</title>
</head>
<body>
	<?php include("components/header.php")?>
    <div class="main-container d-flex flex-column align-items-center pt-3">
        <?php include("components/modules.php");?>
        <div class="content d-flex flex-column align-items-center p-3 pb-5">
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
                    <div class="content__btn-managment d-flex flex-row column-gap-2">
                        <button class="btn btn-success btn-save-img" disabled>Сохраить фото</button>
                        <button class="btn btn-danger btn-delete-img" disabled>Удалить фото</button>
                    </div>
                </div>
                <div class="content__malfunction-container d-flex flex-column align-items-center row-gap-2">
                    <div class="d-flex flex-row column-gap-2 col-12">
                        <div class="content__malfunction-info d-flex flex-column align-items-center row-gap-2">
                            <div class="table table-malfunction d-flex flex-column align-items-center mb-0">
                                <div class="thead d-flex flex-column">
                                    <div class="t-row d-flex flex-row justify-content-center">
                                        <p class="column th">Характеристика</p>
                                        <p class="column th">Состояние</p>
                                    </div>
                                </div>
                                <div class="tbody d-flex flex-column"></div>
                            </div>
                            <button class="btn btn-success btn-save-malfunction">Сохранить</button>
                        </div>
                        <!---->
                        <div class="temp-container d-flex flex-column align-self-start px-2 pb-2">
                            <div class="switch d-flex flex-row justify-content-center column-gap-2 col-12">
                                <button class="btn btn-secondary take-group selected-group" disabled>ТОиР</button>
                                <button class="btn btn-secondary take-group">Выявленные неисправности</button>
                            </div>
                        </div>
                        <!---->
                    </div>
                </div>
            </div>
            <div class="content__body d-flex flex-column align-items-center">
                <div class="switch d-flex flex-row column-gap-2 col-12 ps-5 mb-3">
                    <button class="btn btn-secondary take-group selected-group" disabled>Паспорт</button>
                    <button class="btn btn-secondary take-group">Выявленные неисправности</button>
                    <button class="btn btn-secondary take-group">ТОиР</button>
                    <button class="btn btn-secondary take-group">Файлы</button>
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
