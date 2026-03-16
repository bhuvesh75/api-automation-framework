/**
 * @file        patchUser.test.js
 * @description Functional tests for PATCH /users/:id endpoint covering partial user update scenarios.
 * @purpose     Validates that individual fields can be patched without requiring a full resource replacement.
 * @author      Bhuvesh Yadav
 * @github      https://github.com/bhuvesh75
 */

// Import the patchUser API wrapper function
const { patchUser } = require('../../src/api/userApi');

// Import the response timeout threshold from config
const { RESPONSE_TIMEOUT_MS } = require('../../src/config/config');

// ─────────────────────────────────────────────────────────────
// SECTION: API Key Guard
// ─────────────────────────────────────────────────────────────
// WHY: reqres.in requires an x-api-key header on all requests.
// When API_KEY is not set (e.g. CI without the secret configured),
// all requests return 401. Rather than failing, the entire suite
// is skipped so the build stays green and the gap is visible.
const HAS_API_KEY = !!process.env.API_KEY;
const describeOrSkip = HAS_API_KEY ? describe : describe.skip;



// ============================================================
// Test Suite: PATCH /users/:id — Partial User Update
// ============================================================
describeOrSkip('Functional: PATCH /users/:id (Patch User)', () => {

  /**
   * @test        PATCH /users/2 with only job field returns 200
   * @given       A user with ID 2 exists in the system
   * @when        PATCH /users/2 is called with { job: 'zion resident' }
   * @then        Response status is 200, job matches input, and updatedAt exists
   * @assertion   status === 200, body.job === 'zion resident', body.updatedAt exists
   */
  it('should patch user 2 job field and return 200 with updatedAt timestamp', async () => {
    // Define a partial payload with only the job field
    const payload = { job: 'zion resident' };
    // Send PATCH request to partially update user with ID 2
    const response = await patchUser(2, payload);
    // Assert that the HTTP status code is 200 OK
    expect(response.status).toBe(200);
    // Assert that the response body echoes back the patched job field
    expect(response.body.job).toBe('zion resident');
    // Assert that the server included an update timestamp
    expect(response.body).toHaveProperty('updatedAt');
    // Assert that the updatedAt value is a non-empty string
    expect(response.body.updatedAt.length).toBeGreaterThan(0);
  });

  /**
   * @test        PATCH /users/2 with only name field returns 200
   * @given       A user with ID 2 exists in the system
   * @when        PATCH /users/2 is called with { name: 'neo' }
   * @then        Response status is 200 and name matches input
   * @assertion   status === 200, body.name === 'neo', body.updatedAt exists
   */
  it('should patch user 2 name field and return 200 with matching name', async () => {
    // Define a partial payload with only the name field
    const payload = { name: 'neo' };
    // Send PATCH request to partially update user with ID 2
    const response = await patchUser(2, payload);
    // Assert that the HTTP status code is 200 OK
    expect(response.status).toBe(200);
    // Assert that the response body echoes back the patched name
    expect(response.body.name).toBe('neo');
    // Assert that an updatedAt timestamp is present
    expect(response.body).toHaveProperty('updatedAt');
  });

  /**
   * @test        PATCH /users/2 response time is acceptable
   * @given       The reqres.in API is deployed and reachable
   * @when        PATCH /users/2 is called and response time is measured
   * @then        Response completes within the configured timeout
   * @assertion   elapsed < RESPONSE_TIMEOUT_MS
   */
  it('should respond within the configured timeout for patch endpoint', async () => {
    // Define a partial payload for the timing test
    const payload = { job: 'zion resident' };
    // Record the start time before the request
    const startTime = Date.now();
    // Send PATCH request to partially update the user
    await patchUser(2, payload);
    // Calculate elapsed time in milliseconds
    const elapsed = Date.now() - startTime;
    // Assert that the response time is within the acceptable threshold
    expect(elapsed).toBeLessThan(RESPONSE_TIMEOUT_MS);
  });
});
