from django.db import models


class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=30)
    passport = models.CharField(max_length=30)
    age = models.PositiveIntegerField()
    diagnosis = models.TextField()
