from django.contrib.auth import update_session_auth_hash

from rest_framework import serializers

from authentication.models import Account
from stocks.serializers import StockSerializer

class AccountSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    #stocks = StockSerializer(many=True, read_only=False, required=False)
    stocks = StockSerializer(many=True)    

    class Meta:
        model = Account
        fields = ('id', 'email', 'username', 'created_at', 'updated_at',
                  'first_name', 'last_name', 'stocks', 'password',
                  'confirm_password', 'is_admin',)
        read_only_fields = ('created_at', 'updated_at',)
        def create(self, validated_data):
	    print('inside create!')
	    print(validated_data)
            return Account.objects.create(**validated_data)

        def update(self, instance, validated_data):
	    print('inside update!')
	    print(validated_data)
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
       print('IN GET VALIDATION EXCLUSIONS!!')
       print(exclusions)
       return exclusions
