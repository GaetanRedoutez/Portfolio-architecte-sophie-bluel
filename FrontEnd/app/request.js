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
 * @returns {any} Return fetch response. Can be JSON or false
 */
export async function httpPost(url, option) {
  const response = await fetch(url, option);
  console.log(response);
  if (response.status === 200 || response.status === 201){
    return response.json();
  } else {
    return false;
  }
  
}

/**
 * Send a fetch request to DELETE some data to an API
 * 
 * @param {string} url Represent API url 
 * @param {object} option Represent request option to configure 
 * @returns {any} Return fetch response. Can be object or false
 */
export async function httpDelete(url, option) {
  const response = await fetch(url, option);
  if (response.status === 204){
    return response;
  } else {
    return false;
  }
}

