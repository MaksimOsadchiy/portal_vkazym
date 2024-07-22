<?php 

    include('path.php');
    session_start();
    $pageTitle = "ОТВЕТЫ";
    $menuItems = [
        ['url' => BASE_URL, 'label' => 'Главная'],
        ['url' => BASE_URL . 'about.php', 'label' => 'Справочники'],
        ['url' => BASE_URL . 'lkri.php', 'label' => 'График'],
    ];
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="<?php echo BASE_URL ?>assets/css/normalize.css">
    <link rel="stylesheet" type="text/css" href="<?php echo BASE_URL ?>assets/css/mainStyles.css">
    <link rel="stylesheet" type="text/css" href="<?php echo BASE_URL ?>assets/css/responseAppForm/responseAppForm.css">

    <link rel="stylesheet" type="text/css" href="<?php echo BASE_URL ?>assets/css/responseAppForm/adminAppForm.css">
    <link rel="stylesheet" type="text/css" href="<?php echo BASE_URL ?>assets/css/responseAppForm/adminTable.css">
    <link rel="stylesheet" type="text/css" href="<?php echo BASE_URL ?>assets/css/modalWindowNotif/modalWindowNotif.css">

    <link rel="stylesheet" href="assets/css/style.css">

    <script>
        const SERVER_URL = <?php echo json_encode(SERVER_URL); ?>;
    </script>
    <script defer src="<?php echo BASE_URL ?>assets/js/responseAppForm/responseAppForm.js"></script>
    <script defer src="<?php echo BASE_URL ?>assets/js/modalWindowNotif/modalWindowNotif.js"></script>

    <title>Ответы</title>
</head>
<body>
    <script src="assets/js/bootstrap.bundle.min.js"></script>

    <?php include("app/include/header.php"); ?>

    <section>
        <div class="container-xl">
            <div class="d-flex gap-5 col-12 justify-content-center">
                <div class="col-11 d-flex flex-column align-items-center mt-3 mb-3">
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
                                    <div class="response d-flex flex-row column-gap-4 pt-2 mt-5">
                                        <h3 class="col-3 text-end">Ответить:</h3>
                                        <textarea name="response" class="textRes col-8 p-2"></textarea>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-secondary res-btn" name="res-btn" data-bs-toggle="modal">Отправить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php include("components/modalWindowNotif.php") ?>
            </div>
        </div>
    </section>

</body>
</html>