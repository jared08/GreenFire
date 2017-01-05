from rest_framework import permissions, viewsets

from authentication.models import Account
from authentication.permissions import IsAccountOwner
from authentication.serializers import AccountSerializer


class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
	print('GETTING PERMISSIONS')
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
	print(serializer)
        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
	else:
	    print('not valid.')
	    print(serializer.errors)

        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)

import json

from django.contrib.auth import authenticate, login

from rest_framework import status, views
from rest_framework.response import Response

class LoginView(views.APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)

        email = data.get('email', None)
        password = data.get('password', None)
	print(email)
	print(password)

        account = authenticate(email=email, password=password)

	print(account)
	check = account.is_authenticated
	print(check)
	print('ay')

        if account is not None:
            if account.is_active:
                login(request, account)

                serialized = AccountSerializer(account)
		print(serialized)
                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)

from django.contrib.auth import logout

from rest_framework import permissions

class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    print('PERMISSION CLASSES IN LOGOUTVIEW')
    print(permission_classes)

    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)
