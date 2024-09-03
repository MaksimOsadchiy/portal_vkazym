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
    <script defer type="module" src="<?=BASE_URL?>assets/js/allCranes/allCranes.js"></script>
    <title>Портал В.Казым</title>
</head>
<body>
	<?php include("components/header.php")?>
    <section class="d-flex flex-column align-items-center mb-5">
        <?php include("components/modules.php");?>
        <div class="table-container d-flex flex-column align-items-center pt-3">
            <div class="management d-flex flex-column row-gap-4 col-7 p-3">
                <div class="d-flex flex-row justify-content-between col-12">
                    <div class="d-flex flex-row column-gap-2 col-4">
						<p class="col-6 align-self-center text-end">Состояние крана</p>
						<select class="form-select align-self-center choice" aria-label="Default select example">
							<option value="-1" selected>Все краны</option>
							<option value="2">Дефективные краны</option>
							<option value="1">Работающие  краны</option>
							<option value="0">Неработающие  краны</option>
						</select>
                    </div>
                    <div class="d-flex flex-row column-gap-2 col-4">
                        <p class="col-6 align-self-center text-end">Крановый  узел</p>
                        <select class="form-select align-self-center affiliation" aria-label="Default select example">
                            <option value="-1" selected></option>
                        </select>
                    </div>
                    <div class="d-flex flex-row column-gap-2 col-4">
                        <p class="col-6 align-self-center text-end">Магистраль</p>
                        <select class="form-select align-self-center highways" aria-label="Default select example">
                            <option value="-1" selected></option>
                        </select>
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-between col-12">
                    <div class="d-flex flex-row column-gap-2 col-4">
                        <p class="align-self-center text-end col-6">Неисправности</p>
                        <select class="form-select align-self-center choice-identified_faults" aria-label="Default select example">
                            <option value="-1" selected></option>
                            <option value="0">Неустраненные </option>
                        </select>
                    </div>
                    <div class="d-flex flex-row column-gap-2 col-4">
                        <p class="col-6 align-self-center text-end">Номер крана</p>
                        <div class="input-group input-group-sm">
                            <input type="text" class="form-control input-number">
                        </div>
                    </div>
                    <div class="d-flex flex-row column-gap-2 col-4">
                        <p class="col-6 align-self-center text-end">Диаметр</p>
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
                <div class="d-flex flex-row justify-content-between col-12">
                    <div class="d-flex flex-row column-gap-2 col-6">
                        <div class="d-flex flex-column row-gap-2 col-4">
                            <p class="opacity-0">Компания</p>
                            <p class="text-end pt-1">Производитель</p>
                        </div>
                        <div class="d-flex flex-column align-items-center row-gap-2">
                            <p>Компания</p>
                            <select class="form-select company" aria-label="Default select example">
                                <option value="-1" selected></option>
                            </select>
                        </div>
                        <div class="d-flex flex-column align-items-center row-gap-2">
                            <p>Страна</p>
                            <select class="form-select location" aria-label="Default select example">
                                <option value="-1" selected></option>
                            </select>
                        </div>
                    </div>
                    <div class="d-flex flex-row column-gap-2 col-6">
                        <div class="d-flex flex-column row-gap-2 col-4">
                            <p class="opacity-0">Компания</p>
                            <p class="text-end pt-1">Тип крана</p>
                        </div>
                        <select class="form-select align-self-end class-cranes" aria-label="Default select example">
                            <option value="-1" selected></option>
                        </select>
                        <select class="form-select align-self-end type-cranes" aria-label="Default select example">
                            <option value="-1" selected></option>
                        </select>
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-center column-gap-5 col-12">
                    <div class="d-flex flex-row column-gap-2 col-4">
                        <p class="align-self-center text-end col-6">Кол.-во кранов на странице</p>
                        <div class="input-group align-self-center input-group-sm">
                            <input type="number" class="form-control input-count-cranes" value="15" min="10" max="250">
                        </div>
                    </div>
                    <div class="d-flex flex-row column-gap-2 col-4">
                        <div class="input-group align-self-center input-group-sm">
                            <button id="btnToExcel" class="btnToExcel btn btn-secondary">Сформировать excel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="table-cranes" class="table table-cranes d-flex flex-column align-items-center mt-4">
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
	<div class="craneData d-flex my-d-none flex-column row-gap-2 p-2">
		<p class="craneData__title text-center">Неисправности</p>
        <ul class="craneData__list d-flex flex-row flex-wrap row-gap-2">
        </ul>
	</div>
	<?php require("components/modalWindowNotif.php"); ?>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>
