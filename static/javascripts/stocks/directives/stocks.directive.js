(function () {
  'use strict';

  angular
    .module('greenfire.stocks.directives')
    .directive('stocks', stocks);

  function stocks() {
    var directive = {
      controller: 'StocksController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        stocks: '='
      },
      templateUrl: '/static/templates/stocks/stocks.html'
    };

    return directive; 

  }
})();
