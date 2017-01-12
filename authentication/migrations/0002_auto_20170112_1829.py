# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='cash',
            field=models.FloatField(default=25000),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='accountstock',
            name='price_of_purchase',
            field=models.FloatField(),
            preserve_default=True,
        ),
    ]
