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
}
