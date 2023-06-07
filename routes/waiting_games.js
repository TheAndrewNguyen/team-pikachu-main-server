

const express = require("express") 
const router = express.Router(); 
router.use(express.static('/public'));


router.get("/", (req,res) => {
    res.render("waiting_games");



}) 

router.get("/tennis", (req, res) => {
    res.render("tennis")
})

router.get("/tetris", (req, res) => {  
    console.log("we geting called") 
    res.render("tetris") 

})

router.get("/blocks", (req,res) => {
    res.render("blocks"); 



}) 


module.exports = router;  