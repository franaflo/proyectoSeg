<?php

session_start();
include '../ConnectionFactory.php';

if ($_SESSION["usuarioLogueado"][0]['rolUsuario'] == "administrador") {

    $id = $_POST['id'];
    $fecha = $_POST['fechaPedido'];
    $cliente = $_POST['idCliente'];

    $consulta = "INSERT INTO pedido (idPedido, fechaPedido, idCliente)"
            . " VALUES(null, '" . $fecha . "', '" . $cliente . "')";

    $conexion = getConnection();

    if ($conexion->query($consulta)) {
        $datos[] = $result->fetch_assoc();
    } else {
        echo "Error: " . $conexion->error;
    }

    closeConnection($conexion);


    header('Content-type: application/json');
    echo json_encode($datos);
}

?>
