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
	   print('TRYING TO BUY')
	   username = request.data.get('username', '')
	   account = Account.objects.get(email=username)
	   print(account)
           stock = request.data.get('stock', '')
           stock_name = stock.get('name', '')
           new_stock = Stock.objects.get(name=stock_name)

	   print('before')
	   print(account.stocks.all())
           account.stocks.add(new_stock)
	   print('after')
           print(account.stocks.all())
           #account.save()
	   print('account saved')

           queryset = self.queryset.filter(email=username)
	   print(queryset)
           serializer = self.serializer_class(queryset)
	   print(serializer)
	   print('hey')
	   print(serializer.is_valid())
	   print(serializer.errors)
           return Response(serializer.data)

	else:
	   print('TRYING TO SELL')
           username = request.data.get('username', '')
           stock = request.data.get('stock', '')

           account = Account.objects.get(email=username)

           stock_name = stock.get('name', '')
           new_stock = Stock.objects.get(name=stock_name)

	   print('before')
	   print(account.stocks.all())
	   account.stocks.remove(new_stock)
	   print('after')
	   print(account.stocks.all())
	   #account.save()
	   print('account saved')	

	   queryset = self.queryset.filter(email=username)
	   print(queryset)
	   serializer = self.serializer_class(queryset)
	   print(serializer)
	   print('hey')
	   print(serializer.errors)
	   print('hey again')
	   return Response(serializer.data)

