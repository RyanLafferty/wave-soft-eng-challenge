from django import forms
from app.payroll.models import PayrollRecord

class PayrollForm(forms.ModelForm):
    class Meta:
        model = PayrollRecord
        fields = ('name', 'file',)
# TODO - add datetime uploaded field