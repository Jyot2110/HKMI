from django.shortcuts import render

# Create your views here.
def courses_home(request):
    return render(request, 'pages/course.html')

def game_design(request):
    return render(request, 'courses_pages/Game_Design.html')

def graphics_animation(request):
    return render(request, 'courses_pages/3d-animation.html')

def creative_design(request):
    return render(request, 'courses_pages/3D_Jewellery_Design.html')

def three_d_animation(request): # Renaming to avoid conflict if any, though file is 3d-animation
      return render(request, 'courses_pages/3d-animation.html')

def two_d_animation(request):
    return render(request, 'courses_pages/2D_Animation.html')

def three_d_architectural(request):
    return render(request, 'courses_pages/3D_Architectural.html')

def android_development(request):
    return render(request, 'courses_pages/Android_Development.html')

def digital_marketing(request):
    return render(request, 'courses_pages/Digital_Marketing.html')

def graphics_design(request):
    return render(request, 'courses_pages/Graphics_Design.html')

def ui_ux_design(request):
    return render(request, 'courses_pages/UI-UX_Design.html')

def visual_effect(request):
    return render(request, 'courses_pages/Visual_Effect.html')

def video_editing(request):
    return render(request, 'courses_pages/vidyo_editing.html')

def lang_course(request):
    return render(request, 'courses_pages/lang.html')
