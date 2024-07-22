<?php

include_once("../database/dbFunction.php");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	// CODE...
} else if ($_SERVER['REQUEST_METHOD'] === 'GET'){
	$table = 'applications';
	$params = ['status' => 0];
	$response = selectAllRes($table, $params);
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

?>