<?php

include_once(__DIR__ . "/../database/dbFunction.php");

function userAuph($user){
	$_SESSION['id'] = $user['id'];
	$_SESSION['login'] = $user['login'];
    $_SESSION['service'] = $user['service_id'];
	$_SESSION['service_name'] = $user['service_name'];
	$_SESSION['accessibility'] = $user['accessibility'];
	if ($user['privilege'] === 1) {
		header('location: ' . BASE_URL . 'admin.php');
	} else {
		header('location: ' . BASE_URL);
	};
};

$pattern_for_pass = '/^[a-zA-Z]{2}\.[a-zA-Z0-9]+$/';
$errMsg = '';
//Код для формы регистрации
if ($_SERVER['REQUEST_METHOD'] === 'POST' & isset($_POST['button-reg'])) {
	$login = trim($_POST['login']);
	$password = trim($_POST['first_password']);
	$second_password = $_POST['second_password'];
	$privilege = 0;
	$service = $_POST['service'];


	if ($login === '' || $password === '' || $second_password === '') {
		$errMsg = 'Не все поля заполнены';
	} elseif (!preg_match($pattern_for_pass, $login)) {
		$errMsg = "Логин должен соответствовать формату ii.ivanov т.е. 2 символа(инициалы), точка, фамилия";
	} elseif (mb_strlen($password, encoding: 'UTF8') < 8) {
		$errMsg = "Пароль должен быть не менее 8 символов";
	} elseif ($second_password !== $password) {
		$errMsg = "Пароли не совпадают";
	} else {
		$existence = selectOneRes(table: 'users', params: ['login' => $login]);
		if (!empty($existence['login']) && $existence['login'] === $login) {
			$errMsg = "Пользователь с таким именем существует";
		} else {
			$password = password_hash($password, PASSWORD_DEFAULT);
			$post = [
				'privilege' => $privilege,
				'login' => $login,
				'service_id' => $service,
			];
			$id = insertRes('users', $post);
			$post = [
				'user_id' => $id,
				'password' => $password,
			];
			insertRes('passwords', $post);
			$user = selectOneRes(table: 'users', params: ['id' => $id]);
            $user['service_name'] = selectOneRes('services', ['id' => $service]);

			userAuph($user);
			//$errMsg = "Пользователь " . "<strong>" . $login . "</strong>" . " создан";
		};
	};
} else {
	//echo 'GET';
	$login = '';
};

//Код для формы авторизации
if ($_SERVER['REQUEST_METHOD'] === 'POST' & isset($_POST['button_log'])) {
	$login = trim($_POST['login']);
	$password = trim($_POST['password']);
	if ($login === '' || $password === '') {
		$errMsg = "Не все поля заполнены";
	} else {
		$existence = selectOneRes(table: 'users', params: ['login' => $login]);
		if ($existence){
			$correctPassword = selectOneRes(table: 'passwords', params: ['user_id' => $existence['id']]);
			if (password_verify($password, $correctPassword['password'])){
				$existence['service_name'] = selectOneRes('services', ['id' => $existence['service_id']]);
				$existence['accessibility'] = temp($existence['id_role']);
				userAuph($existence);
			} else {
				$errMsg = "Неправильный пароль";
			};
		} else {
				$errMsg = "Неправильный логин";
				$login = '';
		};
	};
};

?>
