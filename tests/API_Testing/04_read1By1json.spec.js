
//*********************************** */
//DataDriven testing using JSON file with different objects
//need to take the one after another object 1 by 1
// import { test, expect } from '@playwright/test';
// import * as fs from 'fs';

//Most recomended way in framework

// *******************


import { test, expect } from '@playwright/test';
import * as fs from 'fs';
 
test.describe('Data-Driven POST Requests', () => {
 
    // Read JSON array from file
    const filePath = 'files/newPostData.json';
    const newPostPayload = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
   
 
    // Define headers separately
    const headers = {
        'Content-type': 'application/json; charset=UTF-8'
    };
 
    // numbers = [45, 20, 12]
    // for (const num of numbers) { ... }
 
    // const data = postsData[2]; // Example of accessing a specific entry
 
    // Iterate over each data set
    for (const postData of newPostPayload) {
        test(`Create Post for userId ${postData.userId}`, async ({ request }) => {
 
            const url = 'https://jsonplaceholder.typicode.com/posts';
 
            // Send POST request
            const response = await request.post(url, {
                data: postData,
                headers: headers
            });
 
            // Validate status code
            expect(response.status()).toBe(201);
 
            // Parse JSON response
            const jsonData = await response.json();
            console.log(`Response for userId ${postData.userId}:`, jsonData);
 
            // Validate response fields
            expect(jsonData.title).toBe(postData.title);
            expect(jsonData.body).toBe(postData.body);
            expect(jsonData.userId).toBe(postData.userId);
            expect(typeof jsonData.id).toBe('number'); // Validate id type
        });
    }
});