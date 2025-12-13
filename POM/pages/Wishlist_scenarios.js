import { test, expect } from '@playwright/test';

export class Wishlist {


    constructor(page) {
        this.page = page;
    }

    async clickOnWishlistTab(){
        await this.page.locator('.ico-wishlist').scrollIntoViewIfNeeded()
        await this.page.locator('.ico-wishlist').click();
    }


}