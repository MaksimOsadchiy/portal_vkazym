<?php

include_once("../database/dbFunction.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $table = 'portal_modules';
    $response = selectAllRes($table);
    echo json_encode($response);
    return;

} else {
    http_response_code(405);
    echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
    return;

};

?>