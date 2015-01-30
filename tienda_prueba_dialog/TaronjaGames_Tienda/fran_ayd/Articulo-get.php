<?php

session_start();
include '../ConnectionFactory.php';

if ($_SESSION["usuarioLogueado"][0]['rolUsuario'] == "administrador") {

    $id = $_POST['id'];

    $conexion = getConnection();

    $consulta = "SELECT * FROM articulo WHERE idArticulo = '" . $id . "'";
    if ($result = $conexion->query($consulta)) {
        $datos[] = $result->fetch_assoc();
    } else {
        echo "Error: " . $conexion->error;
    }

    closeConnection($conexion);

    header('Content-type: application/json');
    echo json_encode($datos);
}
?>
