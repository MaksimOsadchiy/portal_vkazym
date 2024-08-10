<?php

	function route($method, $urlList, $requestData){
		switch ($method){
			case 'GET':
				$table = 'services';
				$response = selectAll($table);
				echo json_encode($response);
				break;
			default:
				setHttpStatus(405, "Не поддерживается целевым ресурсом!");
				break;
		};
	};

?>