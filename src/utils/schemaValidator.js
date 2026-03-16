/**
 * @file        schemaValidator.js
 * @description Validates JSON response bodies against predefined AJV schemas.
 * @purpose     Provides a reusable schema validation utility so tests can assert structural correctness of API responses.
 * @author      Bhuvesh Yadav
 * @github      https://github.com/bhuvesh75
 */

// Import the AJV (Another JSON Validator) class for JSON Schema validation
const Ajv = require('ajv');

// Create a single AJV instance with allErrors enabled so all violations are reported at once
const ajv = new Ajv({ allErrors: true }); // WHY: allErrors gives a complete list of failures instead of stopping at the first

/**
 * Validates a data object against a JSON Schema definition.
 *
 * @function    validateSchema
 * @description Compiles the provided schema with AJV, validates the data, and throws a descriptive error if invalid.
 * @param       {Object} data - The JSON data to validate (typically a parsed response body).
 * @param       {Object} schema - A valid JSON Schema object defining the expected structure.
 * @returns     {boolean} Returns true if the data conforms to the schema.
 * @throws      {Error} Throws an error with detailed validation messages if the data does not conform.
 * @example
 *   const userSchema = require('../schema/userSchema.json');
 *   validateSchema(response.body, userSchema); // throws if invalid
 */
function validateSchema(data, schema) {
  // Compile the JSON Schema into an AJV validation function
  const validate = ajv.compile(schema);
  // Execute the validation against the provided data
  const isValid = validate(data);
  // Check whether the validation passed
  if (!isValid) {
    // Map each validation error into a human-readable string
    const errorMessages = validate.errors.map((error) => {
      // Combine the JSON pointer path with the error message for clarity
      return `${error.instancePath || '(root)'} ${error.message}`;
    });
    // Join all error messages with semicolons for a single-line summary
    const summary = errorMessages.join('; ');
    // Throw an error containing the full validation failure details
    throw new Error(`Schema validation failed: ${summary}`);
  }
  // Return true to signal that validation succeeded
  return true;
}

// Export the validateSchema function for use in test assertions
module.exports = {
  validateSchema // Validates data against a JSON Schema, throws on failure
};
