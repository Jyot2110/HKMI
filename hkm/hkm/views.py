from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from apps.contactus.models import ContactMessage

from apps.aboutus.models import Faculty, Portfolio

def home(request):
    portfolios = Portfolio.objects.all()
    return render(request, 'pages/index.html', {'portfolios': portfolios})

def contacts(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        course = request.POST.get('course')
        message = request.POST.get('message')

        if name and email and phone and course and message:
            # 1. Save to database
            ContactMessage.objects.create(
                name=name,
                email=email,
                phone=phone,
                course=course,
                message=message
            )

            # 2. Send email notification
            subject = f"New Contact Us Inquery: {name}"
            email_body = f"""
            You have received a new message from the HKM Contact Us form:
            
            Name: {name}
            Email: {email}
            Phone: {phone}
            Course Interest: {course}
            
            Message:
            {message}
            """
            
            try:
                send_mail(
                    subject,
                    email_body,
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.ADMIN_EMAIL],
                    fail_silently=False,
                )
            except Exception as e:
                # Log the error or handle it silently
                print(f"Error sending email: {e}")

            messages.success(request, 'Your message has been sent successfully!')
            return redirect('contacts')
        else:
            messages.error(request, 'Please fill in all fields.')

    return render(request, 'pages/contact_us.html')

from apps.aboutus.models import Faculty

def aboutus(request):
    faculties = Faculty.objects.all()
    return render(request, 'pages/aboutus.html', {'faculties': faculties})

