# Generated by Django 4.2.8 on 2023-12-18 08:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminpanel', '0007_alter_navigation_page_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='navigation',
            name='page_type',
            field=models.CharField(blank=True, choices=[('Home', 'Home'), ('Home/Slider', 'Home/Slider'), ('Home/Aboutus', 'Home/Aboutus'), ('legaldocument', 'legaldocument'), ('legaldocument/slider', 'legaldocument/slider'), ('Organization chart', 'Organization chart'), ('Our Team', 'Our Team'), ('Our Team/Slider', 'Our Team/Slider'), ('Current Demand/slider', 'Current Demand/slider'), ('Newspaper Vacancy', 'Newspaper Vacancy'), ('NewspaperVacancy/Slider', 'NewspaperVacancy/Slider'), ('Apply/Slider', 'Apply/Slider'), ('M&V/Slider', 'M&V/Slider'), ('Mission & Vision', 'Mission & Vision'), ('Testimonial', 'Testimonial'), ('Testimonial/Background', 'Testimonial/Background'), ('Clients', 'Clients'), ('AboutUs', 'AboutUs'), ('About Nepal', 'About Nepal'), ('About Nepal/Image', 'About Nepal/Image'), ('Message from MD', 'Message from MD'), ('Recruitment Process', 'Recruitment Process'), ('WhyChoose Us/Qualities', 'WhyChoose Us/Qualities'), ('WhyChooseUs', 'WhyChooseUs'), ('WhyChooseUs/Slider', 'WhyChooseUs/Slider'), ('Job Sector', 'Job Sector'), ('Job Sector/slider', 'Job Sector/slider'), ('Documentation', 'Documentation'), ('Documentation/Country', 'Documentation/Country'), ('Gallery', 'Gallery'), ('Gallery/slider', 'Gallery/slider'), ('Gallery/Company profile', 'Gallery/Company profile'), ('Gallery/Events', 'Gallery/Events'), ('Contact us', 'contact us')], max_length=50, null=True),
        ),
    ]