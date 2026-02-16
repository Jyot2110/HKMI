from django.shortcuts import render
from .models import Event
# Create your views here.
def events_home(request):
    # Get only the latest 6 events, ordered by most recent date first
    events = Event.objects.all().order_by('-event_date')[:6]
    return render(request, 'pages/event.html', {'events': events})
    

