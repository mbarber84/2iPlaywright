import { Page, Locator } from '@playwright/test';

export class ShopPOM {
  page: Page;
  shopLink: Locator;
  addCapBtn: Locator;
  viewCartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shopLink = page.locator('#menu-item-43').getByRole('link', { name: 'Shop' }); // Shop link
    this.addCapBtn = page.getByRole('link', { name: 'Add “Cap” to your cart' }); // Add to cart button for Cap
    this.viewCartBtn = page.getByTitle('View cart'); // View cart button
  }

  async goToShop() {
    await this.shopLink.click(); // click Shop link
  }

  async addCapToCart() {
    await this.addCapBtn.click(); // click add cap to cart
  }

  async goToCart() {
    await this.viewCartBtn.click(); // click view cart
  }
}
