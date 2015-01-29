app.controller("CuentaBancariaListController", ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {
         $rootScope.comprobarSesion();
        $scope.findAll = function () {
            $http({
                method: "GET",
                url: contextPath + "/api/CuentaBancaria"
            }).success(function (data) {
                $scope.cuentasBancarias = data;
            }).error(function () {
                alert("Error: no se ha podido realizar la operación");
            });//success.Error
        };//Consultar  
        $scope.findAll();
    }]);

