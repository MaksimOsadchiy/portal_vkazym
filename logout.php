<?php
session_start();
include 'path.php';

unset($_SESSION['id']);
unset($_SESSION['login']);
unset($_SESSION['privilege']);
unset($_SESSION['service']);

header('location: ' . BASE_URL);