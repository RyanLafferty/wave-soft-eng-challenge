from django.db import models
from datetime import date

class Payment(models.Model):
    start_date = models.DateField(
        blank=False,
        null=False,
        default=date.today,
    )
    end_date = models.DateField(
        blank=False,
        null=False,
        default=date.today,
    )
    rid = models.IntegerField(
        null=False,
        default=0
    )
    eid = models.IntegerField(
        null=False,
        default=0
    )
    amount = models.FloatField(
        null=False,
        default=0
    )

    class Meta:
        db_table = 'Payment'

class Record(models.Model):
    date = models.DateField(
        blank=False,
        null=False,
        default=date.today,
    )
    job_group = models.CharField(
        max_length=1,
        blank=False,
        null=False
    )
    rid = models.IntegerField(
        null=False,
        default=0
    )
    eid = models.IntegerField(
        null=False,
        default=0
    )
    hours = models.FloatField(
        null=False,
        default=0
    )

    class Meta:
        db_table = 'Record'

class PayrollRecord(models.Model):
    name = models.CharField(
        max_length = 255
    )
    file = models.FileField(
        upload_to="uploads"
    )

    class Meta:
        db_table = 'PayrollRecord'

