# api-automation-framework

![API Tests](https://github.com/bhuvesh75/api-automation-framework/actions/workflows/api-tests.yml/badge.svg)

## Overview

A production-grade REST API test automation framework built with Node.js, Supertest, Jest, Allure, AJV, and Faker.js. This framework provides a structured, maintainable, and scalable approach to automated API testing with comprehensive reporting, schema validation, and dynamic test data generation.

The framework targets the [reqres.in](https://reqres.in) public API and demonstrates best practices for organizing API tests in a real-world project.

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Node.js** | Runtime environment |
| **JavaScript** | Programming language |
| **Supertest** | HTTP assertion library for API requests |
| **Jest** | Test runner and assertion framework |
| **Allure** | Test reporting with rich visual dashboards |
| **AJV** | JSON Schema validation for response structure |
| **Faker.js** | Dynamic test data generation |

## Folder Structure

```
api-automation-framework/
├── .github/
│   └── workflows/
│       └── api-tests.yml           # GitHub Actions CI/CD pipeline
├── collections/
│   └── reqres-api.postman_collection.json  # Postman collection for manual testing
├── src/
│   ├── api/
│   │   ├── authApi.js              # Authentication endpoint wrappers (login, register)
│   │   └── userApi.js              # User CRUD endpoint wrappers
│   ├── config/
│   │   └── config.js               # Centralized configuration from environment variables
│   ├── schema/
│   │   ├── userSchema.json         # AJV schema for single user response
│   │   └── userListSchema.json     # AJV schema for paginated user list response
│   └── utils/
│       ├── authHelper.js           # Token retrieval and auth header builder
│       ├── dataGenerator.js        # Faker.js-based test data factories
│       └── schemaValidator.js      # AJV schema validation utility
├── tests/
│   ├── smoke/
│   │   └── healthCheck.test.js     # Quick API reachability checks
│   ├── functional/
│   │   ├── auth.test.js            # Login and registration tests
│   │   ├── createUser.test.js      # POST /users tests
│   │   ├── deleteUser.test.js      # DELETE /users/:id tests
│   │   ├── getUsers.test.js        # GET /users and GET /users/:id tests
│   │   ├── patchUser.test.js       # PATCH /users/:id tests
│   │   └── updateUser.test.js      # PUT /users/:id tests
│   └── regression/
│       └── fullRegression.test.js  # Comprehensive regression suite
├── .env.example                    # Environment variable template
├── .gitignore                      # Git ignore rules
├── CONTRIBUTING.md                 # Contribution guidelines
├── package.json                    # Project metadata and dependencies
└── README.md                       # This file
```

## Prerequisites

- **Node.js** version 20 or higher
- **npm** (included with Node.js)
- **reqres.in API key** (free — sign up at [reqres.in](https://reqres.in) to obtain one)
- **Allure CLI** (optional, for generating HTML reports locally)

## Setup Guide

1. **Clone the repository**

   ```bash
   git clone https://github.com/bhuvesh75/api-automation-framework.git
   cd api-automation-framework
   ```

2. **Install dependencies**

   ```bash
   npm ci
   ```

3. **Create environment file**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and replace `your-api-key-here` with your actual reqres.in API key. You can also adjust the base URL, timeout, or default page.

## Run Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (smoke + functional + regression) |
| `npm run test:smoke` | Run smoke tests only |
| `npm run test:functional` | Run functional tests only |
| `npm run test:regression` | Run regression tests only |
| `npm run allure:generate` | Generate Allure HTML report from results |
| `npm run allure:open` | Open the generated Allure report in a browser |
| `npm run allure:report` | Generate and open the Allure report |

## CI/CD

This framework includes a GitHub Actions workflow that runs automatically on:

- Every push to the `main` branch
- Every pull request targeting the `main` branch

The workflow:

1. Checks out the repository
2. Sets up Node.js 20 with npm caching
3. Installs dependencies via `npm ci`
4. Copies `.env.example` to `.env`
5. Runs all tests via `npm test`
6. Generates an Allure report
7. Uploads the Allure report as a build artifact

## Test Coverage

### User Endpoints

| Endpoint | Method | Scenarios Covered |
|----------|--------|-------------------|
| `/users?page=N` | GET | 200 with valid schema, pagination metadata, data array length, response time |
| `/users/:id` | GET | 200 with correct ID and email, 404 for non-existent user, response time |
| `/users` | POST | 201 with static payload, 201 with generated data, response time |
| `/users/:id` | PUT | 200 with matching fields and updatedAt, response time |
| `/users/:id` | PATCH | 200 with partial update (job only, name only), response time |
| `/users/:id` | DELETE | 204 with empty body, response time |

### Authentication Endpoints

| Endpoint | Method | Scenarios Covered |
|----------|--------|-------------------|
| `/login` | POST | 200 with valid credentials and token, 400 with missing password, response time |
| `/register` | POST | 200 with valid credentials and token, 400 with missing password, response time |

### Cross-Cutting Validations

- JSON Schema validation using AJV for list and single user responses
- Response time assertions against configurable thresholds
- Dynamic test data via Faker.js to avoid test data collisions

## Author

**Bhuvesh Yadav** — QA Lead | Lead SDET | Test Automation Architect

- GitHub: [https://github.com/bhuvesh75](https://github.com/bhuvesh75)
- Certifications: ISTQB CTAL-TA, ISTQB CTFL, Certified Scrum Master
- 8+ years of experience in Quality Assurance and Automation.
