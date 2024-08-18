<?php

function customPrint($value){
	echo '<pre>';
	print_r($value);
	echo '</pre>';
};

//Проверка выполнения запроса к БД
function dbCheckError($query){
    $errInfo = $query->errorInfo();
    if ($errInfo[0] !== PDO::ERR_NONE) {
		setHttpStatus(500, $errInfo[2]);
        echo $errInfo[2];
        exit();
    };
    return true;
};

function executeRequest($query) {
	try {
		$query->execute();
	} catch (PDOException $e) {
		setHttpStatus(500, $e->getMessage());
		exit();
	};
};

//Запрос на получение данных с одной таблицы
function selectAll($table, $params = []){
	global $pdo;
	$sql = "SELECT * FROM $table";

	if (!empty($params)) {
		$i = 0;
		foreach ($params as $key => $value) {
			if (!is_numeric($value)) {
				$value = "'" . $value . "'";
			};
			if ($i === 0) {
				$sql = $sql . " WHERE $key=$value";
			} else {
				$sql = $sql . " AND $key=$value";
			};
			$i++;
		};
	};

	$query = $pdo->prepare($sql);
	executeRequest($query);
	return $query->fetchALL();
};

// 
function selectAllJoin($table, $params = [], $joins = []){
    global $pdo;
    $sql = "SELECT * FROM $table";

    // Добавление JOIN-запросов
    if (!empty($joins)) {
        foreach ($joins as $join) {
            $sql .= " " . $join;
        };
    };

    // Добавление параметров (условий)
    if (!empty($params)) {
        $i = 0;
        foreach ($params as $key => $value) {
            if (!is_numeric($value)) {
                $value = "'" . $value . "'";
            };
            if ($i === 0) {
                $sql = $sql . " WHERE $key=$value";
            } else {
                $sql = $sql . " AND $key=$value";
            };
            $i++;
        };
    };

    $query = $pdo->prepare($sql);
    executeRequest($query);
    return $query->fetchAll(PDO::FETCH_ASSOC);
};

//Запрос на получение одной строки с выбранной таблицы
function selectOne($table, $params = []){
	global $pdo;
	$sql = "SELECT * FROM $table";

	if (!empty($params)) {
		$i = 0;
		foreach ($params as $key => $value) {
			if (!is_numeric($value)) {
				$value = "'" . $value . "'";
			};
			if ($i === 0) {
				$sql = $sql . " WHERE $key=$value";
			} else {
				$sql = $sql . " AND $key=$value";
			}
			$i++;
		};
	};

	$query = $pdo->prepare($sql);
	executeRequest($query);

	return $query->fetch();
};

//Запись в таблицу БД
//INSERT INTO `users` (name, age, password) VALUES ('LUBUSHKA', '5', 'abobus1998');
function insert($table, $params){
	global $pdo;
	$i = 0;
	$coll = '';
	$mask = '';
	foreach ($params as $key => $value) {
		if ($i === 0) {
			$coll = $coll . "$key";
			$mask = $mask . "'" . "$value" . "'";
		} else {
			$coll = $coll . ", $key";
			$mask = $mask . ", '" . "$value" . "'";
		};
		$i++;
	};

	$sql = "INSERT INTO $table ($coll) VALUES ($mask)";

	$query = $pdo->prepare($sql);
	executeRequest($query);
	return ($pdo->lastInsertId());
};

//Обновление строки в таблице
//UPDATE `users` SET age = '999', `password` = '999' WHERE id = 1
function update($table, $id, $params){
	global $pdo;
	$i = 0;
	$str = '';
	foreach ($params as $key => $value) {
		if ($i === 0) {
			$str = $str . $key . " = '" . $value . "'";
		} else {
			$str = $str . ", " . $key . " = '" . $value . "'";
		};
		$i++;
	};

	$sql = "UPDATE $table SET $str WHERE id = $id";

	$query = $pdo->prepare($sql);
	executeRequest($query);
    return $id;
};

//Удаление
//DELETE FROM `users` WHERE id = 19
function delete($table, $id){
	global $pdo;
	$sql = "DELETE FROM $table WHERE id = $id";
	$query = $pdo->prepare($sql);
	executeRequest($query);
	return $id;
};

function selectOrderByDate($table, $params){
    global $pdo;

    $sql = "SELECT technique_id FROM $table WHERE
                        (
                            (datetime_from <= :date_to AND datetime_to >= :date_from)
                            OR
                            (datetime_from >= :date_from AND datetime_to <= :date_to)
                        )
                        AND
                        status = '1'
                ";

    // Подготовка выражения
    $query = $pdo->prepare($sql);

    // Привязка параметров
    $query->bindParam(':date_from', $params['date_from']);
    $query->bindParam(':date_to', $params['date_to']);

    // Выполнение запроса
	executeRequest($query);
    return $query->fetchALL();
};

function selectTechniqueException($table, $params){
    global $pdo;
    $str = implode(', ', $params);

    $sql = "SELECT * FROM $table INNER JOIN type_of_technique ON technique.id_type_of_techniques = type_of_technique.id WHERE faulty = 0 AND id_technique NOT IN ($str)";

    // Подготовка выражения
    $query = $pdo->prepare($sql);

    // Выполнение запроса
    executeRequest($query);
    return $query->fetchALL();
};

?>