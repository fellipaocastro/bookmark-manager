[![Build Status](https://travis-ci.org/fellipecastro/bookmark-manager.svg?branch=master)](https://travis-ci.org/fellipecastro/bookmark-manager)

**Bookmark Manager**
----
  App for bookmark management.
  
## Frontend

* Node.js 8.4.0
* npm 5.3.0
* Angular 4.2.4
* angular2-jwt 0.2.3
* Bootstrap 3.3.7

## Backend

* Python 3.6.2
* Django 1.11.4
* Django REST framework 3,6,3
* REST framework JWT Auth 1.11.0

## Requirements

* Docker
* docker-compose

## Setup

  ```$ docker-compose up```

## Usage

  http://localhost:4200
  
  username: admin / password: q1w2e3r4

## Test

  ```$ docker-compose exec api python manage.py test```

## Source code check

  ```$ docker-compose exec api flake8 .```

## Interactive shell

  ```$ docker-compose exec api python manage.py shell```
