<?php

include_once("../../database/dbFunction.php");

if (isset($_SESSION['id'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $response = selectAllCranes();
        $result = [];
        foreach ($response as $item) {
            $key = $item['unification_crane'];

            if (!isset($result[$key])) {
                $result[$key] = [];
            };

            $result[$key][] = $item;
        };
        echo json_encode($result);
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

};
?>