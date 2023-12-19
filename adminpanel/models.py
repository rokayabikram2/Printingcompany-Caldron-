from django.db import models
# from django.utils import timezone

class GlobalSettings(models.Model):
    SiteName = models.CharField(max_length=100)
    SiteContact = models.CharField(max_length=100)
    SiteEmail = models.EmailField()
    SiteAddress = models.CharField(max_length=500)
    Sitetwitterlink = models.CharField(max_length=300)
    Sitefacebooklink = models.CharField(max_length=300)
    Sitelinkdinlink = models.CharField(max_length=300)
    Siteinstagram = models.CharField(max_length=300)
    Siteyoutubelink = models.CharField(max_length=300)
    Whatsapp = models.CharField(max_length=20,null=True)
    logo = models.ImageField(upload_to="Logo/",max_length=200, null=True, default=None)
    back_image = models.ImageField(upload_to="Global/",null=True)
    scanner=models.ImageField(upload_to="QR",null=True)
  

    def __str__(self):
        return self.SiteName

class ContactUS(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    subject = models.CharField(max_length=50)
    message = models.TextField()
    mobile = models.CharField(max_length=50,null=True)


    def __str__(self):
        return self.name
      

class Navigation(models.Model):
    PAGE_TYPE = (
        ('Home','Home'), ('Home/Slider','Home/Slider'),
        ('Home/Aboutus','Home/Aboutus'),('Apply/Slider','Apply/Slider'),('Home/CompanyData','Home/CompanyData'),('CompanyData/Slider','CompanyData/Slider'),('CompanyData Details','CompanyData Details'),
        ('M&V/Slider','M&V/Slider'),('Mission & Vision','Mission & Vision'),('Testimonial','Testimonial'),('Testimonial/Background','Testimonial/Background'),('Clients','Clients'),
        ('AboutUs','AboutUs'),('About/WhoWeAre','About/WhoWeAre'),('WhoWeAre/Slider','WhoWeAre/Slider'),('WhyChoose Us/Qualities','WhyChoose Us/Qualities'),('WhyChooseUs','WhyChooseUs'),('WhyChooseUs/Slider','WhyChooseUs/Slider'),
        ('Image Gallery','Image Gallery'),('Image Gallery/slider','Image Gallery/slider'),('order Product','order Product'),
        ('Video Gallery','Video Gallery'),('Video Gallery/slider','Video Gallery/slider'),('Contact us','contact us')
     
       
       
    )

    STATUS = (
        ('Publish', 'Publish'),
        ('Draft', 'Draft')
    )
    name = models.CharField(max_length=100, null=False)
    caption = models.CharField(max_length=100)
    status = models.CharField(choices=STATUS, max_length=50)
    position = models.IntegerField()
    page_type = models.CharField(choices=PAGE_TYPE, null=True, blank=True, max_length=50)
    title = models.CharField(max_length=200)
    short_desc = models.TextField(null=True)
    desc = models.TextField(null=True)
    bannerimage = models.ImageField(upload_to="banner/",null=True)
    meta_title = models.CharField(max_length=100, null=True)
    meta_keyword = models.CharField(max_length=100, null=True)
    icon_image = models.ImageField(upload_to="icon/", null=True)
    slider_image = models.ImageField(upload_to="slider/", null=True)
    Parent = models.ForeignKey('self', related_name="childs", on_delete=models.CASCADE, null=True, blank=True)
    brochure = models.FileField(upload_to="brochure/",null=True)
    back_image = models.ImageField(upload_to="background/",null=True)
    published_date=models.CharField(max_length=50,null=True)
    interview_date = models.CharField(max_length=50,null =True)
    country = models.CharField(max_length=50,null =True)
    video = models.FileField(upload_to="video/",null=True)
    

    def __str__(self):
        return self.name
    
    
    
class Apply(models.Model):
    name = models.CharField(max_length=50)
    mobile = models.CharField(max_length=50,null=True)
    email = models.CharField(max_length=50, null=True)
    product = models.CharField(max_length=50, null=True)
    message = models.TextField(null=True)

    def _str_(self):
        return self.name


