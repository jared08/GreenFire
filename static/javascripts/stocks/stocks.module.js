(function () {
  'use strict';

  angular
    .module('greenfire.stocks', [
      'greenfire.mystocks.controllers',
      'greenfire.stocks.controllers',
      'greenfire.stock.controllers',
      'greenfire.transaction.controllers',
      'greenfire.stocks.directives',
      'greenfire.stocks.services',
    ]);

  angular
    .module('greenfire.mystocks.controllers', []);

  angular
    .module('greenfire.stocks.controllers', []);

  angular
    .module('greenfire.stock.controllers', []);

  angular
    .module('greenfire.transaction.controllers', []);


  angular
    .module('greenfire.stocks.directives', ['ngDialog']);

  angular
    .module('greenfire.stocks.services', []);

})();
