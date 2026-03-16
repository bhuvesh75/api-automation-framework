/**
 * @file        updateUser.test.js
 * @description Functional tests for PUT /users/:id endpoint covering full user update scenarios.
 * @purpose     Validates that existing users can be fully updated with correct response structure and performance.
 * @author      Bhuvesh Yadav
 * @github      https://github.com/bhuvesh75
 */

// Import the updateUser API wrapper function
const { updateUser } = require('../../src/api/userApi');

// Import the data generator for randomized test payloads
const { generateUser } = require('../../src/utils/dataGenerator');

// Import the response timeout threshold from config
const { RESPONSE_TIMEOUT_MS } = require('../../src/config/config');

// ============================================================
// Test Suite: PUT /users/:id — Full User Update
// ============================================================
describe('Functional: PUT /users/:id (Update User)', () => {

  /**
   * @test        PUT /users/2 with valid payload returns 200
   * @given       A user with ID 2 exists in the system
   * @when        PUT /users/2 is called with { name: 'morpheus', job: 'zion resident' }
   * @then        Response status is 200, name and job match input, and updatedAt exists
   * @assertion   status === 200, body.name === 'morpheus', body.job === 'zion resident', body.updatedAt exists
   */
  it('should update user 2 and return 200 with updatedAt timestamp', async () => {
    // Define a static payload with known values for deterministic assertions
    const payload = { name: 'morpheus', job: 'zion resident' };
    // Send PUT request to fully update user with ID 2
    const response = await updateUser(2, payload);
    // Assert that the HTTP status code is 200 OK
    expect(response.status).toBe(200);
    // Assert that the response body echoes back the updated name
    expect(response.body.name).toBe('morpheus');
    // Assert that the response body echoes back the updated job
    expect(response.body.job).toBe('zion resident');
    // Assert that the server included an update timestamp
    expect(response.body).toHaveProperty('updatedAt');
    // Assert that the updatedAt value is a non-empty string
    expect(response.body.updatedAt.length).toBeGreaterThan(0);
  });

  /**
   * @test        PUT /users/2 with generated data returns 200
   * @given       A user with ID 2 exists in the system
   * @when        PUT /users/2 is called with dynamically generated data
   * @then        Response status is 200 and returned fields match the generated input
   * @assertion   status === 200, body.name === payload.name, body.job === payload.job
   */
  it('should update user 2 with generated data and return matching fields', async () => {
    // Generate a random user payload using Faker.js
    const payload = generateUser();
    // Send PUT request to fully update user with ID 2
    const response = await updateUser(2, payload);
    // Assert that the HTTP status code is 200 OK
    expect(response.status).toBe(200);
    // Assert that the response name matches the generated input
    expect(response.body.name).toBe(payload.name);
    // Assert that the response job matches the generated input
    expect(response.body.job).toBe(payload.job);
    // Assert that an updatedAt timestamp is present
    expect(response.body).toHaveProperty('updatedAt');
  });

  /**
   * @test        PUT /users/2 response time is acceptable
   * @given       The reqres.in API is deployed and reachable
   * @when        PUT /users/2 is called and response time is measured
   * @then        Response completes within the configured timeout
   * @assertion   elapsed < RESPONSE_TIMEOUT_MS
   */
  it('should respond within the configured timeout for update endpoint', async () => {
    // Define a payload for the timing test
    const payload = { name: 'morpheus', job: 'zion resident' };
    // Record the start time before the request
    const startTime = Date.now();
    // Send PUT request to update the user
    await updateUser(2, payload);
    // Calculate elapsed time in milliseconds
    const elapsed = Date.now() - startTime;
    // Assert that the response time is within the acceptable threshold
    expect(elapsed).toBeLessThan(RESPONSE_TIMEOUT_MS);
  });
});
