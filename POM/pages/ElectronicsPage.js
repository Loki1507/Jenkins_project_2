import { test, expect } from '@playwright/test';

export class ElectronicsPage {


    constructor(page) {
        this.page = page;

    }

    async captureSubcatgiry(captureSubCat) {
        const subcats = await this.page.locator(`//div[@class="item-grid"]//h2//a`).allInnerTexts();
        //console.log(subcats);
        return subcats;
    }

    async clickOnSubCatogiry(sub_cat) {
        await this.page.locator('//div[@class="item-grid"]//h2').getByRole('link', { name: sub_cat }).click();
    }

    async captureAllProducts() {
        const listOfProducts = await this.page.locator(`//div[@class="item-grid"]//h2//a`).allInnerTexts();
        //console.log(listOfProducts);
        return listOfProducts;
    }

    async clickOnProductInSubcatpage(product) {
        await this.page.locator(`//div[@class="item-grid"]`).getByRole('link', { name: product, exact: true }).click();
    }

    async clickOnAddToCart() {
        const countF = await this.page.locator('//div[@class="add-to-cart"]//button').count()
        // console.log("the count of add to cart's is :" + countF)
        // const isAddToCartPresent = await this.page.locator('//div[@class="add-to-cart"]//button').isVisible();
        if (countF == 1) {
            await this.page.locator('//div[@class="add-to-cart"]//button').click();
        } else if(countF > 1){
            await this.page.locator('(//div[@class="add-to-cart"]//button)[1]').scrollIntoViewIfNeeded()
            await this.page.locator('(//div[@class="add-to-cart"]//button)[1]').click();
        } else{
            await this.page.goBack();
        }
    }


    async clickOnAddToWishlist(){
        await this.page.locator('.overview .overview-buttons .add-to-wishlist').click();
    }




}