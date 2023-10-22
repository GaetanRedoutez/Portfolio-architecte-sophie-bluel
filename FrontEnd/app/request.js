/**
 * Send a fetch request to GET some data from an API
 * 
 * @param {string} url Represent API url 
 * @returns {JSON} Return fetch response in JSON format
 */
export async function httpGet(url) {
  const response = await fetch(url);
  return response.json();
}

/**
 * Send a fetch request to POST some data to an API
 * 
 * @param {string} url Represent API url 
 * @param {object} option Represent request option to configure 
 * @returns {JSON} Return fetch response in JSON format
 */
export async function httpPost(url, option) {
  const response = await fetch(url, option);
  return response.json();
}

/**
 * Send a fetch request to DELETE some data to an API
 * 
 * @param {string} url Represent API url 
 * @param {object} option Represent request option to configure 
 * @returns {object} Return fetch response
 */
export async function httpDelete(url, option) {
  const response = await fetch(url, option);
  return response;
}

