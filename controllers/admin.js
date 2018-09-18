const Review = require('../models/reviews');
const Comment = require('../models/comment');

module.exports = function (app) {
    app.get('/admin', (req, res) => {
        Review.find().then(reviews => {
            res.render('admin', {reviews: reviews})
        }).catch(err => {
            console.log(err.message);
        })
    })

    app.delete('/admin/reviews/:id', (req, res) => {
        Review.findByIdAndRemove(req.params.id).then(review => {
            res.status(200).send(review);
        }).catch(err => {
            res.status(400).send(err);
        })
    })


}
