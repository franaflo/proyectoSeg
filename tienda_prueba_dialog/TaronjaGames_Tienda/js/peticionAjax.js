function getAjax($tabla, $order) {

    $datos = {'tabla': $tabla, 'orden': $order};

    return $.ajax({
        type: 'POST',
        url: 'persistencia/GenericDAO.php',
        data: $datos
    });
}

function getAjaxById($tabla, $id) {

    $datos = {'tabla': $tabla, 'id': $id};

    return $.ajax({
        type: 'POST',
        url: 'persistencia/GenericGetByIdDAO.php',
        data: $datos
    });
}

function delAjaxById($tabla, $id) {

    $datos = {'tabla': $tabla, 'id': $id};

    return $.ajax({
        type: 'POST',
        url: 'persistencia/GenericDeleteByIdDAO.php',
        data: $datos
    });
}

function getAjaxSubseccionesArticulos($parametro1, $parametro2, $order) {

    $datos = {'parametro1': $parametro1, 'parametro2': $parametro2, 'orden': $order};

    return $.ajax({
        type: 'POST',
        url: 'persistencia/SubseccionArticulosDAO.php',
        data: $datos
    });
    alert($datos);

}

function getAjaxSubseccionesGenerico($tabla, $parametro, $order) {

    $datos = {'tabla': $tabla, 'parametro': $parametro, 'orden': $order};

    return $.ajax({
        type: 'POST',
        url: 'persistencia/SubseccionGenericoDAO.php',
        data: $datos
    });
    alert($datos);
}

function getAjaxRankingSubseccion($parametro) {

    $datos = {'parametro': $parametro};

    return $.ajax({
        type: 'POST',
        url: 'persistencia/SubseccionRankingDAO.php',
        data: $datos
    });

}

function getAjaxRanking() {

    return $.ajax({
        type: 'POST',
        url: 'persistencia/RankingDAO.php'
    });
}


function getAjaxUsuarioNew($rol, $nombre, $ape1, $ape2, $nif, $tf, $correo, $login, $password) {
    $datos = {'rol': $rol, 'nombre': $nombre, 'ape1': $ape1, 'ape2': $ape2, 'nif': $nif, 'tf': $tf, 'correo': $correo, 'login': $login, 'password': $password};

    return $.ajax({
        type: 'POST',
        url: 'persistencia/usuario/Usuario-new.php',
        data: $datos
    });
}

function getAjaxUsuarioEdit($id, $rol, $nombre, $ape1, $ape2, $nif, $tf, $correo, $login, $password) {
    $datos = {'idUsuario': $id, 'rolUsuario': $rol, 'nombreUsuario': $nombre, 'apellido1Usuario': $ape1, 'apellido2Usuario': $ape2,
        'dniUsuario': $nif, 'telefonoUsuario': $tf, 'emailUsuario': $correo, 'loginUsuario': $login, 'passwordUsuario': $password};

    return $.ajax({
        type: 'POST',
        url: 'persistencia/usuario/Usuario-edit.php',
        data: $datos
    });
}

function getAjaxArticuloNew($nombre, $descrip, $precio, $img, $plataforma, $tipo, $precioOferta) {
    $datos = {'nombreArticulo': $nombre, 'descripcionArticulo': $descrip, 'precioArticulo': $precio,
        'imagenArticulo': $img, 'plataforma': $plataforma, 'tipoArticulo': $tipo, 'ofertaArticulo': $precioOferta};

    return $.ajax({
        type: 'POST',
        url: 'persistencia/articulo/Articulo-new.php',
        data: $datos
    });
}

function getAjaxArticuloEdit($id, $nombre, $descrip, $precio, $img, $idPlataforma, $plataforma, $tipo, $precioOferta) {
    $datos = {'idArticulo': $id, 'nombreArticulo': $nombre, 'descripcionArticulo': $descrip, 'precioArticulo': $precio,
        'imagenArticulo': $img, 'idPlataforma': $idPlataforma, 'plataforma': $plataforma, 'tipoArticulo': $tipo, 'ofertaArticulo': $precioOferta};

    return $.ajax({
        type: 'POST',
        url: 'persistencia/articulo/Articulo-edit.php',
        data: $datos
    });
}



//Comprueba si existe el login introducido en la base de datos al registrar nuevo usuario
function getAjaxLoginGet($login) {
    $datos = {'login': $login};
    return $.ajax({
        type: 'GET',
        url: 'persistencia/LoginGetDAO.php',
        data: $datos
    });
}



//GESTIÓN DE SESIÓN DE USUARIO
function getAjaxLogIn($login, $password) {
    $datos = {'login': $login, 'password': $password};
    return $.ajax({
        type: 'POST',
        url: 'seguridad/LogInFromDB.php',
        data: $datos
    });
}

function getAjaxLogOut() {

    return $.ajax({
        type: 'POST',
        url: 'seguridad/LogOut.php'
    });
}

