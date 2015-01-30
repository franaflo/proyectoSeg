<?php

session_start();
include '../ConnectionFactory.php';

if ($_SESSION["usuarioLogueado"][0]['rolUsuario'] == "administrador") {

    $id = $_GET['id'];

    $conexion = getConnection();
    
    $consulta = "DELETE FROM articulo WHERE idArticulo = " . $id;
    $conexion->query($consulta);

    closeConnection($conexion);
    
}
?>

