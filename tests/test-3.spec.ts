import { test, expect } from '@playwright/test';

test.beforeAll(async () => {
    console.log('Runs once before any tests get to execute in this file')
})

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.google.com');
    console.log('Runs before each and every test in this file')
})

test.afterEach(async ({ page }) => {
    await page.goto('https://www.google.com');
    console.log("Runs after each and every test in this file")
})

test.afterAll(() => {
    console.log("Runs just before exiting this file")
})

test.describe("Suite 1", () => {
    test.beforeEach(async ({ page }) => {
        console.log('Runs before eachtest in this describe()')
    })

    test.setTimeout(0);
    test("Capturing values", async ({ page }) => {
        test.setTimeout(0); //Workaround PW v1.55 debugging issue
        await page.goto("https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html");
        await page.locator('#textInput').fill("Hello World");

        let textPromise = page.locator('#right-column').textContent();
        console.log("Without 'await'ing textContent() you get a 'promise' of the future text, not the actual text");
        console.log(await textPromise);

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
            console.log(typeof (elm)) //Writes to browser's console! Not NodeJS console.
        });

        expect(textBoxText).toBe("Hello World");
        await expect(page).toHaveTitle("Forms", { timeout: 5000 }) //Override global config with a custom expect timeout
    });
    test.describe("Inner suite", () => {
        test.skip("Generic methods", async ({ page }) => {
            test.setTimeout(0); //Workaround PW v1.55 debugging issue
            await page.goto("https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html")

            const menuLinks = await page.$$eval('#menu a', (links) => links.map((link) => link.textContent))
            console.log(`There are ${menuLinks.length} links`)

            console.log("The link texts are:")

            for (const iterator of menuLinks) {
                console.log(iterator?.trim())
            }

            //Preferred - using retry-able Playwright locators
            const preferredLinks = await page.locator('#menu a').all();
            for (const elm of preferredLinks) {
                // const elmtext = await elm.textContent();
                // const elmtexttrimmed = elmtext?.trim();
                console.log(`${await elm.textContent().then(text => { return text?.trim() })}`)
            }
        })

        test('Waits @RunMe', async ({ page }) => {
            test.setTimeout(15000); //Override global config test time out for just this test
            page.setDefaultTimeout(7000); //Actions in this test get 7 seconds
            await page.goto('http://www.edgewordstraining.co.uk/webdriver2/');
            await page.getByRole('link', { name: 'Access Basic Examples Area' }).click();
            await page.getByRole('link', { name: 'Dynamic Content' }).click();

            await page.pause();

            await page.locator('#delay').click();
            await page.locator('#delay').fill('10');
            await page.getByRole('link', { name: 'Load Content' }).click();
            //await page.locator('#image-holder > img').click({timeout: 5000}); //Local action timeout override
            //Explicit wait for the apple
            //await page.locator('#image-holder > img').waitFor({timeout: 12000});
            await page.locator('img').waitFor({ state: 'hidden', timeout: 12000 }); //Wait for the 'spinner' to go away
            await page.locator('#image-holder > img').click();
            await page.getByRole('link', { name: 'Home' }).click();
        })
    })

})


test("Waiting for a pop up window", async ({ page, context }) => {

    await page.goto("https://www.edgewordstraining.co.uk/webdriver2/docs/dynamicContent.html")

    //[a,b] = [10,20] - aray destructuring syntax will assign a=10 b=20
    //Below we discard the second promise return value - we only need the first which gets us a handle to the new page
    const [newSpawnedPage] = await Promise.all([ //When these two "future" actions complete return the new page fixture
        context.waitForEvent('page'),
        page.locator("#right-column > a[onclick='return popUpWindow();']").click()
    ])

    await page.waitForTimeout(2000); //Thread.sleep(2000);


    const closeBtn = newSpawnedPage.getByRole('link', { name: 'Close Window' }) //Fx closes the pop up here?
    await closeBtn.click();

    await page.getByRole('link', { name: 'Load Content' }).click();

})