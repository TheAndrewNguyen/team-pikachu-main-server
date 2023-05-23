

const express = require('express') 
const app = express();   


app.listen(3000) 
app.set('view engine', 'ejs') 



//get initial page
app.get("/", (req, res) => {
    console.log("here") 
    res.render('index')
})  


//index page routes 
const indexRouter = require('./routes/index') 
app.use('/index', indexRouter)


//about page routes
const about_pageRouter = require('./routes/about_page')
app.use('/about_page', about_pageRouter) 

//documentation route
const documentationRouter = require('./routes/documentation') 
app.use('/documentation',documentationRouter);

//Sprint progress route 
const sprintProgressRouter = require('./routes/sprintprogress') 
app.use('/sprintprogress', sprintProgressRouter)



//WebScraper result page 
const WebScraperResultRouter = require('./routes/WebScraperResult') 
app.use('/WebScraperResult', WebScraperResultRouter)