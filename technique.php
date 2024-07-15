<?php include('path.php');
    include 'app/database/db_main.php';
    include 'app/controllers/technique_back.php';
$pageTitle = "Заказ техники";
$menuItems = [
    ['url' => BASE_URL . '123.php', 'label' => 'Статус заявки'],
    ['url' => BASE_URL . 'about.php', 'label' => 'Справочники'],
    ['url' => BASE_URL . 'lkri.php', 'label' => 'График'],
];
$join =[
    'INNER JOIN type_of_technique ON technique.id_type_of_techniques = type_of_technique.id',
];
$free_technique = selectALL_join('technique',[],joins: $join);

?>

<!doctype html>
<html lang="en">

  <head>
    <title>Заказ техники</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
  </head>
  <body>
    <script src="assets/js/bootstrap.bundle.min.js"></script>

<?php include("app/include/header.php"); ?>

<section>
  <div class="container-xl">
     <div class="d-grid gap-5 col-2 ">
         <a href="<?php echo BASE_URL . 'Add_technique.php'; ?>" class="btn btn-outline-success mt-4" role="button">Заказать технику</a>
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
            <select class="form-select">

            </select>
        </div>
        <div class="col">
            <div class="col">
                <label for="dateFrom">Дата</label>
                <input type="date" class="form-control" id="dateFrom">
            </div>
        </div>

        <table class="table table-bordered">
            <tr>
                <th>Гос номер</th>
                <th>Модель</th>
                <th>Тип</th>
            </tr>
            <?php
            if (!empty($free_technique)) {
                // Вывод данных таблицы
                foreach ($free_technique as $row) {
                    echo "<tr>";
                    foreach ($row as $value) {
                        echo "<td>$value</td>";
                    }
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='100%'>No data found</td></tr>";
            }
            ?>

        </table>
    </div>
    </div>




  </body>
</html>