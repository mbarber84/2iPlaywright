import { Page, Locator, expect } from '@playwright/test';

export class AccountPOM {
  page: Page;
  myAccountLink: Locator;
  ordersTable: Locator;
  logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myAccountLink = page.getByRole('link', { name: 'Orders' }); // Orders link
    this.ordersTable = page.locator('.orders'); // Orders table
    this.logoutLink = page.getByRole('link', { name: 'Logout' }); // Logout link
  }

  async goToOrders() {
    await this.myAccountLink.waitFor({ state: 'visible' }); // ensure the link is visible
    await this.myAccountLink.click(); // click Orders link
  }

  async confirmOrder(orderNum: string) { //confirm order number exists
    await expect(this.ordersTable).toContainText(orderNum); // assert order number in table
  }

  //go to My Account
  async goToMyAccount() {
    await this.myAccountLink.waitFor({ state: 'visible' }); // ensure the link is visible
    await this.myAccountLink.click(); // click My Account link
  }

  //check if the order number exists in the orders table
  async assertOrderNumber(orderNum: string) { //confirm order number exists
    await expect(this.ordersTable).toContainText(orderNum); // assert order number in table
  }

  async screenshotOrders(path: string) { //screenshot orders page
    await this.page.screenshot({ path }); // take screenshot
  }

  async logout() { //logout
    await this.logoutLink.click(); // click logout link
  }
}
