(function () {
  'use strict';

  angular
    .module('greenfire.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider.when('/register', {
      controller: 'RegisterController', 
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/register.html'
    }).when('/login', {
      controller: 'LoginController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/login.html'
    }).when('/home', {
      controller: 'MyStocksController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/stocks/mystocks.html',
      access: {restricted: true}
    }).when('/stocks', {
      controller: 'StocksController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/stocks/stocks.html',
      access: {restricted: true}
    }).when('/stocks/:param1', {
      controller: 'StockController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/stocks/stock.html',
      access: {restricted: true}
    }).when('/transaction', {
      controller: 'TransactionController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/stocks/transaction.html',
      access: {restricted: true}
    }).when('/logout', {
      controller: 'LogoutController',
      controllerAs: 'vm',
      access: {restricted: true}
    }).when('/', {
      controller: 'IndexController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/layout/index.html'
    })
  }
})();
