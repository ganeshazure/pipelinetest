# ====================================
# PLAYWRIGHT COMMANDS CHEAT SHEET
# ====================================


# -------------------------------
# BASIC EXECUTION
# -------------------------------

# Run all tests in the project
npx playwright test

# Run a single test file
npx playwright test tests/example.spec.js

# Run a specific test by name (grep)
npx playwright test -g "test name"

# Run multiple test files
npx playwright test tests/test1.spec.js tests/test2.spec.js


# -------------------------------
# BROWSER EXECUTION
# -------------------------------

# Run tests in Chromium browser
npx playwright test --project=chromium

# Run tests in Firefox browser
npx playwright test --project=firefox

# Run tests in WebKit (Safari engine)
npx playwright test --project=webkit

# Run tests in all browsers
npx playwright test --project=chromium --project=firefox --project=webkit


# -------------------------------
# HEADLESS / HEADED MODE
# -------------------------------

# Default execution (headless mode)
npx playwright test

# Run with browser UI visible
npx playwright test --headed

# Run with slow motion (for debugging step-by-step)
npx playwright test --headed --slow-mo=500


# -------------------------------
# ENVIRONMENT EXECUTION (DEV / QA)
# -------------------------------

# Set environment variable (Windows)
set ENV=dev && npx playwright test

# Set environment variable (Mac/Linux)
ENV=qa npx playwright test

# Access in code:
# process.env.ENV


# -------------------------------
# PARALLEL EXECUTION
# -------------------------------

# Run tests in parallel with 4 workers
npx playwright test --workers=4

# Run tests sequentially (1 worker)
npx playwright test --workers=1


# -------------------------------
# GROUP / TAG EXECUTION
# -------------------------------

# Run only tests tagged with @smoke
npx playwright test --grep @smoke

# Exclude tests tagged with @regression
npx playwright test --grep-invert @regression


# -------------------------------
# DEBUGGING
# -------------------------------

# Run in debug mode (step-by-step execution)
npx playwright test --debug

# Open Playwright UI mode (interactive runner)
npx playwright test --ui

# Enable tracing for debugging failures
npx playwright test --trace on

# Open trace viewer
npx playwright show-trace trace.zip


# -------------------------------
# RETRY & TIMEOUT
# -------------------------------

# Retry failed tests 2 times
npx playwright test --retries=2

# Set global test timeout to 60 seconds
npx playwright test --timeout=60000


# -------------------------------
# REPORT GENERATION
# -------------------------------

# Open default HTML report
npx playwright show-report

# Generate HTML report after execution
npx playwright test --reporter=html

# Use multiple reporters (console + HTML)
npx playwright test --reporter=line,html

# Generate JSON report
npx playwright test --reporter=json

# Generate JUnit report (used in CI tools)
npx playwright test --reporter=junit


# -------------------------------
# SCREENSHOT & VIDEO
# -------------------------------

# Capture screenshot only on failure
npx playwright test --screenshot=only-on-failure

# Record video for test execution
npx playwright test --video=on

# Record trace (best for debugging failures)
npx playwright test --trace=on


# -------------------------------
# PROJECT CONFIG EXECUTION
# -------------------------------

# Run tests for a specific project (browser/device config)
npx playwright test --project=chromium

# Run tests for multiple projects
npx playwright test --project=chromium --project=firefox


# -------------------------------
# FILTERING TESTS
# -------------------------------

# Run all tests inside a specific folder
npx playwright test tests/login/

# Run tests matching file name pattern
npx playwright test *login*


# -------------------------------
# CI / CLEAN EXECUTION
# -------------------------------

# Run in CI mode with simple reporter
npx playwright test --reporter=line

# Delete previous report folder (clean run)
rm -rf playwright-report


# -------------------------------
# HELP
# -------------------------------

# List all available Playwright commands
npx playwright test --help


# ====================================
# END OF DOCUMENT
# ====================================