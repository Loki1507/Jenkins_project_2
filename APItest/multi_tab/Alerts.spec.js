import { test, expect } from '@playwright/test';


test('simpleAlerts', async ({ page }) => {

    await page.goto('https://demo.automationtesting.in/Alerts.html');
    await page.locator('a[href="#OKTab"]').click()
    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain('alert box!');
        console.log(dialog.type());
        await page.waitForTimeout(3000)
        dialog.accept()
    })
    await page.locator('button[onclick="alertbox()"]').click()
    await page.waitForTimeout(3000)

})

test('confirmAlerts', async ({ page }) => {

    const rule = 'lefts';
    let validationmessage = '';
    await page.goto('https://demo.automationtesting.in/Alerts.html');
    await page.locator('a[href="#CancelTab"]').click()
    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain('Press a Button !');
        console.log(dialog.message())
        console.log(dialog.type());
        await page.waitForTimeout(3000);
        if (rule === 'left') {
            validationmessage = 'pressed on okay';
            await dialog.accept();
        } else {
            validationmessage = 'pressed on cancel';
            await dialog.dismiss();
        }
    })
    await page.locator('button[onclick="confirmbox()"]').click()
    await page.waitForTimeout(3000)

    if (validationmessage === 'pressed on okay') {
        await expect(page.locator('//div[@id="CancelTab"]/p')).toContainText('pressed Ok')
        console.log(validationmessage)
    } else {
        await expect(page.locator('//div[@id="CancelTab"]/p')).toContainText('Pressed Cancel')
        console.log(validationmessage)
    }
    await page.waitForTimeout(3000)

})

test.only('promptAlerts', async ({ page }) => {


    await page.goto('https://demo.automationtesting.in/Alerts.html');
    await page.locator('a[href="#Textbox"]').click()

    let doYouWantToCancel = false
    let isCustomTextRequired = true;
    let customText = 'test king'
    let isCustomTextUsed


    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain('enter your name');
        let defaultValue = dialog.defaultValue();
        //console.log(defaultValue)
        await page.waitForTimeout(3000);
        if (!doYouWantToCancel) {
            if (isCustomTextRequired) {
                console.log(`user given custom text as: ${customText}`)
                isCustomTextUsed = true;
                await dialog.accept(customText);
            } else {
                console.log(`user given default text as: ${defaultValue}`)
                await dialog.accept(defaultValue);
            }
        } else {
            console.log('user want to cancel')
            await dialog.dismiss();
        }

    })

    await page.locator('button[onclick="promptbox()"]').click()
    await page.waitForTimeout(3000)

    if (!doYouWantToCancel) {
        if (isCustomTextUsed) {
            await expect(page.locator('[id="demo1"]')).toContainText(customText)
        } else {
            await expect(page.locator('[id="demo1"]')).toContainText('Automation Testing user')
        }

    } else {
        await expect(page.locator('[id="demo1"]')).toHaveText('')
    }
    await page.waitForTimeout(3000)
})