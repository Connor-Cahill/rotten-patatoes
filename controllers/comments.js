
const Review = require('../models/reviews');
const Comment = require('../models/comment');


module.exports = function(app) {

///////Request payload shows my entry but console.log(req.body) is undefined///// looked in scripts.js and  route is setup properly
    ////// Create comment ///////
    app.post('/reviews/comments', (req, res) => {
        //res.send('reviews comment');
        Comment.create(req.body).then(comment => {
            //res.redirect(`/reviews/${comment.reviewId}`);
            res.status(200).send({comment: comment});
            // console.log(req.body);
            // console.log(comment.reviewId);

        }).catch((err) => {
            res.status(400).send({err: err})
            console.log(err.message);
        })
    })

//     app.delete('/reviews/:reviewId/comments/:id', function(req, res){
//         // console.log(req.params.id);
//         Comment.findOneAndDelete(req.params.id).then((comment) => {
//             console.log(comment.reviewId);
//             res.redirect(`movies/${review.movieId}/reviews/${req.params.reviewId}`);     ///was comment.reviewId
//         }).catch((err) => {
//             console.log(err.message);
//         })
//     })
//
// }    '/reviews/:reviewId/comments/:id'
app.delete('/reviews/:reviewId/comments/:id', function(req, res) {
    console.log('DELETE comment');
    Comment.findByIdAndRemove(req.params.id).then(comment => {
        res.status(200).send(comment);
    }).catch((err) => {
        console.log(error.message);
        res.status(400).send(err);
    })
});

}
