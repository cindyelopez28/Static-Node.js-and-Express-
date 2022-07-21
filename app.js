const express = require('express');
const app = express();
const port = 5500;

const { projects } = require('./data.json');

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { projects });
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/project/:id', (req, res) => {
    let project = data.projects.find(function (project){
        return project.id == req.params.id
    })
    if (project) {
        res.render('project', {id:req.params.id, project})
    } else {
        const err = new Error();
        err.status = 404;
        err.message =  'The project you are looking for does not exist';
        throw err;
    }
})

app.use((req,res, next)=>{
    const err = new Error();
    err.status = 404;
    err.message = 'Oops! Please check if you are using the correct URL!';
    console.log(err.message);
    next(err);
});

app.use((err,req,res,next)=>{
    err.status = err.status||500;
    err.message = err.message|| "There was a server error!";
    res.status(err.status);
    res.send(`Error Code: ${err.status}: ${err.message}`);
    console.log(err)
});

app.listen(port, () => {
    console.log("Server Started...");
});