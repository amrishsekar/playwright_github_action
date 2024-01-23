import { test, expect } from "@playwright/test";

test('Handling table', async({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const table = await page.locator("#productTable");

    // total no.of columns and rows
    const columns = await table.locator("thead > tr > th");
    console.log("No.of Columns:", await columns.count());
    expect.soft(await columns.count()).toBe(4);

    const rows = await table.locator("tbody > tr");
    console.log("No.of Rows:", await rows.count());
    expect.soft(await rows.count()).toBe(5);

    // select checkbox for particular row in a table
    const particularRow = rows.filter({
        has: page.locator("td"),
        hasText: "$5.99"
    });
    particularRow.locator('input').check();

    await page.waitForTimeout(2000); // wait for 2 sec

    particularRow.locator('input').uncheck();

    await page.waitForTimeout(2000); // wait for 2 sec

    // select multiple checkbox in a table
    async function selectProduct(rows, page, keyText) {
        const matchedRow = rows.filter({
            has: page.locator('td'),
            hasText: keyText
        });
        await matchedRow.locator('input').check();
    }
    // calling the function
    await selectProduct(rows, page, "$7.99");
    await selectProduct(rows, page, "Product 1");
    await selectProduct(rows, page, "Product 5");

    await page.waitForTimeout(3000); // wait for 3 sec

    // print all product details using loop
    for (let r = 0; r < await rows.count(); r++) // `r` refers to Rows in a Table
    {

        const row = rows.nth(r);
        // locating all `td` tags
        const tds = row.locator("td");

        for (let d = 0; d < await tds.count() - 1; d++) // `d` refers to Data in a Row
        {
            console.log(await tds.nth(d).textContent());
        }

    }

    await page.waitForTimeout(3000); // wait for 3 sec

    // print data from all the pages in the table
    const pages = await page.locator(".pagination > li > a")
    console.log("No.of Pages:", await pages.count());

    for (let p = 0; p < await pages.count(); p++) // `p` refers to the pagination of the table 
    {

        if (p > 0) {
            await pages.nth(p).click();
        }

        for (let r = 0; r < await rows.count(); r++) // `r` refers to Rows in a Table
        {

            const row = rows.nth(r);
            // locating all `td` tags
            const tds = row.locator("td");

            for (let d = 0; d < await tds.count() - 1; d++) // `d` refers to Data in a Row
            {
                console.log(await tds.nth(d).textContent());
            }

        }
        await page.waitForTimeout(2000); // wait for 2 sec

    }

    await page.waitForTimeout(1000); // wait for 4 sec

});