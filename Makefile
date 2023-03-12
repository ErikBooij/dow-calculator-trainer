.PHONY: build
build:
	./node_modules/.bin/parcel build src/pages/index.html --dist-dir ./dist

.PHONY: watch
watch:
	./node_modules/.bin/parcel src/pages/index.html
