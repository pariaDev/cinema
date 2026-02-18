from django.contrib import admin
from .models import Movie, Genre, Mood, MovieMood


# Inline for setting mood weights inside Movie admin
class MovieMoodInline(admin.TabularInline):
    model = MovieMood
    extra = 1
    autocomplete_fields = ['mood']

# registering all models defined in models.py
@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_year')
    search_fields = ('title',)
    list_filter = ('genres',)
    filter_horizontal = ('genres',)
    inlines = [MovieMoodInline]


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    search_fields = ('name',)


@admin.register(Mood)
class MoodAdmin(admin.ModelAdmin):
    search_fields = ('name',)


@admin.register(MovieMood)
class MovieMoodAdmin(admin.ModelAdmin):
    list_display = ('movie', 'mood', 'weight')
    list_filter = ('mood',)
