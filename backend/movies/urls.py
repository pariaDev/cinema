from django.urls import path
from .views import RecommendMovieAPIView
from .views import test_api
from .views import search_movies

urlpatterns = [
    path("test/", test_api),                 
    path("recommend/", RecommendMovieAPIView.as_view()),    # real logic
    path("movies/search/", search_movies)
    
]
