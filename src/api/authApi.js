/**
 * @file        authApi.js
 * @description Wraps all authentication endpoints (/login, /register) of the reqres.in API using Supertest.
 * @purpose     Provides a clean, reusable API layer for authentication-related test scenarios.
 * @author      Bhuvesh Yadav
 * @github      https://github.com/bhuvesh75
 */

// Import supertest to build and execute HTTP requests against the base URL
const supertest = require('supertest');

// Import the centralized base URL and API key from config
const { BASE_URL, API_KEY } = require('../config/config');

// Create a reusable supertest agent bound to the base URL
const request = supertest(BASE_URL);

/**
 * Authenticates a user by sending login credentials.
 *
 * @function    login
 * @description Sends a POST request to /login with email and password to obtain an auth token.
 * @param       {string} email - The email address of the user attempting to log in.
 * @param       {string} password - The password for the user account.
 * @returns     {Promise<supertest.Response>} The full HTTP response object containing token on success.
 * @example
 *   const res = await login('eve.holt@reqres.in', 'cityslicka');
 *   console.log(res.body.token); // "QpwL5tke4Pnpja7X4"
 */
async function login(email, password) {
  // Build the credentials payload for the login request
  const payload = { email, password };
  // Build the request chain — only attach API key header when key is configured
  // WHY: sending an empty x-api-key header causes reqres.in to return 401
  let req = request.post('/login').send(payload);
  if (API_KEY) req = req.set('x-api-key', API_KEY);
  const response = await req;
  // Return the complete response so tests can assert on status and body
  return response;
}

/**
 * Registers a new user account by sending registration credentials.
 *
 * @function    register
 * @description Sends a POST request to /register with email and password to create an account.
 * @param       {string} email - The email address for the new account.
 * @param       {string} password - The desired password for the new account.
 * @returns     {Promise<supertest.Response>} The full HTTP response object containing id and token on success.
 * @example
 *   const res = await register('eve.holt@reqres.in', 'pistol');
 *   console.log(res.body.id);    // 4
 *   console.log(res.body.token); // "QpwL5tke4Pnpja7X4"
 */
async function register(email, password) {
  // Build the credentials payload for the registration request
  const payload = { email, password };
  // Build the request chain — only attach API key header when key is configured
  // WHY: sending an empty x-api-key header causes reqres.in to return 401
  let req = request.post('/register').send(payload);
  if (API_KEY) req = req.set('x-api-key', API_KEY);
  const response = await req;
  // Return the complete response so tests can assert on status and body
  return response;
}

// Export all authentication API wrapper functions for use in test files
module.exports = {
  login,      // POST /login
  register    // POST /register
};
