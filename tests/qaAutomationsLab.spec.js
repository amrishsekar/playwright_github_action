const { test, expect } = require("@playwright/test");

test("Open the site 'qaautomationlabs.com 'and verify the title and Click on Menu Blogs", async({ page }) => {

    await page.goto("https://qaautomationlabs.com/");

    await expect(page).toHaveTitle("Home - QA Automation Labs");

    await page.getByRole('link', { name: 'Blog', exact: true }).click();

});
test("Search the Blog with text 'Playwright ", async({ page }) => {

    await page.goto("https://qaautomationlabs.com/");

    await page.getByRole('link', { name: 'Blog', exact: true }).click();
    await page.waitForTimeout(3000);

    await page.fill("input[placeholder='Search here...']", "Playwright{enter}");

    await page.waitForTimeout(3000);

});