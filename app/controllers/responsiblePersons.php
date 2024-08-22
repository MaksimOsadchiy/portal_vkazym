<?php

include '../database/dbFunction.php';

if (isset($_SESSION['id'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $requestBody = file_get_contents('php://input');
        $data = json_decode($requestBody, true);
        $table = 'responsible_person';
        $params = [
            'firstname' => $data['firstname'],
            'patronymic' => $data['patronymic'],
            'lastname' => $data['lastname'],
            'service_id' => $data['service_id'],
            'phone_number' => $data['phone_number'],
        ];
        $response = insertRes($table, $params);
        echo json_encode(['id' => $response]);
        return;

    } else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $requestBody = file_get_contents('php://input');
        $data = json_decode($requestBody, true);
        $id = $data['id'];
        $table = 'responsible_person';
        $params = [
            'firstname' => $data['firstname'],
            'patronymic' => $data['patronymic'],
            'lastname' => $data['lastname'],
            'service_id' => $data['service_id'],
            'phone_number' => $data['phone_number'],
        ];
        $response = updateRes($table, $id, $params);
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