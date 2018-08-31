const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-patatoes', { useNewUrlParser: true });
var exhbs = require('express-handlebars');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.engine('handlebars',exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    rating: Number
});

app.get('/', (req, res) => {
    Review.find()
    .then(reviews => {
        res.render('reviews-index', { reviews: reviews });
    }).catch(err => {
        console.log(err);
    })
})

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


app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})

app.post('/reviews', (req, res)=> {
    console.log(req.body);
    res.render('reviews-new', {});
})

//CREATE
app.post('/reviews/new', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review);
        //should redirect to home route... currently not working
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})





app.listen(3000, () => {
    console.log('App listening on port 3000!');
})
