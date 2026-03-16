/**
 * @file        auth.test.js
 * @description Functional tests for POST /login and POST /register authentication endpoints.
 * @purpose     Validates successful and failed authentication scenarios including missing credential handling.
 * @author      Bhuvesh Yadav
 * @github      https://github.com/bhuvesh75
 */

// Import the login and register API wrapper functions
const { login, register } = require('../../src/api/authApi');

// Import the response timeout threshold from config
const { RESPONSE_TIMEOUT_MS } = require('../../src/config/config');

// ============================================================
// Test Suite: POST /login — User Authentication
// ============================================================
describe('Functional: POST /login (Authentication)', () => {

  /**
   * @test        POST /login with valid credentials returns 200 and token
   * @given       A registered user with email eve.holt@reqres.in and password cityslicka
   * @when        POST /login is called with valid email and password
   * @then        Response status is 200 and body contains a token string
   * @assertion   status === 200, body.token is a non-empty string
   */
  it('should return 200 and a token for valid login credentials', async () => {
    // Send POST request with known valid credentials from reqres.in
    const response = await login('eve.holt@reqres.in', 'cityslicka');
    // Assert that the HTTP status code is 200 OK
    expect(response.status).toBe(200);
    // Assert that the response body contains a token property
    expect(response.body).toHaveProperty('token');
    // Assert that the token is a non-empty string
    expect(typeof response.body.token).toBe('string');
    // Assert that the token has actual content
    expect(response.body.token.length).toBeGreaterThan(0);
  });

  /**
   * @test        POST /login with missing password returns 400
   * @given       A login attempt with email only and no password
   * @when        POST /login is called with { email: 'peter@klaven' }
   * @then        Response status is 400 and body contains an error message
   * @assertion   status === 400, body.error is a non-empty string
   */
  it('should return 400 with error message when password is missing', async () => {
    // Send POST request with only email and no password (undefined triggers missing field)
    const response = await login('peter@klaven', undefined);
    // Assert that the HTTP status code is 400 Bad Request
    expect(response.status).toBe(400);
    // Assert that the response body contains an error property
    expect(response.body).toHaveProperty('error');
    // Assert that the error message is a non-empty string
    expect(typeof response.body.error).toBe('string');
    // Assert that the error message has actual content
    expect(response.body.error.length).toBeGreaterThan(0);
  });

  /**
   * @test        POST /login response time is acceptable
   * @given       The reqres.in API is deployed and reachable
   * @when        POST /login is called and response time is measured
   * @then        Response completes within the configured timeout
   * @assertion   elapsed < RESPONSE_TIMEOUT_MS
   */
  it('should respond within the configured timeout for login endpoint', async () => {
    // Record the start time before the request
    const startTime = Date.now();
    // Send POST request with valid credentials for timing measurement
    await login('eve.holt@reqres.in', 'cityslicka');
    // Calculate elapsed time in milliseconds
    const elapsed = Date.now() - startTime;
    // Assert that the response time is within the acceptable threshold
    expect(elapsed).toBeLessThan(RESPONSE_TIMEOUT_MS);
  });
});

// ============================================================
// Test Suite: POST /register — User Registration
// ============================================================
describe('Functional: POST /register (Registration)', () => {

  /**
   * @test        POST /register with valid credentials returns 200 and token
   * @given       A valid email and password for a new registration
   * @when        POST /register is called with eve.holt@reqres.in and pistol
   * @then        Response status is 200 and body contains id and token
   * @assertion   status === 200, body.id exists, body.token is a non-empty string
   */
  it('should return 200 with id and token for valid registration', async () => {
    // Send POST request with known valid registration credentials from reqres.in
    const response = await register('eve.holt@reqres.in', 'pistol');
    // Assert that the HTTP status code is 200 OK
    expect(response.status).toBe(200);
    // Assert that the response body contains an id property
    expect(response.body).toHaveProperty('id');
    // Assert that the id is a positive number
    expect(response.body.id).toBeGreaterThan(0);
    // Assert that the response body contains a token property
    expect(response.body).toHaveProperty('token');
    // Assert that the token is a non-empty string
    expect(typeof response.body.token).toBe('string');
    // Assert that the token has actual content
    expect(response.body.token.length).toBeGreaterThan(0);
  });

  /**
   * @test        POST /register with missing password returns 400
   * @given       A registration attempt with email only and no password
   * @when        POST /register is called with { email: 'sydney@fife' }
   * @then        Response status is 400 and body contains an error message
   * @assertion   status === 400, body.error is a non-empty string
   */
  it('should return 400 with error message when password is missing', async () => {
    // Send POST request with only email and no password
    const response = await register('sydney@fife', undefined);
    // Assert that the HTTP status code is 400 Bad Request
    expect(response.status).toBe(400);
    // Assert that the response body contains an error property
    expect(response.body).toHaveProperty('error');
    // Assert that the error message is a non-empty string
    expect(typeof response.body.error).toBe('string');
    // Assert that the error message has actual content
    expect(response.body.error.length).toBeGreaterThan(0);
  });

  /**
   * @test        POST /register response time is acceptable
   * @given       The reqres.in API is deployed and reachable
   * @when        POST /register is called and response time is measured
   * @then        Response completes within the configured timeout
   * @assertion   elapsed < RESPONSE_TIMEOUT_MS
   */
  it('should respond within the configured timeout for register endpoint', async () => {
    // Record the start time before the request
    const startTime = Date.now();
    // Send POST request with valid credentials for timing measurement
    await register('eve.holt@reqres.in', 'pistol');
    // Calculate elapsed time in milliseconds
    const elapsed = Date.now() - startTime;
    // Assert that the response time is within the acceptable threshold
    expect(elapsed).toBeLessThan(RESPONSE_TIMEOUT_MS);
  });
});
