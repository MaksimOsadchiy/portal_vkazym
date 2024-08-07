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
    <title>Портал В.Казым</title>
</head>
<body>
<script src="assets/js/bootstrap.bundle.min.js"></script>

<?php include("app/include/header.php"); ?>

<div class="container log_form pt-4">
	<form class="row justify-content-md-center main-form" method="post" action="log.php">
		<h2>Вход на портал</h2>
		<div class="mb-3 col-12 col-md-4 err">
			<p><?= $errMsg ?></p>
		</div>
		<div class="w100"></div>
		<div class="mb-3 col-12 col-md-4">
			<label for="formGroupExampleInput" class="form-label">Введите логин</label>
			<input name="login" type="text" value="<?= $login ?>" class="form-control" id="formGroupExampleInput"
				   placeholder="Пример: aa.ivanov">
		</div>
		<div class="w100"></div>
		<div class="mb-3 col-12 col-md-4">
			<label for="exampleInputPassword1" class="form-label">Введите пароль</label>
			<input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Пароль">
		</div>
		<div class="w100"></div>
		<div class="mb-3 col-12 col-md-4 form-check">
			<input type="checkbox" class="form-check-input" id="exampleCheck1">
			<label class="form-check-label" for="exampleCheck1">Check me out</label>
		</div>
		<div class="w100"></div>
		<div class="mb-3 col-12 col-md-4">
			<button type="submit" name="button_log" class="btn btn-secondary">Войти</button>
			<a href="<?php echo BASE_URL . 'reg.php' ?>">Регистрация</a>
		</div>

	</form>
</div>

</body>
</html>
