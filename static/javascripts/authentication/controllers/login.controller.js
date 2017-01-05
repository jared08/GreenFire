angular.module('greenfire.authentication.controllers').controller('LoginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
 
    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      AuthService.login($scope.loginForm.email, $scope.loginForm.password)
        // handle success
        .then(function (data) {    
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);
