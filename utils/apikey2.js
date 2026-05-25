export function apiKeyQuery(url, {
  queryName = "apikey",
  keyValue = "demo-api-key-123",
  extraParams = {}
}={}) {
  if (!keyValue) throw new Error('API key is missing. Set API_KEY in environment or pass key explicitly.');
 
  const urlObj = new URL(url);
  // Add API key
  urlObj.searchParams.set(queryName, keyValue);
 
  // Add extra query params
  for (const [key, value] of Object.entries(extraParams)) {
    urlObj.searchParams.set(key, value);
  }
  return urlObj.toString();
}