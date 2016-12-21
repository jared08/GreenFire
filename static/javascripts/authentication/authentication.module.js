(function () {
  'use strict';

  angular
    .module('greenfire.authentication', [
      'greenfire.authentication.controllers',
      'greenfire.authentication.services'
    ]);

  angular
    .module('greenfire.authentication.controllers', []);

  angular
    .module('greenfire.authentication.services', ['ngCookies']);
})();
