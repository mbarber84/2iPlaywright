import { test, expect } from '@playwright/test';
import { HomePOM } from './POMClasses/HomePagePOM';
import { AuthPOM } from './POMClasses/AuthPagePOM';
import { ShopPOM } from './POMClasses/ShopPagePOM';
import { CartPOM } from './POMClasses/CartPagePOM';
import { CheckoutPOM } from './POMClasses/CheckoutPagePOM';
import { AccountPOM } from './POMClasses/AccountPagePOM';

// test('Traditional Test', async ({ page }) => {
//   //Arrange
//   await page.goto('http://www.edgewordstraining.co.uk/webdriver2/');
//   await page.getByRole('link', { name: 'Login To Restricted Area' }).click();
//   //Act
//   await page.getByRole('row', { name: 'User Name?' }).locator('#username').click();
//   await page.getByRole('row', { name: 'User Name?' }).locator('#username').fill('edgewords');
//   await page.locator('#password').click();
//   await page.locator('#password').fill('edgewords123');
//   await page.getByRole('link', { name: 'Submit' }).click();
//   //Assert
//   await expect(page.locator('h1')).toContainText('Add A Record To the Database');
// });

// test('POM Test', async({page})=>{
//   await page.goto('http://www.edgewordstraining.co.uk/webdriver2/');
//   const home = new HomePOM(page);
//   await home.goLogin();
//   const auth = new AuthPOM(page);
//   await auth.login('edgewords','edgewords123');

// });


test('E2E Purchase with POM', async ({ page }) => { 
  await page.goto('https://www.edgewordstraining.co.uk/demo-site/');

  // My Account & Login
  const home = new HomePOM(page); //navigates to My Account
  await home.goToMyAccount(); //navigates to My Account
  const auth = new AuthPOM(page);
  await auth.login('hello@2itesting.co.uk', '12iTestingProject'); //logs in

  // Shop → Add Cap → View Cart
  const shop = new ShopPOM(page); //navigates to Shop
  await shop.goToShop(); //navigates to Shop
  await shop.addCapToCart(); //adds cap to cart
  await shop.goToCart(); //views cart

  // Checkout
  const cart = new CartPOM(page); //navigates to cart
  await cart.proceedToCheckout(); //proceeds to checkout
  const checkout = new CheckoutPOM(page);//navigates to checkout
  const orderNum = await checkout.completeOrder(); //completes order
  console.log(`Order Number: ${orderNum}`); //logs order number

  // Orders Page → Assert Order Number → Screenshot
  const account = new AccountPOM(page); //navigates to account
  await account.goToMyAccount(); //go to My Account
  await account.goToOrders(); //go to Orders
  await account.assertOrderNumber(orderNum); //assert order number
  await account.screenshotOrders('results/orders.png'); //screenshot orders

  // Logout
  await account.logout(); 
});
