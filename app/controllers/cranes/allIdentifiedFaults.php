<?php

include_once("../../database/dbFunction.php");

if (isset($_SESSION['id'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $table = 'identified_faults';
        $params = ['status' => 0];
        $response = selectAllRes($table, $params);

        $result = [];
        foreach ($response as $obj) {
            $id = $obj['id_fitting'];

            // Если ключа с id_fitting еще нет, создаем новый массив
            if (!isset($result[$id])) {
                $result[$id] = [];
            }

            // Добавляем текущий объект в массив по соответствующему ключу
            $result[$id][] = $obj;
        }

        echo json_encode($result);
        return;

    } else {
        http_response_code(405);
        echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
        return;

    };
} else {
    http_response_code(401);
    echo json_encode(['status' => 'Вы неавторизованы!']);
    return;

};

?>
