<?php
    include('path.php');
    include 'app/database/dbFunction.php';

    if (!isset($_SESSION['id'])) {
        header("Location:" . BASE_URL . "log.php");
        exit();
    };

    $filtered = array_filter($_SESSION['accessibility'], function($item) {
        return $item['name'] === "applications";
    });
    if (reset($filtered)['privilege'] < 1) {
        header("Location:" . BASE_URL);
        exit();
    };

    $pageTitle = "Заявки";
?>


<!DOCTYPE html>
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
		const SERVER_URL = <?=json_encode(SERVER_URL)?>;
        const SESSION = <?=json_encode($_SESSION)?>;
        const BASE_URL = <?=json_encode(BASE_URL)?>;
	</script>
	<script defer src="<?=BASE_URL?>assets/js/modalWindowNotif/modalWindowNotif.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/header/header.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/modules/modules.js"></script>
	<script defer src="<?=BASE_URL?>assets/js/appsForm/appsForm.js"></script>
	<title>Портал В.Казым</title>
</head>
<body>
	<?php include("components/header.php"); ?>
	<div class="main-block container d-flex flex-column justify-content-center align-items-center">
        <?php include("components/modules.php");?>
		<button type="button" class="btn btn-primary btn-open-modal-window-appForm mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Написать заявку
		</button>
	    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
	         aria-hidden="true">
	        <div class="modal-dialog">
	            <div class="modal-content">
	                <div class="modal-header">
	                    <h5 class="modal-title" id="exampleModalLabel">Ваша заявка</h5>
	                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	                </div>
	                <div class="modal-body">
						<div class="forma container d-flex flex-column justify-content-center align-items-center">
							<h2>Заполните заявку</h2>
							<div class="d-flex flex-row column-gap-2 justify-content-between col-10 mt-3 mb-3 row">
								<label for="staticEmail" class="col-sm-2 col-form-label ">Email:</label>
								<div class="col-sm-9">
									<p class="user" value="<?=$_SESSION['id']?>"><?=$_SESSION['login']?></p>
								</div>
							</div>
							<div class="d-flex flex-row column-gap-2  justify-content-between col-10 mb-3 row">
								<label for="inputPassword" class="col-sm-2 col-form-label">Тема:</label>
								<div class="col-sm-9">
									<input type="text" class="title form-control" name="title" placeholder="Введи тему заявки">
								</div>
							</div>
							<div class="d-flex flex-row column-gap-2  justify-content-between col-10 mb-3 row">
								<label for="inputPassword" class="col-sm-2 col-form-label">Содержание:</label>
								<div class="col-sm-9">
									<textarea class="content form-control" name="content" id='content' placeholder="Введи основной текст заявки"></textarea>
								</div>
							</div>
							<button type="button" class="btn btn-secondary send-btn" id='button'>Отправить</button>
						</div>
	                </div>
	                <div class="modal-footer">
	                    <button type="button" class="btn btn-secondary btnСlose" data-bs-dismiss="modal">Закрыть</button>
	                </div>
	            </div>
	        </div>
	    </div>
	    <div class="table-appsForm mb-3 col-11">
            <div class="tb-header">Ваши заявки</div>
            <div class="table">
                <div class="tb-title d-flex flex-row">
                    <p class="col-2 text-center">Дата</p>
                    <p class="col-2 text-center">Тема</p>
                    <p class="col-6 text-center">Контент</p>
                    <p class="col-2 text-center">Статус</p>
                </div>
                <div class="tbody"></div>
            </div>
        </div>
	</div>
	<?php require("components/modalWindowNotif.php"); ?>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>