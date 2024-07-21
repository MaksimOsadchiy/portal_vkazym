<?php

	include("path.php");
	include("app/controllers/users.php");
	$pageTitle = "Вход";
	$menuItems = [];

?>
<!doctype html>
<html lang="ru">

<head>
	<title>Заказ техники</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/normalize.css">
    <link rel="stylesheet" href="assets/css/mainStyles.css">
	<link rel="stylesheet" href="assets/css/style.css">
	<script>
		const NEW_SERVER_URL = <?php echo json_encode(NEW_SERVER_URL) ?>;
        const BASE_URL = <?php echo json_encode(BASE_URL); ?>;
    </script>
	<script defer type="module" src="assets/js/headerMian/headerMian.js"></script>
	<script defer src="assets/js/userManagement/login.js"></script>
</head>
<body>
<script src="assets/js/bootstrap.bundle.min.js"></script>

<?php include("app/include/header.php"); ?>

<div class="container log_form">
	<div class="row justify-content-md-center">
		<h2>Вход на портал</h2>
		<div class="mb-3 col-12 col-md-4 err">
			<p><?= $errMsg ?></p>
		</div>
		<div class="w100"></div>
		<div class="mb-3 col-12 col-md-4">
			<label for="formGroupExampleInput" class="form-label">Введите логин</label>
			<input name="login" type="text" value="<?= $login ?>" class="form-control login-form" id="formGroupExampleInput"
				   placeholder="Пример: aa.ivanov">
		</div>
		<div class="w100"></div>
		<div class="mb-3 col-12 col-md-4">
			<label for="exampleInputPassword1" class="form-label">Password</label>
			<input type="password" name="password" class="form-control pass-form" id="exampleInputPassword1">
		</div>
		<div class="w100"></div>
		<div class="mb-3 col-12 col-md-4 form-check">
			<input type="checkbox" class="form-check-input" id="exampleCheck1">
			<label class="form-check-label" for="exampleCheck1">Check me out</label>
		</div>
		<div class="w100"></div>
		<div class="mb-3 col-12 col-md-4">
			<button name="button_log" class="btn btn-secondary btn-enter">Войти</button>
			<a href="<?php echo BASE_URL . 'reg.php' ?>">Регистрация</a>
		</div>

	</div>
</div>

</body>
</html>
