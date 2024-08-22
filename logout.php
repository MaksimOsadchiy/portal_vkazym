<?php
    session_start();
    include 'path.php';

    $_SESSION = array();
    session_destroy();
    header('location: ' . BASE_URL . "log.php");
?>