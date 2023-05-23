

const express = require("express") 
const router = express.Router(); 

router.get("/", (req, res) => {
    res.render("WebScraperResult")
})

router.post("/", (req, res) => {
    res.render("WebScraperResult") 

})



module.exports = router;  