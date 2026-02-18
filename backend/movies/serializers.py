from rest_framework import serializers
from .models import Movie


class MovieRecommendationSerializer(serializers.ModelSerializer):
    score = serializers.FloatField()

    class Meta:
        model = Movie
        fields = ['id', 'title', 'score']
