<?php
	function registration($method, $requestData){
		switch ($method){
			case 'POST':
				$login = $requestData->body->login;
				$password = password_hash($requestData->body->password, PASSWORD_DEFAULT);
				$service = $requestData->body->service;

				$table = 'users';
				$params = ['login' => $login];
				if (empty(selectOne($table, $params))) {
					$params = [
						'login' => $login,
						'service_id' => $service,
					];
					$userId = insert($table, $params);
					
					$table = 'passwords';
					$params = [
						'user_id' => $userId,
						'password' => $password,
					];
					insert($table, $params);
	
					$data = [
						'id' => $userId,
						'login' => $login,
						'privilege' => 0,
						'service_id' => $service,
					];
					$options = [
						'http' => [
							'header'  => "Content-Type: application/json\r\n",
							'method'  => 'POST',
							'content' => json_encode($data),
						],
					];
					$context  = stream_context_create($options);
					$url = 'http://localhost/portal_vkazym/backend/token';
					$response = json_decode(file_get_contents($url, false, $context));
					setcookie('auth_token', $response->token, $response->expirationTime, "/", "", false, false); 
					$response = ['status' => 'success'];
					echo json_encode($response);
				} else {
					setHttpStatus(400, "Пользователь уже существует!");
				};
				break;
			default:
				setHttpStatus(405, "Не поддерживается целевым ресурсом!");
				break;
		};
	};

?>