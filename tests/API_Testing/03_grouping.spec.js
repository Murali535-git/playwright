
const { test } = require('@playwright/test');

test.describe('Grouping1 ', () => {

    test('Test1', async () => {
        console.log('Executing Test 1');
    });

    test('Test2', async () => {
        console.log('Executing Test 2');
    });     
    
    test('Test3', async () => {
        console.log('Executing Test 3');
    });
});

test.describe('Grouping2 ', () => {

    test('Test5', async () => {
        console.log('Executing Test 5');
    });

    test('Test4', async () => {
        console.log('Executing Test 4');
    });     
    
    test('Test6', async () => {
        console.log('Executing Test 6');
    });
});