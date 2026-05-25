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

test.only('validate the valide username and password', async ({page})=>{



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
