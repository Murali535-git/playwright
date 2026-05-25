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