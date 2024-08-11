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
					$id = $_GET['id'];
					$table = 'users';
					$params = ['id' => $id];
					$response = selectOne($table, $params);
					echo json_encode($response);
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