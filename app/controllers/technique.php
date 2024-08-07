<?php

include '../database/dbFunction.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['datetimeFrom']) and isset($_GET['datetimeTo'])){
        $date_from = $_GET['datetimeFrom'];
        $date_to = $_GET['datetimeTo'];
        $table = 'technique_order';
        $params = [
            'date_from' => $date_from,
            'date_to' => $date_to,
        ];

        $response =  selectOrderByDate($table, $params);
        $techniqueList = array_unique(array_column($response, 'technique_id'));

        $table = 'technique';
        $result = [];
        if (count($techniqueList)) {
            $result = selectTechniqueException($table, $techniqueList);
        } else {
            $params = ['faulty' => 0];
            $join = ['INNER JOIN type_of_technique ON technique.id_type_of_techniques = type_of_technique.id'];
            $result = selectAllJoinRes($table, $params, $join);
        };
        echo json_encode($result);
        return;

    } else {
        $table = 'technique';
        $params = ['faulty' => 0];
        $join = ['INNER JOIN type_of_technique ON technique.id_type_of_techniques = type_of_technique.id'];
        $response = selectAllJoinRes($table, $params, $join);
        echo json_encode($response);
        return;
    };

} else {
    http_response_code(405);
    echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
    return;
}

?>