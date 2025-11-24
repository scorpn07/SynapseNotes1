<?php
header('Content-Type: application/json');

$response = ['success' => false, 'files' => [], 'message' => ''];

if (!isset($_GET['semestre']) || !isset($_GET['materia'])) {
    $response['message'] = 'Semestre y Materia son parámetros obligatorios.';
    echo json_encode($response);
    exit();
}

$semestre = $_GET['semestre'];
$materia = $_GET['materia'];

require_once 'db_connect.php';

try {
    $stmt = $pdo->prepare('SELECT nombre_original, ruta_archivo, tipo_mime FROM archivos WHERE semestre = ? AND materia = ?');
    $stmt->execute([$semestre, $materia]);
    $files = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($files) {
        $response['success'] = true;
        $response['files'] = $files;
    } else {
        $response['message'] = 'No se encontraron archivos para esta materia y semestre.';
    }
} catch (PDOException $e) {
    $response['message'] = 'Error de base de datos: ' . $e->getMessage();
}

echo json_encode($response);
?>