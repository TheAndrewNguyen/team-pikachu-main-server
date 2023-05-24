

const express = require("express") 
const router = express.Router(); 
const bodyParser = require('body-parser') //to parse data 

const algorithm = require("./algorithm.js")


router.use(bodyParser.urlencoded({ extended: true })) 
router.use(bodyParser.json())


router.get("/", (req, res) => {
    res.render("WebScraperResult")
})

router.post("/", async (req, res) => {  
    const item_name = req.body.item_name;  
    const price = await algorithm(item_name); 
    console.log(price); 

    const link = "https://www.amazon.com/s?k=" + item_name + "&i=amazonfresh&crid=EWTB39KVP1JN&sprefix=" + item_name + "%2Camazonfresh%2C171&ref=nb_sb_noss_1";
    //list of things need to be rendered 
    const render_items = {
        item_requested: item_name, 
        price: price,    
        link: link
    }

    res.render("WebScraperResult", render_items) //pass through render items  
    
})

module.exports = router;  

