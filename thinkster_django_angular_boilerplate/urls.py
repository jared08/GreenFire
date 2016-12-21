# .. Imports
from django.conf.urls import patterns, url, include
from rest_framework_nested import routers

from .views import IndexView

from authentication.views import AccountViewSet
from authentication.views import LoginView
from authentication.views import LogoutView

from stocks.views import AccountStocksViewSet, StockViewSet

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

router.register(r'stocks', StockViewSet)
router.register(r'mystocks', AccountStocksViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)

#accounts_router.register(r'mystocks', AccountStocksViewSet)


urlpatterns = patterns(
     '',
    # ... URLs
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),

    #url(r'^mystocks/test/$', 'test'),

    url('^.*$', IndexView.as_view(), name='index'),
)

