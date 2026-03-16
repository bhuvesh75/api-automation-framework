/**
 * @file        authHelper.js
 * @description Provides helper functions for authentication token retrieval and header construction.
 * @purpose     Abstracts token acquisition so tests that require authenticated requests stay concise.
 * @author      Bhuvesh Yadav
 * @github      https://github.com/bhuvesh75
 */

// Import the login function from the auth API wrapper
const { login } = require('../api/authApi');

/**
 * Obtains an authentication token by logging in with the supplied credentials.
 *
 * @function    getAuthToken
 * @description Calls the /login endpoint, extracts the token from the response body, and returns it.
 * @param       {string} email - The email address of the user.
 * @param       {string} password - The password for the user account.
 * @returns     {Promise<string>} The authentication token string.
 * @throws      {Error} If the login request fails or the response does not contain a token.
 * @example
 *   const token = await getAuthToken('eve.holt@reqres.in', 'cityslicka');
 *   console.log(token); // "QpwL5tke4Pnpja7X4"
 */
async function getAuthToken(email, password) {
  // Execute the login API call with the provided credentials
  const response = await login(email, password);
  // Verify that the login succeeded by checking the HTTP status code
  if (response.status !== 200) {
    // Throw a descriptive error if login did not return 200 OK
    throw new Error(`Login failed with status ${response.status}: ${JSON.stringify(response.body)}`);
  }
  // Extract the token string from the response body
  const token = response.body.token;
  // Guard against a missing token even when status is 200
  if (!token) {
    // Throw a descriptive error if the token field is absent or falsy
    throw new Error('Login response did not contain a token');
  }
  // Return the extracted token string
  return token;
}

/**
 * Builds an HTTP Authorization header object from a Bearer token.
 *
 * @function    buildAuthHeader
 * @description Constructs a plain object with an Authorization key set to "Bearer <token>".
 * @param       {string} token - The Bearer token to include in the header.
 * @returns     {Object} An object with a single Authorization property.
 * @example
 *   const headers = buildAuthHeader('QpwL5tke4Pnpja7X4');
 *   // { Authorization: 'Bearer QpwL5tke4Pnpja7X4' }
 */
function buildAuthHeader(token) {
  // Construct and return the header object with the Bearer scheme prefix
  return {
    Authorization: `Bearer ${token}` // WHY: Bearer scheme is the standard for token-based auth
  };
}

// Export helper functions for use in authenticated test scenarios
module.exports = {
  getAuthToken,     // Retrieves a token via the login endpoint
  buildAuthHeader   // Formats a token into an Authorization header object
};
