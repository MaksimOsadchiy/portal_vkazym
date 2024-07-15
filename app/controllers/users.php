<?php
include("app/database/db_main.php");
/* Посмотреть вывод если не пустая строка login при нажатии кнопки
 * if(isset($_POST['login'])){
        tt($_POST);
        exit();
 */

function userAuph($user)
{
    $_SESSION['id'] = $user['id'];
    $_SESSION['login'] = $user['login'];
    $_SESSION['privilege'] = $user['privilege'];
    $_SESSION['service'] = $user['service_id'];
    if ($_SESSION['admin']) {
        header('location: ' . BASE_URL . 'admin/admin.php');
    } else {
        header('location: ' . BASE_URL);
    }
}

$pattern_for_pass = '/^[a-zA-Z]{2}\.[a-zA-Z0-9]+$/';
$errMsg = '';
$regstatus = '';
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
        $existence = selectOne_main(table: 'users', params: ['login' => $login]);
        if (!empty($existence['login']) && $existence['login'] === $login) {
            $errMsg = "Пользователь с таким именем существует";
        } else {
            $password = password_hash($password, PASSWORD_DEFAULT);
            $post = [
                'privilege' => $privilege,
                'login' => $login,
                'password' => $password,
                'service_id' => $service,
            ];
            $id = insert_main('users', $post);
            $user = selectOne_main(table: 'users', params: ['id' => $id]);

            userAuph($user);
            //$errMsg = "Пользователь " . "<strong>" . $login . "</strong>" . " создан";

        }
    }


} else {
    //echo 'GET';
    $login = '';
}

//Код для формы авторизации
if ($_SERVER['REQUEST_METHOD'] === 'POST' & isset($_POST['button_log'])) {
    $login = trim($_POST['login']);
    $password = trim($_POST['password']);
    if ($login === '' || $password === '') {
        $errMsg = "Не все поля заполнены";
    } else {
        $existence = selectOne_main(table: 'users', params: ['login' => $login]);
        if ($existence && password_verify($password, $existence['password'])) {
            //Авторизовать
            userAuph($existence);
        } else {
            if (!$existence) {
                $errMsg = "Неправильный логин";
                $login = '';
            } elseif (!password_verify($password, $existence['password'])) {
                $errMsg = "Неправильный пароль";
            }
        }
    }

}
//      $last_row = selectOne('users', ['id' => $id]);
// $password = password_hash($_POST['first_password'], PASSWORD_DEFAULT);


