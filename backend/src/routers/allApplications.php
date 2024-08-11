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
					$table = 'applications';
					$response = selectAll($table);
					$users = [];
					foreach ($response as $key => $value) {
						$table = 'users';
						$params = ['id' => $value['user_id']];
						$users[$value['user_id']] = selectOne($table, $params);
					};
					$response = [
						'users' => $users,
						'apps' => $response,
					];
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