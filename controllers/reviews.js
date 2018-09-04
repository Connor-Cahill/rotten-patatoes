const Review = require('../models/reviews');
const Comment = require('../models/comment.js');

module.exports = function(app) {
    //index//
    app.get('/', (req, res) => {
        Review.find()
        .then(reviews => {
            res.render('reviews-index', { reviews: reviews });
        }).catch(err => {
            console.log(err);
        })
    })

    app.get('/reviews/new', (req, res) => {
        res.render('reviews-new');
    });

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

/*    app.get('/reviews/:id', (req, res) => {
        Review.findById(req.params.id).then((review) => {
            res.render('reviews-show', {review: review})
        }).catch((err) => {
            console.log(err.message);
        })
    }) *///// old app.get for displaying single review by ID ////

    //display single review and comments by ID/////
    app.get('/reviews/:id', (req, res) => {
        //find review //
        Review.findById(req.params.id).then(review => {
            Comment.find({reviewId: req.params.id}).then(comments => {
                res.render('reviews-show', {review: review, comments: comments})
            })
        }).catch((err) => {
            console.log(err.message)
        });
    });
    


    //Edit////////////
    app.get('/reviews/:id/edit', function(req, res) {
        Review.findById(req.params.id, function(err, review) {
            res.render('reviews-edit', {review: review});
        })
    })

    ///update //////////
    app.put('/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
            res.redirect(`/reviews/${review._id}`);
        }).catch(err => {
            console.log(err.message);
        })
    })

    //DELETE /////////
    app.delete('/reviews/:id', function(req, res) {
        console.log('DELETE review')
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })


}
