opcionElegida = "Grabar cliente";

listaItems = new Array("Cuentas", "Movimientos", "Clientes", "Empleados", "Entidades", "Sucursales");
listaCabeceraTabla = new Array("NIF", "Nombre", "Entidad", "Sucursal");
listaContenidosTabla = new Array("0000000", "Cliente-", "Taronja Bank", "Mislata");



function ocultarDesplegable(elemento) {
  
    if(elemento !== document.getElementById("menuDesplegable") && elemento !==  document.getElementById("bloqueIconoDesplegable")){
        document.getElementById("menuDesplegable").style.display = "none";
    } else {
          if (document.getElementById("menuDesplegable").style.display === "block") {
        document.getElementById("menuDesplegable").style.display = "none";
    } else {
        document.getElementById("menuDesplegable").style.display = "block";
    }
    }
    
}

function mostrarLogin(botonPulsado) {

    //Definición del rol del usuario con botón de login
    if (botonPulsado.id === "botonClientes") {
        rol = "cliente";
    } else if (botonPulsado.id === "botonEmpleados") {
        rol = "empleado";
    }

    //Cambiando los botones de login del header
    var tituloBotonesLogin = document.getElementById("tituloLogin");
    tituloBotonesLogin.removeChild(tituloBotonesLogin.firstChild);
    var textoTituloBotonesLogin = document.createTextNode("Cambiar a...");
    tituloBotonesLogin.appendChild(textoTituloBotonesLogin);


    //Limpiando contenidos
    var contextoContenidos = document.getElementById("contenidos");
    contextoContenidos.innerHTML = "";

    //Generando login
    var tituloLogin = document.createElement("p");
    tituloLogin.id = "tituloLogin";

    var textoTituloLogin = document.createTextNode("Acceso para " + rol + "s");

    tituloLogin.appendChild(textoTituloLogin);

    var login = document.createElement("section");
    login.id = "cajaLogin";

    var usuario = document.createElement("section");
    usuario.id = "seccionUsuario";

    var password = document.createElement("section");
    password.id = "seccionPassword";

    var botonLogin = document.createElement("div");
    botonLogin.id = "botonLoguear";
    botonLogin.className = "iconoBackEnd";
    botonLogin.onclick = function() {
        cambiarMenuVertical();
        mostrarPanelesRol(rol);

        if (rol === "cliente") {
            document.getElementById("botonClientes").style.display = "none";
            document.getElementById("botonEmpleados").style.display = "block";
        } else if (rol === "empleado") {
            document.getElementById("botonEmpleados").style.display = "none";
            document.getElementById("botonClientes").style.display = "block";
        }
    };

    var textoBotonLogin = document.createTextNode("Acceder");
    botonLogin.appendChild(textoBotonLogin);

    login.appendChild(tituloLogin);
    login.appendChild(usuario);
    login.appendChild(password);
    login.appendChild(botonLogin);

    var labelUsuario = document.createElement("label");
    labelUsuario.className = "labelLogin";
    labelUsuario.for = "campoUsuario";
    var textoLabelUsuario = document.createTextNode("Usuario:");
    labelUsuario.appendChild(textoLabelUsuario);

    var inputUsuario = document.createElement("input");
    inputUsuario.id = "campoUsuario";
    inputUsuario.className = "campoLogin";
    inputUsuario.type = "text";
    inputUsuario.name = "campoUsuario";
    inputUsuario.size = "13";

    usuario.appendChild(labelUsuario);
    usuario.appendChild(inputUsuario);

    var labelPassword = document.createElement("label");
    labelPassword.className = "labelLogin";
    labelPassword.for = "campoPassword";
    var textoLabelPassword = document.createTextNode("Password:");
    labelPassword.appendChild(textoLabelPassword);

    var inputPassword = document.createElement("input");
    inputPassword.id = "campoPassword";
    inputPassword.className = "campoLogin";
    inputPassword.type = "password";
    inputPassword.name = "campoPassword";
    inputPassword.size = "13";

    password.appendChild(labelPassword);
    password.appendChild(inputPassword);

    contextoContenidos.appendChild(login);
}

function cambiarMenuVertical() {

    //Borrando el menú vertical actual
    var listaHijosMenu = document.getElementById("menuVertical").childNodes;
    for (var i = (listaHijosMenu.length - 1); i >= 0; i--) {
        listaHijosMenu[i].parentNode.removeChild(listaHijosMenu[i]);
    }

    //Creando el menu de gestión de la tabla
    var lista = document.createElement("section");
    lista.id = "listaGestion";
    lista.className = "listaMenu";
    var contextoActual = document.getElementById("menuVertical");
    contextoActual.appendChild(lista);

    var tituloLista = document.createElement("div");
    tituloLista.id = "tituloMenuEmpleados";
    tituloLista.className = "celdaTituloMenuV";
    tituloLista.onclick = function() {
        mostrarPanelesRol(rol);
    };
    var textoTitulo = document.createTextNode("Gestión " + rol + "s");
    tituloLista.appendChild(textoTitulo);
    lista.appendChild(tituloLista);

    if (rol === "cliente") {
        var numItems = 2;
    } else if (rol === "empleado") {
        var numItems = listaItems.length;
    }

    for (var i = 0; i < numItems; i++) {
        var itemLista = document.createElement("div");
        itemLista.className = "itemMenuV";
        itemLista.onclick = function() {
            //Limpiando el bloque de contenidos
            contextoActual = document.getElementById("contenidos");
            contextoActual.innerHTML = "";

            mostrarPanelesTabla();
        };

        var textoItem = document.createTextNode(listaItems[i]);
        itemLista.appendChild(textoItem);
        lista.appendChild(itemLista);
    }

}

function mostrarPanelesRol(rol) {

    //Limpiando contenidos
    var contextoContenidos = document.getElementById("contenidos");
    contextoContenidos.innerHTML = "";

    //Generando paneles
    var botoneraMain = document.createElement("div");
    botoneraMain.id = "botoneraMainEmpleado";
    botoneraMain.className = "botoneraMain";

    var filaPaneles1 = document.createElement("div");
    filaPaneles1.id = "filaIconosBackEndMain1";
    filaPaneles1.className = "filaIconosBackEnd";

    var panelCuentas = document.createElement("div");
    panelCuentas.id = "iconoCuentas";
    panelCuentas.className = "cajaIconoBackEnd";
    panelCuentas.onclick = mostrarPanelesTabla;
    var enlaceCuentas = document.createElement("a");
    enlaceCuentas.href = "#";
    var imgCuentas = document.createElement("img");
    imgCuentas.className = "iconoBackEnd";
    imgCuentas.alt = "Icono Cuentas";
    imgCuentas.src = "img/icon/iconoCuentas.png";
    enlaceCuentas.appendChild(imgCuentas);
    panelCuentas.appendChild(enlaceCuentas);

    var panelMovimientos = document.createElement("div");
    panelMovimientos.id = "iconoMovimientos";
    panelMovimientos.className = "cajaIconoBackEnd";
    panelMovimientos.onclick = mostrarPanelesTabla;
    var enlaceMovimientos = document.createElement("a");
    enlaceMovimientos.href = "#";
    var imgMovimientos = document.createElement("img");
    imgMovimientos.className = "iconoBackEnd";
    imgMovimientos.alt = "Icono Movimientos";
    imgMovimientos.src = "img/icon/iconoMovimientos.png";
    enlaceMovimientos.appendChild(imgMovimientos);
    panelMovimientos.appendChild(enlaceMovimientos);

    filaPaneles1.appendChild(panelCuentas);
    filaPaneles1.appendChild(panelMovimientos);
    botoneraMain.appendChild(filaPaneles1);
    contextoContenidos.appendChild(botoneraMain);


    if (rol === "empleado") {

        cambiarMenuVertical();

        //Fila de paneles 1
        var panelClientes = document.createElement("div");
        panelClientes.id = "iconoClientes";
        panelClientes.className = "cajaIconoBackEnd";
        panelClientes.onclick = mostrarPanelesTabla;
        var enlaceClientes = document.createElement("a");
        enlaceClientes.href = "#";
        var imgClientes = document.createElement("img");
        imgClientes.className = "iconoBackEnd";
        imgClientes.alt = "Icono Clientes";
        imgClientes.src = "img/icon/iconoClientes.png";
        enlaceClientes.appendChild(imgClientes);
        panelClientes.appendChild(enlaceClientes);
        filaPaneles1.appendChild(panelClientes);


        //Fila de paneles 2
        var filaPaneles2 = document.createElement("div");
        filaPaneles2.id = "filaIconosBackEndMain2";
        filaPaneles2.className = "filaIconosBackEnd";

        var panelEmpleados = document.createElement("div");
        panelEmpleados.id = "iconoEmpleados";
        panelEmpleados.className = "cajaIconoBackEnd";
        panelEmpleados.onclick = mostrarPanelesTabla;
        var enlaceEmpleados = document.createElement("a");
        enlaceEmpleados.href = "#";
        var imgEmpleados = document.createElement("img");
        imgEmpleados.className = "iconoBackEnd";
        imgEmpleados.alt = "Icono Empleados";
        imgEmpleados.src = "img/icon/iconoEmpleados.png";
        enlaceEmpleados.appendChild(imgEmpleados);
        panelEmpleados.appendChild(enlaceEmpleados);

        var panelEntidades = document.createElement("div");
        panelEntidades.id = "iconoEntidades";
        panelEntidades.className = "cajaIconoBackEnd";
        panelEntidades.onclick = mostrarPanelesTabla;
        var enlaceEntidades = document.createElement("a");
        enlaceEntidades.href = "#";
        var imgEntidades = document.createElement("img");
        imgEntidades.className = "iconoBackEnd";
        imgEntidades.alt = "Icono Entidades";
        imgEntidades.src = "img/icon/iconoEntidades.png";
        enlaceEntidades.appendChild(imgEntidades);
        panelEntidades.appendChild(enlaceEntidades);

        var panelSucursales = document.createElement("div");
        panelSucursales.id = "iconoSucursales";
        panelSucursales.className = "cajaIconoBackEnd";
        panelSucursales.onclick = mostrarPanelesTabla;
        var enlaceSucursales = document.createElement("a");
        enlaceSucursales.href = "#";
        var imgSucursales = document.createElement("img");
        imgSucursales.className = "iconoBackEnd";
        imgSucursales.alt = "Icono Sucursales";
        imgSucursales.src = "img/icon/iconoSucursales.png";
        enlaceSucursales.appendChild(imgSucursales);
        panelSucursales.appendChild(enlaceSucursales);

        filaPaneles2.appendChild(panelEmpleados);
        filaPaneles2.appendChild(panelEntidades);
        filaPaneles2.appendChild(panelSucursales);

        botoneraMain.appendChild(filaPaneles2);
    }
}

function mostrarPanelesTabla() {

    //Limpiando contenidos
    var contextoContenidos = document.getElementById("contenidos");
    contextoContenidos.innerHTML = "";

    //Generando paneles
    var botoneraMain = document.createElement("div");
    botoneraMain.id = "botoneraMainEmpleado";
    botoneraMain.className = "botoneraMain";

    var filaPaneles1 = document.createElement("div");
    filaPaneles1.id = "filaIconosBackEndTabla1";
    filaPaneles1.className = "filaIconosBackEnd";

    var panelLista = document.createElement("div");
    panelLista.id = "iconoLista";
    panelLista.className = "cajaIconoBackEnd";
    panelLista.onclick = mostrarTabla;
    var enlaceLista = document.createElement("a");
    enlaceLista.href = "#";
    var imgLista = document.createElement("img");
    imgLista.className = "iconoBackEnd";
    imgLista.alt = "Icono Lista";
    imgLista.src = "img/icon/iconoLista.png";
    enlaceLista.appendChild(imgLista);
    panelLista.appendChild(enlaceLista);

    var panelNuevo = document.createElement("div");
    panelNuevo.id = "iconoNuevo";
    panelNuevo.className = "cajaIconoBackEnd";
    panelNuevo.onclick = mostrarDetalle;
    var enlaceNuevo = document.createElement("a");
    enlaceNuevo.href = "#";
    var imgNuevo = document.createElement("img");
    imgNuevo.className = "iconoBackEnd";
    imgNuevo.alt = "Icono Nuevo";
    imgNuevo.src = "img/icon/iconoAdd.png";
    enlaceNuevo.appendChild(imgNuevo);
    panelNuevo.appendChild(enlaceNuevo);

    //Botón volver atrás
    var botonVolver = document.createElement("div");
    botonVolver.id = "botonVolverDesdePanelesTabla";
    botonVolver.className = "botonBackEndVolver";
    botonVolver.onclick = function() {
        document.getElementById("contenidos").innerHTML = "";
        mostrarPanelesRol(rol);
    };
    var textoBotonVolver = document.createTextNode("Volver a gestión para " + rol + "s");
    botonVolver.appendChild(textoBotonVolver);

    filaPaneles1.appendChild(panelLista);
    filaPaneles1.appendChild(panelNuevo);
    botoneraMain.appendChild(filaPaneles1);
    
    contextoContenidos.appendChild(botoneraMain);
    contextoContenidos.appendChild(botonVolver);

}

function mostrarTabla() {

    //Generando la tabla del body
    var contextoActual = document.getElementById("contenidos");
    contextoActual.innerHTML = "";
    var tabla = document.createElement("section");
    tabla.id = "tablaListado";
    contextoActual.appendChild(tabla);
    contextoActual = document.getElementById("tablaListado");
    var tituloTabla = document.createElement("p");
    tituloTabla.id = "tituloTabla";
    var textoTituloTabla = document.createTextNode("Gestión de clientes");
    tituloTabla.appendChild(textoTituloTabla);
    tabla.appendChild(tituloTabla);
    var filaCabecera = document.createElement("section");
    filaCabecera.id = "filaCabecera";
    tabla.appendChild(filaCabecera);
    for (var i = 0; i < listaCabeceraTabla.length; i++) {
        var celdaCabecera = document.createElement("div");
        celdaCabecera.id = "celdaCabecera-" + (i + 1);
        celdaCabecera.className = "celdaCabecera columna" + (i + 1);
        var textoCeldaCabecera = document.createTextNode(listaCabeceraTabla[i]);
        celdaCabecera.appendChild(textoCeldaCabecera);
        filaCabecera.appendChild(celdaCabecera);
    }


    for (var i = 0; i < 8; i++) {
        var filaContenido = document.createElement("section");
        filaContenido.id = "filaContenido-" + (i + 1);
        filaContenido.className = "filaContenido";
        tabla.appendChild(filaContenido);
        for (var j = 0; j < listaContenidosTabla.length; j++) {
            var celdaContenido = document.createElement("div");
            celdaContenido.id = "celdaContenido-" + (i + 1) + "-" + (j + 1);
            celdaContenido.className = "celdaContenido columna" + (j + 1);
            if (j === 0) {
                var textoCeldaContenidos = document.createTextNode(listaContenidosTabla[j] + (i + 1) + "A");
            } else if (j === 1) {
                var textoCeldaContenidos = document.createTextNode(listaContenidosTabla[j] + (i + 1));
            } else {
                var textoCeldaContenidos = document.createTextNode(listaContenidosTabla[j]);
            }

            celdaContenido.appendChild(textoCeldaContenidos);
            filaContenido.appendChild(celdaContenido);
        }

        var celdaIconoEditar = document.createElement("div");
        celdaIconoEditar.id = "iconoTablaEditar";
        celdaIconoEditar.className = "celdaIconoTabla";
        var imgEditar = document.createElement("img");
        imgEditar.className = "iconoTabla";
        imgEditar.src = "img/icon/editar.png";
        imgEditar.alt = "Icono editar";
        imgEditar.onclick = function() {
            opcionElegida = "Guardar cambios";
            mostrarDetalle(this);
        };
        var celdaIconoBorrar = document.createElement("div");
        celdaIconoBorrar.id = "iconoTablaBorrar";
        celdaIconoBorrar.className = "celdaIconoTabla";
        var imgBorrar = document.createElement("img");
        imgBorrar.className = "iconoTabla";
        imgBorrar.src = "img/icon/papelera.png";
        imgBorrar.alt = "Icono borrar";
        imgBorrar.onclick = function() {
            opcionElegida = "Eliminar cliente";
            mostrarDetalle(this);
        };
        celdaIconoEditar.appendChild(imgEditar);
        celdaIconoBorrar.appendChild(imgBorrar);
        filaContenido.appendChild(celdaIconoEditar);
        filaContenido.appendChild(celdaIconoBorrar);
    }

    //Botón insertar nuevo cliente
    var botonNew = document.createElement("span");
    botonNew.id = "botonNew";
    botonNew.className = "botonBackEnd";
    botonNew.onclick = function() {
        opcionElegida = "Grabar cliente";
        mostrarDetalle(this);
    };
    var textoBotonNew = document.createTextNode("Nuevo cliente");
    botonNew.appendChild(textoBotonNew);
    tabla.appendChild(botonNew);

    //Botón volver atrás
    var botonVolver = document.createElement("span");
    botonVolver.id = "botonVolverDesdeLista";
    botonVolver.className = "botonBackEnd";
    botonVolver.onclick = function() {
        document.getElementById("contenidos").innerHTML = "";
        mostrarPanelesTabla();
    };
    var textoBotonVolver = document.createTextNode("Volver atrás");
    botonVolver.appendChild(textoBotonVolver);
    tabla.appendChild(botonVolver);

}

function mostrarDetalle(botonOrigen) {

//Creando el bloque de detalle
    var listaLabel = new Array("NIF", "Nombre", "Entidad", "Sucursal");
    var contextoActual = document.getElementById("contenidos");
    contextoActual.innerHTML = "";
    var cajaDetalle = document.createElement("section");
    cajaDetalle.id = "contenedorDetail";
    contextoActual.appendChild(cajaDetalle);
    var tituloDetail = document.createElement("div");
    tituloDetail.id = "tituloDetail";
    var textoTituloDetail = document.createTextNode("Detalle Cliente");
    tituloDetail.appendChild(textoTituloDetail);
    cajaDetalle.appendChild(tituloDetail);
    var cajaFormulario = document.createElement("section");
    cajaFormulario.id = "contenedorFormularioDetail";
    cajaDetalle.appendChild(cajaFormulario);
    for (var i = 0; i < listaLabel.length; i++) {

        var etiqueta = document.createElement("div");
        etiqueta.className = "labelDetail";
        var textoLabel = document.createTextNode(listaLabel[i]);
        etiqueta.appendChild(textoLabel);
        var campo = document.createElement("input");
        campo.className = "inputDetail";
        campo.type = "text";
        campo.size = "40";
        cajaFormulario.appendChild(etiqueta);
        cajaFormulario.appendChild(campo);
    }

//Botón variable, según opción elegida en la lista
    var botonDetail = document.createElement("span");
    botonDetail.id = "botonDetail";
    botonDetail.className = "botonBackEnd";
    botonDetail.setAttribute("onclick", "alert('La operación se ha realizado con éxito')");
    var textoBotonDetail = document.createTextNode(opcionElegida);
    botonDetail.appendChild(textoBotonDetail);
    cajaDetalle.appendChild(botonDetail);
    //Botón volver a la lista de clientes
    var botonVolver = document.createElement("span");
    botonVolver.id = "botonVolverDesdeDetalle";
    botonVolver.className = "botonBackEnd";
    botonVolver.onclick = function() {
        document.getElementById("contenidos").innerHTML = "";

        if (botonOrigen.id === "botonNew" || botonOrigen.className === "iconoTabla") {
            mostrarTabla();
        } else {
            mostrarPanelesTabla();
        }
    };
    var textoBotonVolver = document.createTextNode("Volver atrás");
    botonVolver.appendChild(textoBotonVolver);
    cajaDetalle.appendChild(botonVolver);
}

function mostrarTrabajando() {

//Limpiando el bloque de contenidos
    var contextoActual = document.getElementById("contenidos");
    contextoActual.innerHTML = "";

    //Generando el icono
    var imgTrabajando = document.createElement("img");
    imgTrabajando.id = "iconoTrabajando";
    imgTrabajando.src = "img/icon/iconoTrabajando.png";
    imgTrabajando.alt = "Icono_Tabajando";
    contextoActual.appendChild(imgTrabajando);
}



