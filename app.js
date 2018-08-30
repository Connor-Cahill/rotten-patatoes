const express = require('express');
const app = express();
var exhbs = require('express-handlebars');

app.engine('handlebars',exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/*
app.get('/', (req, res) => {
    res.render('home', {msg: 'Hello World!'});
}) */

//mock array of projects
let reviews = [
    {title: 'Great Review'},
    {title: 'Next Review'}
]

//index//
app.get('/', (req, res) => {
    res.render('reviews-index', {reviews: reviews});
})




app.listen(3000, () => {
    console.log('App listening on port 3000!');
})
