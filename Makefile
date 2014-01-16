#
# Paths
#

TEST_EXEC=node_modules/.bin/hydro
TEST_COV_EXEC=node_modules/.bin/istanbul

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
# Instructions
#

.PHONY: test
