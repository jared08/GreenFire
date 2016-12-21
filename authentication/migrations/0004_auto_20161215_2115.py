# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_auto_20161215_1655'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='stocks',
            field=models.ManyToManyField(to='stocks.Stock'),
            preserve_default=True,
        ),
    ]
