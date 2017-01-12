# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stocks', '0005_auto_20170111_1546'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='current_price',
            field=models.FloatField(),
            preserve_default=True,
        ),
    ]
