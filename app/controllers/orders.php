<?php

include("../database/dbFunction.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$requestBody = file_get_contents('php://input');
	$data = json_decode($requestBody, true);
	$table = 'technique_order';
	$response = [];
	foreach ($data as $obj) {
		$params = [
			'service_id' => $obj['service_id'],
			'technique_id' => $obj['technique_id'],
			'route_id' => $obj['route_id'],
			'responsible_person_id' => $obj['responsible_person_id'],
			'date_from' => $obj['date_from'],
			'date_to' => $obj['date_to'],
			'time_from' => $obj['time_from'],
			'time_to' => $obj['time_to'],
		];
		if (isset($obj['shift'])) $params['shift'] = $obj['shift'];
		$response[] = insertRes($table, $params);
	};
	echo json_encode(['res' => $response]);
	return;
} else {
	http_response_code(405);
	echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
	return;
};

?>