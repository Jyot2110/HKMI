from django.db import models

class ContactMessage(models.Model):
    COURSE_CHOICES = [
        ('animation', '3D Animation'),
        ('vfx', 'VFX'),
        ('graphics', 'Graphics Design'),
        ('game', 'Game Design'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    course = models.CharField(max_length=50, choices=COURSE_CHOICES)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.course}"

    class Meta:
        ordering = ['-created_at']
