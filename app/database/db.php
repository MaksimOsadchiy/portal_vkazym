<?php

require ('connect.php');

function tt($value){
    echo '<pre>';
print_r($value);
    echo '</pre>';
}
//Проверка выполнения запроса к БД
function dbCheckError ($query){
    $errInfo = $query->errorInfo();
    if($errInfo[0] !== PDO::ERR_NONE) {
        echo $errInfo[2];
        exit();
    }
    return true;
}
//Запрос на получение данных с одной таблицы
function selectALL($table, $params = [])
{
    global $pdo;
    $sql = "SELECT * FROM $table";

    if (!empty($params)) {
        $i = 0;
        foreach ($params as $key => $value) {
            if (!is_numeric($value)) {
                $value = "'" .$value."'";
            }
            if ($i === 0) {
                $sql = $sql . " WHERE $key=$value";
            } else {
                $sql = $sql . " AND $key=$value";
            }
            $i++;
        }
    }
        $query = $pdo->prepare($sql);
        $query->execute();
        dbCheckError($query);
        return $query->fetchALL();
}

function selectALL_join($table, $params = [], $joins = []) {
    global $pdo;
    $sql = "SELECT * FROM $table";

    // Добавление JOIN-запросов
    if (!empty($joins)) {
        foreach ($joins as $join) {
            $sql .= " " . $join;
        }
    }

    // Добавление параметров (условий)
    if (!empty($params)) {
        $i = 0;
        foreach ($params as $key => $value) {
            if (!is_numeric($value)) {
                $value = "'" . $value . "'";
            }
            if ($i === 0) {
                $sql = $sql . " WHERE $key=$value";
            } else {
                $sql = $sql . " AND $key=$value";
            }
            $i++;
        }
    }
    $query = $pdo->prepare($sql);
    $query->execute();
    dbCheckError($query);
    return $query->fetchAll(PDO::FETCH_ASSOC);
}

//tt(selectALL('users'));
//Запрос на получение одной строки с выбранной таблицы
function selectOne($table, $params = [])
{
    global $pdo;
    $sql = "SELECT * FROM $table";

    if (!empty($params)) {
        $i = 0;
        foreach ($params as $key => $value) {
            if (!is_numeric($value)) {
                $value = "'" .$value."'";
            }
            if ($i === 0) {
                $sql = $sql . " WHERE $key=$value";
            } else {
                $sql = $sql . " AND $key=$value";
            }
            $i++;
        }
    }
   //$sql = $sql . " LIMIT 1";
    //tt($sql);
    //exit();
    $query = $pdo->prepare($sql);
    $query->execute();
    dbCheckError($query);
    return $query->fetch();
}


    $params = [
        'age' => 11,
        'name' => 'K',
        'password' => '123'
    ];

//tt(selectALL('users', $params));
//tt(selectOne('users'));

//Запись в таблицу БД
function insert($table, $params){
    global $pdo;
    //INSERT INTO `users` (name, age, password) VALUES ('L', '5', 'a1998');
    $i = 0;
    $coll = '';
    $mask = '';
    foreach ($params as $key => $value) {
        if ($i === 0){
            $coll = $coll . "$key";
            $mask = $mask . "'" . "$value" . "'";
        }else {
            $coll = $coll . ", $key";
            $mask = $mask . ", '" . "$value" . "'";
        }
        $i++;
    }

    $sql = "INSERT INTO $table ($coll) VALUES ($mask)";
//tt($sql);
//exit;

    $query = $pdo->prepare($sql);
    $query->execute();
    dbCheckError($query);
    return ($pdo->lastInsertId());
}
$arrData = [
    'name' => '1',
    'age' => '28',
    'password' => '123'
];
//insert('users', $arrData);

//Обновление строки в таблице
//UPDATE `users` SET age = '999', `password` = '999' WHERE id = 1
function update($table, $id, $params){
    global $pdo;
    $i = 0;
    $str = '';
    foreach ($params as $key => $value) {
        if ($i === 0){
            $str = $str . $key . " = '" . $value . "'";
        }else {
            $str = $str . ", " . $key . " = '" . $value . "'";
        }
        $i++;
    }

    $sql = "UPDATE $table SET $str WHERE id = $id";
//tt($sql);
//exit;

    $query = $pdo->prepare($sql);
    $query->execute();
    dbCheckError($query);
}

$param = [
    'name' => 'Qwe',
    'age' => '40',
];
//update('users', '1', $param);

//Удаление
//DELETE FROM `users` WHERE id = 19
function delete($table, $id){
    global $pdo;
    $sql = "DELETE FROM $table WHERE id = $id";
    $query = $pdo->prepare($sql);
    $query->execute();
    dbCheckError($query);
}
//delete('users', '13');