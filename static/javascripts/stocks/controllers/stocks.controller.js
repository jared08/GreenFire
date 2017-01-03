angular.module('greenfire.stocks.controllers').controller('StocksController',
  ['$scope', '$location', 'AuthService', 'StocksService',
  function ($scope, $location, AuthService, StocksService) {

    $scope.is_admin = AuthService.isAdmin();

    var getAllStocks = function () {
      StocksService.allStocks()
        .then(function (data) {
	   $scope.stocklist = data;
           $scope.disabled = false;
        })
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Unable to retrieve list of stocks..";
          $scope.disabled = false;
        });
    };

    var username = AuthService.getEmail();

    var getMyStocks = function () {
      StocksService.myStocks(username)
	.then(function (data) {
	  $scope.cash = AuthService.getCash();
	  var value = $scope.cash;
	  for (var i = 0; i < data[0].stocks.length; i++) {
	    value = value + (data[0].stocks[i].quantity * data[0].stocks[i].price);
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

    getAllStocks();
    getMyStocks();

    $scope.buyStock = function () {
	if (!$scope.stock) {
	  console.log('you didnt add a quantity?')
	  return;
	}
	stock_to_change.quantity = $scope.stock.quantity;
	StocksService.buy(username, stock_to_change)
         .then(function (data) {
	   $scope.cash = data.cash;
	   for (var i = 0; i < data.stocks.length; i++) {
            value = value + (data.stocks[i].quantity * data.stocks[i].price);
           }
           $scope.value = value;
           $scope.mystocklist = data.stocks;

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
        StocksService.sell(username, stock_to_change)
         .then(function (data) {
	   $scope.cash = data.cash;
           for (var i = 0; i < data.stocks.length; i++) {
            value = value + (data.stocks[i].quantity * data.stocks[i].price);
           }
           $scope.value = value;
           $scope.mystocklist = data.stocks;

           $scope.disabled = false;
         })
         .catch(function () {
	   console.log('ERROR!!!');
           $scope.error = true;
           $scope.errorMessage = "Unable to sell..";
           $scope.disabled = false;
         });

    }
  
    //for british eyes only
    $scope.addStock = function () {
        StocksService.add($scope.new_stock.name, $scope.new_stock.price)
         .then(function (data) {
           $scope.disabled = false;
           getAllStocks();
         })
         .catch(function () {
           console.log('ERROR!!!');
           getMyStocks();
           $scope.error = true;
           $scope.errorMessage = "Unable to add stock..";
           $scope.disabled = false;
         });

    }

    var stock_to_change;
    $scope.setStock = function (stock) {
	stock_to_change = stock;
    }

    $scope.editStock = function() {
	StocksService.edit(stock_to_change, $scope.stock.new_name)
         .then(function (data) {
	   getAllStocks();
           $scope.disabled = false;
	   $scope.stock.new_name = '';
         })
         .catch(function () {
           console.log('ERROR!!!');
           $scope.error = true;
           $scope.errorMessage = "Unable to add stock..";
           $scope.disabled = false;
         });

    }

    $scope.deleteStock = function() {
	StocksService.remove(stock_to_change)
         .then(function (data) {
           $scope.disabled = false;
           getAllStocks();
	   getMyStocks();
         })
         .catch(function () {
           console.log('ERROR!!!');
           getMyStocks();
           $scope.error = true;
           $scope.errorMessage = "Unable to add stock..";
           $scope.disabled = false;
         });

    }

    

}]);
