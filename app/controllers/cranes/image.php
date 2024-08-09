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
    $id = $_GET['id'];
    $table = 'photo_cranes';
    $date= date('Y-m-d\THis');
    $temp = explode(', ', $_POST['crane_class']);
    $craneClass = "{$temp[0]}_{$temp[1]}";
    $highway = $_POST['name_highways'];
    $location = $_POST['location_crane'];
    $number = $_POST['technical_number'];
    $targetDir = "../../assets/crane_data/{$highway}/{$craneClass}_{$location}_{$number}/img/";
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    };
    $fileName = basename($_FILES['image']['name']);
    $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    $newFileName = "crane_img_{$id}_{$date}.{$fileType}";
    $targetFilePath = $targetDir . $newFileName;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
        $str = "http://localhost/portal_vkazym/app/assets/crane_data/{$highway}/{$craneClass}_{$location}_{$number}/img/{$newFileName}";
        $params = [
            'photo_url' => $str,
            'id_fitting' => $id,
            'name' => $fileName,
        ];
        $response = insertRes($table, $params);
        echo json_encode($params);
    };
    return;

} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    $name = $_GET['name'];
    $table = 'photo_cranes';
    $params = [
        'id_fitting' => $id,
        'name' => $name,
    ];
    $response = selectOneRes($table, $params);
    $str = explode('crane_data/', $response['photo_url'])[1];
    $filePath = '../../assets/crane_data/' . $str;
    if (file_exists($filePath)) {
        unlink($filePath);
    };
    $response = deletePhotoRes($table, $params);
    echo json_encode($response);
    return;
} else {
    http_response_code(405);
    echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
    return;

};

