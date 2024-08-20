<?php

include '../database/dbFunction.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestBody = file_get_contents('php://input');
    $data = json_decode($requestBody, true);
    $table = 'links';
    $params = [
        'color' => $data['color'],
        'link' => $data['link'],
        'text' => $data['text'],
        'id' => $data['id'],
    ];
    $response = insertRes($table, $params);
    echo json_encode(['id' => $response]);
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $requestBody = file_get_contents('php://input');
    $data = json_decode($requestBody, true);
    customPrint($data);
    $id = $data['id'];
    $table = 'links';
    $params = [
        'color' => $data['color'],
        'link' => $data['link'],
        'text' => $data['text'],
        'type' => 1,
    ];
    $response = updateRes($table, $id, $params);
    echo json_encode(['id' => $response]);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
    return;
}

?>
