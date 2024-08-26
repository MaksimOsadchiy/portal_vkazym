<?php

include_once("../database/dbFunction.php");

if (isset($_SESSION['id'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $table = 'microservices';
        $response = selectAllRes($table);
        echo json_encode($response);
        return;

    } else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $requestBody = file_get_contents('php://input');
        $data = json_decode($requestBody, true);
        $id = $data['id'];
        $table = 'microservices';
        $response = updateRes($table, $id, $data);
        echo json_encode(['id' => $response]);
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

}
?>
