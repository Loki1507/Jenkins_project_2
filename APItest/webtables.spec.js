import { test, expect } from '@playwright/test';

test('webtables', async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('#productTable').scrollIntoViewIfNeeded();
    await page.waitForTimeout(4000);

    const table =  page.locator('#productTable');
    const columns = table.locator('thead th');
    const columncount = await columns.count()
    //const columns = await page.locator('#productTable>thead th').allInnerTexts();
    console.log(columncount)


    const rows = table.locator('tbody tr');
    const rowcount = await rows.count();
    console.log(rowcount)

    for(let i = 0 ; i<rowcount;i++){
        const cellvalue = await rows.nth(i).locator('td').nth(1).innerText()
        if(cellvalue === 'Tablet '){
            console.log((await rows.nth(i).locator('td').nth(1)).innerText())
            await rows.nth(i).locator('td').nth(3).locator('input').check();
            break;
        }
    }
    await page.pause();
})