import { test, expect } from '@playwright/test';
 
test("Capturing values", async ({ page }) => {
    test.setTimeout(0); //Workaround PW v1.55 debugging issue
    await page.goto("https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html");
    await page.locator('#textInput').fill("Hello World");
 
    let textPromise = page.locator('#right-column').textContent();
    console.log("Without 'await'ing textContent() you get a 'promise' of the future text, not the actual text");
    console.log(textPromise);
 
    let rightColText = await page.locator('#right-column').textContent(); //Includes whitespace in HTML file
 
    console.log("The right column text is with textContent is: " + rightColText);
 
    rightColText = await page.locator('#right-column').innerText(); //Captures text after browser layout has happened (eliminating most whitespace)
 
    console.log("The right column text is with innertext is: " + rightColText);
 
    let textBoxText: string = await page.locator('#textInput').textContent() ?? ""; //TS: if textContent() returns null, retuen empty string "" instead
    console.log("The text box contains" + textBoxText); //blank as <input> has no inner text
 
    //Using generic $eval to get the browser to return the INPUT text
    //This will *not* retry or wait
    textBoxText = await page.$eval('#textInput', (el: HTMLInputElement) => el.value); //el is an in browser HTML element - not a Playwright object at all.
    console.log("The text box actually contains: " + textBoxText);
 
    await page.$eval('#textInput', elm => {
        console.log(typeof(elm))
    });//In browser - shows 'object' as it's a DOM element
 
    expect(textBoxText).toBe("Hello World");//Just to show we can assert here if we want
    
});
 
test("Generic methods", async ({ page }) => {
    test.setTimeout(0); //Workaround PW v1.55 debugging issue
    await page.goto("https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html")
 
    const menuLinks = await page.$$eval('#menu a', (links) => links.map((link) => link.textContent))//Will not retry or wait
    console.log(`There are ${menuLinks.length} links`)//Should be 5
 
    console.log("The link texts are:")//Includes whitespace in HTML file
 
    for (const iterator of menuLinks) {
        console.log(iterator?.trim())
    }
 
    //Preferred - using retry-able Playwright locators
    const preferredLinks = await page.locator('#menu a').all();
    for (const elm of preferredLinks) {
        // const elmtext = await elm.textContent();
        // const elmtexttrimmed = elmtext?.trim();
        console.log(`${await elm.textContent().then(text => { return text?.trim() })}`)//Chained .then() to trim text
    }
});

test('Waits', async ({page})=>{
    await page.goto('http://www.edgewordstraining.co.uk/webdriver2/'); 
    await page.getByRole('link', { name: 'Access Basic Examples Area' }).click(); //Waits for navigation by default
    await page.getByRole('link', { name: 'Dynamic Content' }).click(); //Waits for navigation by default
    await page.locator('#delay').click(); //Waits for element to be ready
    await page.locator('#delay').fill('10'); 
    await page.getByRole('link', { name: 'Load Content' }).click();
    //await page.locator('#image-holder > img').waitFor({timeout: 12000});//Explicit wait - not usually needed
    await page.locator('#image-holder > img').click();
    await page.getByRole('link', { name: 'Home' }).click(); //Waits for navigation by default
});
 
test("Waiting for a pop up window", async ({ page, context }) => {
    test.setTimeout(0); //Workaround PW v1.55 debugging issue
    await page.goto("https://www.edgewordstraining.co.uk/webdriver2/docs/dynamicContent.html")
 
    //[a,b] = [10,20] - aray destructuring syntax will assign a=10 b=20
    //Below we discard the second promise return value - we only need the first which gets us a handle to the new page
    const [newSpawnedPage] = await Promise.all([ //When these two "future" actions complete return the new page fixture
        context.waitForEvent('page'),//Waits for a new page (tab or window) to be opened
        page.locator("#right-column > a[onclick='return popUpWindow();']").click()//This action spawns a new page (tab or window)
    ])
 
    await page.waitForTimeout(2000); //Thread.sleep(2000);
 
 
    const closeBtn = newSpawnedPage.getByRole('link', { name: 'Close Window' }); //closes the newly opened popup //Not working in Firefox?
    await closeBtn.click();//closes the newly opened popup //Not working in Firefox?
 
    await page.getByRole('link', { name: 'Load Content' }).click();//Back to original page and click a link
 
});
