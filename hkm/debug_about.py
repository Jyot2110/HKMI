import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hkm.settings')
django.setup()

from django.template.loader import render_to_string

try:
    content = render_to_string('pages/aboutus.html')
    print("TEMPLATE_RENDER_SUCCESS")
    print(f"Content length: {len(content)}")
except Exception as e:
    print("TEMPLATE_RENDER_ERROR")
    print(e)
