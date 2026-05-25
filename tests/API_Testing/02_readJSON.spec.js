import { test, expect } from '@playwright/test';
import * as fs from 'fs';
 
 
 //read the data from JSON file and use it to create a new post
test.skip('Create a New Post using Data from JSON File_sync', async ({ request }) => {
 
    const url = 'https://jsonplaceholder.typicode.com/posts';
 
    // Read JSON data from file
    const filePath = 'files/newPostData.json';
    const newPostPayload = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
 
    // Define headers separately
    const headers = {
        'Content-type': 'application/json; charset=UTF-8'
    };
 
    // Send POST request
    const response = await request.post(url, {
        data: newPostPayload,
        headers: headers
    });
 
    // Validate status code
    expect(response.status()).toBe(201);
 
    // Parse JSON response
    const jsonData = await response.json();
    console.log('Created Post Response:', jsonData);
 
    // Validate response fields
    expect(jsonData.title).toBe(newPostPayload.title);
    expect(jsonData.body).toBe(newPostPayload.body);
    expect(jsonData.userId).toBe(newPostPayload.userId);
    expect(jsonData.id).toBeTruthy();
   
});


// // Node.js example: read payload from a JSON file and use it to create a new post

// const fs = require("fs");
// const path = require("path");
// const axios = require("axios");

// // Read JSON payload from file
// const payloadPath = path.join(__dirname, "payload.json");

// const payload = JSON.parse(fs.readFileSync(payloadPath, "utf8"));

// // API endpoint
// const API_URL = "https://example.com/api/posts";

// // Create new post
// async function createPost() {
//   try {
//     const response = await axios.post(API_URL, payload, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer YOUR_TOKEN"
//       }
//     });

//     console.log("Post created successfully:");
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error creating post:");
//     console.error(error.response?.data || error.message);
//   }
// }

// createPost();
