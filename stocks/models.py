from django.db import models

class Stock(models.Model):

   name = models.CharField(max_length=40, unique=True)
   current_price = models.FloatField()

   #num_owned = models.IntegerField(default=0)
   #low = models.IntegerField(default=current_price)
   #high = models.IntegerField(default=current_price)

   #price_of_purchase = models.IntegerField(null=True)
   #quantity = models.IntegerField(null=True)

   #def __unicode__(self):
   #     return '{0}'.format(self.name)

   def __unicode__(self):
        return self.name
