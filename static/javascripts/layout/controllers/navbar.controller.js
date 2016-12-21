(function () {
  'use strict';

  angular
    .module('greenfire.layout.controllers')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$scope', 'AuthService'];

  function NavbarController($scope, AuthService) {
    var vm = this;

    vm.logout = logout;

    function logout() {
      AuthService.logout();
    }
  }
})();
