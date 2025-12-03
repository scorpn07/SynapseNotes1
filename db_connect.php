<?php
// db_connect.php

$host = 'bhq5m9k26eqnsa2wucx8-mysql.services.clever-cloud.com'; // O la IP de tu servidor de base de datos
$db   = 'bhq5m9k26eqnsa2wucx8'; // Nombre de tu base de datos
$user = 'urlamskdbwlec7ge'; // Tu usuario de base de datos
$pass = 'j3Fvkdhb1VhXdSYq8HrU'; // Tu contraseña de base de datos
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}
?>