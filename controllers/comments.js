
module.exports = function(app) {
    ////// NEW COMMENT ///////
    app.post('/reviews/comments', (req, res) {
        res.send('reviews comment');
    })

}
