<?php

$driver = 'mysql';
$host = 'localhost';
$db_name = 'portal_vkazym';
$db_user = 'portal_vkazym';
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
    die("Ошибка подключения к базе");
}

?>