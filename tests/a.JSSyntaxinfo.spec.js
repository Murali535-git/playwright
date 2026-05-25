// here we need to import the playwright and test or else test never identify
// JS is assync in nature so we need to use async and await to make sure that the code is executed in the correct order

// require('@playwright/test'); -- this is used to import the playwright and test from the playwright library
// and then assign to const

const { test} = require('@playwright/test');

// test having two parameters one is the name of the test and the other is the function which 
// so function will be asyncwill be executed when the test is run

// **test('First Playwright Test', function(){ -- here we are not keeping async, and explicitly menstion the function name

// so make the code liter and sync with wait and async use as below
// test('First Playwright Test', async function(){

// to make it more efficient we should use the proper syntax

test('First Playwright Test', async () => {

    // test('First Playwright Test', async ({browser}) => {

        // here {browser} is a playwright fixture which will launch the browser for us and we can use it to create a new page and perform actions on it}
        //  if we are not given the {}, then it wll just a browser string value
    // Here we need to write the actual code

    // step1: launch the browser
    // step2: login to application
    // step3: click on the button

    // but JS is assync so it will not wait for prior step to complete, so we need to use await

    // await

    

});