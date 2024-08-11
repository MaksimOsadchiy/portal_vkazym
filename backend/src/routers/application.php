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
				case 'POST':
					$table = 'applications';
					$params = [
						'user_id' => $requestData->body->id,	
						'content' => $requestData->body->content,	
						'title' => $requestData->body->title,	
					];
					$response = insert($table, $params);
					setHttpStatus(200, 'success');	
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