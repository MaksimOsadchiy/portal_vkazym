<?php

include_once("../database/dbFunction.php");

if (isset($_SESSION['id'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // CODE...
    } else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $table = 'applications';
        $response = selectAllRes($table);
        $users = [];
        foreach ($response as $key => $value) {
            $table = 'users';
            $params = ['id' => $value['user_id']];
            $users[$value['user_id']] = selectOneRes($table, $params);
        };
        $response = [
            'users' => $users,
            'apps' => $response,
        ];
        echo json_encode($response);
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