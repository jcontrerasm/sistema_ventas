
/* ===========================================
   		MODULO DE LA APLICACIÓN
   =========================================== */

var app = angular.module('test-culqi', ['ngRoute' , 'ngPagination']);

/* ===========================================
      CONFIGURACIÓN
   =========================================== */

app.config(['$routeProvider',function($routeProvider) {

  $routeProvider
    .when('/' , {
      templateUrl: 'views/contenido.html',
      controller: 'listadoController'
    })
    .when('/index' , {
      templateUrl: 'views/contenido.html',
      controller: 'listadoController'
    })
    .when('/detalle/:_id' , {
      templateUrl: 'views/detalle.html',
      controller: 'detalleController'
    })
    .otherwise({
      redirectTo: '/'
    });

}]);

/* ===========================================
   		CONTROLLADORES
   =========================================== */

app.controller('listadoController', function($scope , $http , $location){
	
	var url = 'https://raw.githubusercontent.com/jcontrerasm/data_sistema_ventas/master/data.json';

	$http.get(url)
        .then(function(res){
            $scope.datos = res.data;
    });

  $scope.verDetalle = function(_id){
    $location.path('/detalle/' + _id);
  }

  $scope.mostrar_buscador = false;

  $scope.mostrarbuscar = function() {

    if($scope.mostrar_buscador == false) {
      $scope.mostrar_buscador = true;
    }else {
      $scope.mostrar_buscador = false;
    }

  }

});

app.controller('detalleController', function($scope , $http , $routeParams , $location){
  
  var url = 'https://raw.githubusercontent.com/jcontrerasm/data_sistema_ventas/master/data.json';

  $http.get(url)
  .then(function(res){
    
    var posicion = $routeParams._id;

    $scope.datos = res.data[posicion - 1];

  });

  $scope.regresar = function(){
    $location.path('/');
  }

});