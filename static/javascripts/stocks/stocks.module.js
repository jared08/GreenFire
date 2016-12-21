(function () {
  'use strict';

  angular
    .module('greenfire.stocks', [
      'greenfire.stocks.controllers',
      'greenfire.stocks.directives',
      'greenfire.stocks.services',
      'greenfire.mystocks.services',
    ]);

  angular
    .module('greenfire.stocks.controllers', []);

  angular
    .module('greenfire.stocks.directives', ['ngDialog']);

  angular
    .module('greenfire.stocks.services', []);

  angular
    .module('greenfire.mystocks.services', []);

})();
