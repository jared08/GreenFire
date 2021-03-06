angular.module('greenfire.stocks.services').factory('StocksService',
  ['$http',
  function ($http) {   
    
    var current_stock = {};
    var current_type = '';

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

    function allStocks() {
      return $http.get('/api/v1/stocks/')
        .then(function(response) {
              return response.data;
            });
    }

    function getStockInfo(stock) {
      var parameters = {
         stock: stock
       };

      return $http.get('/api/v1/stocks/',
        {params: parameters})
        .then(function(response) {
              return response.data;
            });
    }

    function getStock() {
      return current_stock;
    }
	

    function setStock(stock) {
      current_stock = stock;
    }

    function getType() {
      return current_type;
    }

    function setType(type) {
      current_type = type;
    }


    function transact(username, stock, type) {
       return $http.put('/api/v1/mystocks/',
        {username: username, stock: stock, method: type})
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


    //for british eyes only

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
      myStocks: myStocks,
      allStocks: allStocks,
      getStockInfo: getStockInfo,
      transact: transact,
      getStock: getStock,
      setStock: setStock,
      getType: getType,
      setType: setType,
      buy: buy,
      sell: sell,
      add: add,
      edit: edit,
      remove: remove,
    }); 

}]);
