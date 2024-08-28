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

    $pageTitle = "Все краны";
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
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/allCranes/allCranes.css">
    <script>
        const SERVER_URL = <?=json_encode(SERVER_URL)?>;
        const BASE_URL = <?=json_encode(BASE_URL)?>;
        const SESSION = <?=json_encode($_SESSION)?>;
    </script>
    <script defer src="<?=BASE_URL?>assets/js/modalWindowNotif/modalWindowNotif.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/header/header.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/modules/modules.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/allCranes/allCranes.js"></script>
    <title>Портал В.Казым</title>
</head>
<body>
	<?php include("components/header.php")?>
    <section class="d-flex flex-column align-items-center">
        <?php include("components/modules.php");?>
        <div class="table-container d-flex flex-column align-items-center pt-3">
            <div class="managment d-flex flex-column row-gap-4 col-6 p-3">
                <div class="d-flex flex-row justify-content-between column-gap-4">
                    <div class="d-flex flex-column row-gap-3">
                        <p class="fs-5">Состояние крана</p>
                        <select class="form-select choice" aria-label="Default select example">
                            <option value="-1" selected>Все краны</option>
                            <option value="2">Дефективные краны</option>
                            <option value="1">Работающие  краны</option>
                            <option value="0">Неработающие  краны</option>
                        </select>
                    </div>
                    <div class="d-flex flex-column row-gap-3">
                        <p class="fs-5">Крановый  узел</p>
                        <select class="form-select affiliation" aria-label="Default select example">
                            <option value="-1" selected></option>
                        </select>
                    </div>
                    <div class="d-flex flex-column row-gap-3">
                        <p class="fs-5">Магистраль</p>
                        <select class="form-select highways" aria-label="Default select example">
                            <option value="-1" selected></option>
                        </select>
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-between column-gap-4">
                    <div class="d-flex flex-column row-gap-3">
                        <p class="text-center fs-5">Тип крана</p>
                        <div class="select-group d-flex flex-row column-gap-2">
                            <div class="d-flex flex-column align-items-center row-gap-2 col-6">
<!--                                <p>Текст</p>-->
                                <select class="form-select class-cranes" aria-label="Default select example">
                                    <option value="-1" selected></option>
                                </select>
                            </div>
                            <div class="d-flex flex-column align-items-center row-gap-2 col-6">
<!--                                <p>Текст</p>-->
                                <select class="form-select type-cranes" aria-label="Default select example">
                                    <option value="-1" selected></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column row-gap-3">
                        <p class="fs-5">Номер крана</p>
                        <div class="input-group input-group-sm">
                            <input type="text" class="form-control input-number">
                        </div>
                    </div>
                    <div class="d-flex flex-column row-gap-3">
                        <p class="text-center fs-5">Диаметр</p>
                        <div class="d-flex flex-row column-gap-2">
                            <div class="input-group input-group-sm">
                                <input type="number" class="form-control input-diameter-min" placeholder="ОТ">
                            </div>
                            <div class="input-group input-group-sm">
                                <input type="number" class="form-control input-diameter-max" placeholder="ДО">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-between column-gap-4">
                    <div class="d-flex flex-column row-gap-3 col-7">
                        <p class="text-center fs-5">Производитель</p>
                        <div class="select-group d-flex flex-row column-gap-2">
                            <div class="d-flex flex-column align-items-center row-gap-2 col-6">
                                <p>Компания</p>
                                <select class="form-select company" aria-label="Default select example">
                                    <option value="-1" selected></option>
                                </select>
                            </div>
                            <div class="d-flex flex-column align-items-center row-gap-2 col-6">
                                <p>Страна производиетль</p>
                                <select class="form-select location" aria-label="Default select example">
                                    <option value="-1" selected></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column row-gap-3 col-4">
                        <p class="fs-5">Неисправности</p>
                        <select class="form-select choice-identified_faults" aria-label="Default select example">
                            <option value="-1" selected></option>
                            <option value="0">Неустраненные </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="table table-cranes d-flex flex-column align-items-center mt-4">
                <div class="thead d-flex flex-column">
                    <div class="t-row d-flex flex-row justify-content-center">
                        <p class="column th">№п/п</p>
                        <p class="column th">Наименование ЛПУМГ</p>
                        <p class="column th column-highways">Наименование МГ</p>
                        <p class="column th">Тип крана</p>
                        <p class="column th column-location">км</p>
                        <p class="column th">Тех.№ ТПА</p>
                        <p class="column th">Производитель ТПА</p>
                        <p class="column th">Год изготовления ТПА</p>
                        <p class="column th column-DN">DN</p>
                        <p class="column th">Вид неисправности</p>
                        <p class="column th">Дренаж</p>
                        <p class="column th">Набивочные трубопроводы</p>
                        <p class="column th">Плановый год замены</p>
                        <p class="column th">Наличие акта</p>
                    </div>
                </div>
                <div class="tbody d-flex flex-column"></div>
            </div>
            <div class="table-pages d-flex flex-row justify-content-center column-gap-3"></div>
        </div>
    </section>
	<?php require("components/modalWindowNotif.php"); ?>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>
