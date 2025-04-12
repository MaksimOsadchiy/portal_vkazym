<?php

include_once("../../database/dbFunction.php");

if (isset($_SESSION['id'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        if ($_SESSION['accessibility'][0]['id_role'] === 2) {
            $requestBody = file_get_contents('php://input');
            $data = json_decode($requestBody, true);
            $table = $data['table'];
            $user_id = $data['id'];
            $column = $data['params']["columnName"];
            $value = ($column === 'password') ? $password = password_hash($data['params']["newValue"], PASSWORD_DEFAULT) : $data['params']["newValue"];
            $params = [$column => $value];

			$id = selectOneRes($table, ["user_id" => $user_id])["id"];

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

};

?>