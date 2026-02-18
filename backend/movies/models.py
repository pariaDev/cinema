from django.db import models


class Mood(models.Model):
    """
    Example moods:
    - calm
    - sad
    - excited
    - romantic
    - dark
    """
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Genre(models.Model):
    """
    Example genres:
    - drama
    - comedy
    - sci-fi
    """
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    release_year = models.PositiveIntegerField(null=True, blank=True)
    duration_minutes = models.PositiveIntegerField(null=True, blank=True)

    genres = models.ManyToManyField(
        Genre,
        related_name="movies",
        blank=True
    )

    moods = models.ManyToManyField(
        Mood,
        through="MovieMood",
        related_name="movies"
    )

    def __str__(self):
        return self.title


class MovieMood(models.Model):
    """
    what moods the movie has?
    Each movie-mood relation has a weight.
    """
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='movie_moods')
    mood = models.ForeignKey(Mood, on_delete=models.CASCADE)

    weight = models.FloatField(
        help_text="How strongly this movie matches the mood (0–1 or 0–10)"
    )

    class Meta:
        unique_together = ("movie", "mood")

    def __str__(self):
        return f"{self.movie.title} - {self.mood.name} ({self.weight})"
