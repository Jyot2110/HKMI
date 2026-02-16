# HKM Project Structure

## Overview
This is a Django-based web application for managing courses and events. The project follows Django's standard application structure with separated apps for different functionalities.

## Directory Structure

```
HKM/
├── FIX_REPORT.md                 # Project fixes and issues documentation
├── PROJECT_STRUCTURE.md          # This file
├── db.sqlite3                    # SQLite database file
├── manage.py                     # Django management script
│
├── hkm/                          # Main Django project directory
│   ├── __init__.py
│   ├── settings.py               # Django settings and configuration
│   ├── urls.py                   # Main URL routing configuration
│   ├── views.py                  # Main project views
│   ├── asgi.py                   # ASGI configuration for async servers
│   ├── wsgi.py                   # WSGI configuration for production servers
│   └── __pycache__/              # Python bytecode cache
│
├── apps/                         # Django applications directory
│   ├── __init__.py
│   ├── __pycache__/
│   │
│   ├── courses/                  # Courses management app
│   │   ├── __init__.py
│   │   ├── admin.py              # Django admin configuration for courses
│   │   ├── apps.py               # App configuration
│   │   ├── models.py             # Course models/database schemas
│   │   ├── tests.py              # Unit tests for courses app
│   │   ├── urls.py               # URL routing for courses app
│   │   ├── views.py              # Views/controllers for course functionality
│   │   ├── __pycache__/
│   │   └── migrations/           # Database migrations
│   │       ├── __init__.py
│   │       └── __pycache__/
│   │
│   └── events/                   # Events management app
│       ├── __init__.py
│       ├── admin.py              # Django admin configuration for events
│       ├── apps.py               # App configuration
│       ├── models.py             # Event models/database schemas
│       ├── tests.py              # Unit tests for events app
│       ├── urls.py               # URL routing for events app
│       ├── views.py              # Views/controllers for event functionality
│       ├── __pycache__/
│       └── migrations/           # Database migrations
│           ├── __init__.py
│           └── __pycache__/
│
├── templates/                    # HTML templates directory
│   ├── base/                     # Base/layout templates
│   │   ├── footer.html           # Footer component
│   │   └── nav.html              # Navigation component
│   │
│   ├── courses_pages/            # Course-related templates
│   │   ├── 2D_Animation.html
│   │   ├── 3D_Architectural.html
│   │   ├── 3D_Jewellery_Design.html
│   │   ├── 3d-animation.html
│   │   ├── Android_Development.html
│   │   ├── course.html           # General course page template
│   │   ├── Digital_Marketing.html
│   │   ├── Game_Design.html
│   │   ├── Graphics_Design.html
│   │   ├── lang.html             # Language template
│   │   ├── UI-UX_Design.html
│   │   ├── vidyo_editing.html
│   │   └── Visual_Effect.html
│   │
│   └── pages/                    # General page templates
│       ├── contact_us.html       # Contact page
│       ├── course.html           # Course listing page
│       ├── event.html            # Event listing page
│       └── index.html            # Homepage
│
└── static/                       # Static files directory (CSS, JS, images)
    ├── css/
    │   └── style.css             # Main stylesheet
    ├── images/                   # Image assets
    ├── js/
    │   └── script.js             # Main JavaScript file
    └── pdfs/                     # PDF documents
```

## Key Components

### Django Apps

#### Courses App
- Manages course listings, details, and related information
- Models: Course data structures
- Views: Course display and management
- Admin: Django admin interface for course management

#### Events App
- Manages events and event-related information
- Models: Event data structures
- Views: Event display and management
- Admin: Django admin interface for event management

### Static Files
- **CSS**: Styling located in `static/css/`
- **JavaScript**: Client-side scripts in `static/js/`
- **Images**: Image assets in `static/images/`
- **PDFs**: Document storage in `static/pdfs/`

### Templates
- **Base Templates**: Reusable layouts (navigation, footer)
- **Course Templates**: Individual course pages with descriptions
- **Page Templates**: Main navigation pages (home, events, courses, contact)

## Database
- SQLite database (`db.sqlite3`) - suitable for development
- Migrations managed through Django migration system

## Configuration Files
- `settings.py`: Django project settings, installed apps, database config
- `urls.py`: Main URL routing
- `wsgi.py`: Production server configuration
- `asgi.py`: Async server configuration

## Additional Documentation
- `FIX_REPORT.md`: Contains project fixes and known issues
