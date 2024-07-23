<?php

include '../database/dbFunction.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	// CODE...
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	$id = $_GET['id'];
	$table = 'users';
	$params = ['id' => $id];
	$response = selectOneRes($table, $params);
	echo json_encode($response);
} else {
	http_response_code(405);
	echo json_encode(['status' => 'Данный запрос не поддерживается для данного ресурса!']);
	return;
}

?>