<?php

	function logout($method, $requestData){
		switch ($method){
			case 'DELETE':
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
					$headers = "Authorization: $authToken";
					$options = [
						'http' => [
							'header'  => $headers,
							'method'  => 'DELETE',
						],
					];
					$context  = stream_context_create($options);
					$url = 'http://localhost/portal_vkazym/backend/token';
					$response = file_get_contents($url, false, $context);
					echo $response;
				} else {
					setHttpStatus(400, "Токен не обнаружен!");
				}
				break;
			default:
				setHttpStatus(405, "Не поддерживается целевым ресурсом!");
				break;
		};
	};

?>