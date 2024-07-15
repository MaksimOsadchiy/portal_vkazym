<?php

session_start();
require ('connect_main.php');

function tt_main($value){
    echo '<pre>';
print_r($value);
    echo '</pre>';
}
//Проверка выполнения запроса к БД
function dbCheckError_main ($query){
    $errInfo = $query->errorInfo();
    if($errInfo[0] !== PDO::ERR_NONE) {
        echo $errInfo[2];
        exit();
    }
    return true;
}
//Запрос на получение данных с одной таблицы
function selectALL_main($table, $params = [])
{
    global $pdo_main;
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
        //tt($sql);
        //exit();
        $query = $pdo_main->prepare($sql);
        $query->execute();
        dbCheckError_main($query);
        return $query->fetchALL();
}

//tt(selectALL('users'));
//Запрос на получение одной строки с выбранной таблицы
function selectOne_main($table, $params = [])
{
    global $pdo_main;
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
    $query = $pdo_main->prepare($sql);
    $query->execute();
    dbCheckError_main($query);
    return $query->fetch();
}


  //  $params = [
  //      'age' => 11,
  //      'name' => 'Kiriysha',
  //      'password' => 'dudec228'
  //  ];

//tt(selectALL('users', $params));
//tt(selectOne('users'));

//Запись в таблицу БД
function insert_main($table, $params){
    global $pdo_main;
    //INSERT INTO `users` (name, age, password) VALUES ('LUBUSHKA', '5', 'abobus1998');
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

    $query = $pdo_main->prepare($sql);
    $query->execute();
    dbCheckError_main($query);
    return ($pdo_main->lastInsertId());
}
$arrData = [
    'name' => '1',
    'age' => '28',
    'password' => '123'
];
//insert('users', $arrData);

//Обновление строки в таблице
//UPDATE `users` SET age = '999', `password` = '999' WHERE id = 1
function update_main($table, $id, $params){
    global $pdo_main;
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

    $query = $pdo_main->prepare($sql);
    $query->execute();
    dbCheckError_main($query);
}

$param = [
    'name' => 'Qwe',
    'age' => '40',
];
//update('users', '1', $param);

//Удаление
//DELETE FROM `users` WHERE id = 19
function delete_main($table, $id){
    global $pdo_main;
    $sql = "DELETE FROM $table WHERE id = $id";
    $query = $pdo_main->prepare($sql);
    $query->execute();
    dbCheckError_main($query);
}
//delete('users', '13');