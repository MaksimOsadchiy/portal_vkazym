<?php

include '../database/dbFunction.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestBody = file_get_contents('php://input');
    $data = json_decode($requestBody, true);
    $table = 'portal_modules';
    $response = insertRes($table, $data);
    echo json_encode(['id' => $response]);
    return;

} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $requestBody = file_get_contents('php://input');
    $data = json_decode($requestBody, true);
    $id = $data['id'];
    $table = 'portal_modules';
    $response = updateRes($table, $id, $data);
    echo json_encode(['id' => $response]);
    return;

} else {
    http_response_code(405);
    echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
    return;
}

?>
