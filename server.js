
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });

//set-up static directories 
//we can use static files
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=> {
    return new Date().getFullYear()
});

//register a handler for urls
//the function to run who sends the request
app.get('/',(req,res)=>{
    //respond to the request by sending data back
    //res.send('<h1>hello Express</h1>');
    res.send({
        name: 'Michael',
        likes: [
            'biking',
            'Cities',
        ]
    });
});
app.get('/about', (req, res)=>{
    res.render('about.hbs', {
      pageTitle: 'About Page'
    });
});


app.listen(3000,()=> {
    console.log('Server is up on port 3000');
});

