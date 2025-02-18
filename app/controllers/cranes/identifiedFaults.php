<?php

include_once("../../database/dbFunction.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'];
    $response = getAllIdentifiedFaults($id);
    echo json_encode($response);
    return;

} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestBody = file_get_contents('php://input');
    $data = json_decode($requestBody, true);
    $id = $_GET['id'];
    $table = 'identified_faults';
    $params = [
        'id_fitting' => $id,
        'possible_cause' => $data['possibleCause'],
        'id_user_detection' => $data['userDetectionId'],
        'date_detection' => $data['dateDetection'],
        'status' => $data['status'],
    ];
    if ($data['status'] === 1) {
        $params['complete_activities'] = $data['completeActivities'];
        $params['date_troubleshooting'] = $data['dateTroubleshooting'];
        $params['id_user_troubleshooting'] = $data['userDetectionId'];
        if (isset($data['note'])){
            $params['note'] = $data['note'];
        };
    };
    $response = insertRes($table, $params);
    echo json_encode($response);
    return;

} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if ($_SESSION['privilege'] === 7) {
        $requestBody = file_get_contents('php://input');
        $data = json_decode($requestBody, true);
        $table = 'identified_faults';
        $id = $_GET['id'];

        $response = updateRes($table, $id, $data);
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

