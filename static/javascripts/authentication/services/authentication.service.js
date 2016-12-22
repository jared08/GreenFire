angular.module('greenfire.authentication.services').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    var account_email;
    var admin = false;

    function register(email, password, username) {
      stocks = [];
      return $http.post('/api/v1/accounts/',
        {email: email, password: password, username: username, stocks: stocks})
	.then(function(response) {
            return response.data;
        });
    }

    function login(email, password) {
      return $http.post('/api/v1/auth/login/',
        {email: email, password: password})
        .then(function(response) {
	    account_email = response.data.email;
	    console.log(response.data);
	    console.log(response.data.is_admin);
	    admin = response.data.is_admin;
            return response.data;
        });

    }

    
    function logout() {
      return $http.post('/api/v1/auth/logout/')
        .then(logoutSuccesFn, logoutErrorFn);
    

    function logoutSuccessFn(data, status, headers, config) {
      AuthService.unauthenticate();

      window.location = '/';
    }

    function logoutErrorFn(data, status, headers, config) {
      console.error('no bueno');
    }
  }

  function getEmail() {
    return account_email;
  }

  function isAdmin() {
    return admin;
  }

    
    return ({
        register: register,
	login: login,
	logout: logout,
	getEmail: getEmail,
	isAdmin: isAdmin,
    }); 

}]);
