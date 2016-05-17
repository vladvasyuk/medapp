from django.shortcuts import render

# Create your views here.
def home(request):
    # View code here...
    return render(request, 'home.html', {"foo": "bar"},
        content_type="text/html")