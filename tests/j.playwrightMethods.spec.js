const{test, expect}= require('@playwright/test');

test('Validating different UI menthods', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    // await page.goto('https://google.com');
    // await page.goForward();
    // await page.goBack();
    // await page.reload();

// validate the elements are visible mode or not

await expect(page.locator('#displayed-text')).toBeVisible(); // here we are asserting that the element is visible using the expect library
await page.locator('#hide-textbox').click();
await expect(page.locator('#displayed-text')).toBeHidden(); // here we are asserting that the element is hidden using the expect library

//Validating the Dialog box or Popups (these popup ups are java popups)

//Note: ON -- is the lisiner 
//here we are listening to the dialog box and then we need to take action

// await page.pause();

page.on('dialog', dialog => dialog.accept()); //if we want to Cancel then use dismiss()
await page.locator('#confirmbtn').click(); // here we are clicking on the button which will trigger the dialog box

await page.locator('#mousehover').hover();
// console.log(await page.locator('#mousehover').allTextContents());

// Locate the dropdown items (assuming they have the class 'mouse-hover-content a' based on the page structure)
 const dropdownItems = page.locator('.mouse-hover-content a');

// Get the count of available elements
const itemCount = await dropdownItems.count();
console.log(`Number of available elements: ${itemCount}`);

// Get the text content of each element
const itemTexts = await dropdownItems.allTextContents();
console.log('Available elements:', itemTexts);

// Example: Click on the first item if needed
if (itemCount > 0) {
    await dropdownItems.first().click();
}


// now validtating the frames
// to switch the frame we have to use frameLocator

// await page.pause();

// const framePage = await page.frameLocator('courses-iframe');
// //Very important note
// //why we use :visible or why we concat visible to locator?
// //here with the unique locator we got 2 elements matching, to make it unique and working we have avoid hidden element
// // so we have to use visible
//   const lifetimeLink = framePage.locator("li a[href='lifetime-access']:visible");
//     await lifetimeLink.waitFor({ state: 'visible', timeout: 20000 });
//     await lifetimeLink.click(); 

// const textCheck = await framePage.locator('div.text h2').textContent();
// console.log(textCheck.split(" ")[1].trim()); // here we are splitting the text and getting the first word and then trimming it to remove the extra spaces
});

test('Separate test for hover and frame option click', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    // await page.locator('#mousehover').hover();
    // const dropdownItems = page.locator('.mouse-hover-content a');
    // console.log('Available hover items:', await dropdownItems.allTextContents());

    const framePage = page.frameLocator('iframe#courses-iframe');
    const lifetimeLink = framePage.locator("li a[href='lifetime-access']:visible");
    await lifetimeLink.waitFor({ state: 'visible', timeout: 10000 });
    await lifetimeLink.click();

    // const textCheck = await page.locator('div.text h2').textContent();
    const textCheck = await framePage.locator('.text h2').textContent();
    console.log(textCheck.split(" ")[1].trim());
});