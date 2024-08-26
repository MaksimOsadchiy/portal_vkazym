<?php

include("../database/dbFunction.php");

function rightDate($sting){
    $dateAndTime = explode(' ', $sting);
    $dateIntoParts = explode('-', $dateAndTime[0]);
    $time = ($dateAndTime[1] ?? '') ? ' ' . $dateAndTime[1] : '';
    $result = "$dateIntoParts[2].$dateIntoParts[1].$dateIntoParts[0]" . $time;
    return $result;
};

if (isset($_SESSION['id'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $requestBody = file_get_contents('php://input');
        $data = json_decode($requestBody, true);
        $table = 'technique_order';
        $response = [];
        foreach ($data as $obj) {
            $params = [
                'user_id' => $obj['user_id'],
                'service_id' => $obj['service_id'],
                'technique_id' => $obj['technique_id'],
                'route_id' => $obj['route_id'],
                'responsible_person_id' => $obj['responsible_person_id'],
                'date_from' => $obj['date_from'],
                'date_to' => $obj['date_to'],
                'time_from' => $obj['time_from'],
                'time_to' => $obj['time_to'],
                'work_activity' => $obj['work_activity'],
                'remark' => $obj['remark'],
            ];
            if (isset($obj['shift'])) $params['shift'] = $obj['shift'];
            $response[] = insertRes($table, $params);
        };
        echo json_encode(['res' => $response]);
        return;

    } else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $status = $_GET['status'];
        $table = 'technique_order';
        $params = [
            'status' => $status,
        ];
        if (isset($_GET['service'])) {
            $serviceId = $_GET['service'];
            $params['service_id'] = $serviceId ;
        };
        $orders = selectAllRes($table, $params);

        $response = [];
        $responsiblePerson = [];
        $technique = [];
        $route = [];
            $services = [];
        foreach ($orders as $order) {
            if (!isset($responsiblePerson[$order['responsible_person_id']])) {
                $table = 'responsible_person';
                $params = ['id' => $order['responsible_person_id']];
                $responsiblePerson[$order['responsible_person_id']] = selectOneRes($table, $params);
            };
            if (!isset($technique[$order['technique_id']])) {
                $table = 'technique';
                $params = ['id_technique' => $order['technique_id']];
                $technique[$order['technique_id']] = selectOneRes($table, $params);
            };
            if (!isset($route[$order['route_id']])) {
                $table = 'route';
                $params = ['id' => $order['route_id']];
                $route[$order['route_id']] = selectOneRes($table, $params);
            };
            if (!isset($services[$order['route_id']])) {
                $table = 'services';
                $params = ['id' => $order['service_id']];
                $services[$order['service_id']] = selectOneRes($table, $params);
            };
            $response[$order['id']] = [
                'id' => $order['id'],
                'service' => $services[$order['service_id']]['service'],
                'service_id' => $services[$order['service_id']]['id'],
                'date' => rightDate($order['date_from']) . '<br>-<br>' . rightDate($order['date_to']),
                'time' => $order['time_from'] . '<br>-<br>' . $order['time_to'],
                'technique' => $technique[$order['technique_id']]['name_technique'],
                'stateNumber' => $technique[$order['technique_id']]['state_number'],
                'route' => $route[$order['route_id']]['route_to'],
                'workActivity' => $order['work_activity'],
                'remark' => $order['remark'],
                'responsiblePerson' => $responsiblePerson[$order['responsible_person_id']],
                'created_at' => rightDate($order['created_at']),
                'status' => $order['status'],
            ];
        };

        echo json_encode($response);
        return;

    } else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $requestBody = file_get_contents('php://input');
        $data = json_decode($requestBody, true);
        $table = 'technique_order';
        $id = $_GET['id'];
        $params = ['status' => intval($data['status'])];
        $response = updateRes($table, $id, $params);
        echo json_encode($response);
        return;

    } else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $id = $_GET['id'];
        $table = 'technique_order';
        $response = deleteRes($table, $id);
        echo $response;
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