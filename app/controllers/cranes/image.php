<?php

include_once("../../database/dbFunction.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $id = $_GET['id'];
    $table = 'photo_cranes';
    $params = ['id_fitting' => $id];
    $response = selectAllRes($table, $params);
    echo json_encode($response);
    return;

} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestBody = file_get_contents('php://input');
    $data = json_decode($requestBody, true);
    $id = $_GET['id'];
    $table = 'photo_cranes';
    $number = date('Y-m-d\THis');
    $targetDir = "../../assets/img/";
    $fileName = basename($_FILES['image']['name']);
    $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $newFileName = "crane_{$id}_{$number}.{$fileType}";
    $targetFilePath = $targetDir . $newFileName;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
        $str = "http://localhost/portal_vkazym/app/assets/img/{$newFileName}";
        $params = [
            'photo_url' => $str,
            'id_fitting' => $id,
        ];
        $response = insertRes($table, $params);
        echo json_encode($response);
    };
    return;

} else {
    http_response_code(405);
    echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
    return;

};

