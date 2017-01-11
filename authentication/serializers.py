from django.contrib.auth import update_session_auth_hash

from rest_framework import serializers

from authentication.models import Account
from authentication.models import AccountStock
from stocks.serializers import StockSerializer

class AccountSerializer(serializers.ModelSerializer):    
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Account
        fields = ('id', 'email', 'username', 'created_at', 'updated_at',
                  'first_name', 'last_name', 'cash', 'password',
                  'confirm_password', 'is_admin',)
        read_only_fields = ('created_at', 'updated_at',)
        def create(self, validated_data):
            return Account.objects.create(**validated_data)

        def update(self, instance, validated_data):
            instance.username = validated_data.get('username', instance.username)
	    instance.stocks = validated_data.get('stocks', instance.stocks)

            instance.save()

            password = validated_data.get('password', None)
            confirm_password = validated_data.get('confirm_password', None)

            if password and confirm_password and password == confirm_password:
                instance.set_password(password)
                instance.save()

            update_session_auth_hash(self.context.get('request'), instance)

            return instance

    def get_validation_exclusions(self, *args, **kwargs):
       exclusions = super(AccountSerializer, self).get_validation_exclusions()
       return exclusions

class AccountStockSerializer(serializers.ModelSerializer):
   account = AccountSerializer()
   stock = StockSerializer()
   class Meta:
      model = AccountStock

      fields = ('id', 'account', 'stock', 'price_of_purchase', 'quantity',)
      read_only_fields = ('id',)

