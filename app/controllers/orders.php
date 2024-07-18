<?php

include("app/database/dbFunction.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$requestBody = file_get_contents('php://input');
	$data = json_decode($requestBody, true);
	$table = 'technique_order';
	$params = [
		'service_id' => service_id,
		'technique_id' => technique_id,
		'route_id' => route_id,
		'responsible_person_id' => responsible_person_id,
		'date_from' => date_from,
		'date_to' => date_to,
		'time_from' => time_from,
		'time_to' => time_to,
	];
	// $response = insertRes($table, $params);
	// echo json_encode(['id' => $response]);
	echo json_encode(['pr' => $params]);
	return;
} else {
	http_response_code(405);
	echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
	return;
};

?>