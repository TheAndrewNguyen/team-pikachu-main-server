const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
    const searchWord = 'apples';

	await page.goto('https://www.amazon.com/');

	await page.type('#twotabsearchtextbox', searchWord);
	await page.click('.nav-search-submit .nav-input');
	await page.waitForSelector('.s-result-item');
    
    const results = await page.evaluate(() => {
        const items = document.querySelectorAll('.s-result-item');
        return Array.from(items).map(item => {
          return {
            title: item.querySelector('h2').innerText,
            price: item.querySelector('.a-price .a-offscreen').innerText,
            image: item.querySelector('img').src,
            link: item.querySelector('a').href,
          }
        });
      });
      console.log(results);
      
})();