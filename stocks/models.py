from django.db import models

class Stock(models.Model):

   name = models.CharField(max_length=40, unique=True)
   price = models.IntegerField()
   quantity = models.IntegerField(null=True)

   def __unicode__(self):
        return '{0}'.format(self.name)

