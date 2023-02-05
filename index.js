import puppeteer from "puppeteer";

async function extract() {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://shop.mango.com/gb/women/skirts-midi/midi-satin-skirt_17042020.html?c=99');

    await page.screenshot({path: 'asksForCookies.png'});

    // Accepts all cookies
    const cookieNotification = await page.waitForSelector('button#onetrust-accept-btn-handler', {timeout: 3000}); 
    await cookieNotification.click();
    await cookieNotification.dispose();

    await delay(3000);
    await page.screenshot({path: 'asksForLang.png'});

    // Sets language option
    const lang = await page.waitForSelector('a.modalForm__langBtn.modalForm__langBtn2.focusElem.modalFormLangBtn.ga-collect', {timeout: 3000} );
    await lang.click();
    await lang.dispose();

    await page.screenshot({path: 'asksForEmpty.png'});
    
    
    browser.close();
}

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

extract();
