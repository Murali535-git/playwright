const{test, expect} = require('@playwright/test');

test('Validate locator', async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    // await expect(page).toHaveTitle('Practice Page');
    await page.locator('#username').fill("rahulshetty");
    await page.locator('[name="password"]').fill("learning");
    await page.locator('input#signInBtn').click();

    console.log(await page.locator('[style*="display"]').textContent());

    // await expect(page.locator('[style*="display"]')).toContainText('Incorrecmurat'); // here we are asserting that the text of the locator is Incorrect using the expect library

    await expect(page.locator('[style*="display"]')).toContainText('Incorrect'); // here we are asserting that the text of the locator is Incorrect using the expect library


});

test('validate the valide username and password', async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    const username=page.locator('#username');
    const password=page.locator('[name="password"]');
    const signInBtn=page.locator('input#signInBtn');

    await username.fill("");
    await username.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("Learning@830$3mK2");

    await signInBtn.click();

   // console.log(await page.locator('.card-body a').textContent());
   // here we print all the elements

    console.log(await page.locator('.card-body a').first().textContent()); 
    console.log(await page.locator('.card-body a').nth(1).textContent()); // here we are printing the second element of the locator

});


test('Validate UI methods check', async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    const username=page.locator('#username');
    const password=page.locator('[name="password"]');
    const signInBtn=page.locator('input#signInBtn');
    const radiobtn=page.locator('.radiotextsty');
    const dropdown=page.locator('select.form-control');

    const documentLink=page.locator('[href*="https://rahulshettyacademy.com/documents-request"]');
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("Learning@830$3mK2");

    await radiobtn.last().click();
      //assertion for check box
    console.log(await radiobtn.last().isChecked());
    await expect(radiobtn.last()).toBeChecked(); // here we are asserting that the last radio button is checked using the expect library
    
    //dropdown
    await dropdown.selectOption('consult');

     await page.locator('#okayBtn').click();

    // checkbox
        await page.locator('#terms').click();
        //assertion for check box
        console.log(await page.locator('#terms').isChecked());
        await expect(page.locator('#terms')).toBeChecked(); // here we are asserting that the checkbox is checked using the expect library  

        await page.locator('#terms').uncheck();
        expect(await page.locator('#terms').isChecked()).toBeFalsy(); 
        //here action is performed inside, so keeping the await inside

        //Validating teh blinking link

        await expect(documentLink).toHaveAttribute('class', 'blinkingText'); // here we are asserting that the document link has the class attribute with the value blinkingText using the expect library

    await signInBtn.click();
   
    // await page.pause();
});``

test.only('@child window handling and valdation', async ({browser})=>{

    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink=page.locator('[href*="documents-request"]');

    //Scenario-1: Failed, why?
    // // Here after clicking page has open already, so page cannot catch the already open window
    // //So failed 
    // documentLink.click(); // new page open
    // const page2= await context.newPage(); 
    // // here we are creating a new page for the child window, but it is not working because the child window is not opening in the same context as the parent window, so we need to use the waitForEvent method to wait for the child window to open and then we can switch to the child window and perform the actions on it


    //Scenario2 - Failed, why?
    // in scenario1 we see window was already open, so this time will give before clicking link
    
    // const page2= await context.newPage(); // here new page session was started and that completely different with click one
    // documentLink.click(); // new page open

    //so failed

    //scenario3 - Passed, why? to overcome all issues we need to use promise
    //promise types Pending, resolved, rejected or fullfilled

    //We know playwright is asynchronous, so we need to use promise to handle the child window, so that we can wait for the child window to open and then we can switch to the child window and perform the actions on it

    const [newPage]= await Promise.all([
        context.waitForEvent('page'), // here we are waiting for the child window to open
        documentLink.click() // here we are clicking the link to open the child window
    ]);

   const text=await newPage.locator('.red').textContent(); 
   console.log(text);
   
// now we need to get the @rahulshettyacademy.com from the text

    const array=text.split('@'); // here we are splitting the text using the @ symbol and storing it in an array
    const domainName=array[1].split(' ')[0];
    // console.log(domainName);

    await page.locator('#username').fill(domainName);
    // await page.pause();

    console.log(await page.locator('#username').textContent()); // here we are printing the text content of the username field in the console, but it will return null because the text content of the input field is empty, so we need to use the value property to get the value of the input field
// textContent will get the content when it was there in DOM, but here we are filling the value, so it will not display the text
// so we need to use the inputValue()

console.log(await page.locator('#username').inputValue()); // here we are printing the value of the username field in the console using the inputValue() method which returns the value of the input field  

});