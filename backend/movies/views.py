from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

from .models import Movie, Mood
from .serializers import MovieRecommendationSerializer


class RecommendMovieAPIView(APIView):
    def post(self, request):
        moods = request.data.get('moods', [])

        if not moods:
            return Response(
                {"error": "No moods provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        movies = Movie.objects.prefetch_related('movie_moods__mood')

        results = []

        for movie in movies:
            # calculating each movie's score
            score = 0.0
            
            for mm in movie.movie_moods.all():
                if mm.mood.name in moods:
                    score += mm.weight

            if score > 0:
                movie.score = score
                results.append(movie)

        results.sort(key=lambda m: m.score, reverse=True)

        serializer = MovieRecommendationSerializer(results, many=True)
        
        print(request.data)
        return Response(serializer.data)

@api_view(['GET'])
def search_movies(request):
    query = request.GET.get('q', '')

    if not query:
        return Response([])

    movies = Movie.objects.filter(
        Q(title__icontains=query)
    )[:5]

    data = [
        {
            "title": movie.title,
            # "slug": movie.slug,
            "year": movie.release_year,
        }
        for movie in movies
    ]

    return Response(data)



# for test only
from django.http import JsonResponse

def test_api(request):
    return JsonResponse({
        "status": "ok",
        "movies": [
            {"id": 1, "title": "Fight Club"},
            {"id": 2, "title": "Inception"},
        ]
    })
