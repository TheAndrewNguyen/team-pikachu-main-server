const puppeteer = require('puppeteer');
const delay = ms => new Promise(res => setTimeout(res, ms));

a();

async function a(){
  var delayTime=0*Math.random()
  webScraper(false,"eggplants", delayTime);
  //Write Derrick's product chooser here
  //
}

async function webScraper(fresh, productSearch, time) {
  await delay(time);
  console.log("waited "+ time + " milliseconds");
  if(productSearch==null){
    console.log("no product name");
    return(null);
  }
  const browser = await puppeteer.launch({headless: false});
  
  const page = await browser.newPage();
  
  // Navigate to an Amazon search results page
    if(fresh==true){
      console.log("https://www.amazon.com/s?k="+productSearch+"&i=amazonfresh&crid=EWTB39KVP1JN&sprefix="+productSearch+"%2Camazonfresh%2C171&ref=nb_sb_noss_1")
      await page.goto("https://www.amazon.com/s?k="+productSearch+"&i=amazonfresh&crid=EWTB39KVP1JN&sprefix="+productSearch+"%2Camazonfresh%2C171&ref=nb_sb_noss_1");
    } else{
      console.log("//www.amazon.com/s?k="+productSearch)
    await page.goto("https://www.amazon.com/s?k="+productSearch);
    }
    

  // Wait for the search results to load
  await page.waitForSelector('[data-asin]');

  // Extract the prices of all search result items
  const prices = await page.$$eval('[data-asin]', (elements) => {
    return elements.map((element) => {
      const name= element.querySelector('.a-size-base-plus')
      const priceElement = element.querySelector('.a-price-whole');
      const priceFraction = element.querySelector('.a-price-fraction');
      const pricePerUnit = element.querySelector('.a-size-base.a-color-secondary')
      if(name!=null && priceElement!=null){
        let result=[];
        result.push([name.textContent, priceElement.textContent + priceFraction.textContent, pricePerUnit. textContent]);
        return result;
      }
    });
  });

  console.log(prices)
  return prices;
  
};
