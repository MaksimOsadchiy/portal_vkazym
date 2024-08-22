<!--<table class="table table-bordered mt-4">-->
<!--    <tr>-->
<!--        <th>Гос номер</th>-->
<!--        <th>Модель</th>-->
<!--        <th>Тип</th>-->
<!--    </tr>-->
<!--    --><?php
echo [123,123,123,123777];
//    include_once __DIR__ . '/../database/dbFunction.php';
//    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//        $join = [
//            'INNER JOIN type_of_technique ON technique.id_type_of_techniques = type_of_technique.id',
//        ];
//        $free_technique = selectAllJoinRes('technique', [], joins: $join);
//        if (!empty($free_technique)) {
//            // Вывод данных таблицы
//            foreach ($free_technique as $row) {
//                echo "<tr>";
//                echo "<td>{$row['state_number']}</td>";
//                echo "<td>{$row['name_technique']}</td>";
//                echo "<td>{$row['name']}</td>";
//                echo "</tr>";
//
//            }
//        } else {
//            echo "<tr><td colspan='100%'>No data found</td></tr>";
//        }
//    }
//
//    if ($_SERVER['REQUEST_METHOD'] === 'POST' & isset($_POST['id_technique'])) {
//        $join = [
//            'INNER JOIN type_of_technique ON technique.id_type_of_techniques = type_of_technique.id',
//        ];
//        $id = $_POST['id_technique'];
//        $params = ['id' => $id, 'faulty' => 0];
//        $free_technique = selectAllJoinRes('technique', $params, $join);
//        if (!empty($free_technique)) {
//            foreach ($free_technique as $row) {
//                echo "<tr>";
//                echo "<td>{$row['state_number']}</td>";
//                echo "<td>{$row['name_technique']}</td>";
//                echo "<td>{$row['name']}</td>";
//                echo "</tr>";
//            }
//        } else {
//            echo "<tr><td colspan='3'>No data found</td></tr>";
//        }
//    }
    ?>
