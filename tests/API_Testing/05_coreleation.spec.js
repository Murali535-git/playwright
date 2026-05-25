//** correlation test    */
// sending request 1 and store required value from responce1
// sending request 2 and use the value from responce1 in request2

import { test, expect } from '@playwright/test';


test('Correlation Example: Fetch userId from one post and use it in next request', async ({ request }) => {
 
    // Step 1: Fetch a single post by ID
    const firstUrl = 'https://jsonplaceholder.typicode.com/posts/45';
    const firstResponse = await request.get(firstUrl);
 
    expect(firstResponse.status()).toBe(200);
 
    const firstJson = await firstResponse.json();
    console.log('First Post:', firstJson);
 
    // Capture userId from first response
    const capturedUserId = firstJson.userId;
    console.log('Captured userId:', capturedUserId);
 
    // Step 2: Fetch all posts for this userId
    const secondUrl = 'https://jsonplaceholder.typicode.com/posts';
    const secondResponse = await request.get(secondUrl, {
        params: { userId: capturedUserId }
    });
// https://jsonplaceholder.typicode.com/posts?userId=2
 
    expect(secondResponse.status()).toBe(200);
 
    const secondJson = await secondResponse.json();
    console.log(`Posts for userId ${capturedUserId}:`, secondJson);
 
    // expect(secondJson.length).toBeGreaterThan(0);
    expect(secondJson.length).toBe(10);
   
    // Validate that all posts belong to captured userId
    for (const post of secondJson) {
        expect(post.userId).toBe(capturedUserId);
    }
});
 