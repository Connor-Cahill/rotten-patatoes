
module.exports = function(app) {
    ////// NEW COMMENT ///////
    app.post('/reviews/comments', (req, res) => {
        //res.send('reviews comment');
        Comment.create(req.body).then(comment => {
            res.redirect(`/reviews/${comment.reviewId}`)
        }).catch((err) => {
            console.log(err.message);
        })
    })

}
