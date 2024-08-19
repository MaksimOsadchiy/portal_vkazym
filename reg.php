<?php
	include("path.php");
	include("app/controllers/users.php");
	$service = selectALLRes('services');
	$pageTitle = "Регистрация";
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
    <link rel="stylesheet" href="assets/css/reg/reg.css">
    <script>
        const SESSION = <?php echo json_encode($_SESSION); ?>;
        const BASE_URL = <?php echo json_encode(BASE_URL); ?>;
    </script>
    <script defer src="<?=BASE_URL?>assets/js/header/header.js"></script>
    <title>Портал В.Казым</title>
</head>
<body>
<script src="assets/js/bootstrap.bundle.min.js"></script>

<?php include("components/header.php"); ?>

<div class="reg_form d-flex flex-row justify-content-center col-12">
    <form class="main-form d-flex flex-column align-items-center row-gap-4 align-self-baseline px-3" method="post" action="reg.php">
        <h1>Регистрация</h1>
        <div class="d-flex flex-column row-gap-2 col-12">
            <p for="formGroupExampleInput" class="form-label m-0">Введите имя учётной записи</p>
            <input name="login" type="text" value="<?= $login ?>" class="form-control px-3" id="formGroupExampleInput"
                   placeholder="Пример: aa.ivanov">
        </div>
        <div class="d-flex flex-column row-gap-2 col-12">
            <p class="form-label m-0">Выберите службу</p>
            <select class="form-select" name="service">
                <option value="-1" class="default-option" selected>Выберите свою службу</option>
                <?php foreach ($service as $services): ?>
                    <option value="<?= htmlspecialchars($services['id']); ?>">
                        <?= htmlspecialchars($services['service']); ?>
                    </option>
                <?php endforeach; ?>
                <div class="w100"></div>
            </select>
        </div>
        <div class="d-flex flex-column row-gap-2 col-12">
            <p for="exampleInputPassword1" class="form-label m-0">Придумайте пароль</p>
            <input type="password" name="first_password" class="form-control" id="exampleInputPassword1"
                   placeholder="Не менее 8-ми символов">
        </div>
        <div class="d-flex flex-column row-gap-2 col-12">
            <p for="exampleInputPassword2" class="form-label m-0">Повторите пароль</p>
            <input type="password" name="second_password" class="form-control" id="exampleInputPassword2"
                   placeholder="Пароли должны совпадать">
        </div>
        <div class="d-flex flex-row align-items-center column-gap-5">
            <button type="submit" name="button-reg" class="btn-login btn btn-primary rounded-3 py-1 px-3">Создать</button>
            <a class="reg-link m-0" href="<?php echo BASE_URL . 'log.php' ?>">Войти</a>
        </div>
    </form>
</div>

</body>
</html>
