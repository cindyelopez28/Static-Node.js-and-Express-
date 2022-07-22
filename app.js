
//setting up server
const express = require('express');
const app = express();
const port = 5500;
// giving data array a variable name
const { projects } = require('./data.json');
// set up middleware
app.set('view engine', 'pug');
app.use('/static', express.static('public')); //Express to use the path /static to serve up all the files coming from the public folder
// "index" route is set up to render the homepage
app.get('/', (req, res) => {
    res.render('index', { projects });
})
// "about" route is set up to render the about page
app.get('/about', (req, res) => {
    res.render('about');
})
//project page
app.get("/projects/:id", (req, res, next) => {
    const id  = req.params.id;
    const project = projects[id];
    if (project) {
        res.render('project', { project });
    } else {
        const err = new Error();
        err.status = 404;
        err.message =  'The project you are looking for does not exist';
        throw err;
    }
})
// error handler
app.use((req,res, next)=>{
    const err = new Error();
    err.status = 404;
    err.message = 'Oops! Please check if you are using the correct URL!';
    console.log(err.message);
    next(err);
});
// global error handling
app.use((err,req,res,next)=>{
    err.status = err.status||500;
    err.message = err.message|| "There was a server error!";
    res.status(err.status);
    res.send(`Error Code: ${err.status}: ${err.message}`);
    console.log(err)
});
//port set up
app.listen(port, () => {
    console.log("Server Started...");
});