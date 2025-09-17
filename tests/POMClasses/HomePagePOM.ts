import { Page, Locator } from '@playwright/test';

export class HomePOM {
  page: Page;
  myAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myAccountLink = page.locator('#menu-item-46').getByRole('link', { name: 'My account' }); // My Account link
  }

  async goToMyAccount() {
    await this.myAccountLink.click(); // click My Account link
  }
}
