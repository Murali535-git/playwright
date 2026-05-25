import { test, expect } from '@playwright/test';
import { json } from 'node:stream/consumers';

test('Fetch post 12 and validate the response', async ({ request }) => {

    //Send a GET request to fetch the post with id 12
    //path parameter -- /posts/12
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/12');

    //Validate the response status code and the post id in the response body
    expect(response.status()).toBe(200);

    //Serialization Vs Deserialization
    //Serialization means converting an object or data structure into a format that can be easily stored or transmitted, such as JSON or XML.
    //Deserialization is the process of converting serialized data back into its original format, such as converting a JSON string back into an object or data structure.

    const postData = await response.json(); //Parse the response body as JSON, or Deserialize

    expect(postData.id).toBe(12);

    expect(postData.userId).toBe(2);

    expect(postData.title).toBe("in quibusdam tempore odit est dolorem");
    console.log(postData.title);

    //Validating the presence of title-- should be use toBeTruthy
    expect(postData.title).toBeTruthy();

    console.log('Post Data:', postData);

    //postData is object
    //body is key
    console.log(postData.body);//just posting the oject data of body --

    //Validate header

    const contentType = response.headers()['content-type'];
    console.log('Content-Type:', contentType);
    expect(contentType).toContain('application/json');

    //Validate the body exists in the response
    expect(postData.body).toBeTruthy();
});

test('Fetch post 1 and validate the response', async ({ request }) => {

    //Send a GET request to fetch the post with id 1
    const responce = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    //Validate the response status code and the post id in the response body
    expect(responce.status()).toBe(200);
    const responceData = await responce.json();
    //validate the PostId 
    expect(responceData.id).toBe(1);

    console.log(responceData.title);
    expect(responceData.title).toBeTruthy();
    console.log(responceData.body);
});

test('Delete post with 12 and validate the response', async ({ request }) => {

    //Send a DELETE request to delete the post with id 12
    const responce = await request.delete('https://jsonplaceholder.typicode.com/posts/12');
    //Validate the response status code
    expect(responce.status()).toBe(200);

    console.log(responce.status());
    // console.log(responce);

    const responceData = await responce.json();
    console.log(responceData);

    //Validate the response body is empty
    expect(responceData).toEqual({});

});


test('Fetch all posts using userId 2 and validate the response', async ({ request }) => {

    //Send a GET request to fetch all posts with userId 2
    //query parameter -- ?userId=2
    //in query parameter responce is always in array format (either single or multiple)
    const responce = await request.get('https://jsonplaceholder.typicode.com/posts?userId=2');
    //Validate the response status code
    expect(responce.status()).toBe(200);

    console.log(responce.status());
    // console.log(responce);

    const responceData = await responce.json();
    console.log(responceData);

});

test('Query Parameter fetch with 12 ', async ({ request }) => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const queryParams = { id: 12 }; //query parameter -- ?userId=2&id=12

    //send the get request with query parameter
    const responce = await request.get(url, { params: queryParams });
    //Validate the response status code
    expect(responce.status()).toBe(200);

    console.log('Satatus code: ', responce.status());

    const jsonData = await responce.json();
    console.log('Parssed JSON data: ', jsonData);

    expect(jsonData.length).toBe(1); // Validate that only one post is returned

    //jsonData is an ayyay because filter returns multiple posts

    expect(jsonData[0].id).toBe(12); // Validate that the post id is 12
    expect(jsonData[0].userId).toBe(2); // Validate that the userId is 2
    expect(jsonData[0].title).toBeTruthy();

});

//We need to use the query with 2 different ID's 12 and 15

test('Query parameter fetch with ids 12 and 15', async ({ request }) => {

    const url = 'https://jsonplaceholder.typicode.com/posts';
    // const queryParams = new URLSearchParams({ "id=12&id=15"}); //query parameter -- ?id=12

    const queryParams = new URLSearchParams();
    queryParams.append("id", "12");
    queryParams.append("id", "15");

    // queryParams.append("userId", "2");

    //or

    // const queryParams = new URLSearchParams([["id", "12"], ["id", "15"]]);

    //send the get request with query parameter
    const responce = await request.get(url, { params: queryParams });
    //Validate the response status code
    expect(responce.status()).toBe(200);

    console.log('Status code: ', responce.status());

    const jsonData = await responce.json();
    console.log('Parsed JSON data: ', jsonData);

    console.log(jsonData.length);

});

test('Fetch Posts by UserId and Validate Array Count & First ID', async ({ request }) => {

    const url = 'https://jsonplaceholder.typicode.com/posts';
    const queryParams = { userId: 3 };

    // Send GET request with query parameters
    const response = await request.get(url, {
        params: queryParams
    });

    // Validate status code
    expect(response.status()).toBe(200);

    // Parse JSON response
    const jsonData = await response.json();
    console.log('Response JSON:', jsonData);

    expect(jsonData.length).toBeGreaterThan(0); // Ensure response is not empty
    expect(jsonData.length).toBe(10); // Count should be 10
    expect(jsonData[0].id).toBe(21);  // First post's id should be 21

    // Validate that all posts belong to userId = 3
    for (const post of jsonData) {
        expect(post.userId).toBe(3);
    }
});

test('Query paramater for fetching all posts', async ({ request }) => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const queryParams = { 'userId': 2 }
    const response = await request.get(url, { params: queryParams })
    const jsonData = await response.json()
    //console.log(jsonData)
    console.log(jsonData.length)
    expect(jsonData.length).toBe(10)
    console.log('Parsed JSON data: ', jsonData);
})

//Update the POSt
test('Update Post with ID 12 and Validate Response', async ({ request }) => {

    const url = 'https://jsonplaceholder.typicode.com/posts/12';

    // Prepare updated payload
    const updatedPayload = {
        id: 12,
        title: 'Updated Post Title',
        body: 'This post has been updated using Playwright PUT request',
        userId: 2
    };

    // Define headers separately
    const headers = {
        'Content-type': 'application/json; charset=UTF-8'
    };

    // Send PUT request
    const response = await request.put(url, {
        data: updatedPayload,
        headers: headers
    });

    // Validate status code
    expect(response.status()).toBe(200);

    // Parse JSON response
    const jsonData = await response.json();
    console.log('Updated Response JSON:', jsonData);

    // Validate updated fields
    expect(jsonData.id).toBe(12);
    expect(jsonData.title).toBe(updatedPayload.title);
    expect(jsonData.body).toBe(updatedPayload.body);
    expect(jsonData.userId).toBe(updatedPayload.userId);
});

//put request with query parameter
test('Validate the PUT request with query parameter', async ({ request }) => {

    const url = 'https://jsonplaceholder.typicode.com/posts/12';
    // const queryParams = { id: 12 };

    const updatedPayload = {
        id: 12,
        title: 'Updated Post Title'
    };

    // Define headers separately
    const headers = {
        'Content-type': 'application/json; charset=UTF-8'
    };

    // Send PUT request
    const response = await request.put(url, {
        data: updatedPayload,
        headers: headers
    });

    // Validate status code
    expect(response.status()).toBe(200);

    // Parse JSON response
    const jsonData = await response.json();
    console.log('Updated Response JSON:', jsonData);

    // Validate updated fields
    expect(jsonData.id).toBe(12);
    expect(jsonData.title).toBe(updatedPayload.title);
    expect(jsonData.body).toBeUndefined(); //body should be null because we are not sending body in the payload
    expect(jsonData.userId).toBeUndefined(); //userId should be null because we are not sending userId in the payload

    console.log(jsonData.body); //body should be null because we are not sending body in the payload


});

//patch request with query parameter
test('Validate the PATCH request with query parameter', async ({ request }) => {

    const url = 'https://jsonplaceholder.typicode.com/posts/12';
    // const queryParams = { id: 12 };

    const updatedPayload = {
        id: 12,
        title: 'Updated Post Title'
    };

    // Define headers separately
    const headers = {
        'Content-type': 'application/json; charset=UTF-8'
    };

    // Send PATCH request
    const response = await request.patch(url, {
        data: updatedPayload,
        headers: headers
    });

    // Validate status code
    expect(response.status()).toBe(200);

    // Parse JSON response
    const jsonData = await response.json();
    console.log('Updated Response JSON:', jsonData);

    // Validate updated fields
    expect(jsonData.id).toBe(12);
    expect(jsonData.title).toBe(updatedPayload.title);

    console.log(jsonData.body); //body should be null because we are not sending body in the payload


});

//creating a new post using POST request

test('Create a new post using POST request and validate the response', async ({ request }) => {

    const url = 'https://jsonplaceholder.typicode.com/posts';
    const newPostPayload = {
        title: 'New Post Title',
        body: 'This is the body of the new post created using Playwright POST request',
        userId: 35
    };  

    // Define headers separately
    const headers = {
        'Content-type': 'application/json; charset=UTF-8'
    };  

    // Send POST request to create a new post
    const response = await request.post(url, {
        data: newPostPayload,
        headers: headers
    });

    // Validate status code
    expect(response.status()).toBe(201); // 201 Created
    
    console.log('Status code: ', response.status());

    // Parse JSON response
    const jsonData = await response.json();
    console.log('Created Post Response JSON:', jsonData);

    // Validate the response contains the new post data
    expect(jsonData.id).toBe(101);
    expect(jsonData.userId).toBe(35);
    expect(jsonData.title).toBe(newPostPayload.title);
    expect(jsonData.body).toBe(newPostPayload.body);

});

//read payload from a json file and use it in the script for creating a new post

test('Create a new post using payload from JSON file', async ({ request }) => {

    const url = 'https://jsonplaceholder.typicode.com/posts';
    const newPostPayload = {
        title: 'New Post Title',
        body: 'This is the body of the new post created using Playwright POST request',
        userId: 35
    };  

    // Define headers separately
    const headers = {
        'Content-type': 'application/json; charset=UTF-8'
    };  

    // Send POST request to create a new post
    const response = await request.post(url, {
        data: newPostPayload,
        headers: headers
    });

    // Validate status code
    expect(response.status()).toBe(201); // 201 Created
    
    console.log('Status code: ', response.status());

    // Parse JSON response
    const jsonData = await response.json();
    console.log('Created Post Response JSON:', jsonData);

    // Validate the response contains the new post data
    expect(jsonData.id).toBe(101);
    expect(jsonData.userId).toBe(35);
    expect(jsonData.title).toBe(newPostPayload.title);
    expect(jsonData.body).toBe(newPostPayload.body);

});

