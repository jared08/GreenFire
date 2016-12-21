/*(function () {
  'use strict';

  angular
    .module('thinkster.authentication.controllers')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', '$scope', 'Authentication'];
  
  function RegisterController($location, $scope, Authentication) {
    var vm = this;

    vm.register = register;

    activate();

    function activate() {
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    function register() {
      console.log('calling Authentication.register(' + vm.email + ', ' + vm.password + ', ' + vm.username + ' in controller')
      Authentication.register(vm.email, vm.password, vm.username);
    }
  }
})();*/

angular.module('thinkster.authentication.controllers').controller('RegisterController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      AuthService.register($scope.registerForm.email, $scope.registerForm.password, $scope.registerForm.username)
        // handle success
        .then(function (data) {
	  console.log(data)
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function (data) {
	  console.log('uh oh')
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);
