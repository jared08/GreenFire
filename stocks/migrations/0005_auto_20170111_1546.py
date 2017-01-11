# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stocks', '0004_auto_20170104_1323'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stock',
            name='price_of_purchase',
        ),
        migrations.RemoveField(
            model_name='stock',
            name='quantity',
        ),
    ]
