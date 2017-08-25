[![Build Status](https://travis-ci.org/fellipecastro/bookmark-manager.svg?branch=master)](https://travis-ci.org/fellipecastro/bookmark-manager)

**Bookmark Manager**
----
  App for bookmark management.

## Requirements

* Docker
* docker-compose

## Setup

  ```$ docker-compose up```

## Usage

  http://localhost:4200

## Test

  ```$ docker-compose exec api python manage.py test```

## Source code check

  ```$ docker-compose exec api flake8 .```

## Interactive shell

  ```$ docker-compose exec api python manage.py shell```
