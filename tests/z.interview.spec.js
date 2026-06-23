const { test, expect } = require('@playwright/test');

test('Client interview with Agilent - basic title check', async ({ page }) => {
    await page.goto('https://www.agilent.com/');
    await page.waitForLoadState('domcontentloaded');
    const pageTitle = await page.title();
    console.log('Page title:', pageTitle);
    expect(pageTitle.toLowerCase()).toContain('agilent');
});