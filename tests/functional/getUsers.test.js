/**
 * @file        getUsers.test.js
 * @description Functional tests for GET /users endpoints including list, single user, and 404 scenarios.
 * @purpose     Validates correct behavior, schema conformance, and performance of user retrieval endpoints.
 * @author      Bhuvesh Yadav
 * @github      https://github.com/bhuvesh75
 */

// Import API wrapper functions for user retrieval
const { getUsers, getUserById } = require('../../src/api/userApi');

// Import the schema validator utility
const { validateSchema } = require('../../src/utils/schemaValidator');

// Import JSON schemas for response validation
const userListSchema = require('../../src/schema/userListSchema.json');
const userSchema = require('../../src/schema/userSchema.json');

// Import configuration values
const { DEFAULT_PAGE, RESPONSE_TIMEOUT_MS } = require('../../src/config/config');

// ============================================================
// Test Suite: GET /users?page=N — Paginated User List
// ============================================================
describe('Functional: GET /users (List)', () => {

  /**
   * @test        GET /users?page=2 returns 200 with valid schema
   * @given       The reqres.in API has user data on page 2
   * @when        GET /users?page=2 is called
   * @then        Response status is 200, schema is valid, and data array is non-empty
   * @assertion   status === 200, schema passes, data.length > 0
   */
  it('should return 200 with valid schema and non-empty data for page 2', async () => {
    // Send GET request with the default page number from config
    const response = await getUsers(DEFAULT_PAGE);
    // Assert that the HTTP status code is 200 OK
    expect(response.status).toBe(200);
    // Validate the response body against the user list JSON schema
    expect(() => validateSchema(response.body, userListSchema)).not.toThrow();
    // Assert that the data array contains at least one user
    expect(response.body.data.length).toBeGreaterThan(0);
    // Assert that the page field matches the requested page
    expect(response.body.page).toBe(DEFAULT_PAGE);
  });

  /**
   * @test        GET /users?page=2 response time is acceptable
   * @given       The reqres.in API is deployed and reachable
   * @when        GET /users?page=2 is called and response time is measured
   * @then        Response completes within the configured timeout
   * @assertion   elapsed < RESPONSE_TIMEOUT_MS
   */
  it('should respond within the configured timeout for list endpoint', async () => {
    // Record the start time before the request
    const startTime = Date.now();
    // Send GET request to the list endpoint
    await getUsers(DEFAULT_PAGE);
    // Calculate elapsed time in milliseconds
    const elapsed = Date.now() - startTime;
    // Assert that the response time is within the acceptable threshold
    expect(elapsed).toBeLessThan(RESPONSE_TIMEOUT_MS);
  });

  /**
   * @test        GET /users?page=2 returns correct number of items per page
   * @given       The reqres.in API returns a per_page value in its response
   * @when        GET /users?page=2 is called
   * @then        The data array length does not exceed the per_page value
   * @assertion   data.length <= per_page
   */
  it('should return data array length not exceeding per_page value', async () => {
    // Send GET request to retrieve page 2
    const response = await getUsers(DEFAULT_PAGE);
    // Extract the per_page value from the response
    const perPage = response.body.per_page;
    // Assert that the actual data count does not exceed per_page
    expect(response.body.data.length).toBeLessThanOrEqual(perPage);
  });
});

// ============================================================
// Test Suite: GET /users/:id — Single User Retrieval
// ============================================================
describe('Functional: GET /users/:id (Single User)', () => {

  /**
   * @test        GET /users/2 returns 200 with correct user data
   * @given       A user with ID 2 exists in the system
   * @when        GET /users/2 is called
   * @then        Response status is 200, user ID is 2, and email is present
   * @assertion   status === 200, data.id === 2, data.email is a string
   */
  it('should return 200 with user ID 2 and a valid email address', async () => {
    // Send GET request for user with ID 2
    const response = await getUserById(2);
    // Assert that the HTTP status code is 200 OK
    expect(response.status).toBe(200);
    // Validate the response body against the single user JSON schema
    expect(() => validateSchema(response.body, userSchema)).not.toThrow();
    // Assert that the returned user ID matches the requested ID
    expect(response.body.data.id).toBe(2);
    // Assert that the email field is a non-empty string
    expect(typeof response.body.data.email).toBe('string');
    // Assert that the email field is not empty
    expect(response.body.data.email.length).toBeGreaterThan(0);
  });

  /**
   * @test        GET /users/999 returns 404 for non-existent user
   * @given       No user with ID 999 exists in the system
   * @when        GET /users/999 is called
   * @then        Response status is 404 and body is an empty object
   * @assertion   status === 404, body === {}
   */
  it('should return 404 for a non-existent user ID', async () => {
    // Send GET request for a user ID that does not exist
    const response = await getUserById(999);
    // Assert that the HTTP status code is 404 Not Found
    expect(response.status).toBe(404);
    // Assert that the response body is an empty object
    expect(response.body).toEqual({});
  });

  /**
   * @test        GET /users/2 response time is acceptable
   * @given       The reqres.in API is deployed and reachable
   * @when        GET /users/2 is called and response time is measured
   * @then        Response completes within the configured timeout
   * @assertion   elapsed < RESPONSE_TIMEOUT_MS
   */
  it('should respond within the configured timeout for single user endpoint', async () => {
    // Record the start time before the request
    const startTime = Date.now();
    // Send GET request for user with ID 2
    await getUserById(2);
    // Calculate elapsed time in milliseconds
    const elapsed = Date.now() - startTime;
    // Assert that the response time is within the acceptable threshold
    expect(elapsed).toBeLessThan(RESPONSE_TIMEOUT_MS);
  });
});
