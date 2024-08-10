<?php
	include_once 'vendor/autoload.php';
	use Firebase\JWT\JWT;
	function route($method, $urlList, $requestData){
		switch ($method) {
			case 'POST':
				$userId = $requestData->body->id;
				$userLogin = $requestData->body->login;
				$privilege = $requestData->body->privilege;
				$serviceId = $requestData->body->service_id;

				$secretKey = 'secret@#_KeY--+!!ooopL;235@**)(87HJfv'; // по идее выноситься в отдельный файл
				$issuedAt = time();
				$expirationTime = $issuedAt + 3600; // время по идее выноситься в отдельный файл

				$payload = [
					"id" => $userId,
					"login" => $userLogin,
					"privilege" => $privilege,
					"service" => $serviceId,
					"iat" => $issuedAt,
					"nbf" => $issuedAt,
					"exp" => $expirationTime
				];

				$token = JWT::encode($payload, $secretKey, 'HS256');
				$table = 'tokens';
				$params = [
					'user_id' => $userId,
					'token' => $token,
				];
				if (insert($table, $params)) {
					$response = [
						'token' => $token,
						'expirationTime' => $expirationTime
					];
					echo json_encode($response);
				};
				break;
			case 'PUT':
				setHttpStatus(503, 'Запрос не реализован');
				break;
			case 'DELETE':
				$headers = getallheaders();
				$authToken = $headers['Authorization'];
				$table = 'tokens';
				$params = ['token' => $authToken];
				$token = selectOne($table, $params);
				$tokenId = $token['id'];
				delete($table, $tokenId);
				$response = ['status' => 'success'];
				echo json_encode($response);
				break;
			default:
				setHttpStatus(405, "Не поддерживается целевым ресурсом!");
				break;
		};
	};

?>