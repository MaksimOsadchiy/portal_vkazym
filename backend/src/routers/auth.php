<?php
	include_once 'vendor/autoload.php';
	use Firebase\JWT\JWT;
	function route($method, $urlList, $requestData){
		if ($method == 'POST') {
			switch ($urlList[1]) {
				case 'login':
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
							$secretKey = 'secret@#_KeY--+!!ooopL;235@**)(87HJfv'; // по идее выноситься в отдельный файл
							$issuedAt = time();
							$expirationTime = $issuedAt + 3600; // время по идее выноситься в отдельный файл
							$payload = [
								"id" => $user['id'],
								"login" => $user['login'],
								"privilege" => $user['privilege'],
								"service" => $user['service_id'],
								"iat" => $issuedAt,
								"nbf" => $issuedAt,
								"exp" => $expirationTime
							];

							$token = JWT::encode($payload, $secretKey, 'HS256');
							$table = 'tokens';
							$params = [
								'user_id' => $user['id'],
								'token' => $token,
							];
							if (insert($table, $params)) {
								// Устанавливаем токен в куки
                        		setcookie('auth_token', $token, $expirationTime, "/", "", false, false); 
								$response = ['status' => 'success'];
								echo json_encode($response);
							}
						} else {
							echo "Неправильный пароль!";
						};
					} else {
						echo 'Неправильный логин!';
					};
					break;
				default:
					# code...
					break;
			}
		} else if ($method == 'DELETE') {
			switch ($urlList[1]) {
				case 'logout':
					$headers = getallheaders();
					$cookies = isset($headers['Cookie']) ? $headers['Cookie'] : '';
					$cookiesArray = explode('; ', $cookies);
					$authToken = null;
					foreach ($cookiesArray as $cookie) {
						list($name, $value) = explode('=', $cookie, 2);
						if ($name === 'auth_token') {
							$authToken = $value;
						};
					};
					if ($authToken) {
						$table = 'tokens';
						$params = ['token' => $authToken];
						$tokenId = selectOne($table, $params)['id'];
						delete($table, $tokenId);
						$response = ['status' => 'success'];
						echo json_encode($response);
					} else {
						echo json_encode(['status' => "Auth Token not found."]);
					}

					break;
				default:
					# code...
					break;
			}
		}
	};

?>