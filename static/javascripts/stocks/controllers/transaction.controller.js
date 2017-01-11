angular.module('greenfire.transaction.controllers').controller('TransactionController',
  ['$scope', '$location', 'AuthService', 'StocksService',
  function ($scope, $location, AuthService, StocksService) {

    var user = AuthService.getAuthenticatedAccount();

    var stock = StocksService.getStock();
    $scope.stock = stock;

    var type = StocksService.getType();
    $scope.type = type;
    
    $scope.confirm = function() {
	console.log('INSIDE CONFIRM')
         //if user decides to change
      //$scope.stock =
      //$scope.type =

/*      if (type == 'buy') {
	if ((stock.current_price * $scope.quantity) > user.cash) {
	  console.log('you do not have enough money..');
	  return;
	} 
      } else {
	
	for (var i = 0; i < user.stocks.length; i++) {
	  if (user.stocks[i].name == stock.name) {
	    var stock_from_account = user.stocks[i];
	  }
	}
	if (stock_from_account) {
	  if($scope.quantity > stock_from_account.quantity) {
	    console.log('selling more stock than you own..');
	    return;
	  }
	} else {
	   console.log('trying to sell stock you do not have..');
	   return;
	}
      }
*/ //TODO redo this somehow or make check in the backend
      stock.quantity = $scope.quantity;
      StocksService.transact(user.email, stock, type)
        .then(function (data) {

          StocksService.setStock('');
          StocksService.setType('');

          $location.path('/home');
        })
        .catch(function () {
          $scope.error = true;
	  console.log('unable to make transaction..');
          $scope.errorMessage = "Unable to make transaction...";
          $scope.disabled = false;
        });

    }

}]);
