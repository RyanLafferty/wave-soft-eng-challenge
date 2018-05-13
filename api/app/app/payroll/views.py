import json
import os
from datetime import datetime, date
from django.conf import settings
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from app.payroll.models import Record, Payment
from app.payroll.serializers import RecordSerializer, PaymentSerializer
from app.payroll.forms import PayrollForm
from app.payroll.services import storeData


class RecordList(APIView):
    pagination_class = PageNumberPagination

    def get(self, request, format=None):
        record = Record.objects.all().using('default').order_by('id')
        paginator = PageNumberPagination()
        paginator.max_page_size = 1000
        paginator.page_size_query_param = 'page_size'

        result_page = paginator.paginate_queryset(record, request)
        serializer = RecordSerializer(result_page, many=True, context={'request': request})

        current_page = paginator.page.number
        total_pages = int(str(paginator.page).split(" ")[3].split(">")[0])
        page_size = len(serializer.data)
        previous_page = str(paginator.get_previous_link())
        next_page = str(paginator.get_next_link())

        return JsonResponse(data={'page_size': page_size,
                                  'results': serializer.data,
                                  'next_page': next_page,
                                  'previous_page': previous_page,
                                  'current_page': current_page,
                                  'total_pages': total_pages
                                  },
                            status=200,
                            safe=False)

class PaymentList(APIView):
    pagination_class = PageNumberPagination

    def get(self, request, format=None):
        payment = Payment.objects.all().using('default').order_by('id') # TODO orderby something logical
        paginator = PageNumberPagination()
        paginator.max_page_size = 100
        paginator.page_size_query_param = 'page_size'

        result_page = paginator.paginate_queryset(payment, request)
        serializer = PaymentSerializer(result_page, many=True, context={'request': request})

        current_page = paginator.page.number
        total_pages = int(str(paginator.page).split(" ")[3].split(">")[0])
        page_size = len(serializer.data)
        previous_page = str(paginator.get_previous_link())
        next_page = str(paginator.get_next_link())

        return JsonResponse(data={'page_size': page_size,
                                  'results': serializer.data,
                                  'next_page': next_page,
                                  'previous_page': previous_page,
                                  'current_page': current_page,
                                  'total_pages': total_pages
                                  },
                            status=200,
                            safe=False)

class UploadPayrollDocument(APIView):
    def post(self, request, format=None):
        form = PayrollForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            status = storeData(form.instance.file.url)
            return JsonResponse(data={
                                    'status': status,
                                    'time': datetime.today().strftime('%d/%m/%Y %H:%M:%S')
                                },
                                )
        else:
            return JsonResponse(data={
                                    'status': 'ERROR: No file provided',
                                    'time': datetime.today().strftime('%d/%m/%Y %H:%M:%S')
                                  },
                                )
