<?php

include_once("../../database/dbFunction.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])){
        $id = $_GET['id'];
        $response = selectOneCranes($id);
        $mainInfo = [
            'ius' => $response['ius'],
            'result' => $response['result'],
            'lpumg' => $response['lpumg'],
            'highways' => $response['highways'],
            'accessories' => $response['accessories'],
            'location' => $response['location'],
            'technical_number' => $response['technical_number'],
            'type_reinforcement' => $response['type_reinforcement'],
            'company' => $response['company'],
            'factory_number' => $response['factory_number'],
            'dn' => $response['dn'],
            'pressure' => $response['pressure'],
            'execution' => $response['execution'],
            'f_manufacture' => $response['f_manufacture'],
            'f_commission' => $response['f_commission'],
            'type_drive' => $response['type_drive'],
            'drive_company' => $response['drive_company'],
            'drive_factory_number' => $response['drive_factory_number'],
            'liquid' => $response['liquid'],
            'drive_year_commission' => $response['drive_year_commission'],
        ];
        $secInfo = [
            'workability' => $response['workability'],
            'tightness' => $response['tightness'],
            'leakage' => $response['leakage'],
            'act_leakage' => $response['act_leakage'],
            'drainage' => $response['drainage'],
            'pipelines' => $response['pipelines'],
        ];

        $result = [
            'id' => $response['id'],
            'main' => $mainInfo,
            'secondary' => $secInfo,
        ];
        echo json_encode($result);
        return;

    } else {
        $response = selectAllCranes();
        echo json_encode($response);
        return;

    }
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