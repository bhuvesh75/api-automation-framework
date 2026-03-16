/**
 * @file        createUser.test.js
 * @description Functional tests for POST /users endpoint covering user creation scenarios.
 * @purpose     Validates that new users can be created with correct response structure and acceptable performance.
 * @author      Bhuvesh Yadav
 * @github      https://github.com/bhuvesh75
 */

// Import the createUser API wrapper function
const { createUser } = require('../../src/api/userApi');

// Import the data generator for randomized test payloads
const { generateUser } = require('../../src/utils/dataGenerator');

// Import the response timeout threshold from config
const { RESPONSE_TIMEOUT_MS } = require('../../src/config/config');

// ============================================================
// Test Suite: POST /users — User Creation
// ============================================================
describe('Functional: POST /users (Create User)', () => {

  /**
   * @test        POST /users with valid static payload returns 201
   * @given       A valid user payload with name and job fields
   * @when        POST /users is called with { name: 'morpheus', job: 'leader' }
   * @then        Response status is 201 and body contains name, job, id, and createdAt
   * @assertion   status === 201, body.name === 'morpheus', body.job === 'leader', body.id exists, body.createdAt exists
   */
  it('should create a user with static payload and return 201', async () => {
    // Define a static payload with known values for deterministic assertions
    const payload = { name: 'morpheus', job: 'leader' };
    // Send POST request to create the user
    const response = await createUser(payload);
    // Assert that the HTTP status code is 201 Created
    expect(response.status).toBe(201);
    // Assert that the response body echoes back the name field
    expect(response.body.name).toBe('morpheus');
    // Assert that the response body echoes back the job field
    expect(response.body.job).toBe('leader');
    // Assert that the server assigned a unique ID to the new user
    expect(response.body).toHaveProperty('id');
    // Assert that the server included a creation timestamp
    expect(response.body).toHaveProperty('createdAt');
  });

  /**
   * @test        POST /users with generated fake data returns 201
   * @given       A dynamically generated user payload from Faker.js
   * @when        POST /users is called with the generated payload
   * @then        Response status is 201 and returned name matches the input
   * @assertion   status === 201, body.name === payload.name
   */
  it('should create a user with generated fake data and return 201', async () => {
    // Generate a random user payload using Faker.js
    const payload = generateUser();
    // Send POST request with the generated payload
    const response = await createUser(payload);
    // Assert that the HTTP status code is 201 Created
    expect(response.status).toBe(201);
    // Assert that the response name matches the generated input name
    expect(response.body.name).toBe(payload.name);
    // Assert that the response job matches the generated input job
    expect(response.body.job).toBe(payload.job);
    // Assert that the server assigned a unique ID
    expect(response.body).toHaveProperty('id');
    // Assert that a creation timestamp is present
    expect(response.body).toHaveProperty('createdAt');
  });

  /**
   * @test        POST /users response time is acceptable
   * @given       The reqres.in API is deployed and reachable
   * @when        POST /users is called and response time is measured
   * @then        Response completes within the configured timeout
   * @assertion   elapsed < RESPONSE_TIMEOUT_MS
   */
  it('should respond within the configured timeout for create endpoint', async () => {
    // Generate a random user payload for the timing test
    const payload = generateUser();
    // Record the start time before the request
    const startTime = Date.now();
    // Send POST request to create a user
    await createUser(payload);
    // Calculate elapsed time in milliseconds
    const elapsed = Date.now() - startTime;
    // Assert that the response time is within the acceptable threshold
    expect(elapsed).toBeLessThan(RESPONSE_TIMEOUT_MS);
  });
});
