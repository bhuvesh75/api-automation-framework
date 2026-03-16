/**
 * @file        config.js
 * @description Loads environment variables and exports application configuration constants.
 * @purpose     Centralizes all configuration values so tests and API wrappers reference one source of truth.
 * @author      Bhuvesh Yadav
 * @github      https://github.com/bhuvesh75
 */

// Load environment variables from the .env file into process.env
const dotenv = require('dotenv');

// Execute dotenv configuration — reads .env from project root and merges into process.env
dotenv.config();

// Export a frozen configuration object so no consumer can accidentally mutate shared config
module.exports = {

  /**
   * Base URL for the target REST API.
   * Falls back to the public reqres.in sandbox when no .env is present.
   */
  BASE_URL: process.env.BASE_URL || 'https://reqres.in/api', // WHY: fallback keeps tests runnable without .env

  /**
   * Maximum acceptable response time in milliseconds.
   * Tests that measure latency compare against this threshold.
   */
  RESPONSE_TIMEOUT_MS: parseInt(process.env.RESPONSE_TIMEOUT_MS, 10) || 2000, // WHY: parseInt ensures numeric type even if env var is a string

  /**
   * API key required by reqres.in for authenticating API requests.
   * Obtain a free key at https://app.reqres.in/signup
   */
  API_KEY: process.env.API_KEY || '', // WHY: reqres.in now requires an x-api-key header on all requests

  /**
   * Default page number used by paginated-list tests.
   * reqres.in returns different data per page; page 2 is the conventional test page.
   */
  DEFAULT_PAGE: parseInt(process.env.DEFAULT_PAGE, 10) || 2 // WHY: page 2 has a known dataset on reqres.in
};
