from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    summary = models.TextField(blank=True)
    profile_image = models.ImageField(upload_to="profile_images/", null=True, blank=True)

class Education(models.Model):
    profile = models.ForeignKey(Profile, related_name="educations", on_delete=models.CASCADE)
    school = models.CharField(max_length=200)
    degree = models.CharField(max_length=100)
    year = models.CharField(max_length=4)

class Experience(models.Model):
    profile = models.ForeignKey(Profile, related_name="experiences", on_delete=models.CASCADE)
    company = models.CharField(max_length=200)
    role = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField(blank=True)

class Skill(models.Model):
    profile = models.ForeignKey(Profile, related_name="skills", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)