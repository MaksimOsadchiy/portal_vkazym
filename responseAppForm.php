<?php 
    session_start();
    include('path.php');

    if (!isset($_SESSION['id'])) {
        header("Location:" . BASE_URL . "log.php");
        exit();
    };
    if ($_SESSION['accessibility'][0]['id_role'] !== 2) {
        $filtered = array_filter($_SESSION['accessibility'], function($item) {
            return $item['name'] === "applications";
        });
        if (reset($filtered)['privilege'] < 3) {
            header("Location:" . BASE_URL);
            exit();
        };
    };

    $pageTitle = "ОТВЕТЫ";
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
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/modules/modules.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/responseAppForm/adminTable.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/responseAppForm/adminAppForm.css">
    <link rel="stylesheet" href="<?=BASE_URL?>assets/css/responseAppForm/responseAppForm.css">
    <script>
        const SERVER_URL = <?=json_encode(SERVER_URL)?>;
        const SESSION = <?=json_encode($_SESSION)?>;
        const BASE_URL = <?=json_encode(BASE_URL)?>;
    </script>
    <script defer src="<?=BASE_URL?>assets/js/modalWindowNotif/modalWindowNotif.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/header/header.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/modules/modules.js"></script>
    <script defer src="<?=BASE_URL?>assets/js/responseAppForm/responseAppForm.js"></script>
    <title>Портал В.Казым</title>
</head>
<body>
	<?php include("components/header.php"); ?>
    <section>
        <?php include("components/modules.php");?>
        <div class="container-xl">
            <div class="d-flex gap-5 col-12 justify-content-center">
                <div class="col-12 d-flex flex-column align-items-center mt-3 mb-3">
                    <div class="table-users">
                        <div class="tb-header">Заявки</div>
                        <div class="table" cellspacing="0">
                            <div class="tb-title"></div>
                            <div class='tbody'></div>
                        </div>
                    </div>
                    <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h2 class="modal-title fs-5" id="exampleModalToggleLabel"></h2>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body d-flex flex-column row-gap-3">
                                    <div class="d-flex flex-row align-items-center column-gap-4">
                                        <input class="modal-body-id" name='id'/>
                                        <h3 class="col-3 text-end">Тема:</h3>
                                        <p class="modal-body-title fs-4 col-3"></p>
                                        <h3 class="col-2 text-end">Номер:</h3>
                                        <p class="modal-body-phone fs-5 col-2"></p>
                                    </div>
                                    <div class="d-flex flex-row column-gap-4">
                                        <h3 class="col-3 text-end">Содержание:</h3>
                                        <p class="modal-body-content col-8 px-3 pb-2 pt-1"></p>
                                    </div>
                                    <div class="response d-flex flex-row column-gap-4 pt-2 mt-5 align-items-start">
                                        <h3 class="col-3 text-end">Комментарий:</h3>
                                        <textarea name="response" class="textRes col-5 p-2"></textarea>
                                        <select class="form-select col-3">
                                            <option value="0" select disabled>Статус</option>
                                            <option value="1">В работе</option>
                                            <option value="2">Выполнена</option>
                                            <option value="3">Отклонена</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-secondary res-btn" name="res-btn" data-bs-toggle="modal" disabled>Отправить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
	<?php include("components/modalWindowNotif.php") ?>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>