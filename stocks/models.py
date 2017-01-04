from django.db import models

class Stock(models.Model):

   name = models.CharField(max_length=40, unique=True)
   current_price = models.IntegerField()

   price_of_purchase = models.IntegerField(null=True)
   quantity = models.IntegerField(null=True)

   def __unicode__(self):
        return '{0}'.format(self.name)

