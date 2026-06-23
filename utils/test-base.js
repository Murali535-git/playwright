const base =require('@playwright/test');

exports.customtest= base.test.extend(

{
    testDataForOrder : { 
        // testDataForOrder is the property for the test
        // testDataForOrder is the firture, if anyone wants to use this test data, they can use this property in their test
      useremail : "murali535@gmail.com",
      password : "Value*535",
     productName : "ZARA COAT 3"
      
    }
}


)