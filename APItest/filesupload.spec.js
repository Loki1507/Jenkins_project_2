import { test, expect } from '@playwright/test';

test('filesupload', async ({page})=>{

    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.locator('#file-upload').waitFor();
    await page.locator('#file-upload').setInputFiles('C:/Users/clokes/Downloads/file_example_JPG_1MB.jpg');
    await page.locator('#file-submit').click();
    await page.locator('h3').waitFor();
    await expect(page.locator('h3')).toContainText('Upload')
    console.log(await page.locator('#uploaded-files').innerText())
    await expect(page.locator('#uploaded-files')).toContainText('file_example')
    //await page.pause()    

})

test.only('multifilesupload', async ({page})=>{

    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.locator('#file-upload').waitFor();
    await page.locator('#file-upload').setInputFiles('C:/Users/clokes/Downloads/file_example_JPG_1MB.jpg');
    await page.locator('#file-submit').click();
    await page.locator('h3').waitFor();
    await expect(page.locator('h3')).toContainText('Upload')
    console.log(await page.locator('#uploaded-files').innerText())
    await expect(page.locator('#uploaded-files')).toContainText('file_example')
    //await page.pause()    

})