<?php

session_start();
require('connect.php');

function customPrint($value){
	echo '<pre>';
	print_r($value);
	echo '</pre>';
};

//Проверка выполнения запроса к БД
function dbCheckErrorRes($query){
    $errInfo = $query->errorInfo();
    if ($errInfo[0] !== PDO::ERR_NONE) {
		http_response_code(500);
        echo $errInfo[2];
        exit();
    };
    return true;
};

//Запрос на получение данных с одной таблицы
function selectAllRes($table, $params = []){
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
	$query->execute();
	dbCheckErrorRes($query);
	return $query->fetchALL();
};

// 
function selectAllJoinRes($table, $params = [], $joins = []){
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
    $query->execute();
    dbCheckErrorRes($query);
    return $query->fetchAll(PDO::FETCH_ASSOC);
};

//Запрос на получение одной строки с выбранной таблицы
function selectOneRes($table, $params = []){
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
	$query->execute();
	dbCheckErrorRes($query);
	return $query->fetch();
};

//Запись в таблицу БД
//INSERT INTO `users` (name, age, password) VALUES ('LUBUSHKA', '5', 'abobus1998');
function insertRes($table, $params){
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
	$query->execute();
	dbCheckErrorRes($query);
	return ($pdo->lastInsertId());
};

//Обновление строки в таблице
//UPDATE `users` SET age = '999', `password` = '999' WHERE id = 1
function updateRes($table, $id, $params){
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
	$query->execute();
	dbCheckErrorRes($query);
    return $id;
};

//Удаление
//DELETE FROM `users` WHERE id = 19
function deleteRes($table, $id){
	global $pdo;
	$sql = "DELETE FROM $table WHERE id = $id";
	$query = $pdo->prepare($sql);
	$query->execute();
	dbCheckErrorRes($query);
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
    $query->execute();

    dbCheckErrorRes($query);
    return $query->fetchALL();
};

function selectTechniqueException($table, $params){
    global $pdo;
    $str = implode(', ', $params);

    $sql = "SELECT * FROM $table INNER JOIN type_of_technique ON technique.id_type_of_techniques = type_of_technique.id WHERE faulty = 0 AND id_technique NOT IN ($str)";

    // Подготовка выражения
    $query = $pdo->prepare($sql);

    // Выполнение запроса
    $query->execute();

    dbCheckErrorRes($query);
    return $query->fetchALL();
};

// TEMP
function selectAllCranes(){
    global $pdo;
    $sql = "SELECT 
                        f.id,
                        m.result AS `result`,
                        hw.lpumg AS `lpumg`,
                        f.name_highways AS `highways`,
                        f.unification_crane AS `unification_crane`,
                        CONCAT(f.crane_class, ', ', f.name_crane) AS `crane_class`,
                        f.location_crane AS `location`,
                        f.technical_number AS `technical_number`,
                        CONCAT(f.company, ', ', c.location) AS `company`,
                        f.year_manufacture AS `f_manufacture`,
                        f.Dn AS `DN`,
                        m.general_description AS `general_description`,
                        m.tightness AS `tightness`,
                        m.drainage AS `drainage`,
                        m.packing_pipelines AS `pipelines`,
                        f.plan_replacement AS `replacement`,
                        m.act_leakage AS `act_leakage`
                FROM 
                    fittings f
                LEFT JOIN 
                    highways hw ON f.name_highways = hw.name
                LEFT JOIN 
                    companies c ON f.company = c.firm
                LEFT JOIN 
                    malfunctions m ON f.id_malfunction = m.id;";

    $query = $pdo->prepare($sql);
    $query->execute();
    dbCheckErrorRes($query);
    return $query->fetchALL();
};
function selectOneCranes($id){
    global $pdo;
    $sql = "SELECT 
                    f.id,
                    f.IUS AS `ius`, 
                    res.description AS `result`,
                    hw.lpumg AS `lpumg`, 
                    f.name_highways AS `highways`, 
                    CONCAT(f.crane_class, ', ', f.name_crane) AS `crane_class`,
                    f.location_crane AS `location`,
                    f.technical_number AS `technical_number`, 
                    f.type_reinforcement AS `type_reinforcement`,
                    CONCAT(f.company, ', ' , c.location) AS `company`, 
                    f.factory_number AS `factory_number`, 
                    f.Dn AS `dn`, 
                    f.pressure AS `pressure`, 
                    f.execution AS `execution`, 
                    f.year_manufacture AS `f_manufacture`,
                    f.year_commission AS `f_commission`,
                    d.type_drive AS `type_drive`,
                    CONCAT(f.company, ', ', c.location) AS `drive_company`, 
                    d.factory_number AS `drive_factory_number`,
                    d.liquid AS `liquid`,
                    d.year_commission AS `drive_year_commission`,
                    m.general_description AS `general_description`,
                    m.tightness AS `tightness`,
                    m.leakage AS `leakage`,
                    m.act_leakage AS `act_leakage`,
                    m.drainage AS `drainage`,
                    m.packing_pipelines AS `pipelines`
            FROM 
                fittings f
            LEFT JOIN 
                highways hw ON f.name_highways = hw.name
            LEFT JOIN 
                drives d ON f.id_drive = d.id
            LEFT JOIN 
                companies c ON f.company = c.firm
            LEFT JOIN 
                malfunctions m ON f.id_malfunction = m.id
            LEFT JOIN 
                list_results res ON m.result = res.name
            WHERE
                f.id = $id;";

    $query = $pdo->prepare($sql);
    $query->execute();
    dbCheckErrorRes($query);
    return $query->fetch();
};
function deletePhotoRes($table, $params = []){
    global $pdo;
    $sql = "DELETE FROM $table";
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
    $query->execute();
    dbCheckErrorRes($query);
    return $params['id_fitting'];
};
?>