from rest_framework import serializers


class PaymentSerializer(serializers.Serializer):
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    eid = serializers.IntegerField()
    rid = serializers.IntegerField()
    amount = serializers.FloatField()
    id = serializers.IntegerField()

class RecordSerializer(serializers.Serializer):
    date = serializers.DateField()
    job_group = serializers.CharField(max_length=1)
    eid = serializers.IntegerField()
    rid = serializers.IntegerField()
    hours = serializers.FloatField()
    id = serializers.IntegerField()
