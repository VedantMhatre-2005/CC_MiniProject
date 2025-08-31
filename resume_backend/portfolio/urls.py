from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, EducationViewSet, ExperienceViewSet, SkillViewSet, generate_resume

router = DefaultRouter()
router.register(r'profiles', ProfileViewSet)
router.register(r'educations', EducationViewSet)
router.register(r'experiences', ExperienceViewSet)
router.register(r'skills', SkillViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('generate_resume/<int:pk>/', generate_resume, name="generate_resume"),
]