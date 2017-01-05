angular.module('greenfire.stock.controllers').controller('StockController',
  ['$scope', '$location', '$routeParams', 'AuthService', 'StocksService',
  function ($scope, $location, $routeParams, AuthService, StocksService) {
    console.log('HELLLOOO');
    var param = $routeParams.param1;

    $scope.stock = param;

}]);

