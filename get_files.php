<?php
header('Content-Type: application/json');

require_once 'db_connect.php';

$response = ['success' => false, 'files' => []];

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    $response['message'] = 'Método de solicitud no permitido.';
    echo json_encode($response);
    exit();
}

$semestre = $_GET['semestre'] ?? '';
$materia = $_GET['materia'] ?? '';

if (empty($semestre) || empty($materia)) {
    $response['message'] = 'Semestre y Materia son campos obligatorios.';
    echo json_encode($response);
    exit();
}

try {
    $stmt = $pdo->prepare('SELECT nombre_original, ruta_archivo, tipo_mime FROM archivos WHERE semestre = ? AND materia = ?');
    $stmt->execute([$semestre, $materia]);
    $files = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $response['success'] = true;
    $response['files'] = $files;
} catch (PDOException $e) {
    $response['message'] = 'Error al recuperar archivos: ' . $e->getMessage();
}

echo json_encode($response);
?>