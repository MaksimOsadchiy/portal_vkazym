<?php

	function route($method, $urlList, $requestData){
		switch ($method) {
			case 'GET':
				$headers = getallheaders();
				$token = $headers['Authorization'];
				$payload = explode('.', $token)[1];
				$decoded = json_decode(base64_decode(strtr($payload, '-_', '+/')), true);
				$decodedArray = (array)$decoded;
				
				$response = [
					'id' => $decodedArray['id'],
					'privilege' => $decodedArray['privilege'],
				];
				echo json_encode($response);
				break;
			default:
				setHttpStatus(405, "Не поддерживается целевым ресурсом!");
				break;
		};
	};

?>