<?php
require_once("../../Models/User.php");

if ($_SERVER['REQUEST_METHOD'] == "GET") :
    $email = $_GET['email'];
    $pass = $_GET['pass'];

    echo User::login($email, $pass);

endif;
