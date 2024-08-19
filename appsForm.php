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
	<link rel="stylesheet" href="<?=BASE_URL?>assets/css/normalize.css">
 	<link rel="stylesheet" href="<?=BASE_URL?>assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="<?=BASE_URL?>assets/css/mainStyles.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/style.css">
	<link rel="stylesheet" href="<?=BASE_URL?>assets/css/modalWindowNotif/modalWindowNotif.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/header/header.css">
	<link rel="stylesheet" href="<?=BASE_URL?>assets/css/appsForm/appsForm.css">
	<script>
		const SERVER_URL = <?=json_encode(SERVER_URL);?>;
        const SESSION = <?=json_encode($_SESSION);?>;
        const BASE_URL = <?=json_encode(BASE_URL);?>;
	</script>
    <script src="<?=BASE_URL?>assets/js/checkauth.js"></script>
	<script defer src="<?=BASE_URL?>assets/js/modalWindowNotif/modalWindowNotif.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/header/header.js"></script>
	<script defer src="<?=BASE_URL?>assets/js/appsForm/appsForm.js"></script>
	<title>Портал В.Казым</title>
</head>
<body>
	<?php include("components/header.php"); ?>
	<div class="main-container d-flex flex-row col-12">
        <div class="future"></div>
        <div class="main-container__content d-flex flex-column row-gap-3 col-12 py-3 px-5">
            <div class="main-container__breadcrumb rounded-3">
				<p>/Заявки/Мои заявки</p>
			</div>
            <div class="main-container__managment managment d-flex flex-column rounded-3">
				<p class="managment__title">УПРАВЛЕНИЕ</p>
				<button class="managment__btn-create-app btn btn-primary col-4 py-2 px-3 rounded-3 border-0">Написать заявку</button>
			</div>
			<div class="table-container d-flex flex-column col-10 rounded-3 p-3">
				<p class="table-container__title mb-4">Мои заявки</p>
				<div class="table-applications d-flex flex-column col-12 rounded-top-3">
					<div class="t-header d-flex flex-row align-items-center col-12 rounded-top-3">
						<p class="t-column text-center col-2">Дата</p>
						<p class="t-column text-center col-2">Тема</p>
						<p class="t-column text-center col-6">Контент</p>
						<p class="t-column text-center col-2">Статус</p>
					</div>
					<div class="t-body d-flex flex-column col-12">
						<div class="t-row d-flex flex-row align-items-center col-12">
							<p class="t-column text-center col-2">2024-07-31 19:30:40</p>
							<p class="t-column text-center col-2">Тема Тема Тема Тема Тема Тема Тема Тема Тема Тема ...</p>
							<p class="t-column text-center col-6">СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдер...</p>
							<p class="t-column text-center col-2">Отклонено</p>
						</div>
						<div class="t-row d-flex flex-row align-items-center col-12">
							<p class="t-column text-center col-2">2024-07-31 19:30:40</p>
							<p class="t-column text-center col-2">Тема Тема Тема Тема Тема Тема Тема Тема Тема Тема ...</p>
							<p class="t-column text-center col-6">СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдер...</p>
							<p class="t-column text-center col-2">Отклонено</p>
						</div>
						<div class="t-row d-flex flex-row align-items-center col-12">
							<p class="t-column text-center col-2">2024-07-31 19:30:40</p>
							<p class="t-column text-center col-2">Тема Тема Тема Тема Тема Тема Тема Тема Тема Тема ...</p>
							<p class="t-column text-center col-6">СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдер...</p>
							<p class="t-column text-center col-2">Отклонено</p>
						</div>
					</div>
				</div>
				<div class="pagination d-flex flex-row justify-content-between align-items-center px-4 py-3">
					<button>Назад</button>
					<ul class="pagination__pages d-flex flex-row column-gap-1">
						<li class="page-number rounded-4">1</li>
						<li class="page-number rounded-4">2</li>
						<li class="page-number rounded-4">3</li>
						<li class="page-number rounded-4">4</li>
					</ul>
					<button>Вперед</button>
				</div>
			</div>
        </div>
    </div>
	<!-- <div class="main-block container d-flex flex-column justify-content-center align-items-center">
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
	</div> -->
	<?php require("components/modalWindowNotif.php"); ?>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>