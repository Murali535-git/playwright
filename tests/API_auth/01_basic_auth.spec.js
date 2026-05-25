const { test, expect } = require('@playwright/test');

/*
Basic Auth with postman Echo
Endpoints:
Post Echo base: https://postman-echo.com
basic auth endpoint: /basic-auth
*/



// ---------- Helper to build Basic Authorization header ----------
function basicAuthHeader(username, password) {
  const token = Buffer.from(`${username}:${password}`).toString('base64');
  return `Basic ${token}`;
}
 
// ---------- Positive Case: Correct Credentials ----------
test('[Basic Auth - Success] Postman Echo basic auth with correct credentials', async ({ request }) => {
  const BASE_URL = 'https://postman-echo.com';
  const USER = 'postman';
  const PASS = 'password';
 
  // Authorization: Basic base64(user:pass)
  const res = await request.get(`${BASE_URL}/basic-auth`, {
    headers: {
      Authorization: basicAuthHeader(USER, PASS),
      Accept: 'application/json',
    },
  });
 
  // Validate HTTP status
  expect(res.status(), 'Expected 200 OK for valid basic auth').toBe(200);
 
  // Validate body
  const body = await res.json();
  // Postman Echo typically returns: { authenticated: true }
  expect(body).toMatchObject({
    authenticated: true,
  });
});
 
// ---------- Negative Case: Wrong Credentials ----------
test('[Basic Auth - Failure] Postman Echo basic auth with WRONG credentials should be 401', async ({ request }) => {
  const BASE_URL = 'https://postman-echo.com';
  const USER = 'rahul';
  const WRONG_PASS = 'dravid';
 
  const res = await request.get(`${BASE_URL}/basic-auth`, {
    headers: {
      Authorization: basicAuthHeader(USER, WRONG_PASS),
      Accept: 'application/json',
    },
  });
 
  expect(res.status(), 'Expected 401 Unauthorized for wrong credentials').toBe(401);
 
  const text = await res.text();
  // Content may be an HTML/JSON depending on implementation; we just assert status
  expect(text.length).toBeGreaterThan(0);
});
 
// ---------- Negative Case: Missing Authorization Header ----------
test('[Basic Auth - Missing Header] Postman Echo should respond 401 when Authorization header is absent', async ({ request }) => {
  const BASE_URL = 'https://postman-echo.com';
 
  const res = await request.get(`${BASE_URL}/basic-auth`, {
    headers: { Accept: 'application/json' },
  });
 
  expect(res.status(), 'Expected 401 Unauthorized when header is missing').toBe(401);
 
  const text = await res.text();
  expect(text.length).toBeGreaterThan(0);
});