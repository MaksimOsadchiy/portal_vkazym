<?php
    include('path.php');
    include 'app/database/dbFunction.php';

    $pageTitle = "Заказ техники";
    $menuItems = [
        ['url' => BASE_URL . 'appsForm.php', 'label' => 'Заявки'],
        ['url' => BASE_URL . 'about.php', 'label' => 'Справочники'],
        ['url' => BASE_URL . 'lkri.php', 'label' => 'График'],
    ];

    $techniques = selectALLRes('technique');
    $params = ['service_id' => $_SESSION['service']];
    $responsible_persons = selectALLRes('responsible_person', $params);
    $current_service = $_SESSION['service'];
    $serviceFullName = selectOneRes('services', ['id' => $current_service]);
    $routes = selectALLRes('route', params: ['service_id' => $current_service]);

?>

<!doctype html>
<html lang="ru">

<head>
    <title>Заказ техники</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/normalize.css">
    <link rel="stylesheet" href="assets/css/mainStyles.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/addTechnique/addTechnique.css">
    <link rel="stylesheet" href="assets/css/modalWindowNotif/modalWindowNotif.css">
    <script defer src="assets/js/addTechnique/modalWindowRoutes.js"></script>
    <script defer src="assets/js/addTechnique/modalWindowResponsiblePersons.js"></script>
    <script defer src="assets/js/addTechnique/placeOrder.js"></script>
    <script>
        let routes = <?php echo json_encode($routes); ?>;
        let responsiblePersons = <?php echo json_encode($responsible_persons); ?>;
        const SERVER_URL = <?php echo json_encode(SERVER_URL); ?>;
        const SESSION = <?php echo json_encode($_SESSION); ?>;
        const serviceFullName = <?php echo json_encode($serviceFullName); ?>
    </script>
    <script defer src="assets/js/modalWindowNotif/modalWindowNotif.js"></script>
</head>
<body>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
    <?php include("app/include/header.php"); ?>

    <div class="container-xl container-teqnique">
        <h2>Форма заказа автотранспорта</h2>
        <div>
            <div class="form-row mb-3">
                <div class="row">
                    <div class="col">
                        <label for="dateFrom">Дата с</label>
                        <input type="date" class="form-control date-from" id="dateFrom">
                    </div>
                    <div class="col">
                        <label for="dateTo">Дата по</label>
                        <input type="date" class="form-control date-to" id="dateTo">
                    </div>
                </div>
            </div>
            <div class="form-row mb-3">
                <div class="row">
                    <div class="col">
                        <label for="timeFrom">Время с</label>
                        <input type="time" class="form-control time-from" id="timeFrom">
                    </div>
                    <div class="col">
                        <label for="timeTo">Время по</label>
                        <input type="time" class="form-control time-to" id="timeTo">
                    </div>
                </div>
            </div>
            <div class="form-row mb-3">
                <div class="row">
                    <div class="col">
                        <label for="route">Маршрут</label>
                        <select class="form-select route-select">
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
                            <input class="form-check-input" type="radio" name="shift" id="shift2" value="20:00-08:00">
                            <label class="form-check-label" for="shift2">20:00-08:00</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group mb-4">
                <button type="button" class="btn btn-primary btn-open-modal-window-services" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Справочник маршрутов
                </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Справочник маршрутов</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body d-flex flex-column align-items-center">
                                <div class="table-users mb-3">
                                    <div class="tb-header">Маршруты</div>
                                    <table class="table" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th class="col-2 text-center">Коды направления</th>
                                                <th class="col-2 text-center">Служба</th>
                                                <th class="col-2 text-center">Управление</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <button type="button" class="btn btn-primary add-entry">Добавить запись</button>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btnСlose" data-bs-dismiss="modal">Закрыть</button>
                                <!-- <button type="button" class="btn btn-primary">Сохранить изменения</button> -->
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-secondary btn-open-modal-window-persons" data-bs-toggle="modal" data-bs-target="#exampleModal2">Справочник ответственных</button>
                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Справочник ответственных</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body d-flex flex-column align-items-center">
                                <div class="table-persons mb-3">
                                    <div class="tb-header">Справочник</div>
                                    <table class="table" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th class="col-2 text-center">Фамилия</th>
                                                <th class="col-2 text-center">Имя</th>
                                                <th class="col-2 text-center">Отчество</th>
                                                <th class="col-2 text-center">Служба</th>
                                                <th class="col-2 text-center">Телефон</th>
                                                <th class="col-2 text-center">Управление</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <button type="button" class="btn btn-primary add-person">Добавить</button>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btnСlose" data-bs-dismiss="modal">Закрыть</button>
                                <!-- <button type="button" class="btn btn-primary">Сохранить изменения</button> -->
                            </div>
                        </div>
                    </div>
                </div>
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
                            <select class="form-select technique-select">
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
                            <select class="form-select person-select"></select>
                        </td>
                        <td><input type="text" class="form-control"></td>
                    </tr>
                <?php endfor; ?>
                </tbody>
            </table>
            <button name="order_technique" class="btn btn-primary create-order">Добавить запись</button>
        </div>
    </div>
    <?php include("components/modalWindowNotif.php"); ?>
</body>
</html>
