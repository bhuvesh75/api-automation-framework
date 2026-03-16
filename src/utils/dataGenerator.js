/**
 * @file        dataGenerator.js
 * @description Generates randomized test data using the Faker.js library.
 * @purpose     Ensures every test run uses unique, realistic data to avoid false positives from cached responses.
 * @author      Bhuvesh Yadav
 * @github      https://github.com/bhuvesh75
 */

// Import the faker instance from the @faker-js/faker package
const { faker } = require('@faker-js/faker');

/**
 * Generates a random user object suitable for POST /users and PUT /users/:id payloads.
 *
 * @function    generateUser
 * @description Creates an object with a fake first name, job title, and email address.
 * @returns     {Object} A user object with name, job, and email properties.
 * @example
 *   const user = generateUser();
 *   // { name: 'Jonathon', job: 'Designer', email: 'jonathon.doe@example.com' }
 */
function generateUser() {
  // Generate a realistic first name using faker's person module
  const name = faker.person.firstName();
  // Generate a realistic job title using faker's person module
  const job = faker.person.jobTitle();
  // Generate a unique email address using faker's internet module
  const email = faker.internet.email();
  // Return the assembled user object
  return { name, job, email };
}

/**
 * Generates random login/registration credentials.
 *
 * @function    generateCredentials
 * @description Creates an object with a fake email and password for auth endpoint testing.
 * @returns     {Object} A credentials object with email and password properties.
 * @example
 *   const creds = generateCredentials();
 *   // { email: 'jane.smith@example.net', password: 'xK9#mP2$qL' }
 */
function generateCredentials() {
  // Generate a unique email address for the credentials
  const email = faker.internet.email();
  // Generate a random password with adequate length for realism
  const password = faker.internet.password({ length: 10 }); // WHY: 10 chars balances realism with simplicity
  // Return the assembled credentials object
  return { email, password };
}

// Export data generator functions for use in test files
module.exports = {
  generateUser,         // Produces { name, job, email }
  generateCredentials   // Produces { email, password }
};
