.PHONY: build
build:
	rm -rf ./dist-prod/* && ./node_modules/.bin/parcel build src/pages/index.html --dist-dir ./dist-prod

.PHONY: deploy
deploy: build
	wrangler pages publish ./dist-prod --project-name dow-calculator-trainer --branch production

.PHONY: watch
watch:
	./node_modules/.bin/parcel src/pages/index.html
