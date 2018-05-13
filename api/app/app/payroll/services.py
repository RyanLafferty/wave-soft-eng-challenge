import csv
import calendar
from datetime import datetime, date
from app.payroll.models import Record, Payment

def calculateAmount(group, hours):
    if group == 'B':
        return hours * 30
    else:
        return hours * 20

def checkDuplicate(rid):
    payment = Payment.objects.filter(rid=rid)[:1]
    if len(payment) > 0:
        return True
    else:
        return False

def createPayments(payments, rid):
    payment_records = []
    for payment in payments:
        payment_records.append(Payment(
            eid=payments[payment]['eid'],
            rid=rid,
            start_date=payments[payment]['start_date'],
            end_date=payments[payment]['end_date'],
            amount=payments[payment]['amount']
        ))
    return payment_records

def parseRecords(payroll_records, payments, rid):
    for record in payroll_records:
        record.rid = rid

        if record.date.day < 16:
            amount = calculateAmount(record.job_group, float(record.hours))
            eid = record.eid
            start_date = date(record.date.year, record.date.month, 1)
            key = str(eid) + '::' + str(start_date)       
            
            if key in payments:
                payments[key]['amount'] += amount
            else:
                end_date = date(record.date.year, record.date.month, 15)
                payment = {
                    'eid': eid,
                    'start_date': start_date,
                    'end_date': end_date,
                    'amount': amount
                }
                payments[key] = payment    
        else:
            amount = calculateAmount(record.job_group, float(record.hours))
            eid = record.eid
            start_date = date(record.date.year, record.date.month, 16)
            key = str(eid) + '::' + str(start_date)

            if key in payments:
                payments[key]['amount'] += amount
            else:
                end_date = date(record.date.year, record.date.month, calendar.monthrange(record.date.year, record.date.month)[1])
                payment = {
                    'eid': eid,
                    'start_date': start_date,
                    'end_date': end_date,
                    'amount': amount
                }
                payments[key] = payment

def parsePayrollCSV(file, payroll_records):
    rid = 0
    with open(file) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if 'report id' in row['date']:
                rid = row['hours worked']
                if checkDuplicate(rid):
                    return -1
            else:
                payroll_records.append(Record(
                        date=datetime.strptime(row['date'], "%d/%m/%Y").date(),
                        hours=row['hours worked'],
                        eid=row['employee id'],
                        job_group=row['job group'],
                    ))
    return rid

def storeData(file):
    # this reduces computational overhead at the cost of memory
    payments = {}
    payment_records = []
    payroll_records = []

    rid = parsePayrollCSV(file, payroll_records)
    if int(rid) < 0:
        return 'ERROR: Duplicate Report'

    parseRecords(payroll_records, payments, rid)
    payment_records = createPayments(payments, rid)

    # store results
    Record.objects.bulk_create(payroll_records)
    Payment.objects.bulk_create(payment_records)
    return 'SUCCESS'