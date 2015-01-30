<?php

session_start();
include '../ConnectionFactory.php';

if ($_SESSION["usuarioLogueado"][0]['rolUsuario'] == "administrador") {

    $id = $_POST['id'];
    $fecha = $_POST['fechaPedido'];
    $cliente = $_POST['idCliente'];

    $consulta = "UPDATE pedido"
            . "SET fechaPedido = '" . $fecha . "', idCliente = '" . $cliente . "'"
            . "WHERE idPedido = '" . $id . "'";

    $conexion = getConnection();

    $conexion->query($consulta);

    closeConnection($conexion);
    
}

?>
