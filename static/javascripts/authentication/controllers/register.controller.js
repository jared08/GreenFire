angular.module('greenfire.authentication.controllers').controller('RegisterController',
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
