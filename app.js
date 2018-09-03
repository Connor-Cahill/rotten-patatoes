const express = require('express');
const methodOverride = require('method-override')
const app = express();
var exhbs = require('express-handlebars');
const bodyParser = require('body-parser');
const reviewController = require('./controllers/reviews')
const port = process.env.PORT || 5000;

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true}));

app.engine('handlebars',exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

reviewController(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
})
