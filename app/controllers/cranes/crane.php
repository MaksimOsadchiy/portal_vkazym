<?php


include_once("../../database/dbFunction.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
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
        'result' => $response['result'],
        'general_description' => $response['general_description'],
        'tightness' => $response['tightness'],
        'leakage' => $response['leakage'],
        'act_leakage' => $response['act_leakage'],
        'drainage' => $response['drainage'],
        'pipelines' => $response['pipelines'],
    ];

    $table = 'list_general_descriptions';
    $general_description = selectAllRes($table);

    $table = 'list_results';
    $list_results = selectAllRes($table);

    $table = 'list_tightness';
    $tightness = selectAllRes($table);

    $table = 'list_leakages';
    $list_leakages = selectAllRes($table);

    $table = 'list_strapping';
    $list_strapping = selectAllRes($table);

    $result = [
        'id' => $response['id'],
        'main' => $mainInfo,
        'secondary' => $secInfo,
        'general_description' => $general_description,
        'list_results' => $list_results,
        'tightness' => $tightness,
        'list_leakages' => $list_leakages,
        'list_strapping' => $list_strapping,
    ];
    echo json_encode($result);
    return;

} else {
    http_response_code(405);
    echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
    return;

};

