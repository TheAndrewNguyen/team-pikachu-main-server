

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

    //list of things need to be rendered 
    const render_items = {
        item_requested: item_name, 
        price: price
    }

    res.render("WebScraperResult", render_items) //pass through render items  
    
})

module.exports = router;  

