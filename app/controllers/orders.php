<?php

include("app/database/dbFunction.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	//	 INSERT INTO `technique_order`
	// 		(`id`, `service_id`, `technique_id`, `route_id`, `work_activity`, `responsible_person_id`,
	// 		`date_from`, `date_to`, `time_from`, `time_to`, `shift`, `remark`, `status`, `created_at`) 
	//	 	VALUES (NULL, '5', '44', '5', NULL, '1', '2024-07-03', '2024-07-04', '20:00:47', '23:00:00',
	//	 	NULL, NULL, NULL, CURRENT_TIMESTAMP);
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