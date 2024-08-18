<?php

	function rightDate($sting){
		$dateAndTime = explode(' ', $sting);
		$dateIntoParts = explode('-', $dateAndTime[0]);
		$time = ($dateAndTime[1] ?? '') ? ' ' . $dateAndTime[1] : '';
		$result = "$dateIntoParts[2].$dateIntoParts[1].$dateIntoParts[0]" . $time;
		return $result;
	};

	function route($method, $urlList, $requestData){
		switch ($method){
			case 'GET':
				$table = 'technique_order';
				$params = [
					'status' => $requestData->parameters['status'],
				];
				if (isset($requestData->parameters['id'])) $params['user_id'] = $requestData->parameters['id'];
				$orders = selectAll($table, $params);

				$response = [];
				$responsiblePerson = [];
				$technique = [];
				$route = [];
				$services = [];
				foreach($orders as $order) {
					if (!isset($responsiblePerson[$order['responsible_person_id']])){
						$table = 'responsible_person';
						$params = ['id' => $order['responsible_person_id']];
						$responsiblePerson[$order['responsible_person_id']] = selectOne($table, $params);
					};
					if (!isset($technique[$order['technique_id']])){
						$table = 'technique';
						$params = ['id_technique' => $order['technique_id']];
						$technique[$order['technique_id']] = selectOne($table, $params);
					};
					if (!isset($route[$order['route_id']])){
						$table = 'route';
						$params = ['id' => $order['route_id']];
						$route[$order['route_id']] = selectOne($table, $params);
					};
					if (!isset($services[$order['route_id']])){
						$table = 'services';
						$params = ['id' => $order['service_id']];
						$services[$order['service_id']] = selectOne($table, $params);
					};
					$response[$order['id']] = [
						'id' => $order['id'],
						'service' => $services[$order['service_id']]['service'],
						'date' => rightDate($order['date_from']) . '<br>-<br>' . rightDate($order['date_to']),
						'time' => $order['time_from'] . '<br>-<br>' . $order['time_to'],
						'technique' => $technique[$order['technique_id']]['name_technique'],
						'stateNumber' => $technique[$order['technique_id']]['state_number'],
						'route' => $route[$order['route_id']]['route_to'],
						'workActivity' => $order['work_activity'],
						'remark' => $order['remark'],
						'responsiblePerson' => $responsiblePerson[$order['responsible_person_id']],
						'created_at' => rightDate($order['created_at']),
						'status' => $order['status'],
					];
				};

				echo json_encode($response);
				break;
			case 'PUT':
				$table = 'technique_order';
				$id = $requestData->parameters['id'];
				$params = ['status' => intval($requestData->body->status)];
				$response = update($table, $id, $params);
				echo json_encode($response);
				break;
			case 'DELETE':
				$id = $requestData->parameters['id'];
				$table = 'technique_order';
				$response = delete($table, $id);
				echo $response;
				break;
			default:
				setHttpStatus(405, "Не поддерживается целевым ресурсом!");
				break;
		};
	};

?>