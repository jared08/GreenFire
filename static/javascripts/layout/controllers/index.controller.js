(function () {
  'use strict';
 
  angular
    .module('thinkster.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'AuthService', 'Stocks', 'Snackbar'];

  function IndexController($scope, AuthService, Stocks, Snackbar) {
    var vm = this;

    vm.isAuthenticated = AuthService.isAuthenticated();
    vm.stocks = [];

    activate();

    function activate() {
      Stocks.all().then(stocksSuccessFn, stocksErrorFn);

      $scope.$on('stock.created', function (event, post) {
        vm.stocks.unshift(stock);
      });

      $scope.$on('stock.created.error', function () {
        vm.stocks.shift();
      });

      function stocksSuccessFn(data, status, headers, config) {
        vm.stocks = data.data;
      }

      function stocksErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
  }
})();
