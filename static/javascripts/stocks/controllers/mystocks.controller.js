angular.module('greenfire.mystocks.controllers').controller('MyStocksController',
  ['$scope', '$location', 'AuthService', 'StocksService',
  function ($scope, $location, AuthService, StocksService) {

    var user = AuthService.getAuthenticatedAccount();   

    var getMyStocks = function () {
      StocksService.myStocks(user.email)
	.then(function (data) {
	  $scope.cash = data[0].cash;
	  var value = data[0].cash;
	  for (var i = 0; i < data[0].stocks.length; i++) {
	    value = value + (data[0].stocks[i].quantity * data[0].stocks[i].current_price);
	  }
	  $scope.value = value;	
	  $scope.mystocklist = data[0].stocks;
	  $scope.disabled = false;
	})
	.catch(function () {
	  $scope.error = true;
	  $scope.errorMessage = "Unable to retrieve your stocks..";
	  $scope.disabled = false;
	});
    }

    getMyStocks();

    $scope.buyStock = function () {
	if (!$scope.stock) {
	  console.log('you didnt add a quantity?')
	  return;
	}
	stock_to_change.quantity = $scope.stock.quantity;
	StocksService.buy(user.email, stock_to_change)
         .then(function (data) {
	   $scope.cash = data.cash;
	   var value = data.cash
	   for (var i = 0; i < data.stocks.length; i++) {
            value = value + (data.stocks[i].quantity * data.stocks[i].current_price);
           }
           $scope.value = value;
           $scope.mystocklist = data.stocks;
	
	   $scope.stock.quantity = '';
           $scope.disabled = false;
         })
         .catch(function () {
	   console.log('ERROR~~');
           $scope.error = true;
           $scope.errorMessage = "Unable to purchase..";
           $scope.disabled = false;
         });

    }

    $scope.sellStock = function () {
	 if (!$scope.stock) {
          console.log('you didnt add a quantity?')
          return;
        }
	stock_to_change.quantity = $scope.stock.quantity;
	console.log('trying to sell: ' + stock_to_change);
        StocksService.sell(user.email, stock_to_change)
         .then(function (data) {
	   $scope.cash = data.cash;
	   var value = data.cash
           for (var i = 0; i < data.stocks.length; i++) {
            value = value + (data.stocks[i].quantity * data.stocks[i].current_price);
           }
           $scope.value = value;
           $scope.mystocklist = data.stocks;

	   $scope.stock.quantity = '';
           $scope.disabled = false;
         })
         .catch(function () {
	   console.log('ERROR!!!');
           $scope.error = true;
           $scope.errorMessage = "Unable to sell..";
           $scope.disabled = false;
         });

    }
 
    var stock_to_change;
    $scope.setStock = function(stock) {
      stock_to_change = stock;
    }
 
}]);
