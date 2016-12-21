# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_auto_20161209_2013'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='stocks',
            field=models.ManyToManyField(to='stocks.Stock', blank=True),
            preserve_default=True,
        ),
    ]
