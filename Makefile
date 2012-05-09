TESTS = test/*.test.js
REPORTER = dot

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		$(TESTS)

init: 
	chmod 777 ./data

.PHONY: test init
