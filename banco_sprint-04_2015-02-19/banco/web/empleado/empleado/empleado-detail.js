app.controller("EmpleadoInsertController", ["$scope", "$http", "$location", "$rootScope", "$routeParams", function ($scope, $http, $location, $rootScope, $routeParams) {

        $scope.estado = {
            accion: 'insertar'
        };

        $scope.sucursalDisabled = true;

        $scope.estilo = "";
        $scope.estiloDisabledEntidad = "";
        $scope.estiloDisabledSucursal = $rootScope.estiloBloqueado;

        $scope.irLista = function () {
            $location.path("/empleado/list");
        };

        $scope.empleadoEdit = {};

        $scope.sucursalesBancarias = [];


        $scope.findAllEntidades = function () {
            $http({
                method: "GET",
                url: contextPath + "/api/EntidadBancaria"
            }).success(function (data) {
                $scope.entidadesBancarias = data;
            }).error(function () {
                alert("Error: no se ha podido realizar la operación");
            });
        };


        $scope.findSucursalesByEntidad = function (idEntidadBancaria) {
            if (idEntidadBancaria === undefined) {
                $scope.sucursalesBancarias = [];
                $scope.estiloDisabledSucursal = $rootScope.estiloBloqueado;
                $scope.sucursalDisabled = true;
            } else {
                $http({
                    method: "GET",
                    url: contextPath + "/api/EntidadBancaria/" + idEntidadBancaria + "/SucursalBancaria"
                }).success(function (data) {
                    $scope.sucursalesBancarias = data;
                    if (!$routeParams.idEntidadBancaria) {
                        $scope.estiloDisabledSucursal = "";
                    }
                    $scope.sucursalDisabled = false;
                }).error(function () {
                    alert("Error: no se ha podido realizar la operación");
                });
            }
        };

        $scope.cargarDatos = function () {
                $scope.empleadoEdit = {
                    sucursalBancaria: {
                        idSucursalBancaria: parseInt($routeParams.idSucursalBancaria),
                        entidadBancaria: {
                            idEntidadBancaria: parseInt($routeParams.idEntidadBancaria)
                        }
                    }
                };

                $scope.findSucursalesByEntidad($scope.empleadoEdit.sucursalBancaria.entidadBancaria.idEntidadBancaria);
                $scope.estado = {
                    accion: 'insertarDesdeSucursal'
                };
                $scope.estiloDisabledEntidad = $rootScope.estiloBloqueado;
                $scope.estiloDisabledSucursal = $rootScope.estiloBloqueado;
        };


        $scope.insert = function () {
            $scope.mostrarValidaciones = true;
            $(".validacion-caja-mensajes").fadeIn(500, "linear");

            if (!$scope.formularioEmpleado.$invalid) {
                $http({
                    method: "POST",
                    data: $scope.empleadoEdit,
                    url: contextPath + "/api/Empleado"
                }).success(function (data) {
                    $scope.mostrarValidaciones = false;
                    $scope.empleadoEdit = data;
                    $scope.empleadoEdit = {};
                }).error(function () {
                    alert("Error: no se ha podido realizar la operación");
                });
            }
        };

        var promise = $rootScope.comprobarSesion();

        promise.then(function (status) {
            if (status === 200) {
                $scope.findAllEntidades();
                if ($routeParams.idSucursalBancaria) {
                    $scope.cargarDatos();
                }
            } else {
                $location.path("/portada");
                $rootScope.empleado = null;
            }
        }, function (error) {
            alert("Se ha producido un error al obtener el dato:" + error);
        });

    }]);


app.controller("EmpleadoUpdateController", ["$scope", "$http", "$routeParams", "$location", "$rootScope", function ($scope, $http, $routeParams, $location, $rootScope) {


        if ($routeParams.idSucursalBancaria) {
            $scope.estado = {
                accion: 'actualizarDesdeSucursal'
            };
            $scope.estiloDisabledEntidad = $rootScope.estiloBloqueado;
            $scope.estiloDisabledSucursal = $rootScope.estiloBloqueado;
        } else {
            $scope.estado = {
                accion: 'actualizar'
            };
        }


        $scope.estilo = "";

        $scope.empleadoEdit = {
            idEmpleado: $routeParams.idEmpleado
        };

        $scope.irLista = function () {
            $location.path("/empleado/list");
        };

        $scope.sucursalesBancarias = [];


        $scope.get = function () {
            $http({
                method: "GET",
                url: contextPath + "/api/Empleado/" + $scope.empleadoEdit.idEmpleado
            }).success(function (data) {
                $scope.empleadoEdit = data;
                $scope.findSucursalesByEntidad($scope.empleadoEdit.sucursalBancaria.entidadBancaria.idEntidadBancaria);
//                alert(JSON.stringify($scope.empleadoEdit));
            }).error(function () {
                alert("Error: no existe coincidencia en la base de datos");
            });
        };



        $scope.findSucursalesByEntidad = function (idEntidadBancaria) {
            if (idEntidadBancaria === undefined) {
                $scope.sucursalesBancarias = [];
            } else {
                $http({
                    method: "GET",
                    url: contextPath + "/api/EntidadBancaria/" + idEntidadBancaria + "/SucursalBancaria"
                }).success(function (data) {
                    $scope.sucursalesBancarias = data;
                }).error(function () {
                    alert("Error: no se ha podido realizar la operación");
                });
            }
        };

        $scope.findAllEntidades = function () {
            $http({
                method: "GET",
                url: contextPath + "/api/EntidadBancaria"
            }).success(function (data) {
                $scope.entidadesBancarias = data;
            }).error(function () {
                alert("Error: no se ha podido realizar la operación");
            });
        };



        $scope.update = function () {
            $scope.mostrarValidaciones = true;
            $(".validacion-caja-mensajes").fadeIn(500, "linear");

            if (!$scope.formularioEmpleado.$invalid) {
                $http({
                    method: "PUT",
                    url: contextPath + "/api/Empleado/" + $scope.empleadoEdit.idEmpleado,
                    data: $scope.empleadoEdit
                }).success(function () {
                    $scope.empleadoEdit = {};
                    $scope.irLista();
                }).error(function () {
                    alert("Error: no se ha podido realizar la operación");
                });
            }
        };

        var promise = $rootScope.comprobarSesion();

        promise.then(function (status) {
            if (status === 200) {
                $scope.get();
                $scope.findAllEntidades();
            } else {
                $location.path("/portada");
                $rootScope.empleado = null;
            }
        }, function (error) {
            alert("Se ha producido un error al obtener el dato:" + error);
        });

    }]);

app.controller("EmpleadoDeleteController", ["$rootScope", "$scope", "$http", "$routeParams", "$location", function ($rootScope, $scope, $http, $routeParams, $location) {

        $scope.estado = {
            accion: 'borrar'
        };

        $scope.estiloDisabledEntidad = $rootScope.estiloBloqueado;
        $scope.estiloDisabledSucursal = $rootScope.estiloBloqueado;
        $scope.estilo = $rootScope.estiloBloqueado;

        $scope.empleadoEdit = {
            idEmpleado: $routeParams.idEmpleado
        };

        $scope.irLista = function () {
            $location.path("/empleado/list");
        };


        $scope.get = function () {
            $http({
                method: "GET",
                url: contextPath + "/api/Empleado/" + $scope.empleadoEdit.idEmpleado
            }).success(function (data) {
                $scope.empleadoEdit = data;
                $scope.findSucursalesByEntidad($scope.empleadoEdit.sucursalBancaria.entidadBancaria.idEntidadBancaria);
//                alert(JSON.stringify($scope.empleadoEdit));
            }).error(function () {
                alert("Error: no existe coincidencia en la base de datos");
            });
        };



        $scope.findSucursalesByEntidad = function (idEntidadBancaria) {
            $http({
                method: "GET",
                url: contextPath + "/api/EntidadBancaria/" + idEntidadBancaria + "/SucursalBancaria"
            }).success(function (data) {
                $scope.sucursalesBancarias = data;
            }).error(function () {
                alert("Error: no se ha podido realizar la operación");
            });
        };

        $scope.findAllEntidades = function () {
            $http({
                method: "GET",
                url: contextPath + "/api/EntidadBancaria"
            }).success(function (data) {
                $scope.entidadesBancarias = data;
            }).error(function () {
                alert("Error: no se ha podido realizar la operación");
            });
        };



        $scope.deleteData = function () {
            $http({
                method: "DELETE",
                url: contextPath + "/api/Empleado/" + $scope.empleadoEdit.idEmpleado
            }).success(function () {
                $scope.empleadoEdit = {};
                $scope.irLista();
            }).error(function () {
                alert("Error: no se ha podido realizar la operación");
            });
        };

        var promise = $rootScope.comprobarSesion();

        promise.then(function (status) {
            if (status === 200) {
                $scope.get();
                $scope.findAllEntidades();
            } else {
                $location.path("/portada");
                $rootScope.empleado = null;
            }
        }, function (error) {
            alert("Se ha producido un error al obtener el dato:" + error);
        });
    }]);

