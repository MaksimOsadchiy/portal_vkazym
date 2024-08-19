<?php 

    include('path.php');
    session_start();
    $pageTitle = "Главная";
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
    <title>Портал В.Казым</title><script>
        const SESSION = <?php echo json_encode($_SESSION); ?>;
        const BASE_URL = <?php echo json_encode(BASE_URL); ?>;
    </script>
    <script src="<?=BASE_URL?>assets/js/header/header.js" />
</head>
<body>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
    <?php include("components/header.php"); ?>
    <div></div>
</body>
</html>