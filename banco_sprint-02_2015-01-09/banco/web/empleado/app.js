var app = angular.module("app", ['ngRoute']);



app.run(function ($rootScope) {
    $rootScope.empleado = null;
    $rootScope.rol = "";
    $rootScope.estiloBloqueado = {'background-color':'#ffb478', 'font-weight':'bolder'};//Estilo para los input disabled
});