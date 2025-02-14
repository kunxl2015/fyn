from datetime import datetime, timedelta
from django.db.models import Sum
from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from revenue.models import Transaction

@api_view(['GET'])
def get_routes(request):
    pass

@api_view(['GET'])
def get_revenue(request, id):
    today = datetime.today()
    if id == 0:
        start_date = today - timedelta(days=6)
        revenues = (
            Transaction.objects.filter(date__range=[start_date, today])
            .values("date")
            .annotate(revenue=Sum("amount"))
            .order_by("date")
        )
        data = [{"Date": rev["date"].strftime("%a"), "revenue": rev["revenue"]} for rev in revenues]

    elif id == 1:
        revenues = (
            Transaction.objects.extra(select={"month": "strftime('%%m', date)"})
            .values("month")
            .annotate(revenue=Sum("amount"))
            .order_by("month")
        )
        month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        data = [{"Month": month_names[int(rev["month"]) - 1], "revenue": rev["revenue"]} for rev in revenues]

    elif id == 2:
        revenues = (
            Transaction.objects.extra(select={"year": "strftime('%%Y', date)"})
            .values("year")
            .annotate(revenue=Sum("amount"))
            .order_by("year")
        )
        data = [{"Year": rev["year"], "revenue": rev["revenue"]} for rev in revenues]

    else:
        return Response({"error": "Invalid ID"}, status=400)

    return Response(data)
