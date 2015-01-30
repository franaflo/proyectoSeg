<?php

session_start();
include '../ConnectionFactory.php';

if ($_SESSION["usuarioLogueado"][0]['rolUsuario'] == "administrador") {

    $id = $_POST['id'];

    $consulta = "DELETE FROM usuario WHERE idUsuario = '" . $id . "'";

    $conexion = getConnection();

    $conexion->query($consulta);

    closeConnection($conexion);


    header('Content-type: application/json');
    echo json_encode($datos);
}
?>

