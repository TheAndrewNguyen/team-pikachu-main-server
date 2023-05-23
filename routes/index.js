


const express = require("express") 
const router = express.Router(); 

router.get("/", (req, res) => {
    res.render("index"); 

})


//post request for the fourm
router.post("/WebScraperResult", (req, res) => {
    //res.render("WebScraperResult") 
    res.send("yolo") 

}) 



module.exports = router;  
