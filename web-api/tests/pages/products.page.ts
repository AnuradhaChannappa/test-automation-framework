import { Page, Locator } from '@playwright/test';

export class ProductsPage{

    private page: Page;
    readonly title: Locator;
    readonly productsDropdown: Locator;
    private productPrices: Locator;

    constructor(page: Page){
        this.page = page;
        this.title = page.locator('.title');
        this.productPrices = page.locator('.inventory_item_price');
        this.productsDropdown = page.locator('[data-test="product-sort-container"]');
    }

    async getProductPrices(): Promise<number[]>{
        const prices = await this.productPrices.allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }
}