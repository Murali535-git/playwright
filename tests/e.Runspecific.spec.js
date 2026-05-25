const{test, expect} = require('@playwright/test');

test('validate the valide username and password', async ({page})=>{

    const username=page.locator('#username');
    const password=page.locator('[name="password"]');
    const signInBtn=page.locator('input#signInBtn');
    const cardTitle=page.locator('.card-body a');


    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());



    await username.fill("");
    await username.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("Learning@830$3mK2");

    await signInBtn.click();

   // console.log(await page.locator('.card-body a').textContent());
   // here we print all the elements

    // console.log(await page.locator('.card-body a').first().textContent()); 
    // console.log(await page.locator('.card-body a').nth(1).textContent()); // here we are printing the second element of the locator
    
    // console.log(await cardTitle.nth(1).textContent());
    //Note: AllTextContents() never wait and it was not defined in the playwright assertions
    
    await page.waitForLoadState('networkidle'); // here we are waiting for the network to be idle before we are printing all the elements of the locator using the allTextContents() method which returns an array of all the text contents of the locator
    // or
    await page.cardTitle.first().waitFor(); // here we are waiting for the first element of the locator to be visible before we are printing all the elements of the locator using the allTextContents() method which returns an array of all the text contents of the locator
    //note waitFor() is working only for one element on the list
    console.log(await cardTitle.allTextContents()); // here we are printing all the elements of the locator using the allTextContents() method which returns an array of all the text contents of the locator

//rahulshettyacademy.com/client/-- assignment

});
