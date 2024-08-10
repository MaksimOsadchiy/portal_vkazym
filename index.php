<?php 
	include('path.php');
	$pageTitle = "Главная";
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
	<script>
		const NEW_SERVER_URL = <?php echo json_encode(NEW_SERVER_URL); ?>;
        const BASE_URL = <?php echo json_encode(BASE_URL); ?>;
	</script>
	<script defer type="module" src="<?=BASE_URL?>assets/js/headerMain/headerMain.js"></script>
	<title>Портал В-Казым</title>
</head>
<body>
	<?php include("components/header.php"); ?>
	<script src="<?=BASE_URL?>assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>