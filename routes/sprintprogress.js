

const express = require("express") 
const router = express.Router(); 

router.get("/", (req, res) => {
    res.send("this works better")
})





module.exports = router;  