(function () {
  'use strict';

  angular
    .module('greenfire', [
      'greenfire.config',
      'greenfire.routes',
      'greenfire.authentication',
      'greenfire.layout',
      'greenfire.stocks',
      'greenfire.utils',
    ]);

  angular
    .module('greenfire.config', []);

  angular
    .module('greenfire.routes', ['ngRoute']);

  angular
    .module('greenfire')
    .run(run);

  run.$inject = ['$http'];

  function run($http) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
  }
})();
