<?php


include_once("../../database/dbFunction.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'];
    $response = selectOneCranes($id);
    $mainInfo = [
        'Основное' => [
            'ius' => ['title' => 'ИУС', 'value' => $response['ius']],
            'result' => ['title' => 'Исправность', 'value' => $response['result']],
            'lpumg' => ['title' => 'Наименование ЛПУМГ', 'value' => $response['lpumg']],
            'name_highways' => ['title' => 'Наименование газопровода', 'value' => $response['highways']],
            'crane_class' => ['title' => 'Класс крана', 'value' => $response['crane_class']],
            'location_crane' => ['title' => 'Местонахождения крана', 'value' => $response['location']],
            'technical_number' => ['title' => 'Технологический номер крана', 'value' => $response['technical_number']],
            'type_reinforcement' => ['title' => 'ТИП', 'value' => $response['type_reinforcement']],
            'company' => ['title' => 'Фирма, завод изготовитель', 'value' => $response['company']],
            'factory_number' => ['title' => 'Заводской номер', 'value' => $response['factory_number']],
            'dn' => ['title' => 'Dn,мм', 'value' => $response['dn']],
            'pressure' => ['title' => 'Р, кгс/см2', 'value' => $response['pressure']],
            'execution' => ['title' => 'Исполнение', 'value' => $response['execution']],
            'f_manufacture' => ['title' => 'Год изготовления', 'value' => $response['f_manufacture']],
            'f_commission' => ['title' => 'Дата ввода в эксплуатацию', 'value' => $response['f_commission']],
        ],
        'Привод' => [
            'type_drive' => ['title' => 'ТИП', 'value' => $response['type_drive']],
            'drive_company' => ['title' => 'Фирма, завод', 'value' => $response['drive_company']],
            'drive_factory_number' => ['title' => 'Заводской номер', 'value' => $response['drive_factory_number']],
            'liquid' => ['title' => 'Гидравлическая жидкость', 'value' => $response['liquid']],
            'drive_year_commission' => ['title' => 'Дата ввода в эксплуатацию', 'value' => $response['drive_year_commission']],
        ],
    ];
    $secInfo = [
        'result' => ['title' => 'Итоговое состояние', 'value' => $response['result']],
        'general_description' => ['title' => 'Особенности', 'value' => $response['general_description']],
        'tightness' => ['title' => 'Герметичность ШЗ', 'value' => $response['tightness']],
        'leakage' => ['title' => 'Утечка по ТПА', 'value' => $response['leakage']],
        'act_leakage' => ['title' => 'АКТ о негерметичности', 'value' => $response['act_leakage']],
        'drainage' => ['title' => 'Наличие дренажных линий', 'value' => $response['drainage']],
        'packing_pipelines' => ['title' => 'Наличие набивочных линий', 'value' => $response['pipelines']],
    ];

    $table = 'list_general_descriptions';
    $general_descriptions = selectAllRes($table);

    $table = 'list_results';
    $list_results = selectAllRes($table);

    $table = 'list_tightness';
    $tightness = selectAllRes($table);

    $table = 'list_act_leakages';
    $list_act_leakages = selectAllRes($table);

    $table = 'list_leakages';
    $list_leakages = selectAllRes($table);

    $table = 'list_strapping';
    $list_strapping = selectAllRes($table);

    $result = [
        'id' => $response['id'],
        'id_drive' => $response['id_drive'],
        'id_malfunction' => $response['id_malfunction'],
        'mainInfo' => $mainInfo,
        'secondary' => $secInfo,
        'list_general_description' => $general_descriptions,
        'list_result' => $list_results,
        'list_tightness' => $tightness,
        'list_leakage' => $list_leakages,
        'list_act_leakage' => $list_act_leakages,
        'list_drainage' => $list_strapping,
        'list_packing_pipelines' => $list_strapping,
    ];
    echo json_encode($result);
    return;

} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if ($_SESSION['privilege'] === 7) {
        $requestBody = file_get_contents('php://input');
        $data = json_decode($requestBody, true);
        $table = 'fittings';
        $id = $_GET['id'];
        $params = [];
        if (isset($data['name_highways'])) {
            $params['name_highways'] = $data['name_highways'];
        };
        if (isset($data['crane_class'])) {
            $params['crane_class'] = $data['crane_class'];
        }
        if (isset($data['name_cranes'])) {
            $params['name_crane'] = $data['name_cranes'];
        }
        if (isset($data['location_crane'])) {
            $params['location_crane'] = $data['location_crane'];
        }
        if (isset($data['technical_number'])) {
            $params['technical_number'] = $data['technical_number'];
        }
        if (isset($data['company'])) {
            $params['company'] = $data['company'];
        }
        if (isset($data['f_manufacture'])) {
            $params['year_manufacture'] = $data['f_manufacture'];
        }
        if (isset($data['factory_number'])) {
            $params['factory_number'] = $data['factory_number'];
        }
        if (isset($data['dn'])) {
            $params['Dn'] = $data['dn'];
        }
        if (isset($data['ius'])) {
            $params['IUS'] = $data['ius'];
        }
        if (isset($data['type_reinforcement'])) {
            $params['type_reinforcement'] = $data['type_reinforcement'];
        }
        if (isset($data['pressure'])) {
            $params['pressure'] = $data['pressure'];
        }
        if (isset($data['execution'])) {
            $params['execution'] = $data['execution'];
        }
        if (isset($data['f_commission'])) {
            $params['year_commission'] = $data['f_commission'];
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

