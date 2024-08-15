<?php


include_once("../../database/dbFunction.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $table = 'ius';
    $ius = selectAllRes($table);

    $table = 'highways';
    $name_highways = selectAllRes($table);

    $table = 'crane_classes';
    $crane_classes = selectAllRes($table);

    echo json_encode($ius);

    $table = 'name_cranes';
    $name_cranes = selectAllRes($table);

    $table = 'types_reinforcement';
    $types_reinforcement = selectAllRes($table);

    $table = 'companies';
    $companies = selectAllRes($table);

    $table = 'executions';
    $executions = selectAllRes($table);

    $table = 'types_drives';
    $types_drives = selectAllRes($table);

    $table = 'liquids';
    $liquids = selectAllRes($table);

    $response = [   // ДОДЕЛАТЬ ....
        'ius' => [
            'key' => array_map(fn($object) => $object->name, $ius),
            'name' => array_map(fn($object) => $object->name, $ius)
        ],
        'name_highways' => [
            'key' => array_map(fn($object) => $object->name, $name_highways),
            'name' => array_map(fn($object) => $object->name, $name_highways)
        ],
        'crane_class' => [
            'key' => array_map(fn($object) => $object->name, $crane_classes),
            'name' => array_map(fn($object) => $object->name, $crane_classes)
        ],
        'type_reinforcement' => [
            'key' => array_map(fn($object) => $object->name, $types_reinforcement),
            'name' => array_map(fn($object) => $object->name, $types_reinforcement)
        ],
    ];


    echo json_encode($response);
    return;

} else {
    http_response_code(405);
    echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
    return;

};

