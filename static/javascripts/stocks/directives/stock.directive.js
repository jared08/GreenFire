(function () {
  'use strict';

  angular
    .module('thinkster.stocks.directives')
    .directive('stock', stock);

  function stock() {
    var directive = {
      restrict: 'E',
      scope: {
        post: '='
      },
      templateUrl: '/static/templates/stocks/stock.html'
    };

    return directive;
  }
})();
