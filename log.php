<?php

	include("path.php");
	$pageTitle = "Авторизация";
	$menuItems = [];

?>


<!doctype html>
<html lang="ru">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="<?=BASE_URL?>assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/normalize.css">
	<link rel="stylesheet" href="<?=BASE_URL?>assets/css/style.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/header/header.css">
	<link rel="stylesheet" href="<?=BASE_URL?>assets/css/modalWindowNotif/modalWindowNotif.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/authentication/authentication.css">
	<script>
		const NEW_SERVER_URL = <?php echo json_encode(NEW_SERVER_URL) ?>;
        const BASE_URL = <?php echo json_encode(BASE_URL); ?>;
	</script>
	<script defer type="module" src="<?=BASE_URL?>assets/js/headerMain/headerMain.js"></script>
	<script defer src="<?php echo BASE_URL ?>assets/js/modalWindowNotif/modalWindowNotif.js"></script>
	<script defer src="<?=BASE_URL?>assets/js/login/login.js"></script>
	<title>Портал В-Казым</title>
</head>
<body>
	<?php include("components/header.php"); ?>
	<div class="container login-form form">
		<div class="row flex-column align-items-center">
			<h2 class="text-center my-4">Авторизация</h2>
			<div class="col-4 mb-3">
				<label for="input-login" class="form-label">Введите логин</label>
				<input type="text" class="form-control login" id="input-login" placeholder="Пример: aa.ivanov">
			</div>
			<div class="col-4 mb-3">
				<label for="input-password" class="form-label">Введите пароль</label>
				<input type="password" class="form-control password" id="input-password" placeholder="Пароль">
			</div>
			<div class="col-4 mb-3 form-check">
				<input type="checkbox" class="form-check-input" id="input-checkbox">
				<label for="input-checkbox" class="form-check-label">Check me out</label>
			</div>
			<div class="col-4 mb-3">
				<button class="btn btn-secondary btn-login">Войти</button>
				<a href="<?=BASE_URL?>reg.php">Регистрация</a>
			</div>
		</div>
	</div>
	<?php require("components/modalWindowNotif.php"); ?>
	<script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>
