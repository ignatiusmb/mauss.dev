---
date: "2018-10-15T17:38:25+07:00"
theme: archive
title: Django Quick Setup Guide with GitLab and Heroku
description: Create Django app and automatically build and deploy to Heroku
tags: [tutorial, coding, django, heroku, gitlab]
---

> update: this guide is outdated and archived. Heroku phased out their free tier on the 28th of November, 2022.

start by creating a [git repository](https://gitlab.com/projects/new) and a [new heroku app](https://dashboard.heroku.com/new-app). inside your GitLab project settings, under CI/CD variables, add three keys: `HEROKU_APIKEY`, `HEROKU_APPNAME`, and `HEROKU_APP_HOST`. these will be used to connect GitLab's pipeline with your Heroku deployment.

initialize and add your remote origin and Heroku remotes:

```bash
git init
git remote add origin https://gitlab.com/username/git-repo-name.git
heroku git:remote -a heroku-appname
```

with that ready, add a `.gitlab-ci.yml` file to enable pipelines. you'll also need a simple script for migrations:

```bash
#$ file: deployment.sh
#!/bin/bash
python manage.py makemigrations
python manage.py migrate
```

Heroku also requires a `Procfile` in your project's root. this file specifies how your app runs:

```
#$ file: Procfile
migrate: bash deployment.sh
web: gunicorn your_project_name.wsgi
```

note that `Procfile` must not have an extension. it explicitly declares process types for Heroku, and without it your deployment won't know what to run. if you need more details, see [heroku's docs on procfile](https://devcenter.heroku.com/articles/procfile). before committing, make sure to grab a proper [Python `.gitignore`](https://github.com/github/gitignore/blob/main/Python.gitignore) to avoid pushing unnecessary files.

## virtual environment

> update: do not use virtualenv anymore. use `uv`, `pipenv`, or `poetry` instead.

using a virtual environment is essential to make sure your global Python installation won't get cluttered with libraries from every project. start by installing Python 3 and ensuring it's available in your `PATH`. install virtualenv with pip:

```bash
pip install virtualenv
```

on Windows, virtualenvwrapper-win makes environment management easier:

```bash
pip install virtualenvwrapper-win
```

to create an environment:

```bash
mkvirtualenv your-env-name
```

activate it with `workon your-env-name`, or list all environments simply with `workon`. once inside, add a `requirements.txt` file listing your dependencies:

```
#$ file: requirements.txt
Django==2.1.1
gunicorn==19.7.1
whitenoise==3.3.0
dj-database-url==0.4.2
psycopg2==2.7.5
requests==2.18.4
# and so on...
```

install everything with:

```bash
pip install -r requirements.txt
```

if a library like `psycopg2` fails, remove it temporarily from the file, install the rest, then install that library separately. afterwards, regenerate your requirements file with `pip freeze > requirements.txt`.

## Django setup

create your django project and app:

```bash
django-admin startproject your_project_name
django-admin startapp your_app_name
```

open `project/settings.py` and update it:

```python
#$ file: project/settings.py
import os
import dj_database_url

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCTION = os.environ.get('DATABASE_URL') is not None

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    ...
    'your_app_name',
]

MIDDLEWARE = [
    ...
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

this configuration allows Heroku deployments to work correctly. if `DATABASE_URL` is present, Heroku's environment will override your database settings:

```python
#$ file: project/settings.py#92
if PRODUCTION:
    DATABASES['default'] = dj_database_url.config()
```

you'll also want to configure static files:

```python
#$ file: project/settings.py#130
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'assets')
]

STATIC_ROOT = os.path.dirname(os.path.abspath(__file__))

STATIC_URL = '/static/'

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

this ensures CSS, JS, and images are collected and served properly in production.

finally, wire up your app's urls and views:

```python
#$ file: project/urls.py
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app_name.urls')),
]
```

and inside your app, define urls and views:

```python
#$ file: project/urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('', home, name='home'),
]
```

```python
#$ file: project/views.py
from django.shortcuts import render

def home(request):
    return render(request, 'your_template.html')
```

place your templates (`.html` files) inside a `templates` directory within your app, and you're ready to run locally or deploy. from here on, pushing to GitLab will trigger the pipeline, migrations will run, and your Django project will be live on Heroku.
