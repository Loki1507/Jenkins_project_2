import { test, expect } from '@playwright/test';

export class Homepage {


    constructor(page) {
        this.page = page;
    }

    async clickOnLogIN() {
        await this.page.getByRole('link', { name: 'Log in' }).click();
    }

    async loginWithValidCredentials(email,password) {
        await this.page.getByRole('textbox', { name: 'Email:' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Password:' }).fill(password);
        await this.page.getByRole('button', { name: 'Log in' }).click();

        const userValidation = await this.page.locator('div.message-error.validation-summary-errors').isVisible();
        console.log(`is credentials working : ${!userValidation}`);
        if (userValidation) {
            await this.userRegistration(email,password);
        }
    }


    async clickOnComputers() {
        await this.page.getByRole('button', { name: 'Computers' }).click();

    }
    async clickOnElectronics() {
        await this.page.getByRole('button', { name: 'Electronics' }).click();

    }

    async clickOnApparel() {
        await this.page.getByRole('button', { name: 'Apparel' }).click();

    }

    async clickOnDigital() {
        await this.page.getByRole('button', { name: 'Digital downloads' }).click();

    }

    async clickOnBooks() {
        await this.page.getByRole('button', { name: 'Books' }).click();

    }

    async clickOnJewelry() {
        await this.page.getByRole('button', { name: 'Jewelry' }).click();

    }

    async clickOnGift() {
        await this.page.getByRole('button', { name: 'Gift Cards' }).click();
    }

    async userRegistration(email,password) {
        await this.page.getByRole('link', { name: 'Register' }).click();
        await this.page.getByLabel('Male', { exact: true }).check();
        await this.page.getByRole('textbox', { name: 'First name:' }).fill('test');
        await this.page.getByRole('textbox', { name: 'Last name:' }).fill('king');
        await this.page.getByRole('textbox', { name: 'Email:' }).fill(email);
        await this.page.getByLabel('Password:', { exact: true }).fill(password)
        await this.page.getByLabel('Confirm password:', { exact: true }).fill(password);
        await this.page.getByRole('button', { name: /Register/i }).click();
        await expect(this.page.getByText('Your registration completed')).toBeVisible();
        await this.page.getByRole('link', { name: 'Continue' }).click();
        await expect(this.page.getByRole('link', { name: /Log out/i })).toBeVisible();

    }





}