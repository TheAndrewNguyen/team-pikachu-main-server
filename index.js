const axios = require("axios");
const cheerio = require("cheerio");
const rateLimit = require("axios-rate-limit");

const fetchProducts = async () => {
    try {
        //rate limiting
        const http = rateLimit(axios.create(), { maxRequests: 2, perMilliseconds: 1000 });
        const response = await http.get('https://www.amazon.com/s?k=apples&crid=2LDIN9NC6PGCK&sprefix=apples%2Caps%2C182&ref=nb_sb_noss_1');
        const html = response.data;
        const $ = cheerio.load(html);
        
        
        const products = [];
        const prices=[];

        
 
    $('div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20').each((_idx, el) => {
        
        
        const product = $(el)
        const title = product.find('span.a-size-base-plus.a-color-base.a-text-normal').text()
        const price = product.find('span.a-price > span.a-offscreen').text()
        let element = {
            title,
            price,
        }
        products.push(element)
    });
       return products;

   } catch (error) {
       throw error;
   }
};

fetchProducts().then((products) => console.log(products));