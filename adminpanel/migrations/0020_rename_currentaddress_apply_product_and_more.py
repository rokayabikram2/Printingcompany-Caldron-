# Generated by Django 4.2.8 on 2023-12-19 10:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adminpanel', '0019_alter_navigation_page_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='apply',
            old_name='currentAddress',
            new_name='product',
        ),
        migrations.RemoveField(
            model_name='apply',
            name='certificate',
        ),
        migrations.RemoveField(
            model_name='apply',
            name='country',
        ),
        migrations.RemoveField(
            model_name='apply',
            name='cv',
        ),
        migrations.RemoveField(
            model_name='apply',
            name='passport',
        ),
        migrations.RemoveField(
            model_name='apply',
            name='permanentAddress',
        ),
        migrations.RemoveField(
            model_name='apply',
            name='photo',
        ),
    ]
