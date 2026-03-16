/**
 * @file        deleteUser.test.js
 * @description Functional tests for DELETE /users/:id endpoint covering user deletion scenarios.
 * @purpose     Validates that users can be deleted with the correct 204 No Content response.
 * @author      Bhuvesh Yadav
 * @github      https://github.com/bhuvesh75
 */

// Import the deleteUser API wrapper function
const { deleteUser } = require('../../src/api/userApi');

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
// Test Suite: DELETE /users/:id — User Deletion
// ============================================================
describeOrSkip('Functional: DELETE /users/:id (Delete User)', () => {

  /**
   * @test        DELETE /api/users/:id — valid user
   * @given       A user ID that exists in the system
   * @when        DELETE request is sent to /api/users/2
   * @then        Response status is 204 with empty body
   * @assertion   status === 204, body is empty
   */
  it('should delete user and return 204 with empty body', async () => {
    // Send DELETE request to remove user with ID 2
    const response = await deleteUser(2);
    // Assert HTTP status code is 204 No Content
    expect(response.status).toBe(204);
    // Assert response body is completely empty
    expect(response.body).toEqual({});
  });

  /**
   * @test        DELETE /api/users/:id — response time
   * @given       The reqres.in API is deployed and reachable
   * @when        DELETE /users/2 is called and response time is measured
   * @then        Response completes within the configured timeout
   * @assertion   elapsed < RESPONSE_TIMEOUT_MS
   */
  it('should respond within the configured timeout for delete endpoint', async () => {
    // Record the start time before the request
    const startTime = Date.now();
    // Send DELETE request to remove user with ID 2
    await deleteUser(2);
    // Calculate elapsed time in milliseconds
    const elapsed = Date.now() - startTime;
    // Assert that the response time is within the acceptable threshold
    expect(elapsed).toBeLessThan(RESPONSE_TIMEOUT_MS);
  });
});
