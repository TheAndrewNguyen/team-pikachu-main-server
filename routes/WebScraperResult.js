

const express = require("express") 
const router = express.Router(); 
const bodyParser = require('body-parser') 


router.use(bodyParser.urlencoded({ extended: true })) 
router.use(bodyParser.json())


router.get("/", (req, res) => {
    res.render("WebScraperResult")
})

router.post("/", (req, res) => {  
    const item_name = req.body.item_name;  

    res.render("WebScraperResult", {item_requested: item_name}) 

    



})



module.exports = router;  