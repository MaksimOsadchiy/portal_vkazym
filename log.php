<?php

	include("path.php");
	include("app/controllers/users.php");
	$pageTitle = "Вход";
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
    <link rel="stylesheet" href="assets/css/header/header.css">
    <link rel="stylesheet" href="assets/css/login/login.css">
    <script>
        const SESSION = <?php echo json_encode($_SESSION); ?>;
        const BASE_URL = <?php echo json_encode(BASE_URL); ?>;
    </script>
    <script defer src="<?=BASE_URL?>assets/js/header/header.js" />
    <title>Портал В.Казым</title>
</head>
<script src="assets/js/bootstrap.bundle.min.js"></script>
<body>

<?php include("components/header.php"); ?>

<div class="log_form d-flex flex-row justify-content-center col-12">
	<form class="main-form d-flex flex-column align-items-center row-gap-4 align-self-baseline px-3" method="post" action="log.php">
		<h1>Авторизация</h1>
		<div class="d-flex flex-column row-gap-2 col-12">
			<p for="formGroupExampleInput" class="form-label m-0">Введите логин</p>
			<input name="login" type="text" value="<?= $login ?>" class="form-control px-3" id="formGroupExampleInput"
				   placeholder="Пример: aa.ivanov">
		</div>
		<div class="d-flex flex-column row-gap-2 col-12">
			<p for="exampleInputPassword1" class="form-label m-0">Введите пароль</p>
			<input type="password" name="password" class="form-control px-3" id="exampleInputPassword1" placeholder="Пароль">
		</div>
		<div class="d-flex flex-row align-items-center column-gap-5">
			<button type="submit" name="button_log" class="btn-login btn btn-primary rounded-3 py-1 px-3">Войти</button>
            <a class="reg-link m-0" href="<?php echo BASE_URL . 'reg.php' ?>">Регистрация</a>
        </div>
	</form>
</div>

</body>
</html>
