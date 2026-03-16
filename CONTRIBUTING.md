# Contributing to api-automation-framework

Thank you for your interest in contributing to this project. This document outlines the conventions and guidelines to follow when submitting changes.

## Branch Naming Convention

Use the following prefixes for branch names:

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feature/` | New test suites, utilities, or capabilities | `feature/add-resource-endpoint-tests` |
| `bugfix/` | Fixes for broken tests or utilities | `bugfix/fix-schema-validation-timeout` |
| `test/` | Adjustments to existing test cases | `test/update-auth-assertions` |
| `docs/` | Documentation updates | `docs/update-readme-setup-guide` |

## Commit Message Format

Follow this format for all commit messages:

```
type: Brief description of the change

Problem: What issue or gap prompted this change
Solution: How this commit addresses it
```

### Commit Types

| Type | When to Use |
|------|-------------|
| `feat:` | Adding new test suites, API wrappers, or utilities |
| `fix:` | Fixing broken tests, incorrect assertions, or utility bugs |
| `test:` | Modifying existing test cases without adding new functionality |
| `docs:` | Updating documentation, comments, or README |
| `refactor:` | Restructuring code without changing behavior |
| `chore:` | Updating dependencies, CI configuration, or tooling |

### Examples

```
feat: Add PATCH /users/:id functional test suite

Problem: Partial update endpoint had no automated test coverage
Solution: Added tests for single-field PATCH with job and name, plus response time validation
```

```
fix: Correct user list schema to allow empty data array

Problem: Schema validation failed when requesting a page beyond total_pages
Solution: Removed minItems constraint from the data array in userListSchema.json
```

## Pull Request Checklist

Before submitting a pull request, confirm that all of the following are true:

- [ ] All new test files include the standard file header with `@file`, `@description`, `@purpose`, `@author`, and `@github`
- [ ] Every `it()` block has a JSDoc comment with `@test`, `@given`, `@when`, `@then`, and `@assertion` tags
- [ ] Every function has full JSDoc with `@function`, `@description`, `@param`, `@returns`, and `@example`
- [ ] All tests pass locally (`npm test`)
- [ ] No hardcoded URLs or credentials — use `config.js` and `.env`
- [ ] New schemas are placed in `src/schema/` and follow AJV JSON Schema format
- [ ] New API wrappers are placed in `src/api/` and export named functions
- [ ] New utilities are placed in `src/utils/` and are imported where needed
- [ ] The PR description explains what changed and why

## Code Style Guidelines

### General

- Use `const` for all variables that are not reassigned; use `let` when reassignment is necessary
- Never use `var`
- Use single quotes for strings
- Use template literals for string interpolation
- End every file with a newline
- Use semicolons at the end of every statement

### Test Files

- Group related tests inside a `describe()` block with a descriptive name
- Use section divider comments between logical groups of tests
- Every `it()` block must have a full JSDoc comment block above it
- Assertions should be one per line with an inline comment explaining what is checked
- Use `async/await` for all asynchronous operations — never use `.then()` chains

### API Wrappers

- One file per API resource (e.g., `userApi.js`, `authApi.js`)
- Every exported function must have full JSDoc including an `@example`
- Return the full supertest response object — do not extract or transform data inside the wrapper
- Inline comments on every line explaining what that line does

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Test files | `camelCase.test.js` | `getUsers.test.js` |
| API wrappers | `camelCaseApi.js` | `userApi.js` |
| Utility files | `camelCase.js` | `dataGenerator.js` |
| Schema files | `camelCase.json` | `userSchema.json` |
| Functions | `camelCase` | `getUserById` |
| Constants | `UPPER_SNAKE_CASE` | `RESPONSE_TIMEOUT_MS` |

## Adding a New Test Suite

1. Create the API wrapper in `src/api/` if the endpoints are not yet wrapped
2. Create the JSON schema in `src/schema/` if response validation is needed
3. Create the test file in the appropriate directory:
   - `tests/smoke/` for quick reachability checks
   - `tests/functional/` for endpoint-specific behavior tests
   - `tests/regression/` for comprehensive cross-endpoint suites
4. Add the test scenarios to the regression suite in `tests/regression/fullRegression.test.js`
5. Run all tests to confirm nothing is broken: `npm test`
