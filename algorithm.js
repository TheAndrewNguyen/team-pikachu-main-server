

//Andrew here: this function serves to process the data and call the function
function receive_data() {

    var user_input = document.getElementByID("User_input")

    var result = algorithm(input)  
    

    //sends code to display function that will output it
    display(user_input, result) 

} 

//display function to the html need a different function
function display(item_name, item_price) {
    
    





}



function substring(keywords, start, end) {

    var result = keywords[start];

    for (var i = start + 1; i < start + end; i++) {

        result += " " + keywords[i];

    }

    return result;

}

async function algorithm(input) { //Finds the most likely product to match with a user input by checking matching words, substrings, etc.

    var args = input.split(";");

    var results = [];

    for (var i = 0; i < args.length; i++) {

        var search = await webScraper(args[i]);

        var matching = [];

        var keywords = args[i].split(" ");

        var maxIndex = 0;

        var maxScore = 0;

        for (var j = 0; j < search.length; j++) {

            if (search[j] == null) {

                continue;

            }

            matching[j] = 1.0 / search[j].length;

        }

        for (var j = 0; j < keywords.length; j++) {

            for (var k = 0; k < search.length; k++) {

                if (search[k] == null) {

                    continue;

                }

                if (search[k].toUpperCase().includes(keywords[j].toUpperCase())) {

                    matching[k]++;

                    if (matching[k] > maxScore) {

                        maxScore = matching[k];

                        maxIndex = k;

                    }

                }

            }

        }

        for (var j = keywords.length - 1; j > 0; j--) {

            for (var k = 0; k < j; k++) {

                for (var l = 0; l < search.length; l++) {

                    if (search[l] == null) {

                        continue;

                    }

                    if (search[l].toUpperCase().includes(substring(keywords, k, keywords.length + j - 1).toUpperCase())) {

                        matching[l] += keywords.length - j + 1;

                        if (matching[l] > maxScore) {

                            maxScore = matching[l];

                            maxIndex = l;

                        }

                    }

                }

            }

        }

        results[i] = search[maxIndex];

    }

    for (var i = 0; i < results.length; i++) {

        console.log(results[i]);

    }

    return results;

}

//All code below is Minghan's, but is required for my part to function.

const puppeteer = require('puppeteer');

var results = algorithm("1 lb hamburger;2 cubes beef bouillion;1 can tomato sauce 8 oz;1 can tomato paste 6 oz;pepper to taste,2 cups hot water;2 teaspoon sugar;1/2 teaspoon dried basil;1/2 teaspoon dried oregano;dash of garlic;16 oz spaghetti noodles");

async function webScraper(productSearch) {

    if (productSearch == null) {

        //console.log("no product name");

        return (null);

    }

    const browser = await puppeteer.launch({ headless: false });






    const page = await browser.newPage();

    const itemNames = [];

    itemNames.push(productSearch)






    // Navigate to an Amazon search results page




    for (let i = 0; i < itemNames.length; i++) {

        await page.goto("https://www.amazon.com/s?k=" + itemNames[i] + "&i=amazonfresh&crid=JV7RYRCN3LM&sprefix=apple%2Camazonfresh%2C157&ref=nb_sb_noss_1");




        // Wait for the search results to load

        await page.waitForSelector('[data-asin]');




        // Extract the prices of all search result items

        const prices = await page.$$eval('[data-asin]', (elements) => {

            return elements.map((element) => {

                const name = element.querySelector('.a-size-base-plus')

                const priceElement = element.querySelector('.a-price-whole');

                const priceFraction = element.querySelector('.a-price-fraction');

                if (name != null && priceElement != null) {

                    return name.textContent + ' ------- ' + priceElement.textContent + priceFraction.textContent

                }

            });

        });




        console.log(prices)

        return prices;

    }



};