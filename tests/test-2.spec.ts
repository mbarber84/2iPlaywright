import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.edgewordstraining.co.uk/demo-site/'); // navigates to demo-site
  await page.locator('#menu-item-46').getByRole('link', { name: 'My account' }).click(); //finds and clicks My Account link in menu
  await page.getByRole('textbox', { name: 'Username or email address *' }).click(); //finds username field and clicks it
  await page.getByRole('textbox', { name: 'Username or email address *' }).fill('hello@2itesting.co.uk');  //fills username field
  await page.locator('#password').click(); //finds password field and clicks it
  await page.locator('#password').fill('12iTestingProject'); //fills password field
  await page.getByRole('button', { name: 'Log in' }).click(); //finds and clicks Log in button
  await page.locator('#menu-item-43').getByRole('link', { name: 'Shop' }).click(); //finds and clicks Shop link in menu
  await page.getByRole('link', { name: 'Add “Polo” to your cart' }).click(); //finds and clicks Add Polo to your cart link
  await page.getByTitle('View cart').click(); //finds and clicks View cart link
  await page.getByRole('link', { name: 'Remove this item' }).click(); //finds and clicks Remove this item link
  await page.locator('#menu-item-46').getByRole('link', { name: 'My account' }).click(); //finds and clicks My Account link in menu
  await page.getByRole('link', { name: ' Logout' }).click(); //finds and clicks Logout link
});