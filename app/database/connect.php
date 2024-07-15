<?php

$driver = 'mysql';
$host = 'localhost';
$db_name = 'tehnika';
$db_user = 'userTehnika';
$db_pass = 'P@ssw0rd';
$charset = 'utf8';
$options = [pdo::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC];
try{
    $pdo = new PDO(
        dsn:"$driver:host=$host;dbname=$db_name;charset=$charset", username:$db_user, password:$db_pass, options:$options
    );
}catch (PDOException $i){
    die("Ошибка подключения к базе");
}

