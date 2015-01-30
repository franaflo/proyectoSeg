<?php
session_start();
include '../ConnectionFactory.php';

if ($_SESSION["usuarioLogueado"][0]['rolUsuario'] == "administrador") {

    $page = $_GET['page']; // get the requested page
    $limit = $_GET['rows']; // get how many rows we want to have into the grid
    $sidx = $_GET['sidx']; // get index row - i.e. user click to sort
    $sord = $_GET['sord']; // get the direction

    if (!$sidx) {
        $sidx = 1;
    }

    $conexion = getConnection();
    $consultaCount = "SELECT COUNT(*) AS count FROM usuario";

    $result = $conexion->query($consultaCount);
    $row = $result->fetch_assoc();
    $count = $row['count'];

    if ($count > 0) {
        $total_pages = ceil($count / $limit);
    } else {
        $total_pages = 0;
    }
    if ($page > $total_pages)
        $page = $total_pages;
    $start = $limit * $page - $limit; // do not put $limit*($page - 1)
    
    //Ejecución de operaciones en base de datos
    $consulta = "INSERT INTO usuario (idUsuario, rolUsuario, nombreUsuario, apellido1Usuario, apellido2Usuario,"
            . " dniUsuario, telefonoUsuario, emailUsuario, loginUsuario, passwordUsuario)"
            . " VALUES(null, '" . $rol . "', '" . $nombre . "', '" . $ape1 . "', '" . $ape2 . "',"
            . " '" . $nif . "', '" . $tf . "', '" . $correo . "', '" . $login . "', '" . $password . "')";
    $conexion->query($consulta);
    
    $consultaRetorno = "SELECT * FROM usuario WHERE loginUsuario='" . $login . "'";
    $result = $conexion->query($consultaRetorno);
    
    //Tratamiento de la respuesta
    $respuesta = new stdClass();
    $respuesta->page = $page;
    $respuesta->total = $total_pages;
    $respuesta->records = $count;
    $i = 0;

    while ($row = $result->fetch_assoc()) {
        $respuesta->rows[$i]['id'] = $row['idUsuario'];
        $respuesta->rows[$i]['cell'] = array($row['idUsuario'], $row['rolUsuario'], $row['nombreUsuario'], $row['apellido1Usuario'], $row['apellido2Usuario'],
            $row['dniUsuario'], $row['telefonoUsuario'], $row['emailUsuario'], $row['loginUsuario'], $row['passwordUsuario']);
        $i++;
    }
    closeConnection($conexion);
    echo json_encode($respuesta);
}
?>




<!--//Consulta sin grid
//    $id = $_POST['id'];
//    $rol = $_POST['rolUsuario'];
//    $nombre = $_POST['nombreUsuario'];
//    $ape1 = $_POST['apellido1Usuario'];
//    $ape2 = $_POST['apellido2Usuario'];
//    $nif = $_POST['dniUsuario'];
//    $tf = $_POST['telefonoUsuario'];
//    $correo = $_POST['emailUsuario'];
//    $login = $_POST['loginUsuario'];
//    $password = $_POST['passwordUsuario'];
//    
//    $page = $_GET['page']; // get the requested page
//    $limit = $_GET['rows']; // get how many rows we want to have into the grid
//    $sidx = $_GET['sidx']; // get index row - i.e. user click to sort
//    $sord = $_GET['sord']; // get the direction
//
//    $consulta = "INSERT INTO usuario (idUsuario, rolUsuario, nombreUsuario, apellido1Usuario, apellido2Usuario,"
//            . " dniUsuario, telefonoUsuario, emailUsuario, loginUsuario, passwordUsuario)"
//            . " VALUES(null, '" . $rol . "', '" . $nombre . "', '" . $ape1 . "', '" . $ape2 . "', "
//            . "'" . $nif . "', '" . $tf . "', '" . $correo . "', '" . $login . "', '" . $password . "')";
//
//    $conexion = getConnection();
//
//    if ($conexion->query($consulta)) {
//        $datos[] = $result->fetch_assoc();
//    } else {
//        echo "Error: " . $conexion->error;
//    }
//
//    closeConnection($conexion);
//
//
//    header('Content-type: application/json');
//    echo json_encode($datos);-->
