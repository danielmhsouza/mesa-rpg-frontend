<?php
require_once("conexao.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

class User
{
    static $name;
    static $email;
    static $id;

    public static function login($email, $pass)
    {

        $db = Database::getInstance()->getConnection();
        $query = "SELECT * FROM user WHERE email = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$email]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($pass, $user['password'])) {
            self::$name = $user['name'];
            self::$email = $user['email'];
            self::$id = $user['id'];
            return json_encode(["status" => 200, "approved" => "1", "id" => self::$id]);
        }

        return json_encode(["status" => 500, "approved" => "0"]);
    }

    public static function cadastro($name, $email, $pass, $conf_pass)
    {
        if ($pass != $conf_pass) {
            return json_encode("Senhas diferentes!");
        }
        $db = Database::getInstance()->getConnection();
        $query = "SELECT email FROM user WHERE email = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            return json_encode(["approved" => "0", "msg" => "email já cadastrado!"]);
        }
        $nPass = password_hash($pass, PASSWORD_DEFAULT);

        try {

            $query = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
            $stmt = $db->prepare($query);
            $stmt->execute([$name, $email, $nPass]);
            return json_encode(["status" => 200, "approved" => "1", "msg" => "usuario cadastrado"]);
        } catch (Error) {
            return json_encode(["status" => 500, "approved" => "0", "msg" => "não foi"]);
        }
    }

    public static function getUser($id)
    {
        $db = Database::getInstance()->getConnection();
        // pegar dados das campanhas
        $query = "SELECT * FROM user WHERE id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            $u = [
                "name" => $user['name'],
                "email" => $user['email']
            ];

            return json_encode(["approved" => "1", "user" => $u]);
        }

        return json_encode(["approved" => "0", "msg" => "Usuário inválido"]);
    }
}
