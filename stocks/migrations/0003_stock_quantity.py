# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stocks', '0002_remove_stock_owners'),
    ]

    operations = [
        migrations.AddField(
            model_name='stock',
            name='quantity',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
