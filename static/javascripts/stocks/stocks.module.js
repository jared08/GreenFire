(function () {
  'use strict';

  angular
    .module('thinkster.stocks', [
      'thinkster.stocks.controllers',
      'thinkster.stocks.directives',
      'thinkster.stocks.services',
      'thinkster.mystocks.services',
    ]);

  angular
    .module('thinkster.stocks.controllers', []);

  angular
    .module('thinkster.stocks.directives', ['ngDialog']);

  angular
    .module('thinkster.stocks.services', []);

  angular
    .module('thinkster.mystocks.services', []);

})();
