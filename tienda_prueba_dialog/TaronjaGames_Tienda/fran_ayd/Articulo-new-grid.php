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
    $consultaCount = "SELECT COUNT(*) AS count FROM articulo";

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
    $consulta = "INSERT INTO articulo (idArticulo, nombreArticulo, descripcionArticulo, precioArticulo,"
            . " imagenArticulo, plataforma, tipoArticulo, ofertaArticulo)"
            . " VALUES(null, '" . $nombre . "', '" . $descrip . "', '" . $precio . "',"
            . " '" . $img . "', '" . $plataf . "', '" . $tipo . "', '" . $precioOferta . "')";
    $conexion->query($consulta);
    
    $consultaRetorno = "SELECT * FROM articulo WHERE idArticulo >= ALL(SELECT idArticulo FROM articulo)";
    $result = $conexion->query($consultaRetorno);
    
    //Tratamiento de la respuesta
    $respuesta = new stdClass();
    $respuesta->page = $page;
    $respuesta->total = $total_pages;
    $respuesta->records = $count;
    $i = 0;
    
    while ($row = $result->fetch_assoc()) {
        $respuesta->rows[$i]['id'] = $row['idArticulo'];
        $respuesta->rows[$i]['cell'] = array($row['idArticulo'], $row['nombreArticulo'], $row['descripcionArticulo'], $row['precioArticulo'], $row['imagenArticulo'],
            $row['idPlataforma'], $row['plataforma'], $row['tipoArticulo'], $row['ventaArticulo'], $row['ofertaArticulo']);
        $i++;
    }
    closeConnection($conexion);
    echo json_encode($respuesta);
    
}
?>
