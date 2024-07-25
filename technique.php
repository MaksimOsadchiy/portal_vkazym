<?php
include_once 'app/database/dbFunction.php';
include('path.php');
include 'app/controllers/technique_back.php';
$pageTitle = "Заказ техники";
$menuItems = [
    ['url' => BASE_URL . 'appsForm.php', 'label' => 'Заявки'],
    ['url' => BASE_URL . 'about.php', 'label' => 'Справочники'],
    ['url' => BASE_URL . 'lkri.php', 'label' => 'График'],
];
$join = [
    'INNER JOIN type_of_technique ON technique.id_type_of_techniques = type_of_technique.id',
];
$all_technique = selectAllJoinRes('technique', [], $join);

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
</head>
<body>
<script src="assets/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/jquery-3.7.1.min.js"></script>
<script src="assets/js/technique/freeTechniqueFilter.js"></script>
<script>
    let allTechnique = <?php echo json_encode($all_technique); ?>;
</script>
<script>
    $(document).ready(function () {
        // Отслеживание изменения значения в select
        $('#technique-select').on('change', function () {
            var techniqueId = $(this).val(); // Получение выбранного значения
            $.ajax({
                url: 'app/controllers/technique_filter.php', // URL для отправки AJAX запроса
                type: 'POST', // Метод запроса
                data: {id_technique: techniqueId}, // Данные, отправляемые на сервер
                success: function (response) {
                    $('#technique-table').html(response); // Обновление таблицы данными из ответа
                }
            });
        });
    });
</script>
 <?php include("app/include/header.php"); ?>

<section>
    <div class="container-xl">
        <div class="d-grid gap-5 col-2 ">
            <a href="<?php echo BASE_URL . 'Add_technique.php'; ?>" class="btn btn-outline-success mt-4" role="button">Заказать
                технику</a>
        </div>
    </div>
</section>
<div class="container-xl container-technique">
    <h2>Свободная техника</h2>
    <div class="form-row mb-3">
        <div class="row">
            <div class="col">
                <label for="timeFrom">Время с</label>
                <input type="time" class="form-control" id="timeFrom">
            </div>
            <div class="col">
                <label for="timeTo">Время по</label>
                <input type="time" class="form-control" id="timeTo">
            </div>
        </div>
    </div>
    <div class="row">

        <div class="col">
            <label for="route">Техника</label>
            <select class="form-select" id=technique-select>
                <?php foreach ($all_technique as $value): ?>
                    <option value="<?= htmlspecialchars($value['id']); ?>">
                        <?= htmlspecialchars($value['name']); ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="col">
            <div class="col">
                <label for="dateFrom">Дата</label>
                <input type="date" class="form-control" id="dateFrom">
            </div>
        </div>
        <div class="technique-table">
            <table class="table table-bordered mt-4">
                <thead>
                <tr>
                    <th>Гос номер</th>
                    <th>Модель</th>
                    <th>Тип</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
            <?php// include 'app/controllers/technique_filter.php'; ?>
        </div>
    </div>
</div>


</body>
</html>