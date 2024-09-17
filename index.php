<?php
	include('path.php');
	include ('app/database/dbFunction.php');

	if (!isset($_SESSION['id'])) {
		header("Location:" . BASE_URL . "log.php");
		exit();
	};
	$pageTitle = "Главная";
	$all_links = selectAllRes('links');
	$all_modules = selectAllRes('portal_modules');
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
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/index/index.css">
    <script>
		let allLinks = <?=json_encode($all_links)?>;
		let all_modules = <?=json_encode($all_modules)?>;
		const SESSION = <?=json_encode($_SESSION)?>;
		const SERVER_URL = <?=json_encode(SERVER_URL)?>;
		const BASE_URL = <?=json_encode(BASE_URL)?>;
	</script>
    <script defer src="<?=BASE_URL?>assets/js/modalWindowNotif/modalWindowNotif.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/header/header.js"></script>
	<script defer src="<?=BASE_URL?>assets/js/main/apps_links.js"></script>
    <title>Портал В.Казым</title>
</head>
<body>
	<?php include("components/header.php")?>
	<?php require("components/modalWindowNotif.php")?>
	<script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>