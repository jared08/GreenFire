from rest_framework import permissions, viewsets, status, views

from rest_framework.response import Response
from rest_framework.decorators import api_view

from authentication.models import Account
from authentication.serializers import AccountSerializer

from stocks.models import Stock
from stocks.serializers import StockSerializer

class StockViewSet(viewsets.ModelViewSet):
   queryset = Stock.objects.order_by('name')
   serializer_class = StockSerializer

   def create(self, request):
        stock_name = request.data.get('name', '')
        stock_price = request.data.get('price', '')

        Stock.objects.create(name=stock_name, price=stock_price)
	
	queryset = self.queryset.filter(name=stock_name)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

 

   def put(self, request):
	old_stock = request.data.get('stock', '')	
	pk = old_stock.get('id', '')
	new_name = request.data.get('new_name', '')

	Stock.objects.filter(pk=pk).update(name=new_name)
	
	queryset = self.queryset.filter(pk=pk)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


   def delete(self, request):
	stock = request.data.get('stock', '')
	pk = stock.get('id', '')
	Stock.objects.filter(pk=pk).delete()

	queryset = self.queryset.filter()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class AccountStocksViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.select_related('username').all()

    serializer_class = AccountSerializer

    def list(self, request):
	username = request.GET.get('username', '')
        queryset = self.queryset.filter(email=username)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


    def put(self, request):
	method = request.data.get('method', '')
	if (method == 'buy'):
	   username = request.data.get('username', '')
	   account = Account.objects.get(email=username)

           stock = request.data.get('stock', '')
           stock_name = stock.get('name', '')
	   quantity = stock.get('quantity', '')

	   #eventually lock
	   stock_from_db = Stock.objects.get(name=stock_name)
	   price = stock_from_db.price;
	   #eventually unlock

	   #aka user already owns that stock and is buying more
	   if (account.stocks.filter(name=stock_name)):
	     temp = account.stocks.filter(name=stock_name)
	     new_quantity = temp[0].quantity + quantity

	     account.stocks.filter(name=stock_name).update(quantity=new_quantity)
	     account.save()
	   else:
	     new_stock = Stock.objects.get(name=stock_name)
             new_stock.quantity = quantity
             new_stock.save()
	   
             account.stocks.add(new_stock)
	     account.save()
	
	   total = quantity * price

	   account.cash = account.cash - total;
	   account.save()

	   #not sure about this..
           queryset = self.queryset.filter(email=username)
	   print(queryset)
           serializer = self.serializer_class(queryset)
	   print(serializer)
	   print('hey')
	   print(serializer.is_valid())
	   print(serializer.errors)
           return Response(serializer.data)

	else:
           username = request.data.get('username', '')
           account = Account.objects.get(email=username)

	   stock_data = request.data.get('stock', '')
           stock_name = stock_data.get('name', '')
	   quantity = stock_data.get('quantity', '')

	   #eventually lock
           stock_from_db = Stock.objects.get(name=stock_name)
           price = stock_from_db.price;
           #eventually unlock

	   #aka not selling all of the stock
	   if (account.stocks.filter(name=stock_name)[0].quantity > quantity):
	     account.stocks.filter(name=stock_name)[0].update(quantity=new_quantity)
	     account.save()
	   else:
	     stock = Stock.objects.get(name=stock_name)
	     account.stocks.remove(stock)
	     account.save()

	   total = quantity * price

	   account.cash = account.cash + total
	   account.save()

	   #not sure about this..
	   queryset = self.queryset.filter(email=username)
	   print(queryset)
	   serializer = self.serializer_class(queryset)
	   print(serializer)
	   print('hey')
	   print(serializer.errors)
	   print('hey again')
	   return Response(serializer.data)

