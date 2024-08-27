<?php
    include ('path.php');
    include ('app/database/dbFunction.php');

    if (!isset($_SESSION['id'])) {
        header("Location:" . BASE_URL . "log.php");
        exit();
    };
    if (reset($_SESSION['accessibility'])['id_role'] != 2) {
        header("Location:" . BASE_URL);
        exit();
    };

    $pageTitle = "Администрирование";

    $all_links = selectAllRes('links');
    $all_modules = selectAllRes('portal_modules');
    $all_micro_modules = selectAllRes('microservices');
?>


<!doctype html>
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
<!--    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/admin/appsLinks.css">-->
    <script>
        let allLinks = <?=json_encode($all_links);?>;
        let all_modules = <?=json_encode($all_modules);?>;
        let all_micro_modules = <?=json_encode($all_micro_modules);?>;
        const SESSION = <?=json_encode($_SESSION);?>;
        const SERVER_URL = <?=json_encode(SERVER_URL);?>;
        const BASE_URL = <?=json_encode(BASE_URL);?>;
    </script>
    <script defer src="<?=BASE_URL?>assets/js/header/header.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/modalWindowNotif/modalWindowNotif.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/admin/links.js"></script>
    <title>Портал В.Казым</title>
</head>
<body>
	<?php include("components/header.php")?>
    <div class="container-xl">
        <h2>Сервисы на главной</h2>
        <div class="table-apps mb-3">
            <table class="table table-bordered mt-4">
                <thead><tr> </tr></thead>
                <tbody></tbody>
            </table>
            <button class="btn btn-outline-secondary btn-create">Создать</button>
        </div>
        <h2>Микросервисы</h2>
        <div class="table-microApps mb-3">
            <table class="table table-bordered mt-4">
                <thead><tr></tr></thead>
                <tbody></tbody>
            </table>
            <button class="btn btn-outline-secondary btn-create">Создать</button>
        </div>
        <h2>Полезные ссылки на главной</h2>
        <div class="table-links mb-3">
            <table class="table table-bordered mt-4">
                <thead><tr></tr></thead>
                <tbody></tbody>
            </table>
            <button class="btn btn-outline-secondary btn-create">Создать</button>
        </div>
    </div>
    <?php require("components/modalWindowNotif.php"); ?>
	<script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>