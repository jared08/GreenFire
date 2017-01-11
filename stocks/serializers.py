from rest_framework import serializers
from stocks.models import Stock

class StockSerializer(serializers.ModelSerializer):
   class Meta:
      model = Stock

      fields = ('id', 'name', 'current_price',)
      read_only_fields = ('id',)

