<?php

include '../database/dbFunction.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$requestBody = file_get_contents('php://input');
	$data = json_decode($requestBody, true);
	$table = 'route';
	$params = [
		'route_to' => $data['route_to'],
		'service_id' => $data['service_id'],
	];
	$response = insertRes($table, $params);
	echo json_encode(['id' => $response]);
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
	$requestBody = file_get_contents('php://input');
	$data = json_decode($requestBody, true);
	$id = $data['id'];
	$table = 'route';
	$params = [
		'route_to' => $data['route_to'],
		'service_id' => $data['service_id'],
	];
	$response = updateRes($table, $id, $params);
	echo json_encode(['id' => $response]);
} else {
	http_response_code(405);
	echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
	return;
}

?>