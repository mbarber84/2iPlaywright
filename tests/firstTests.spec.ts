import { test, expect } from '@playwright/test';

test("My first test", async ({ page }) => {
    await page.goto("https://www.edgewordstraining.co.uk/webdriver2"); //driver.get("https://www.edgewordstraining.co.uk/webdriver2")
    await page.locator("#menu > ul > li:nth-child(1) > a > span").click();//driver.findElement(By.cssSelector("#menu > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)")).click()
    await page.locator("#username").nth(0).fill("edgewords");//Will also .clear()
    await page.locator("#password").fill("edgewords123");
    await page.locator("#Login > table > tbody > tr:nth-child(3) > td:nth-child(2) > a:nth-child(1)").click();//click Submit button using css selector

});

test('test2', async ({ page }) => {
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

test('all products', async ({ page }) => {
  await page.goto('https://www.edgewordstraining.co.uk/demo-site/');
  const newProducts = page.getByLabel('Recent Products');
  for (const prod of await newProducts.locator('h2:not(.section-title)').all()) { //gathers a collection of all() matching elements
    console.log(await prod.textContent()); //then loops over each individual match logging the text
  }; //No need to await console, but you do need to await the locator. Or you will only get the "promise" of the text, not the actual text.
 
});