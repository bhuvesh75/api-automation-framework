/**
 * @file        healthCheck.test.js
 * @description Smoke test suite that verifies the reqres.in API is reachable and responding correctly.
 * @purpose     Acts as a fast gate — if this fails, deeper functional tests should not run.
 * @author      Bhuvesh Yadav
 * @github      https://github.com/bhuvesh75
 */

// Import the getUsers API wrapper for the list endpoint
const { getUsers } = require('../../src/api/userApi');

// Import the response timeout threshold from centralized config
const { RESPONSE_TIMEOUT_MS } = require('../../src/config/config');

// Group all smoke tests under a single describe block
describe('Smoke: API Health Check', () => {

  /**
   * @test        API returns 200 for user list
   * @given       The reqres.in API is deployed and reachable
   * @when        GET /users?page=1 is called
   * @then        Response status is 200 and data array is non-empty
   * @assertion   status === 200, data.length > 0
   */
  it('should return 200 and a non-empty data array from GET /users?page=1', async () => {
    // Send GET request to the users list endpoint for page 1
    const response = await getUsers(1);
    // Assert that the HTTP status code is 200 OK
    expect(response.status).toBe(200);
    // Assert that the response body contains a data property
    expect(response.body).toHaveProperty('data');
    // Assert that the data array contains at least one user record
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  /**
   * @test        API responds within acceptable time
   * @given       The reqres.in API is deployed and reachable
   * @when        GET /users?page=1 is called and response time is measured
   * @then        Response time is below the configured threshold
   * @assertion   elapsed < RESPONSE_TIMEOUT_MS
   */
  it('should respond within the configured timeout threshold', async () => {
    // Record the start time immediately before the request
    const startTime = Date.now();
    // Send GET request to the users list endpoint
    await getUsers(1);
    // Calculate the elapsed time in milliseconds
    const elapsed = Date.now() - startTime;
    // Assert that the response time is below the configured threshold
    expect(elapsed).toBeLessThan(RESPONSE_TIMEOUT_MS);
  });

  /**
   * @test        API response contains pagination metadata
   * @given       The reqres.in API is deployed and reachable
   * @when        GET /users?page=1 is called
   * @then        Response body includes page, per_page, total, and total_pages fields
   * @assertion   All pagination fields are present and are numbers
   */
  it('should include pagination metadata in the response', async () => {
    // Send GET request to the users list endpoint for page 1
    const response = await getUsers(1);
    // Assert that the page field exists and equals 1
    expect(response.body.page).toBe(1);
    // Assert that per_page is a positive number
    expect(response.body.per_page).toBeGreaterThan(0);
    // Assert that total is a positive number
    expect(response.body.total).toBeGreaterThan(0);
    // Assert that total_pages is a positive number
    expect(response.body.total_pages).toBeGreaterThan(0);
  });
});
