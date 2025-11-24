<?php
header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Método de solicitud no permitido.';
    echo json_encode($response);
    exit();
}

if (!isset($_FILES['fileUpload']) || $_FILES['fileUpload']['error'] !== UPLOAD_ERR_OK) {
    $response['message'] = 'Error al subir el archivo o no se seleccionó ninguno.';
    echo json_encode($response);
    exit();
}

$semestre = $_POST['semestre'] ?? '';
$materia = $_POST['materia'] ?? '';

if (empty($semestre) || empty($materia)) {
    $response['message'] = 'Semestre y Materia son campos obligatorios.';
    echo json_encode($response);
    exit();
}

$file = $_FILES['fileUpload'];
$allowedExtensions = ['pdf', 'docx', 'jpg', 'jpeg', 'png'];
$fileExt = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

if (!in_array($fileExt, $allowedExtensions)) {
    $response['message'] = 'Tipo de archivo no permitido. Solo se aceptan PDF, DOCX, JPG, JPEG, PNG.';
    echo json_encode($response);
    exit();
}

if ($file['size'] > 5000000) {
    $response['message'] = 'El archivo es demasiado grande (máximo 5MB).';
    echo json_encode($response);
    exit();
}

$uploadDir = 'uploads/' . $semestre . '/' . $materia . '/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$fileNameNew = uniqid('', true) . '.' . $fileExt;
$fileDestination = $uploadDir . $fileNameNew;

require_once 'db_connect.php';

if (move_uploaded_file($file['tmp_name'], $fileDestination)) {
    try {
        $stmt = $pdo->prepare('INSERT INTO archivos (nombre_original, nombre_servidor, ruta_archivo, semestre, materia, tipo_mime, tamano) VALUES (?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([
            $file['name'],
            $fileNameNew,
            $fileDestination,
            $semestre,
            $materia,
            $file['type'],
            $file['size']
        ]);

        $response['success'] = true;
        $response['message'] = 'Archivo subido exitosamente y metadatos guardados.';
        $response['file_path'] = $fileDestination;
        $response['original_name'] = $file['name'];
        $response['semestre'] = $semestre;
        $response['materia'] = $materia;
    } catch (PDOException $e) {
        // Si falla la inserción en la DB, aún así el archivo se subió, pero reportamos el error de DB
        $response['message'] = 'Archivo subido, pero hubo un error al guardar los metadatos: ' . $e->getMessage();
        // Opcional: podrías considerar eliminar el archivo si la inserción en DB falla
        // unlink($fileDestination);
    }
} else {
    $response['message'] = 'Hubo un error al mover el archivo.';
}

echo json_encode($response);
?>