import { TIMEOUT_SEC } from "./config.js";

/**
 * Returns a Promise that rejects with an error after a specified number of seconds.
 *
 * @param {number} seconds - The number of seconds to wait before rejecting the promise.
 * @returns {Promise<never>} A Promise that rejects with an error indicating the request took too long.
 *
 * @description
 * This function takes a number of seconds as an argument and returns a Promise that
 * automatically rejects after the specified number of seconds. The Promise is
 * rejected with an Error object that contains a message that describes the timeout.
 */
const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(
        new Error(`Request took too long! Timeout after ${seconds} second`)
      );
    }, seconds * 1000);
  });
};

/**
 * Fetches data from the specified URL and returns it in JSON format.
 *
 * @async
 * @function
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object>} A Promise that resolves with the JSON data from the given URL.
 * @throws {Error} If the request was unsuccessful or timed out.
 *
 * @description
 * This function takes a URL as an argument, fetches the data from that URL, and
 * returns it in JSON format. It will wait for a maximum of 5 seconds for the
 * request to complete before rejecting the Promise with a timeout error.
 * If the request is successful, but the response status is not 200, the Promise
 * will also be rejected with an error containing the message from the response
 * and the status code.
 */
export const getJSON = async function (url) {
  try {
    mode: "no-cors";
    referrerPolicy: "unsafe-url";
    // Fetch the data from the given URL, and set a timeout of 5 seconds
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    // If the request was not successful, reject the Promise with an error
    if (!response.ok) {
      const error = new Error(`${response.statusText} ${response.status}`);
      throw error;
    }

    // If the request was successful, parse the response data as JSON
    const jsonData = await response.json();

    // Return the parsed JSON data
    return jsonData;
  } catch (error) {
    // If there was an error, rethrow it to the caller
    console.log(error);
    throw error;
  }
};
