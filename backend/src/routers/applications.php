<?php
	function route($method, $urlList, $requestData){
		// echo json_encode($requestData->parameters);
		switch ($method) {
			case 'GET':
				$table = 'applications';
				$params = [
					'user_id' => $requestData->parameters['user_id'],
				];
				$response = selectAll($table, $params);
				echo json_encode(['apps' => $response]);
				break;
			case 'POST':
				# code...
				break;
			default:
				
				break;
		}
	};

?>