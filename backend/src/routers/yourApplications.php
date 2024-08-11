<?php

	function route($method, $urlList, $requestData){
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
			switch ($method) {
				case 'GET':
					$headers = "Authorization: $authToken";
					$options = [
						'http' => [
							'header'  => $headers,
							'method'  => 'GET',
						],
					];
					$context  = stream_context_create($options);
					$url = 'http://localhost/portal_vkazym/backend/verification';
					$response = json_decode(file_get_contents($url, false, $context));
					$table = 'applications';
					$params = [
						'user_id' => $response->id,
					];
					$response = selectAll($table, $params);
					echo json_encode(['apps' => $response]);
					break;
				default:
					setHttpStatus(405, "Не поддерживается целевым ресурсом!");
					break;
			};
		} else {
			setHttpStatus(401, "Вы не авторизованы!");
		};
	};

?>