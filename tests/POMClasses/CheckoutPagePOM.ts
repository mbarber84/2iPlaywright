import { Page, Locator } from '@playwright/test';

export class CheckoutPOM {
  page: Page;
  placeOrderBtn: Locator;
  orderNumber: Locator;

  constructor(page: Page) {
    this.page = page;
    this.placeOrderBtn = page.getByRole('button', { name: 'Place order' }); // adjust selector as needed
    this.orderNumber = page.locator('.order'); // refine if needed
  }

  async completeOrder(): Promise<string> {
    await this.placeOrderBtn.click(); // click place order
    await this.page.waitForSelector('.woocommerce-order-overview'); // wait for confirmation
    const orderText = await this.orderNumber.textContent(); // get order number text
    return orderText?.trim() || ''; // return order number or empty string
  }
}
