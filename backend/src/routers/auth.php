<?php

	function route($method, $urlList, $requestData){
		switch ($urlList[0]){
			case 'login':
				include_once 'src/routers/auth/' . $urlList[0] . '.php';
				login($method, $requestData);
				break;
			case 'registration':
				include_once 'src/routers/auth/' . $urlList[0] . '.php';
				registration($method, $requestData);
				break;
			case 'logout':
				include_once 'src/routers/auth/' . $urlList[0] . '.php';
				logout($method, $requestData);
				break;
			default:
				setHttpStatus(404, "Ресурс не существует!");
				break;
		};
	};

?>