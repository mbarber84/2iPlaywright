import { Page, Locator } from '@playwright/test';

export class AuthPOM {
  page: Page;
  usernameField: Locator;
  passwordField: Locator;
  loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.getByRole('textbox', { name: 'Username or email address *' });// Username field
    this.passwordField = page.locator('#password');// Password field
    this.loginBtn = page.getByRole('button', { name: 'Log in' }); // Login button
  }

  async login(username: string, password: string) { //login method
    await this.usernameField.fill(username); // fill username field
    await this.passwordField.fill(password); // fill password field
    await this.loginBtn.click(); // click login button
  }
}
