import puppeteer from "puppeteer";

async function extract() {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://shop.mango.com/gb/women/skirts-midi/midi-satin-skirt_17042020.html?c=99');

    await page.screenshot({path: 'main.png'});

    browser.close();
}

extract();
