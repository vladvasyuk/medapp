# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import patterns, url

from .views import HomePageView, FormHorizontalView, FormInlineView, PaginationView, FormWithFilesView, \
    DefaultFormView, MiscView, DefaultFormsetView, DefaultFormByFieldView, write_diag, write_patient, get_patient, remove_patient

urlpatterns = [
    url(r'^$', HomePageView.as_view(), name='home'),
    url(r'^write_diag$', write_diag, name='write_diag'),
    url(r'^write_patient$', write_patient, name='write_patient'),
    url(r'^get_patient$', get_patient, name='get_patient'),
    url(r'^remove_patient$', remove_patient, name='remove_patient'),
]