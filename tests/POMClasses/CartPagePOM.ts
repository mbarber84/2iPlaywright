import { Page, Locator } from '@playwright/test';

export class CartPOM {
  page: Page;
  checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutBtn = page.getByRole('link', { name: 'Proceed to checkout ' }); // Proceed to checkout button
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click(); // click proceed to checkout
  }
}
