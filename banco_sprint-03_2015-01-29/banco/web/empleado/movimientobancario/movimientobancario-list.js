app.controller("MovimientoBancarioListController", ["$scope", "$http","$rootScope", function ($scope, $http, $rootScope) {
        $rootScope.comprobarSesion();
        $scope.findAll = function () {
            $http({
                method: "GET",
                url: contextPath + "/api/MovimientoBancario"
            }).success(function (data) {
                $scope.movimientosBancarios = data;
            }).error(function () {
                alert("Error: no se ha podido realizar la operación");
            });//success.Error
        };//Consultar

        $scope.findAll();
    }]);