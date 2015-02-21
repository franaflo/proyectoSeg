app.controller("MovimientoBancarioInsertController", ["$scope", "$http", "$routeParams", "$location", "$rootScope", function ($scope, $http, $routeParams, $location, $rootScope) {

        $scope.estado = {
            accion: 'insertar'
        };

        $scope.estilo = "";
        $scope.estiloNumeroCuenta = "";

        $scope.irLista = function () {
            $location.path("/movimientobancario/list");
        };

        //ng-Options
        $scope.tipoMovimientos = [
            {ID: '0', nombre: 'DEBE'},
            {ID: '1', nombre: 'HABER'}
        ];

        $scope.movimientoBancario = {};


        $scope.insert = function () {
            $scope.mostrarValidaciones = true;
            $(".validacion-caja-mensajes").fadeIn(500, "linear");

            if (!$scope.formularioMovimientoBancario.$invalid) {
                $http({
                    method: "POST",
                    url: contextPath + "/api/MovimientoBancario",
                    data: $scope.movimientoBancario
                }).success(function (data) {
                    $scope.mostrarValidaciones = false;
                    $scope.movimientoBancario = data;
                    $scope.movimientoBancario = {};
                }).error(function () {
                    alert("Error: no se ha podido realizar la operación");
                });
            }
        };

        $scope.findAll = function () {
            $http({
                method: "GET",
                url: contextPath + "/api/CuentaBancaria"
            }).success(function (data) {
                $scope.cuentasBancarias = data;
                for (var i = 0; i < $scope.cuentasBancarias.length; i++) {
                    var cuentaBancaria = $scope.cuentasBancarias[i];
                    if (cuentaBancaria.idCuentaBancaria === ($routeParams.idCuentaBancaria * 1)) {
                        $scope.movimientoBancario.cuentaBancaria = cuentaBancaria;
                        $scope.insertdesdedetail = {
                            accion: 'insertardesdedetail'
                        };
                        $scope.estiloNumeroCuenta = $rootScope.estiloBloqueado;
                    }
                }
            }).error(function () {
                alert("Error: no se ha podido realizar la operación");
            });
        };


        var promise = $rootScope.comprobarSesion();

        promise.then(function (status) {
            if (status === 200) {
                $scope.findAll();
            } else {
                $location.path("/portada");
                $rootScope.empleado = null;
            }
        }, function (error) {
            alert("Se ha producido un error al obtener el dato:" + error);
        });

    }]);

app.controller("MovimientoBancarioUpdateController", ["$scope", "$http", "$routeParams", "$location", "$rootScope", function ($scope, $http, $routeParams, $location, $rootScope) {

        $scope.estado = {
            accion: 'actualizar'
        };

        $scope.estilo = "";

        $scope.movimientoBancario = {
            idMovimientoBancario: $routeParams.idMovimientoBancario
        };

        $scope.irLista = function () {
            $location.path("/movimientobancario/list");
        };


        $scope.get = function () {
            $http({
                method: "GET",
                url: contextPath + "/api/MovimientoBancario/" + $scope.movimientoBancario.idMovimientoBancario
            }).success(function (data) {
                $scope.movimientoBancario = data;
            }).error(function () {
                alert("Error: no existe coincidencia en la base de datos");
            });
        };



        $scope.tipoMovimientos = [
            {ID: '0', nombre: 'DEBE'},
            {ID: '1', nombre: 'HABER'}
        ];


        $scope.update = function () {
            $scope.mostrarValidaciones = true;
            $(".validacion-caja-mensajes").fadeIn(500, "linear");

            if (!$scope.formularioMovimientoBancario.$invalid) {
                $http({
                    method: "PUT",
                    url: contextPath + "/api/MovimientoBancario/" + $scope.movimientoBancario.idMovimientoBancario,
                    data: $scope.movimientoBancario
                }).success(function () {
                    $scope.movimientoBancario = {};
                    $scope.irLista();
                }).error(function () {
                    alert("Error: no se ha podido realizar la operación");
                });
            }
        };

        $scope.findAll = function () {
            $http({
                method: "GET",
                url: contextPath + "/api/CuentaBancaria"
            }).success(function (data) {
                $scope.cuentasBancarias = data;
            }).error(function () {
                alert("Error: no se ha podido realizar la operación");
            });
        };


        var promise = $rootScope.comprobarSesion();

        promise.then(function (status) {
            if (status === 200) {
                $scope.get();
                $scope.findAll();
            } else {
                $location.path("/portada");
                $rootScope.empleado = null;
            }
        }, function (error) {
            alert("Se ha producido un error al obtener el dato:" + error);
        });

    }]);

app.controller("MovimientoBancarioDeleteController", ["$rootScope", "$scope", "$http", "$routeParams", "$location", function ($rootScope, $scope, $http, $routeParams, $location) {

        $scope.estado = {
            accion: 'borrar'
        };

        $scope.estilo = $rootScope.estiloBloqueado;//Estilo para los input disabled

        $scope.movimientoBancario = {
            idMovimientoBancario: $routeParams.idMovimientoBancario
        };

        $scope.irLista = function () {
            $location.path("/movimientobancario/list");
        };
        $scope.cuentasBancarias = [];
        $scope.cuentaBancaria = {};


        $scope.get = function () {
            $http({
                method: "GET",
                url: contextPath + "/api/MovimientoBancario/" + $scope.movimientoBancario.idMovimientoBancario
            }).success(function (data) {
                $scope.movimientoBancario = data;
                $scope.cuentasBancarias[0] = $scope.movimientoBancario.cuentaBancaria;
                $scope.cuentaBancaria.idCuentaBancaria = $scope.cuentasBancarias[0].idCuentaBancaria;
            }).error(function () {
                alert("Error: no existe coincidencia en la base de datos");
            });
        };


        $scope.tipoMovimientos = [
            {ID: '0', nombre: 'DEBE'},
            {ID: '1', nombre: 'HABER'}
        ];

        $scope.deleteData = function () {
            $http({
                method: "DELETE",
                url: contextPath + "/api/MovimientoBancario/" + $scope.movimientoBancario.idMovimientoBancario
            }).success(function () {
                $scope.movimientoBancario = {};
                $scope.irLista();
            }).error(function () {
                alert("Error: no se ha podido realizar la operación");
            });
        };

        var promise = $rootScope.comprobarSesion();

        promise.then(function (status) {
            if (status === 200) {
                $scope.get();
            } else {
                $location.path("/portada");
                $rootScope.empleado = null;
            }
        }, function (error) {
            alert("Se ha producido un error al obtener el dato:" + error);
        });


    }]);
