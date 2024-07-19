<?php

include_once("../database/dbFunction.php");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$requestBody = file_get_contents('php://input');
	$data = json_decode($requestBody, true);

	$table = 'applications';
	$params = [
		'user_id' => $data['login'],
		'title' => $data['title'],
		'content' => $data['content'],
	];
	
	$response = insertRes($table, $params);
	echo json_encode(['id' => $response]);
	return;

} else if ($_SERVER['REQUEST_METHOD'] === 'GET'){
	$table = 'applications';
	$response = selectAllRes($table);
	echo json_encode(['apps' => $response]);
	return;

} else {
	http_response_code(405);
	echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
	return;
};

?>