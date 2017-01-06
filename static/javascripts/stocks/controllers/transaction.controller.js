angular.module('greenfire.transaction.controllers').controller('TransactionController',
  ['$scope', '$location', 'AuthService', 'StocksService',
  function ($scope, $location, AuthService, StocksService) {

    var user = AuthService.getAuthenticatedAccount();

    var stock = StocksService.getStock();
    $scope.stock = stock;

    var type = StocksService.getType();
    $scope.type = type;
    
    $scope.confirm = function() {
         //if user decides to change
      //$scope.stock =
      //$scope.type =
      stock.quantity = $scope.quantity;

      StocksService.transact(user.email, stock, type)
        .then(function (data) {
          console.log('GOT A RESPONSE!!');

          StocksService.setStock('');
          StocksService.setType('');

          $location.path('/home');
        })
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Unable to make transaction...";
          $scope.disabled = false;
        });

    }

}]);
