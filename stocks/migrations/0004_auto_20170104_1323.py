# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stocks', '0003_auto_20170103_1843'),
    ]

    operations = [
        migrations.RenameField(
            model_name='stock',
            old_name='price',
            new_name='current_price',
        ),
        migrations.AddField(
            model_name='stock',
            name='price_of_purchase',
            field=models.IntegerField(null=True),
            preserve_default=True,
        ),
    ]
