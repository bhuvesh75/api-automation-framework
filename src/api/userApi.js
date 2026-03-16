/**
 * @file        userApi.js
 * @description Wraps all /users endpoints of the reqres.in API using Supertest.
 * @purpose     Provides a clean, reusable API layer so tests never construct HTTP requests directly.
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
 * Fetches a paginated list of users.
 *
 * @function    getUsers
 * @description Sends a GET request to /users with an optional page query parameter.
 * @param       {number} [page=1] - The page number to retrieve.
 * @returns     {Promise<supertest.Response>} The full HTTP response object.
 * @example
 *   const res = await getUsers(2);
 *   console.log(res.body.data); // array of user objects
 */
async function getUsers(page = 1) {
  // Send GET request with the page query string appended
  const response = await request
    .get('/users')          // Target the /users endpoint
    .set('x-api-key', API_KEY) // Attach the required API key header
    .query({ page: page }); // Append ?page=N to the URL
  // Return the complete response for assertion in tests
  return response;
}

/**
 * Fetches a single user by their numeric ID.
 *
 * @function    getUserById
 * @description Sends a GET request to /users/:id to retrieve one user record.
 * @param       {number} id - The unique identifier of the user.
 * @returns     {Promise<supertest.Response>} The full HTTP response object.
 * @example
 *   const res = await getUserById(2);
 *   console.log(res.body.data.email); // "janet.weaver@reqres.in"
 */
async function getUserById(id) {
  // Build the URL path with the user ID interpolated
  const response = await request
    .get(`/users/${id}`)          // Target /users/:id
    .set('x-api-key', API_KEY);   // Attach the required API key header
  // Return the complete response for assertion in tests
  return response;
}

/**
 * Creates a new user with the provided payload.
 *
 * @function    createUser
 * @description Sends a POST request to /users with a JSON body containing name and job.
 * @param       {Object} payload - The user data to create.
 * @param       {string} payload.name - The name of the new user.
 * @param       {string} payload.job - The job title of the new user.
 * @returns     {Promise<supertest.Response>} The full HTTP response object.
 * @example
 *   const res = await createUser({ name: 'morpheus', job: 'leader' });
 *   console.log(res.body.id); // server-generated ID
 */
async function createUser(payload) {
  // Send POST request with JSON body — supertest sets Content-Type automatically
  const response = await request
    .post('/users')         // Target the /users endpoint
    .set('x-api-key', API_KEY) // Attach the required API key header
    .send(payload);         // Attach the JSON payload to the request body
  // Return the complete response for assertion in tests
  return response;
}

/**
 * Fully updates an existing user by ID using PUT.
 *
 * @function    updateUser
 * @description Sends a PUT request to /users/:id to replace the user record.
 * @param       {number} id - The unique identifier of the user to update.
 * @param       {Object} payload - The complete updated user data.
 * @param       {string} payload.name - The updated name.
 * @param       {string} payload.job - The updated job title.
 * @returns     {Promise<supertest.Response>} The full HTTP response object.
 * @example
 *   const res = await updateUser(2, { name: 'morpheus', job: 'zion resident' });
 *   console.log(res.body.updatedAt); // ISO timestamp
 */
async function updateUser(id, payload) {
  // Send PUT request to replace the entire user resource
  const response = await request
    .put(`/users/${id}`)    // Target /users/:id with PUT method
    .set('x-api-key', API_KEY) // Attach the required API key header
    .send(payload);         // Attach the JSON payload to the request body
  // Return the complete response for assertion in tests
  return response;
}

/**
 * Partially updates an existing user by ID using PATCH.
 *
 * @function    patchUser
 * @description Sends a PATCH request to /users/:id to modify specific fields.
 * @param       {number} id - The unique identifier of the user to patch.
 * @param       {Object} payload - The partial user data to update.
 * @returns     {Promise<supertest.Response>} The full HTTP response object.
 * @example
 *   const res = await patchUser(2, { job: 'zion resident' });
 *   console.log(res.body.updatedAt); // ISO timestamp
 */
async function patchUser(id, payload) {
  // Send PATCH request to update only the provided fields
  const response = await request
    .patch(`/users/${id}`)  // Target /users/:id with PATCH method
    .set('x-api-key', API_KEY) // Attach the required API key header
    .send(payload);         // Attach the partial JSON payload
  // Return the complete response for assertion in tests
  return response;
}

/**
 * Deletes a user by their numeric ID.
 *
 * @function    deleteUser
 * @description Sends a DELETE request to /users/:id to remove the user record.
 * @param       {number} id - The unique identifier of the user to delete.
 * @returns     {Promise<supertest.Response>} The full HTTP response object.
 * @example
 *   const res = await deleteUser(2);
 *   console.log(res.status); // 204
 */
async function deleteUser(id) {
  // Send DELETE request to remove the user resource
  const response = await request
    .delete(`/users/${id}`)       // Target /users/:id with DELETE method
    .set('x-api-key', API_KEY);   // Attach the required API key header
  // Return the complete response for assertion in tests
  return response;
}

// Export all API wrapper functions for use in test files
module.exports = {
  getUsers,       // GET /users?page=N
  getUserById,    // GET /users/:id
  createUser,     // POST /users
  updateUser,     // PUT /users/:id
  patchUser,      // PATCH /users/:id
  deleteUser      // DELETE /users/:id
};
