<?php

include_once("../../database/dbFunction.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'];
    $response = getAllMaintenance($id);
    echo json_encode($response);
    return;

} else if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $requestBody = file_get_contents('php://input');
    $data = json_decode($requestBody, true);
    $id = $_GET['id'];
    $table = 'maintenance';
    $params = [
        'id_fitting' => $id,
        'type_maintenance' => $data['typeWork'],
        'content_work' => $data['contentWork'],
        'result' => $data['result'],
        'id_user' => $data['userId'],
    ];
    $response = insertRes($table, $params);
    echo json_encode($response);
    return;

} else {
    http_response_code(405);
    echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
    return;

};

