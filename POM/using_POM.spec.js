import { test, expect } from '@playwright/test';
import { Homepage } from '../POM/pages/HomePage';
import { ElectronicsPage } from '../POM/pages/ElectronicsPage';
import {Wishlist } from '../POM/pages/Wishlist_scenarios' ;



test('navigationPage', async ({ page }) => {
    // navigation page
    const homepage = new Homepage(page);
    await page.goto('https://demo.nopcommerce.com/');

    await homepage.clickOnLogIN();
    //login page
    await homepage.loginWithValidCredentials('testking902@gmail.com', 'testking902');
    //home page
    await homepage.clickOnComputers();
    await homepage.clickOnElectronics();
    await homepage.clickOnApparel();
    await homepage.clickOnDigital();
    await homepage.clickOnJewelry();
    await homepage.clickOnBooks();
    await homepage.clickOnGift();

})

test('capture electronics details', async ({ page }) => {
    // navigation page
    const homepage = new Homepage(page);
    const electronicsPage = new ElectronicsPage(page);
    await page.goto('https://demo.nopcommerce.com/');

    await homepage.clickOnLogIN();
    //login page
    await homepage.loginWithValidCredentials('testking902@gmail.com', 'testking902');
    //home page
    await homepage.clickOnElectronics();
    //await homepage.clickOnComputers();
    await electronicsPage.captureSubcatgiry('Electronics');

})

test('adding single item to cart', async ({ page }) => {
    //required classes & objects
    const homepage = new Homepage(page);
    const electronicsPage = new ElectronicsPage(page);

    //opening a website or navigation page
    await page.goto('https://demo.nopcommerce.com/');

    //logininto application with valid credentials
    await homepage.clickOnLogIN();
    await homepage.loginWithValidCredentials('testking902@gmail.com', 'testking902');

    //home page - clicking on category
    await homepage.clickOnElectronics();
    //capturing all subcategiries in category
    const subcatogiries = await electronicsPage.captureSubcatgiry('Electronics');

    //choosing subcat type
    const item = subcatogiries[0];
    //clicking on sub category
    await electronicsPage.clickOnSubCatogiry(item);
    //capture all the products names
    const allprodutsList = await electronicsPage.captureAllProducts();
    await page.waitForLoadState();
    console.log(`all items in the sub cat is : ${allprodutsList}`);

    //adding single item into cart by giving the product name
    const requiredProduct = 'HTC One Mini Blue'
    //filtering all the product to find the required product
    for (let product of allprodutsList) {
        console.log(product)
        if (product === requiredProduct) {
            //opening the item with the help of product name
            await electronicsPage.clickOnProductInSubcatpage(product);
            break
        }
    }

    await page.waitForLoadState();
    //adding item to the cart
    await electronicsPage.clickOnAddToCart();
    await page.waitForLoadState();
    //opening the cart to check whether item got added or not
    await page.locator('//a[@class="ico-cart"]').click();
    await page.waitForLoadState();
})

test('adding all items into cart', async ({ page }) => {

    const homepage = new Homepage(page);
    const electronicsPage = new ElectronicsPage(page);    

    //opening a website or navigation page
    await page.goto('https://demo.nopcommerce.com/');

    //logininto application with valid credentials
    await homepage.clickOnLogIN();
    await homepage.loginWithValidCredentials('testking902@gmail.com', 'testking902');

    //home page - clicking on electronics tab
    await homepage.clickOnElectronics();
    //capturing all subcategiries in category
    const subcatogiries = await electronicsPage.captureSubcatgiry('Electronics');

    //choosing subcat type
    const item = subcatogiries[0];
    //clicking on sub category
    await electronicsPage.clickOnSubCatogiry(item);
    //capture all the products names
    const allprodutsList = await electronicsPage.captureAllProducts();
    await page.waitForLoadState();
    console.log(`all items in the sub cat is : ${allprodutsList}`);

    //adding all the products into the cart from the selected sub category
    for (let product of allprodutsList) {
        await electronicsPage.clickOnProductInSubcatpage(product);
        await page.waitForLoadState();
        await page.waitForTimeout(2000)
        await electronicsPage.clickOnAddToCart();
        await page.waitForLoadState();
        await page.goBack();
    }
    //opening cart to check whether items added or not
    await page.locator('//a[@class="ico-cart"]').click();
    await page.waitForLoadState();

})

test('adding single item to wishlist', async ({ page }) => {
    //required classes & objects
    const homepage = new Homepage(page);
    const electronicsPage = new ElectronicsPage(page);
    const wishlist        = new Wishlist(page)

    //opening a website or navigation page
    await page.goto('https://demo.nopcommerce.com/');

    //logininto application with valid credentials
    await homepage.clickOnLogIN();
    await homepage.loginWithValidCredentials('testking902@gmail.com', 'testking902');

    //home page - clicking on category
    await homepage.clickOnElectronics();
    //capturing all subcategiries in category
    const subcatogiries = await electronicsPage.captureSubcatgiry('Electronics');

    //choosing subcat type
    const item = subcatogiries[1];
    //clicking on sub category
    await electronicsPage.clickOnSubCatogiry(item);
    //capture all the products names
    const allprodutsList = await electronicsPage.captureAllProducts();
    await page.waitForLoadState();

    //adding single item to wishlist by giving the product name
    const requiredProduct = 'HTC One Mini Blue'
    //filtering all the product to find the required product
    for (let product of allprodutsList) {
        //console.log(product)
        if (product === requiredProduct) {
            //opening the item with the help of product name
            await electronicsPage.clickOnProductInSubcatpage(product);
            break
        }
    }

    await page.waitForLoadState();
    //adding item to the cart
    await electronicsPage.clickOnAddToWishlist();
    await page.waitForLoadState();
    //opening the cart to check whether item got added or not
    await wishlist.clickOnWishlistTab();
    await page.waitForLoadState();
})

test.only('adding item to the cart from the whishlist', async ({ page }) => {
    //required classes & objects
    const homepage = new Homepage(page);
    const electronicsPage = new ElectronicsPage(page);
    const wishlist        = new Wishlist(page)

    //opening a website or navigation page
    await page.goto('https://demo.nopcommerce.com/');

    //logininto application with valid credentials
    await homepage.clickOnLogIN();
    await homepage.loginWithValidCredentials('testking902@gmail.com', 'testking902');
    const no_ofItemsInWishlist = await page.locator('.ico-wishlist .wishlist-qty').textContent();

    //checking if the wishlist is empty then we add iteam if not we proceed to wishlist directly
    if (no_ofItemsInWishlist === '(0)') {
        //home page - clicking on category
        await homepage.clickOnElectronics();
        //capturing all subcategiries in category
        const subcatogiries = await electronicsPage.captureSubcatgiry('Electronics');

        //choosing subcat type
        const item = subcatogiries[1];
        //clicking on sub category
        await electronicsPage.clickOnSubCatogiry(item);
        //capture all the products names
        const allprodutsList = await electronicsPage.captureAllProducts();
        await page.waitForLoadState();

        //adding single item to wishlist by giving the product name
        const requiredProduct = 'HTC One Mini Blue'
        //filtering all the product to find the required product
        for (let product of allprodutsList) {
            //console.log(product)
            if (product === requiredProduct) {
                //opening the item with the help of product name
                await electronicsPage.clickOnProductInSubcatpage(product);
                break
            }
        }

        await page.waitForLoadState();
        //adding item to the cart
        await electronicsPage.clickOnAddToWishlist();
        await page.waitForTimeout(3000);
        await page.waitForLoadState();
        await wishlist.clickOnWishlistTab();


    } else {
        //open wishlist and add first item to the cart
        await wishlist.clickOnWishlistTab();
        await page.waitForLoadState();
        await page.waitForTimeout(2000);
    }

    await expect(page.locator('//div[@class="page-title"]//h1')).toContainText('Wishlist')
    const table = page.locator('//table[@class="cart"]')
    await table.locator('(//td[@class="add-to-cart"]//input)[1]').check();
    await page.getByRole('button', { name: /Add to cart/i }).click();
    await expect( page.locator('//div[@class="page shopping-cart-page"]//h1')).toBeVisible();
    await page.pause();
    
})
