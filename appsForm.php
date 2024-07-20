<?php

    include('path.php');
    include 'app/database/dbFunction.php';
    $pageTitle = "Заявки";
	$menuItems = [
        ['url' => BASE_URL, 'label' => 'Главная'],
        ['url' => BASE_URL . 'about.php', 'label' => 'Справочники'],
        ['url' => BASE_URL . 'lkri.php', 'label' => 'График'],
    ];

?>


<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="<?php echo BASE_URL ?>assets/css/normalize.css">
 	<link rel="stylesheet" type="text/css" href="<?php echo BASE_URL ?>assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="<?php echo BASE_URL ?>assets/css/mainStyles.css">
    <link rel="stylesheet" type="text/css" href="<?php echo BASE_URL ?>assets/css/style.css">
	<link rel="stylesheet" type="text/css" href="<?php echo BASE_URL ?>assets/css/appsForm/appsForm.css">
	<link rel="stylesheet" type="text/css" href="<?php echo BASE_URL ?>assets/css/modalWindowNotif/modalWindowNotif.css">
	<script>
		const SERVER_URL = <?php echo json_encode(SERVER_URL) ?>;
        const SESSION = <?php echo json_encode($_SESSION); ?>;
	</script>
	<script defer src="<?php echo BASE_URL ?>assets/js/appsForm/appsForm.js"></script>
	<script defer src="<?php echo BASE_URL ?>assets/js/modalWindowNotif/modalWindowNotif.js"></script>
	<title>Заявки</title>
</head>
<body>
    <?php include("app/include/header.php"); ?>

	<div class="main-info container d-flex flex-row justify-content-center align-items-center">
		<p>Основная информация....</p>
	</div>

	<div class="main-block container d-flex flex-column justify-content-center align-items-center">
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
	    <div class="table-appsForm mb-3 col-10">
            <div class="tb-header">Ваши заявки</div>
            <div class="table">
                <div class="tb-title d-flex flex-row">
                    <p class="col-3 text-center">Тема</p>
                    <p class="col-8 text-center">Контент</p>
                    <p class="col-1 text-center">Статус</p>
                </div>
                <div class="tbody"></div>
            </div>
        </div>
	</div>
	<?php require("components/modalWindowNotif.php"); ?>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>