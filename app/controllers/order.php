<?php

include("../database/dbFunction.php");

if (isset($_SESSION['id'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $requestBody = file_get_contents('php://input');
        $data = json_decode($requestBody, true);
        $table = 'technique_order';
        $id = $_GET['id'];
        $response = updateRes($table, $id, $data);
        echo json_encode($response);
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