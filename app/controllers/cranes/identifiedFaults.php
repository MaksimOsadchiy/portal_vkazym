<?php

include_once("../../database/dbFunction.php");

if (isset($_SESSION['id'])) {
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
            'user_detection' => $data['userDetection'],
            'date_detection' => $data['dateDetection'],
            'status' => $data['status'],
            'id_user_author' => $data['author'],
        ];
        if ($data['status'] === 1) {
            $params['complete_activities'] = $data['completeActivities'];
            $params['date_troubleshooting'] = $data['dateTroubleshooting'];
            $params['user_troubleshooting'] = $data['userTroubleshooting']; // пока так оставить
            if (isset($data['note'])) {
                $params['note'] = $data['note'];
            };
        };
        $response = insertRes($table, $params);
        echo json_encode($response);
        return;

    } else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        if ($_SESSION['accessibility'][0]['id_role'] === 2 || array_values(array_filter($_SESSION['accessibility'], fn($obj) => $obj['name'] === 'cranes'))[0]['privilege'] === 3) {
            $requestBody = file_get_contents('php://input');
            $data = json_decode($requestBody, true);
            $id = $_GET['id'];
            $table = 'identified_faults';
            $params = [
                'status' => $data['status'],
                'id_user_author' => $data['author'],
            ];
            if ($data['status'] === 1) {
                if (isset($data['completeActivities'])) $params['complete_activities'] = $data['completeActivities'];
                if (isset($data['dateTroubleshooting'])) $params['date_troubleshooting'] = $data['dateTroubleshooting'];
                if (isset($data['userTroubleshooting'])) $params['user_troubleshooting'] = $data['userTroubleshooting']; // пока так оставить
                if (isset($data['note'])) {
                    $params['note'] = $data['note'];
                };
            };

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
} else {
    http_response_code(401);
    echo json_encode(['status' => 'Вы неавторизованы!']);
    return;

}

?>