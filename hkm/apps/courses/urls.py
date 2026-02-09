from django.urls import path
from .views import *

urlpatterns = [
    path('', courses_home, name='courses'),
    path('game-design/', game_design, name='Game_Design'),
    path('graphics-animation/', graphics_animation, name='Graphics_Animation'),
    path('creative-design/', creative_design, name='Creative_Design'),
    path('3d-animation/', three_d_animation, name='3D_Animation'),
    path('2d-animation/', two_d_animation, name='2D_Animation'),
    path('3d-architectural/', three_d_architectural, name='3D_Architectural'),
    path('android-development/', android_development, name='Android_Development'),
    path('digital-marketing/', digital_marketing, name='Digital_Marketing'),
    path('graphics-design/', graphics_design, name='Graphics_Design'),
    path('ui-ux-design/', ui_ux_design, name='UI_UX_Design'),
    path('visual-effect/', visual_effect, name='Visual_Effect'),
    path('video-editing/', video_editing, name='Video_Editing'),
    path('lang-course/', lang_course, name='Lang_Course'),
]
