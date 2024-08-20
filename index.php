<?php
include('path.php');
include ('app/database/dbFunction.php');

$pageTitle = "Главная";
$menuItems = [];
$all_links = selectAllRes('links');
$privilege = $_SESSION['privilege'];
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
    <link rel="stylesheet" href="assets/css/index/index.css">
    <script>let allLinks = <?php echo json_encode($all_links); ?>;</script>
    <script>let privilege = <?php echo json_encode($privilege); ?>;</script>
    <title>Портал В.Казым</title>
</head>
<body>
<script src="assets/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/main/apps_links.js"></script>
<?php include("app/include/header.php"); ?>

</body>
</html>