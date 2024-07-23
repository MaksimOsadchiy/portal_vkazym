<?php
	include("path.php");
	include("app/controllers/users.php");
	$service = selectALLRes('services');
	$pageTitle = "Регистрация";
	$menuItems = [];

?>


<!doctype html>
<html lang="en">

<head>
	<title>Заказ техники</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Bootstrap demo</title>
	<link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/normalize.css">
    <link rel="stylesheet" href="assets/css/mainStyles.css">
	<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<script src="assets/js/bootstrap.bundle.min.js"></script>

<?php include("app/include/header.php"); ?>

<div class="container reg_form">
	<form class="row justify-content-md-center" method="post" action="reg.php">
		<h2>Форма регистрации</h2>
		<div class="mb-3 col-12 col-md-4 err">
			<p><?= $errMsg ?></p>
		</div>
		<div class="w100"></div>
		<div class="mb-3 col-12 col-md-4">
			<label for="formGroupExampleInput" class="form-label">Имя учетной записи</label>
			<input type="text" name="login" value="<?= $login ?>" class="form-control" id="formGroupExampleInput"
				   placeholder="Пример: aa.ivanov">
		</div>
		<div class="w100"></div>
		<div class="mb-3 col-12 col-md-4">
			<select class="form-select" name="service">
				<option value="" class="default-option"></option>
				<?php foreach ($service as $services): ?>
					<option value="<?= htmlspecialchars($services['id']); ?>">
						<?= htmlspecialchars($services['service']); ?>
					</option>
				<?php endforeach; ?>
				<div class="w100"></div>
			</select>
		</div>
		<div class="w100"></div>
		<div class="mb-3 col-12 col-md-4">
			<label for="exampleInputPassword1" class="form-label">Придумайте пароль</label>
			<input type="password" name="first_password" class="form-control" id="exampleInputPassword1"
				   placeholder="Не менее 8-ми символов">
		</div>
		<div class="w100"></div>
		<div class="mb-3 col-12 col-md-4">
			<label for="exampleInputPassword2" class="form-label">Повторите пароль</label>
			<input type="password" name="second_password" class="form-control" id="exampleInputPassword2"
				   placeholder="">
		</div>
		<div class="w100"></div>
		<div class="mb-3 col-12 col-md-4">
			<button type="submit" name="button-reg" class="btn btn-primary">Зарегистрироваться</button>
			<a href="log.php">Авторизоваться</a>
		</div>
	</form>
</div>

</body>
</html>
