# Generated by Django 4.2.8 on 2023-12-19 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminpanel', '0017_navigation_video'),
    ]

    operations = [
        migrations.AlterField(
            model_name='navigation',
            name='video',
            field=models.FileField(null=True, upload_to='video/'),
        ),
    ]
