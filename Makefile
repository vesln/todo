#
# Paths
#

TEST_EXEC=node_modules/.bin/hydro
TEST_COV_EXEC=node_modules/.bin/istanbul
TEST_EXEC_BARE = node_modules/.bin/_hydro

#
# All
#

all: clean install test

#
# Install
#

install: node_modules

#
# Run all tests
#

test:
	@echo
	@echo '==> [ Test :: Unit ]'
	@$(MAKE) test-unit
	@echo '==> [ Test :: Acceptance ]'
	@$(MAKE) test-acceptance

#
# Test runner for the CI server
#

test-ci: test

#
# Run the unit tests
#

test-unit:
	@$(TEST_EXEC) test/*.js

#
# Run the acceptance tests
#

test-acceptance:
	@$(TEST_EXEC) test/acceptance/*.js

#
# Test coverage report
#

test-cov:
	@$(TEST_COV_EXEC) cover $(TEST_EXEC_BARE)

#
# Clean all
#

clean:
	@rm -rf node_modules

#
# Install node modules
#

node_modules:
	@npm install

#
# Instructions
#

.PHONY: test-acceptance test-cov test-unit test-ci test
