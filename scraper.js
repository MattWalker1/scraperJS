const fs = require('fs');

const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth());

async function scrapeAddress(url){
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(url, { timeout: 60000 }); // Set timeout to 60 seconds

    //wait for xpath
    await page.waitForXPath('/html/body/div[2]/div/table/tbody/tr/td/div[2]');
    const [el]= await page.$x('/html/body/div[2]/div/table/tbody/tr/td/div[2]');
    // console.log(el)
    const txt = await el.getProperty('textContent');
    const rawTxt = await txt.jsonValue(); 

    console.log({rawTxt}); 

    //save data to 'StockBuys.json' file
    fs.writeFile('StockBuys.json', JSON.stringify(rawTxt), (err) => {
        if (err) throw err;
        console.log('Data has been saved inside StockBuys.json');
    });

    browser.close();

}

scrapeAddress('https://finviz.com/');

