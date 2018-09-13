const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb(process.env.SECRET_KEY)
const Review = require('../models/reviews');
const Comment = require('../models/comment');



module.exports = function(app) {

    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            res.render('movies-index', {movies: response.results});
        }).catch((err) => {
            console.log(err.message);
        })
    })

    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({id: req.params.id}).then(movie => {
            if (movie.video){
                moviedb.movieVideos({ id: req.params.id}).then(videos => {
                    movie.trailer_youtube_id = videos.results[0].SECRET_KEY
                    renderTemplate(movie)
                })
            } else {
                renderTemplate(movie)
            }
            //res.render('movies-show', {movie: movie});
            function renderTemplate(movie) {
                Review.find({movieId: req.params.id}).then(reviews => {
                    console.log(reviews);
                    console.log('-----------');
                    console.log(movie);
                    res.render('movies-show', {movie: movie, reviews: reviews});
                })
            }
        }).catch(console.error)
    })


}
