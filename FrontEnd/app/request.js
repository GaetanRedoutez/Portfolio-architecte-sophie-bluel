//Return data in JSON format from an API with GET method
export async function httpGet(url){
  const response = await fetch (url);
  return response.json();
}

//Return data in JSON format from an API with POST method
export async function httpPost (url,option){
  const response = await fetch(url, option);
  return response.json();
}

//Return data from an API with DELETE method
export async function httpDelete (url,option){
  const response = await fetch(url, option);
  return response;
}