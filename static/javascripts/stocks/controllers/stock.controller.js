angular.module('greenfire.stock.controllers').controller('StockController',
  ['$scope', '$location', '$routeParams', 'AuthService', 'StocksService',
  function ($scope, $location, $routeParams, AuthService, StocksService) {
    console.log('HELLLOOO');
    var param = $routeParams.param1;

    //needs to be instantiated in order to set stock.name
    $scope.stock = {};
    $scope.stock.name = param;

    var getStock = function () {
      StocksService.getStock(param)
        .then(function (data) {
	  console.log('GOT A RESPONSE!!');
	  console.log(data);
          $scope.stock = data[0]
          $scope.disabled = false;
        })
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Unable to retrieve stock information..";
          $scope.disabled = false;
        });
    }

    getStock();


}]);

