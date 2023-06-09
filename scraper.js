const fs = require('fs');

const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth());

async function scrapeAddress(url){
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(url,{waitUntil: 'networkidle0'});

    //wait for xpath
    await page.waitForXPath('//*[@id="grid"]');
    const [el]= await page.$x('//*[@id="grid"]');
    // console.log(el)
    const txt = await el.getProperty('textContent');
    const rawTxt = await txt.jsonValue(); 

    console.log({rawTxt}); 

    //save data to JSON file
    fs.writeFile('StockBuys.json', JSON.stringify(rawTxt), (err) => {
        if (err) throw err;
        console.log('File saved');
    });
    
    browser.close();

}

scrapeAddress('https://www.dataroma.com/m/g/portfolio.php?o=c');