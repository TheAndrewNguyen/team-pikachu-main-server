const express = require("express") 
const router = express.Router(); 

router.get("/", (req, res) => {
    res.render("about_page"); 

})



module.exports = router;  