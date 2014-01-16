#
# Paths
#

TEST_EXEC=node_modules/.bin/hydro
TEST_COV_EXEC=node_modules/.bin/istanbul

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
	@$(TEST_COV_EXEC) cover $(TEST_EXEC)

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
