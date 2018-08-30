const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodc://localhost/rotten-patatoes', {useMongoClient: true});
var exhbs = require('express-handlebars');

app.engine('handlebars',exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const Review = mongoose.model('Review', {title: String});


/*
app.get('/', (req, res) => {
    res.render('home', {msg: 'Hello World!'});
}) */

//mock array of projects
/*let reviews = [
    {title: 'Great Review'},
    {title: 'Next Review'}
]*/

//index//
app.get('/', (req, res) => {
    Review.find()
    .then(reviews => {
        res.render('reviews-index', {reviews: reviews});
    })
    .catch(err => {
        console.log(err);
    })
})




app.listen(3000, () => {
    console.log('App listening on port 3000!');
})
