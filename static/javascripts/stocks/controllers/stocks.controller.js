angular.module('greenfire.stocks.controllers').controller('StocksController',
  ['$scope', '$location', 'AuthService', 'StocksService',
  function ($scope, $location, AuthService, StocksService) {

    var user = AuthService.getAuthenticatedAccount(); 
    $scope.is_admin = user.is_admin;

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

    getAllStocks();

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

    //for british eyes only
    $scope.addStock = function () {
      StocksService.add($scope.new_stock.name, $scope.new_stock.price)
       .then(function (data) {
         $scope.disabled = false;
         getAllStocks();
       })
       .catch(function () {
         console.log('ERROR!!!');
         $scope.error = true;
         $scope.errorMessage = "Unable to add stock..";
         $scope.disabled = false;
       });
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
         $scope.errorMessage = "Unable to edit stock..";
         $scope.disabled = false;
       });
    }
  
    $scope.deleteStock = function() {
      StocksService.remove(stock_to_change)
       .then(function (data) {
         $scope.disabled = false;
         getAllStocks();
       })
       .catch(function () {
         console.log('ERROR!!!');
         getMyStocks();
         $scope.error = true;
         $scope.errorMessage = "Unable to delete stock..";
         $scope.disabled = false;
       });
    }

}]);


