help:
	@echo "Usage: make [command]"
	@echo "Commands:"
	@echo "  up                 Start containers."
	@echo "  stop               Stop containers."
	@echo "  rm                 Remove containers."
	@echo "  logs               Display logs."
	@echo "  test               Run tests."
	@echo "  lint               Run source code check."
	@echo "  shell              Run interactive shell."

up:
	@docker-compose up --force-recreate -d

stop:
	@docker-compose stop

rm:
	@docker-compose rm

logs:
	@docker-compose logs -f

test:
	@docker-compose exec api python manage.py test --settings=api.settings.test

lint:
	@docker-compose exec api flake8 .
	@docker-compose exec frontend ./node_modules/.bin/ng lint --type-check

shell:
	@docker-compose exec api python manage.py shell
