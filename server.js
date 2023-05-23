

const express = require('express') 
const app = express();   


app.listen(3000) 
app.set('view engine', 'ejs') 

console.log("this works"); 


//get initial page
app.get("/", (req, res) => {
    console.log("here") 
    res.render('index')
})

//index page routes 
const indexRouter = require('./routes/index') 
app.use('/index.html', indexRouter)


//about page routes
const about_pageRouter = require('./routes/about_page')
app.use('/about_page.html', about_pageRouter) 


const documentationRouter = require('./routes/documentation') 
app.use('/documentation.html',documentationRouter);


const sprintProgressRouter = require('./routes/sprintprogress') 
app.use('/sprintprogress.html', sprintProgressRouter)


