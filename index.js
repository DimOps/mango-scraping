import puppeteer from "puppeteer";

async function extract() {
    
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 400,
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

    browser.close();
}

extract();
