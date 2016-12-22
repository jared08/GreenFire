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

    $scope.buyStock = function (stock) {
        console.log(stock.name);
	stock.quantity = 2;
	StocksService.buy(username, stock)
         .then(function (data) {
           $scope.disabled = false;
	   getMyStocks();
         })
         .catch(function () {
	   console.log('ERROR~~');
	   getMyStocks();
           $scope.error = true;
           $scope.errorMessage = "Unable to purchase..";
           $scope.disabled = false;
         });

    }

    $scope.sellStock = function (stock) {
	console.log(stock.name);
        StocksService.sell(username, stock)
         .then(function (data) {
           $scope.disabled = false;
           getMyStocks();
         })
         .catch(function () {
	   console.log('ERROR!!!');
	   getMyStocks();
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
	stock_to_change = stock
    }

    $scope.editStock = function() {
	console.log('trying to edit: ' + stock_to_change.name + ' to: ' + $scope.stock.new_name);
    }

    $scope.deleteStock = function() {
	console.log('trying to delete: ' + stock_to_change.name);
    }

    

}]);
