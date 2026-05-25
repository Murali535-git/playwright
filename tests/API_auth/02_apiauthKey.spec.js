import { test, expect } from '@playwright/test';
import { apiKeyHeader, apiKeyQuery } from '../../../utils/apikey2';   
   
   test('[API Key - Query] Postman Echo reflects query key', async ({ request }) => {
    const BASE_URL = "https://postman-echo.com";
    // const urlWithKey = apiKeyQuery(`${BASE_URL}/get`);
    const urlWithKey = apiKeyQuery(`${BASE_URL}/get`, {});
    // const urlWithKey = apiKeyQuery(`${BASE_URL}/get`, {extraParams: { test: '123', foo: 'bar' }});
    // const url = "https://postman-echo.com/get?apikey=demo-api-key-123"
 
    const res = await request.get(urlWithKey);
    expect(res.ok()).toBeTruthy();
 
    const body = await res.json();
    // The full URL with query is echoed back
    expect(body.url, 'URL should contain the api key query param').toContain('apikey2=demo-api-key-123');
  });


import { test, expect } from '@playwright/test';
import { apiKeyHeader, apiKeyQuery } from '../utils/apikey'

test.describe('API Key Authentication with Postman Echo', () => {

  const BASE_URL = "https://postman-echo.com";
  const HEADER_NAME = "x-api-key";

    // ---------- Positive Case: API Key in Header ----------
    test('[API Key Auth - Header] Postman Echo with API key in header', async ({ request }) => {

        // 1) Build headers containing the API key (env or explicit)
    const headers = apiKeyHeader({ extra: { Accept: 'application/json' } });

    // 2) Send request
    const res = await request.get(`${BASE_URL}/get`, { headers });

    // 3) Validate success
    expect(res.ok()).toBeTruthy();
    const body = await res.json();

    // Postman Echo echoes incoming headers
    const echoedKey = body.headers?.[HEADER_NAME];
    expect(echoedKey, `Expected header ${HEADER_NAME} to be echoed`).toBe("demo-api-key-123");
    expect(body.url).toContain('/get');

    })

//process env variable not picking up due to environment issue remaing is fine
    test('[API Key - Query] Postman Echo reflects query key', async ({ request }) => {
      //     const BASE_URL = process.env.ECHO_BASE_URL as string;
    const BASE_URL = process.env.ECHO_BASE_URL;
    const urlWithKey = apiKeyQuery(`${BASE_URL}/get`);
    // const url = "https://postman-echo.com/get?apikey=demo-api-key-123"

    const res = await request.get(urlWithKey);
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    // The full URL with query is echoed back
    expect(body.url, 'URL should contain the api key query param').toContain(process.env.API_KEY);
  });

});