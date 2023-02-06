const puppeteer = require("puppeteer");
const fs = require('fs/promises');

async function extract() {
    
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1000 });
    await page.goto('https://shop.mango.com/gb/women/skirts-midi/midi-satin-skirt_17042020.html?c=99');

    await page.screenshot({path: 'asksForCookies.png'});

    // Accepts all cookies
    const cookieNotification = await page.waitForSelector('button#onetrust-accept-btn-handler', {timeout: 3000}); 
    await cookieNotification.click();
    await cookieNotification.dispose();

    
    await page.screenshot({path: 'asksForLang.png'});

    // Sets language option
    const lang = await page.waitForSelector('a.modalForm__langBtn.modalForm__langBtn2.focusElem.modalFormLangBtn.ga-collect', {timeout: 3000} );
    await lang.click();
    await lang.dispose();

    await page.screenshot({path: 'asksToSubscribe.png'});

    // discard subscription
    const subscription = await page.waitForSelector('#newsletterSubscriptionModal > div > button', {timeout: 3000} );
    await subscription.click();
    await subscription.dispose();

    await page.screenshot({path: "readyToExtract.png"});

    const productData = await page.evaluate(() =>{
        itemName = document.querySelector('#productDesktop > main > div > div.product-actions > div.product-features-prices > div > h1').textContent;
        itemPrice = document.querySelector('#productDesktop > main > div > div.product-actions > div.product-features-prices > span > div > span.Bc91B > span > span').textContent;
        ItemColor = document.querySelector('#productDesktop > main > div > div.product-actions > div.product-colors > div.colors-info > span').textContent;
        itemSizes = Array.from(document.querySelectorAll('#sizesContainer > div > ul li')).map(liItem => liItem.querySelector('button span').textContent);

        return [itemName, itemPrice, ItemColor, itemSizes]
    });

    browser.close();
    load(productData);
}

async function load (data) {
    let obj = transform(data);
    await fs.writeFile("clothes.json", obj);
}

function transform (data) {
    let pricing = data[1].split(' ')[1];

    let obj = {
        "name":data[0],
        "price": Number(pricing),
        "color": data[2],
        "size": data[3],
    }

    let item = JSON.stringify(obj);
    return item;
}

extract();
