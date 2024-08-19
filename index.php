<?php 

    include('path.php');
    session_start();

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
    <link rel="stylesheet" href="assets/css/index/index.css">
    <script>
        const SESSION = <?php echo json_encode($_SESSION); ?>;
        const BASE_URL = <?php echo json_encode(BASE_URL); ?>;
    </script>
    <script defer src="<?=BASE_URL?>assets/js/header/header.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/index/index.js"></script>
    <title>Портал В.Казым</title>
</head>
<body>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
    <?php include("components/header.php"); ?>
    <div class="main-container d-flex flex-row col-12">
        <div class="future"></div>
        <div class="main-container__content d-flex flex-column row-gap-3 col-12 py-3">
            <div class="main-container__breadcrumb rounded-3"><p>/</p></div>
            <nav class="main-container__nav">
                <ul class="list d-flex flex-row flex-wrap gap-3 col-12"></ul>
            </nav>
        </div>
    </div>
</body>
</html>