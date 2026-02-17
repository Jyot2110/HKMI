import os
import django
import sys
from datetime import date

# Add project root to sys.path
sys.path.append('c:\\Users\\hsp48\\OneDrive\\Desktop\\HKMI\\hkm')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hkm.settings')
django.setup()

from apps.events.models import Event

def create_sample_event():

    if Event.objects.count() == 0:
        Event.objects.create(
            title="Sample Event",
            description="This is a sample event to verify the events page rendering.",
            event_date=date.today(),
            image="events/sample.jpg" # Dummy path, image won't load but page will render
        )
        print("Sample event created.")
    else:
        print("Events already exist.")

if __name__ == "__main__":
    create_sample_event()
