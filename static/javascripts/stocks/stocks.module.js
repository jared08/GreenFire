(function () {
  'use strict';

  angular
    .module('greenfire.stocks', [
      'greenfire.mystocks.controllers',
      'greenfire.stocks.controllers',
      'greenfire.stock.controllers',
      'greenfire.stocks.directives',
      'greenfire.stocks.services',
      'greenfire.mystocks.services',
    ]);

  angular
    .module('greenfire.mystocks.controllers', []);

  angular
    .module('greenfire.stocks.controllers', []);

  angular
    .module('greenfire.stock.controllers', []);


  angular
    .module('greenfire.stocks.directives', ['ngDialog']);

  angular
    .module('greenfire.stocks.services', []);

  angular
    .module('greenfire.mystocks.services', []);

})();
