angular.module('greenfire.mystocks.controllers').controller('MyStocksController',
  ['$scope', '$location', 'AuthService', 'StocksService',
  function ($scope, $location, AuthService, StocksService) {

    var user = AuthService.getAuthenticatedAccount();   

    var getMyStocks = function () {
      StocksService.myStocks(user.email)
	.then(function (data) {
	  console.log(data);
	  //$scope.cash = data[0].cash;
	  var value = data[0].cash;
	  for (var i = 0; i < data.length; i++) {
	    value = value + (data[i].quantity * data[i].current_price);
	  }
	  $scope.value = value;	
	  $scope.mystocklist = data;
	  $scope.disabled = false;
	})
	.catch(function () {
	  $scope.error = true;
	  $scope.errorMessage = "Unable to retrieve your stocks..";
	  $scope.disabled = false;
	});
    }

    getMyStocks();

    $scope.buyStock = function (stock) {
        StocksService.setStock(stock);
        StocksService.setType('buy');
	$location.path('/transaction');
    }

    $scope.sellStock = function (stock) {
        StocksService.setStock(stock);
        StocksService.setType('sell');
	$location.path('/transaction');
    }
 
}]);
