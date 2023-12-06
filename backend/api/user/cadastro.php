<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    require_once('../../Models/User.php');
    $data = json_decode(file_get_contents("php://input"), true);

    // Verificando se os dados foram recebidos corretamente
    if (isset($data['name']) && isset($data['email']) && isset($data['pass']) && isset($data['conf_pass'])) {
        $name = $data['name'];
        $email = $data['email'];
        $pass = $data['pass'];
        $confPass = $data['conf_pass'];

        header("Content-Type: application/json");
        echo User::cadastro($name, $email, $pass, $confPass);
    }
    
}

?>

<html>