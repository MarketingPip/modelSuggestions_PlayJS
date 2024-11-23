/**
 * ModelSuggestions is a function that provides utilities for data manipulation,
 * such as fetching model data from a URL, with caching.
 * 
 * @returns {Object} An object containing utility functions:
 * - loadModal: A function that loads and splits data from a given URL, with caching for fetch requests.
 * - mergeArrays: A function that merges multiple arrays into one.
 * - pickSuggestions: A function that picks random items from an array.
 */
export function ModelSuggestions() {

  // In-memory cache for fetched JSON data (only for fetchJSON)
  const fetchCache = new Map();

  /**
   * Fetches JSON data from a given URL, with caching.
   * 
   * @param {string} url - The URL from which to fetch the JSON data.
   * @returns {Promise<Object>} A promise that resolves to the fetched JSON data.
   * @throws {Error} If the network response is not ok or the fetch fails.
   */
  async function fetchJSON(url) {
    // Check if the URL is already cached
    if (fetchCache.has(url)) {
      console.log('Returning cached data for:', url); // For debugging
      return fetchCache.get(url);
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();

      // Cache the fetched data
      fetchCache.set(url, json);

      return json;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Splits an array of strings into objects containing 'title' and 'description' properties.
   * The split occurs based on the first occurrence of the delimiter "---".
   * 
   * @param {string[]} originalArray - The array of strings to split.
   * @returns {Object[]} An array of objects where each object contains a 'title' and a 'description' property.
   */
  function splitData(originalArray) {
    const resultArrays = [];

    // Iterate through each string in the original array
    originalArray.forEach((str) => {
      // Find the index of the first occurrence of "---"
      const delimiterIndex = str.indexOf("---");

      if (delimiterIndex !== -1) {
        // Split the string into title and description using the delimiter index
        const title = str.substring(0, delimiterIndex).trim();
        const description = str.substring(delimiterIndex + 3).trim(); // +3 to skip past "---"

        // Push an object with title and description to the resultArrays
        resultArrays.push({ title, description });
      }
    });

    return resultArrays;
  }

  /**
   * Picks a specified number of random items from an array using the Fisher-Yates shuffle algorithm.
   * 
   * @param {Array} array - The array from which to pick random items.
   * @param {number} [numberOfItems=1] - The number of random items to pick. Defaults to 1.
   * @returns {Array} A new array containing the randomly selected items.
   * @throws {Error} If the input array is empty or not an array.
   */
  function pickRandomItems(array, numberOfItems = 1) {
    if (!Array.isArray(array) || array.length === 0) {
      throw new Error('Input must be a non-empty array.');
    }

    if (numberOfItems <= 0) {
      return [];
    }

    // If numberOfItems exceeds array length, set it to array length
    if (numberOfItems >= array.length) {
      numberOfItems = array.length;
    }

    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    // Return the first numberOfItems elements
    return array.slice(0, numberOfItems);
  }

  /**
   * Merges multiple arrays into a single array.
   * 
   * @param {...Array} arrays - The arrays to merge.
   * @returns {Array} A new array containing all the elements from the input arrays.
   */
  function mergeArrays(...arrays) {
    return [].concat(...arrays);
  }

  /**
   * Loads data from a given URL and splits it into structured objects, with caching for the fetch operation.
   * 
   * @param {string} url - The URL from which to load the modal data.
   * @returns {Promise<Object[]>} A promise that resolves to an array of objects with 'title' and 'description' properties.
   */
  async function loadModal(url) {
    const fetchModal = await fetchJSON(url);
    return splitData(fetchModal);
  }

  return {
    loadModal,
    mergeArrays,
    pickSuggestions: pickRandomItems
  };
}
