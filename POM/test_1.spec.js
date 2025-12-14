import { test, expect } from '@playwright/test';
import { Homepage } from '../POM/pages/HomePage';
import { ElectronicsPage } from '../POM/pages/ElectronicsPage';
import {Wishlist } from '../POM/pages/Wishlist_scenarios' ;




test('adding item to the cart from the whishlist', async ({ page }) => {
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
        console.log('half code execution is done')
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
        console.log('40% code execution is done')
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
        console.log('80% code execution is done')
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
    console.log('100% code execution is done')
    
    
})
