<?php


include_once("../../database/dbFunction.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $table = 'ius';
    $ius = (selectAllRes($table));

    $table = 'highways';
    $name_highways = (selectAllRes($table));

    $table = 'crane_classes';
    $crane_classes = (selectAllRes($table));

    $table = 'name_cranes';
    $name_cranes = (selectAllRes($table));

    $table = 'types_reinforcement';
    $types_reinforcement = (selectAllRes($table));

    $table = 'companies';
    $companies = (selectAllRes($table));

    $table = 'executions';
    $executions = (selectAllRes($table));

    $table = 'types_drives';
    $types_drives = (selectAllRes($table));

    $table = 'liquids';
    $liquids = (selectAllRes($table));

    $keyWord = [['name' => 'Ввести свое значение']];

    $response = [
        'ius' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $ius),
        'name_highways' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $name_highways),
        'crane_class' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $crane_classes),
        'name_cranes' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $name_cranes),
        'type_reinforcement' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $types_reinforcement),
        'company' => array_map(fn($object) => ['key' => $object['firm'], 'name' => "{$object['firm']}, {$object['location']}"], $companies),
        'execution' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $executions),
        'type_drive' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $types_drives),
        'drive_company' => array_map(fn($object) => ['key' => $object['firm'], 'name' => "{$object['firm']}, {$object['location']}"], $companies),
        'location_crane' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $keyWord),
        'technical_number' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $keyWord),
        'factory_number' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $keyWord),
        'dn' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $keyWord),
        'pressure' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $keyWord),
        'f_manufacture' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $keyWord),
        'f_commission' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $keyWord),
        'drive_factory_number' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $keyWord),
        'liquid' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $liquids),
        'drive_year_commission' => array_map(fn($object) => ['key' => $object['name'], 'name' => $object['name']], $keyWord),
    ];


    echo json_encode($response);
    return;

} else {
    http_response_code(405);
    echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
    return;

};

