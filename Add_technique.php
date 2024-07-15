<?php include('path.php');
include 'app/database/db.php';
session_start();
$pageTitle = "Заказ техники";
$menuItems = [
    ['url' => BASE_URL . '123.php', 'label' => 'Статус заявки'],
    ['url' => BASE_URL . 'about.php', 'label' => 'Справочники'],
    ['url' => BASE_URL . 'lkri.php', 'label' => 'График'],
];
?>

<!doctype html>
<html lang="en">

<head>
    <title>Заказ техники</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">

</head>
<body>
<script src="assets/js/bootstrap.bundle.min.js"></script>
<?php
$techniques = selectALL('technique');
$responsible_persons = selectALL('responsible_person');
$current_service = $_SESSION['service'];
$routes = selectALL('route', params: ['service_id' => $current_service]);

?>
<?php include("app/include/header.php"); ?>

<div class="container-xl container-teqnique">
    <h2>Форма заказа автотранспорта</h2>
    <form>
        <div class="form-row mb-3">
            <div class="row">
                <div class="col">
                    <label for="dateFrom">Дата с</label>
                    <input type="date" class="form-control" id="dateFrom">
                </div>
                <div class="col">
                    <label for="dateTo">Дата по</label>
                    <input type="date" class="form-control" id="dateTo">
                </div>
            </div>
        </div>
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
        <div class="form-row mb-3">
            <div class="row">
                <div class="col">
                    <label for="route">Маршрут</label>
                    <select class="form-select">
                        <option value="" class="default-option"></option>
                        <?php foreach ($routes as $route): ?>
                            <option value="<?= htmlspecialchars($route['id']); ?>">
                                <?= htmlspecialchars($route['route_to']); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="col">
                    <label>Смена</label><br>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="shift" id="shift1" value="08:00-20:00">
                        <label class="form-check-label" for="shift1">08:00-20:00</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input, mt-3" type="radio" name="shift" id="shift2" value="20:00-08:00">
                        <label class="form-check-label" for="shift2">20:00-08:00</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group mb-4">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Справочник маршрутов
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Заголовок модального окна</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <!-- Ваше содержимое здесь -->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            <button type="button" class="btn btn-primary">Сохранить изменения</button>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-secondary">Справочник ответственных</button>
        </div>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Техника</th>
                <th>Вид работ</th>
                <th>Ответственный</th>
                <th>Примечание</th>
            </tr>
            </thead>
            <tbody>
            <?php for ($i = 0; $i < 5; $i++): ?>
                <tr>
                    <td>
                        <select class="form-select">
                            <option value="" class="default-option"></option>
                            <?php foreach ($techniques as $technique): ?>
                                <option value="<?= htmlspecialchars($technique['id_technique']); ?>">
                                    <?= htmlspecialchars($technique['name_technique']); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </td>
                    <td><input type="text" class="form-control"></td>
                    <td>
                        <select class="form-select">
                            <option value="" class="default-option"></option>
                            <?php foreach ($responsible_persons as $responsible_person): ?>
                                <option value="<?= $responsible_person['id'] !== null ? htmlspecialchars($responsible_person['id']) : ''; ?>">
                                    <?= htmlspecialchars($responsible_person['last_name']); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </td>
                    <td><input type="text" class="form-control"></td>
                </tr>
            <?php endfor; ?>
            </tbody>
        </table>
        <button type="submit" name="order_technique" class="btn btn-primary">Добавить запись</button>
    </form>
</div>
</body>
</html>
