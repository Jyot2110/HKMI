from django.shortcuts import render


def home(request):
    return render(request,'pages/index.html')

def contacts(request):
    return render(request, 'pages/contact_us.html')

def about_us(request):
    return render(request, 'pages/aboutus.html')

# def explore(request):
#     return render(request, 'pages/course.html')