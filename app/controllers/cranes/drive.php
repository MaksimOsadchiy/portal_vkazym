<?php


include_once("../../database/dbFunction.php");

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if ($_SESSION['privilege'] === 7) {
        $requestBody = file_get_contents('php://input');
        $data = json_decode($requestBody, true);
        $table = 'drives';
        $id = $_GET['id'];
        $params = [];
        if (isset($data['type_drive'])) {
            $params['type_drive'] = $data['type_drive'];
        };
        if (isset($data['drive_company'])) {
            $params['company'] = $data['drive_company'];
        }
        if (isset($data['liquid'])) {
            $params['liquid'] = $data['liquid'];
        }
        if (isset($data['drive_factory_number'])) {
            $params['factory_number'] = $data['drive_factory_number'];
        }
        if (isset($data['drive_year_commission'])) {
            $params['year_commission'] = $data['drive_year_commission'];
        }

        $response = updateRes($table, $id, $params);
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

