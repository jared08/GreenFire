from rest_framework import permissions, viewsets, status, views

from rest_framework.response import Response
from rest_framework.decorators import api_view

from authentication.models import Account
from authentication.serializers import AccountSerializer

from authentication.models import AccountStock
from authentication.serializers import AccountStockSerializer

from stocks.models import Stock
from stocks.serializers import StockSerializer

class StockViewSet(viewsets.ModelViewSet):
   queryset = Stock.objects.order_by('name')
   serializer_class = StockSerializer

   def create(self, request):
        stock_name = request.data.get('name', '')
        stock_price = request.data.get('price', '')
        Stock.objects.create(name=stock_name, current_price=stock_price)
	queryset = self.queryset.filter(name=stock_name)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

   def list(self, request):
        stock_name = request.GET.get('stock', '')
	if (stock_name == ''): #getting data for all stocks
	  #queryset = Stock.objects.filter(quantity=None).order_by('name')
	  queryset = Stock.objects.order_by('name')
	else: #getting data for one particular stock
          #queryset = self.queryset.filter(quantity=None, name=stock_name)
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
    #queryset = Account.objects.select_related('username').all()
    queryset = AccountStock.objects.select_related('account').all()

    #serializer_class = AccountSerializer
    serializer_class = AccountStockSerializer

    def list(self, request):
	username = request.GET.get('username', '')
	account = Account.objects.get(email=username)

        queryset = self.queryset.filter(account=account)
	print(queryset)
        serializer = self.serializer_class(queryset, many=True)
	print(serializer)
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
	   price = stock_from_db.current_price;
	   #eventually unlock

	   #checks if user already owns the stock and needs to buy more or buy for the first time
           if (AccountStock.objects.filter(account=account, stock=stock_from_db).exists()):
	     old_stock = AccountStock.objects.get(account=account, stock=stock_from_db)
	     old_quantity = old_stock.quantity
	     old_stock.quantity = old_quantity + quantity

	     old_value = old_stock.price_of_purchase * old_quantity
	     new_value = price * quantity
	     calculated_price_of_purchase = (old_value + new_value) / (old_quantity + quantity)
	     old_stock.save()
           else:
             new_stock = AccountStock.objects.create(account=account, stock=stock_from_db, price_of_purchase=price, quantity=quantity)
             new_stock.save()
	
	   total = quantity * price

	   account.cash = account.cash - total;
	   account.save()
	   print('bought everything')
	   queryset = self.queryset.filter(account=account)
           print(queryset)
           serializer = self.serializer_class(queryset, many=True)
           print(serializer.data)

           #queryset = self.queryset.filter(email=username)
           #serializer = self.serializer_class(queryset[0])
           return Response(serializer.data)

	else:
           username = request.data.get('username', '')
           account = Account.objects.get(email=username)

	   stock_data = request.data.get('stock', '')
           stock_name = stock_data.get('name', '')
	   quantity = stock_data.get('quantity', '')

	   #eventually lock
           stock_from_db = Stock.objects.get(name=stock_name)
           price = stock_from_db.current_price;
           #eventually unlock

	   stock = AccountStock.objects.filter(account=account, stock=stock_from_db)
	   print(stock.quantity)
	   #aka not selling all of the stock
	   if (stock.quantity > quantity):
	     print('trying to sell some')
	     print(stock.quantity)
	     stock.quantity = stock.quantity - quantity
	     stock.save()
	     print(stock.quantity)
	   else:
	     print('trying to sell all')
	     stock.remove()

	   total = quantity * price

	   account.cash = account.cash + total
	   account.save()

	   queryset = self.queryset.filter(email=username)
	   serializer = self.serializer_class(queryset[0])
	   return Response(serializer.data)

