<?php

	include("path.php");
	$pageTitle = "Регистрация";
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
	<script defer src="<?=BASE_URL?>assets/js/registration/registration.js"></script>
	<title>Портал В-Казым</title>
</head>
<body>
	<?php include("components/header.php"); ?>
	<div class="container registration-form form">
		<div class="row flex-column align-items-center">
			<h2 class="text-center my-4">Регистрация</h2>
			<div class="col-4 mb-3">
				<label for="input-login" class="form-label">Имя учетной записи</label>
				<input type="text" class="form-control login" id="input-login" placeholder="Пример: aa.ivanov">
			</div>
			<div class="col-4 mb-3">
				<select class="form-select service">
					<option value="0" class="default-option" selected disabled>Выберите службу</option>
					<!-- <?php foreach ($service as $services): ?>
						<option value="<?= htmlspecialchars($services['id']); ?>">
							<?= htmlspecialchars($services['service']); ?>
						</option>
					<?php endforeach; ?> -->
				</select>
			</div>
			<div class="col-4 mb-3">
				<label for="input-password" class="form-label">Придумайте пароль</label>
				<input type="password" class="form-control password" id="input-password" placeholder="Не менее 8-ми символов">
			</div>
			<div class="col-4 mb-3">
				<label for="input-password-to" class="form-label">Повторите пароль</label>
				<input type="password" class="form-control password-to" id="input-password-to">
			</div>
			<div class="col-4 mb-3">
				<button class="btn btn-primary btn-registration">Зарегистрироваться</button>
				<a href="<?=BASE_URL?>log.php">Авторизация</a>
			</div>
		</div>
	</div>
	<?php require("components/modalWindowNotif.php"); ?>
	<script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>
