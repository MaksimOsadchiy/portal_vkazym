<?php

include_once("../../database/dbFunction.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $response = selectAllCranes();
    $result = [];
    foreach ($response as $item) {
        $key = $item['unification_crane'];

        if (!isset($result[$key])) {
            $result[$key] = [];
        };

        $result[$key][] = $item;
    };
    echo json_encode($result);
    return;

} else if ($_SERVER['REQUEST_METHOD'] === 'PUT'){
    $requestBody = file_get_contents('php://input');
    $data = json_decode($requestBody, true);
    $id = $_GET['id'];
    $table = 'malfunctions';

    $response = updateRes($table, $id, $data);
    echo json_encode($response);
    return;

} else {
    http_response_code(405);
    echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
    return;

};

?>