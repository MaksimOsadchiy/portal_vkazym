<?php
	function login($method, $requestData){
		switch ($method){
			case 'POST':
				$login = $requestData->body->login;
				$password = $requestData->body->password;
				
				$table = 'users';
				$params = ['login' => $login];
				$user = selectOne($table, $params);
				if ($user){
					$table = 'passwords';
					$params = ['user_id' => $user['id']];
					$correctPassword = selectOne($table, $params);
					if (password_verify($password, $correctPassword['password'])){
						$data = [
							'id' => $user['id'],
							'login' => $user['login'],
							'privilege' => $user['privilege'],
							'service_id' => $user['service_id'],
						];

						// Создание контекста для POST запроса
						$options = [
							'http' => [
								'header'  => "Content-Type: application/json\r\n",
								'method'  => 'POST',
								'content' => json_encode($data),
							],
						];
						$context  = stream_context_create($options);

						// Отправка запроса
						$url = 'http://localhost/portal_vkazym/backend/token';
						$response = json_decode(file_get_contents($url, false, $context));
						// Устанавливаем токен в куки
						setcookie('auth_token', $response->token, $response->expirationTime, "/", "", false, false); 
						$response = ['status' => 'success'];

						echo json_encode($response);
					} else {
						setHttpStatus(400, "Неправильный пароль!");
					};
				} else {
					setHttpStatus(400, 'Неправильный логин!');
				};
				break;
			default:
				setHttpStatus(405, "Не поддерживается целевым ресурсом!");
				break;
		};
	};

?>