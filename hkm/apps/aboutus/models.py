from django.db import models

class Faculty(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    image = models.ImageField(upload_to='faculty/')
    order = models.IntegerField(default=0, help_text="Order of display on the page")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Faculty Members"
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

class Portfolio(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    tools = models.CharField(max_length=255, help_text="e.g. Ps • Ai • Ae • Pr")
    image = models.ImageField(upload_to='portfolios/')
    portfolio_link = models.URLField()
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Portfolios"
        ordering = ['order', 'name']

    def __str__(self):
        return self.name
