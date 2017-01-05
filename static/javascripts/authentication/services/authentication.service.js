angular.module('greenfire.authentication.services').factory('AuthService',
  ['$q', '$timeout', '$http', '$cookies',
  function ($q, $timeout, $http, $cookies) {

    var account_email;
    var account_cash;
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
      return $http.post('/api/v1/auth/login/', {
        email: email, password: password
      }).then(loginSuccessFn, loginErrorFn);

      function loginSuccessFn(data, status, headers, config) {
        setAuthenticatedAccount(data.data);
	account_email = data.data.email;
	account_cash = data.data.cash;
	admin = data.data.is_admin;

        window.location = '/home';
      }

      function loginErrorFn(data, status, headers, config) {
        console.error('bummer dude..');
      }
    }

    function getAuthenticatedAccount() {
      if (!$cookies.authenticatedAccount) {
        return;
      }
      return JSON.parse($cookies.authenticatedAccount);
    }

    function isAuthenticated() {
      return !!$cookies.authenticatedAccount;
    }

    function setAuthenticatedAccount(account) {
      $cookies.authenticatedAccount = JSON.stringify(account);
    }

    function unauthenticate() {
      delete $cookies.authenticatedAccount;
    }

    
    function logout() {
      return $http.post('/api/v1/auth/logout/')
        .then(logoutSuccessFn, logoutErrorFn);
    

      function logoutSuccessFn(data, status, headers, config) {
        unauthenticate();

        window.location = '/login';
      }

      function logoutErrorFn(data, status, headers, config) {
        console.error('no bueno');
      }
    }

  

    function getEmail() {
      return account_email;
    }

    function getCash() {
      console.log('inside AuthService.getCash()!!!');
      console.log(account_cash);
      return account_cash;
    }

    function isAdmin() {
      return admin;
    }

    
    return ({
        register: register,
	login: login,
	getAuthenticatedAccount: getAuthenticatedAccount,
        isAuthenticated: isAuthenticated,
	setAuthenticatedAccount: setAuthenticatedAccount,
        unauthenticate: unauthenticate,
	logout: logout,
	getEmail: getEmail,
	getCash: getCash,
	isAdmin: isAdmin,
    }); 

}]);
