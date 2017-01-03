angular.module('greenfire.stocks.services').factory('StocksService',
  ['$http',
  function ($http) {   
    
     function allStocks() {
      return $http.get('/api/v1/stocks/')
        .then(function(response) {
              return response.data;
            });
    }
	
    function myStocks(username) {
       var parameters = {
         username: username
       };

       return $http.get('/api/v1/mystocks/',
	{ params: parameters })
	  .then(function(response) {
	     return response.data;
	  });
    }

    function buy(username, stock) {
      return $http.put('/api/v1/mystocks/',
        {username: username, stock: stock, method: 'buy'})
        .then(function(response) {
              return response.data;
            });
    }

    function sell(username, stock) {
      return $http.put('/api/v1/mystocks/',
        {username: username, stock: stock, method: 'sell'})
        .then(function(response) {
              return response.data;
            });
    }

    function add(name, price) {
      return $http.post('/api/v1/stocks/',
        {name: name, price: price})
        .then(function(response) {
              return response.data;
            });
    }

    function edit(stock, new_name) {
      return $http.put('/api/v1/stocks/',
        {stock: stock, new_name: new_name})
        .then(function(response) {
              return response.data;
            });
    }


    function remove(stock) {
      return $http({
	  method: 'DELETE',
	  url: '/api/v1/stocks/',
	  data: {stock: stock}, 
	  headers: {'Content-Type': 'application/json;charset=utf-8'}
      })
        .then(function(response) {
              return response.data;
            });
    }

    




    return ({
      allStocks: allStocks,
      myStocks: myStocks,
      buy: buy,
      sell: sell,
      add: add,
      edit: edit,
      remove: remove,
    }); 

}]);
