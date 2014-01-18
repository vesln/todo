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

install:
	@npm install

#
# Run all tests
#

test:
	@echo
	@echo '==> [ Test :: Unit ]'
	@make test-unit
	@echo '==> [ Test :: Acceptance ]'
	@make test-acceptance

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

clean: clean-node

#
# Remove `node_modules`
#

clean-node:
	@rm -rf node_modules

#
# Instructions
#

.PHONY: test
