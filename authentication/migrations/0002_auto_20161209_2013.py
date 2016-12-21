# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stocks', '0002_remove_stock_owners'),
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='tagline',
        ),
        migrations.AddField(
            model_name='account',
            name='stocks',
            field=models.ManyToManyField(to='stocks.Stock', null=True, blank=True),
            preserve_default=True,
        ),
    ]
