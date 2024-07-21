<?php 
	include('path.php');
	// session_start();
	$pageTitle = "Главная";
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
	<script>
        const NEW_SERVER_URL = <?php echo json_encode(NEW_SERVER_URL); ?>;
        const BASE_URL = <?php echo json_encode(BASE_URL); ?>;
    </script>
	<script defer type="module" src="assets/js/headerMian/headerMian.js"></script>
</head>
<body>
<script src="assets/js/bootstrap.bundle.min.js"></script>

<?php include("app/include/header.php"); ?>

<section>
    <div class="container-xl">
        <div class="d-grid gap-5 col-2 ">

        </div>
    </div>
</section>

</body>
</html>