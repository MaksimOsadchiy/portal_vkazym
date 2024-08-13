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
                    <div class="content__btn-managment d-flex flex-row column-gap-2">
                        <button class="btn btn-secondary btn-save-img" disabled>Сохраить фото</button>
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
                            <button class="btn btn-secondary btn-save-malfunction">Сохранить</button>
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
                    <!---->
<!--                    <div class="d-flex flex-row align-items-center column-gap-3">-->
<!--                        <button class="btn btn-secondary btn-save-malfunction">Сохранить</button>-->
<!--                        <a href="#affiliation" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">ТОиР</a>-->
<!--                        <a href="#identified-faults" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Выявленные неисправности</a>-->
<!--                    </div>-->
                    <!---->
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
                <div class="document-container d-flex flex-column align-items-center px-3 py-2 mb-3">
                    <p class="fs-5 mb-2">Файлы</p>
                    <input type='file' class="input_document btn btn-secondary" />
                </div>
                <p class="fs-5 mb-2" id="affiliation">Информация по техническому обслуживанию и ремонту</p>
                <div class="table table-affiliation d-flex flex-column align-items-center">
                    <div class="thead d-flex flex-column">
                        <div class="t-row d-flex flex-row justify-content-center">
                            <p class="column th">Дата</p>
                            <p class="column th">Вид ТОиР</p>
                            <p class="column th">Служба</p>
                            <p class="column th">Содержание работ</p>
                            <p class="column th">Итог</p>
                            <p class="column th">ФИО</p>
                        </div>
                    </div>
                    <div class="tbody d-flex flex-column"></div>
                </div>
                <p class="fs-5 mb-2" id="identified-faults">Выявленные неисправности</p>
                <div class="table table-identified-faults d-flex flex-column align-items-center">
                    <div class="thead d-flex flex-column">
                        <div class="t-row d-flex flex-row justify-content-center">
                            <p class="column th">Дата выявления неисправности</p>
                            <p class="column th">Фио обнаружевшего</p>
                            <p class="column th">Характер и возможная причина</p>
                            <p class="column th">Дата устранения неисправности</p>
                            <p class="column th">Выполненные мероприятия</p>
                            <p class="column th">ФИО устранившего</p>
                            <p class="column th">Примечание</p>
                            <p class="column th">Статус</p>
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
