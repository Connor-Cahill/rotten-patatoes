const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/rotten-patatoes', { useNewUrlParser: true });
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
]
*/
//index//


app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})

// app.post('/reviews', (req, res)=> {
//     console.log(req.body);
//     res.render('reviews-new', {});
// })

//CREATE
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review);
        //redirect after review is saved
        res.redirect(`reviews/${review._id}`);
    }).catch((err) => {
        console.log(err.message);
    })
})

app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
        res.render('reviews-show', {review: review})
    }).catch((err) => {
        console.log(err.message);
    })
})





app.listen(3000, () => {
    console.log('App listening on port 3000!');
})
