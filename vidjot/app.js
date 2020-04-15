const express = require('express');

const app = express();


// How Middleware Works
app.use((req, res, next) => {
    // console.log(Date.now());

    req.name = 'Dzulfikar Maulana';

    next();
});


// Index Route
app.get('/', (req, res) => {
    console.log(req.name);

    // res.send('INDEX');
    res.send(req.name);
});

// About Route
app.get('/about', (req, res) => {
    res.send('ABOUT');
});


const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});