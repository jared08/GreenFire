from rest_framework import serializers
from stocks.models import Stock

class StockSerializer(serializers.ModelSerializer):
   class Meta:
      model = Stock

      fields = ('id', 'name', 'current_price', 'price_of_purchase', 'quantity',)
      read_only_fields = ('id',)

