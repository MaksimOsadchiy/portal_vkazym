<?php

	function route($method, $urlList, $requestData){
		switch ($method){
			case 'GET':
				if (isset($_GET['date_from']) and isset($_GET['date_to'])){
					$date_from = $_GET['date_from'];
					$date_to = $_GET['date_to'];
					$table = 'technique_order';
					$params = [
						'date_from' => $date_from,
						'date_to' => $date_to,
					];

					$response =  selectOrderByDate($table, $params);
					$techniqueList = array_unique(array_column($response, 'technique_id'));

					$table = 'technique';
					$result = [];
					if (count($techniqueList)) {
						$result = selectTechniqueException($table, $techniqueList);
					} else {
						$params = ['faulty' => 0];
						$join = ['INNER JOIN type_of_technique ON technique.id_type_of_techniques = type_of_technique.id'];
						$result = selectAllJoin($table, $params, $join);
					};
					echo json_encode($result);
				} else {
					$table = 'technique';
					$params = ['faulty' => 0];
					$join = ['INNER JOIN type_of_technique ON technique.id_type_of_techniques = type_of_technique.id'];
					$response = selectAllJoin($table, $params, $join);
					echo json_encode($response);
				};
				break;
			default:
				setHttpStatus(405, "Не поддерживается целевым ресурсом!");
				break;
		};
	};

?>