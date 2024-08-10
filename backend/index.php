<?php
	include 'src/functions/status.php';

	function getData($method){
		$data = new stdClass;
		if ($method !== 'GET' and $method !== 'DELETE') {
			$data->body = json_decode(file_get_contents('php://input'));
		};
		$data->parameters = [];
		foreach ($_GET as $key => $value) {
			if ($key !== 'q'){
				$data->parameters[$key] =$value;
			};
		};
		
		return $data;
	};

	function getMethod(){
		return $_SERVER['REQUEST_METHOD'];
	};

	// Подключение к БД
	$driver = 'mysql';
	$host = 'localhost';
	$db_name = 'portal_vkazym';
	$db_user = 'portal_vkazym/';
	$db_pass = 'P@ssw0rd';
	$charset = 'utf8';

	$options = [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
	];
	try {
		$pdo = new PDO(
			dsn: "$driver:host=$host;dbname=$db_name;charset=$charset", username: $db_user, password: $db_pass, options: $options
		);
	} catch (PDOException $i) {
		setHttpStatus(500, "Ошибка подключения к базе");
		die();
	};

	$url = isset($_GET['q']) ? $_GET['q'] : '';
	$url = rtrim($url, '/');
	$urlList = explode('/', $url);
	$router = $urlList[0];

	// echo realpath(dirname(__FILE__)).'/src/routers/' . $router . '.php';
	// Подключаемся к файлу (Возникает ошибка при запросе по URL "http://localhost/portal_vkazym/backend")
	if (file_exists(realpath(dirname(__FILE__)) . '/src/routers/' . $router . '.php')){
		include_once 'src/functions/dbFunctions.php';
		include_once 'src/routers/' . $router . '.php';
		
		$method = getMethod();
		$nextUrlList = array_slice($urlList, 1);
		if (in_array($method, ['GET', 'POST', 'PUT', 'DELETE'])){
			// echo "3\n";
			$requestData = getData($method);
			route($method, $nextUrlList, $requestData);
		} else {
			setHttpStatus(501, "Метод запроса не известен серверу");
		};
	} else {
		setHttpStatus(404, "Ресурс не существует!");
	}

?>