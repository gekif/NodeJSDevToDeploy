const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();


// Map Global Promise - Get Rid of Warning
mongoose.Promise = global.Promise;

// Connect to Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/vidjot-dev', {
    useMongoClient: true
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err)
);


// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');


// Index Route
app.get('/', (req, res) => {
    const title = 'Welcome';

    res.render('index', {
        title: title
    });
});

// About Route
app.get('/about', (req, res) => {
    res.render('about');
});


const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});