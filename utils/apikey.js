export function apiKeyHeader({
  keyValue = "demo-api-key-123",
  keyName = "x-api-key",
  extra = {}
}) {
  if (!keyValue) throw new Error('API key is missing. Set API_KEY in environment or pass key explicitly.');
  return { ...extra, [keyName]: keyValue };
}
 
 
export function apiKeyQuery(url, {
  keyValue = "demo-api-key-123",
  queryName = "apikey"
} = {}) {
  if (!keyValue) throw new Error('API key is missing. Set API_KEY in environment or pass key explicitly.');
  const hasQ = url.includes('?');
  const sep = hasQ ? '&' : '?';
  return `${url}${sep}${encodeURIComponent(queryName)}=${encodeURIComponent(keyValue)}`;
}


export function apiKeyHeader1({
  keyValue = "08d6740a3683e5074e12a001e470214f",
  keyName = "x-api-key",
  extra = {}
}) {
  if (!keyValue) throw new Error('API key is missing. Set API_KEY in environment or pass key explicitly.');
  return { ...extra, [keyName]: keyValue };
}


//export function apiKeyQuery1(url:string, {
export function apiKeyQuery1(url, {
  queryName = "appid",
  keyValue = "08d6740a3683e5074e12a001e470214f",
  extraParams = {}
}={}) {
  if (!keyValue) throw new Error('API key is missing. Set API_KEY in environment or pass key explicitly.');

  const urlObj = new URL(url);
  // Add API key
  urlObj.searchParams.set(queryName, keyValue);

  // Add extra query params
  for (const [key, value] of Object.entries(extraParams)) {
    urlObj.searchParams.set(key, String(value));
  }
  return urlObj.toString();
}


//export function apiKeyQuery(url:string, {
export function apiKeyQuery(url, {
  keyValue = "demo-api-key-123",
  queryName = "apikey"}={}) {
  if (!keyValue) throw new Error('API key is missing. Set API_KEY in environment or pass key explicitly.');
  const hasQ = url.includes('?');
  const sep = hasQ ? '&' : '?';
  return `${url}${sep}${encodeURIComponent(queryName)}=${encodeURIComponent(keyValue)}`;
}