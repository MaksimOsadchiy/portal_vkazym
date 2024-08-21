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
?>
<script>let allLinks = <?php echo json_encode($all_links); ?>;</script>
<script>let all_modules = <?php echo json_encode($all_modules); ?>;</script>
<script>let SESSION = <?php echo json_encode($_SESSION); ?>;</script>
<script>let SERVER_URL = <?php echo json_encode(SERVER_URL); ?>;</script>
<script>let BASE_URL = <?php echo json_encode(BASE_URL); ?>;</script>
<!doctype html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
<!--    <link rel="stylesheet" href="assets/css/admin/appsLinks.css">-->
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/header/header.css">
    <link rel="stylesheet" href="assets/css/modalWindowNotif/modalWindowNotif.css">
    <script defer src="assets/js/modalWindowNotif/modalWindowNotif.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/header/header.js"></script>
    <script defer src="<?php echo BASE_URL ?>assets/js/admin/links.js"></script>
    <title>Портал В.Казым</title>
</head>
<body>
	<?php include("components/header.php")?>
    <div class="container-xl">
        <h2>Главная Приложения</h2>
        <div class="table-apps mb-3">
            <table class="table table-bordered mt-4">
                <thead>
                <tr>
                    <th>класс цвета</th>
                    <th>адрес</th>
                    <th>Название</th>
                    <th>Редактировать</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <h2>Главная Ссылки</h2>
        <div class="table-links mb-3">
            <table class="table table-bordered mt-4">
                <thead>
                <tr>
                    <th>класс цвета</th>
                    <th>адрес</th>
                    <th>Название</th>
                    <th>Редактировать</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
    <?php require("components/modalWindowNotif.php"); ?>
	<script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>