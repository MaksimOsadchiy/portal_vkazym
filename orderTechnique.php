<?php
    session_start();
    include('path.php');

    if (!isset($_SESSION['id'])) {
        header("Location:" . BASE_URL . "log.php");
        exit();
    };

    $filtered = array_filter($_SESSION['accessibility'], function($item) {
        return $item['name'] === "technique";
    });

    if (reset($filtered)['privilege'] < 2) {
        header("Location:" . BASE_URL);
        exit();
    };

    $pageTitle = "Мои заказы";
    $menuItems = [];

?>

<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/normalize.css">
    <link rel="stylesheet" href="assets/css/mainStyles.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/modules/modules.css">
    <link rel="stylesheet" href="assets/css/orderTechnique/orderTechnique.css">
    <script>
        const SESSION = <?php echo json_encode($_SESSION); ?>;
        const BASE_URL = <?php echo json_encode(BASE_URL); ?>;
        const SERVER_URL = <?php echo json_encode(SERVER_URL); ?>;
    </script>
    <script src="<?php echo BASE_URL ?>assets/js/checkauth.js"></script>
    <script defer src="<?php echo BASE_URL ?>assets/js/orderTechnique/orderTechnique.js"></script>
    <script defer src="<?php echo BASE_URL ?>assets/js/modules/modules.js"></script>
</head>
<body>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
    <?php include("app/include/header.php"); ?>
    <section>
        <?php include("components/modules.php");?>
        <div class="table-container d-flex flex-column align-items-center pt-3">
            <select class="form-select choice" aria-label="Default select example">
                <option value="0" selected>Заявки на рассмотрении</option>
                <option value="1">Подтверждённые заявки</option>
                <option value="2">Отклонённые заявки</option>
            </select>
            <table class="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th class="col-1">Дата</th>
                        <th class="col-1">Время</th>
                        <th class="col-2">Техника</th>
                        <th class="col-1">Маршрут</th>
                        <th class="col-2">Вид работ</th>
                        <th class="col-2">Примечания</th>
                        <th class="col-1">Ответственный</th>
                        <th class="col-1">Дата создания</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </section>
</body>
</html>
