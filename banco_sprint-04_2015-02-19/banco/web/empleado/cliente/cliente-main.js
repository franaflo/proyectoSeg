app.controller("ClienteMainController", ["$rootScope", "$location", function ($rootScope, $location) {
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