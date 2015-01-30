<?php

session_start();
include '../ConnectionFactory.php';

if ($_SESSION["usuarioLogueado"][0]['rolUsuario'] == "administrador") {

    $id = $_POST['id'];

    $consulta = "DELETE FROM pedido WHERE idPedido = '" . $id . "'";

    $conexion = getConnection();

    $conexion->query($consulta);

    closeConnection($conexion);
    
}
?>

