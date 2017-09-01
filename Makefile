help:
	@echo "Usage: make [command]"
	@echo "Commands:"
	@echo "  up                 Start containers."
	@echo "  stop               Stop containers."
	@echo "  test               Run tests."
	@echo "  lint               Run source code check."
	@echo "  shell              Run interactive shell."

up:
	@docker-compose up -d

stop:
	@docker-compose stop

test:
	@docker-compose exec api python manage.py test --settings=api.settings.test

lint:
	@docker-compose exec api flake8 .
	@docker-compose exec frontend ./node_modules/.bin/ng lint --type-check

shell:
	@docker-compose exec api python manage.py shell
