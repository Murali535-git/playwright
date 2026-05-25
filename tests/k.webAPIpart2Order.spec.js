const {test, expect, request} = require('@playwright/test');

const loginPayload = {userEmail: "murali535@gmail.com", userPassword: "Value*535"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};


let token;
let orderId;
// let response;
test.beforeAll( async()=>
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login' ,
       {
        //hearders or data, should be with in {}
        data: loginPayload
       });
      
       expect(loginResponse.ok()).toBeTruthy(); // Check if the login was successful

       const loginResponseJson = await loginResponse.json();
       token = loginResponseJson.token; // Extract the token from the response
       console.log("Token:", token); // Print the token to the console

    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', 
        {
            data: orderPayLoad,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        })

        const orderResponseJson = await orderResponse.json();
        console.log('Order response:', orderResponseJson);
        orderId=orderResponseJson.orders[0];

});


//create order is success
test('@API Place the order test', async ({page})=>
{ 
    page.addInitScript(value => {

        window.localStorage.setItem('token',value);
    }, token );

await page.goto("https://rahulshettyacademy.com/client");
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");


for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
//await page.pause();
expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
