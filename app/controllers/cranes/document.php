<?php

include_once("../../database/dbFunction.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $id = $_GET['id'];
    $table = 'document_cranes';
    $params = ['id_fitting' => $id];
    $response = selectAllRes($table, $params);
    echo json_encode($response);
    return;

} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_GET['id'];
    $table = 'document_cranes';
    $temp = explode(', ', $_POST['crane_class']);
    $craneClass = "{$temp[0]}_{$temp[1]}";
    $highway = $_POST['name_highways'];
    $location = $_POST['location_crane'];
    $number = $_POST['technical_number'];
    $targetDir = "../../assets/crane_data/{$highway}/{$craneClass}_{$location}_{$number}/documents/";
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    };
    $fileName = basename($_FILES['image']['name']);
    $targetFilePath = $targetDir . $fileName;

    if (file_exists($targetFilePath)) {
        http_response_code(400);
        echo json_encode(['status' => 'Файл с таким именем уже существует!']);
    } else if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
        $str = "http://localhost/portal_vkazym/app/assets/crane_data/{$highway}/{$craneClass}_{$location}_{$number}/documents/{$fileName}";
        $params = [
            'document_url' => $str,
            'id_fitting' => $id,
            'name' => $fileName,
        ];
        $response = insertRes($table, $params);
        $params['id'] = $response;
        echo json_encode($params);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'ОШИБКА!']);
    };
    return;

} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    if (array_values(array_filter($_SESSION['accessibility'], fn($obj) => $obj['name'] === 'cranes'))[0]['privilege'] === 3) {
        $id = $_GET['id'];
        $table = 'document_cranes';
        $params = ['id' => $id];
        $response = selectOneRes($table, $params);
        $str = explode('crane_data/', $response['document_url'])[1];
        $filePath = '../../assets/crane_data/' . $str;
        if (file_exists($filePath)) {
            unlink($filePath);
        };
        $response = deleteRes($table, $id);
        echo json_encode($response);
    } else {
        http_response_code(403);
        echo json_encode(['status' => 'Вы не можите выполнять данный запрос!']);
    };
    return;

} else {
    http_response_code(405);
    echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
    return;

};

