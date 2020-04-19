const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const { ensureAuthenticaticated } = require('../helpers/auth');


// Load Idea Model
require('../models/Idea');

const Idea = mongoose.model('ideas');


// Idea Index Page
router.get('/', ensureAuthenticaticated, (req, res) => {
    Idea.find({ user: req.user.id })
        .sort({ date: 'desc' })
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            });
        });
});

// Add Idea Form
router.get('/add', ensureAuthenticaticated, (req, res) => {
    res.render('ideas/add');
});

// Edit Idea Form
router.get('/edit/:id', ensureAuthenticaticated,  (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
        .then(idea => {
            if (idea.user !== req.user.id) {
                req.flash('error_msg', 'Not Authorized');

                res.redirect('/ideas');

            } else {
                res.render('ideas/edit', {
                    idea: idea
                });
            }
        });
});

// Add Form Process
router.post('/', (req, res) => {
    let errors = [];

    if (!req.body.title) {
        errors.push({ text: 'Please add a title' });
    }

    if (!req.body.details) {
        errors.push({ text: 'Please add a some details' });
    }

    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });

    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details,
            user: req.user.id
        };

        new Idea(newUser)
            .save()
            .then(idea => {
                req.flash('success_msg', 'Video idea added');

                res.redirect('/ideas');

                console.log('Insert Success');

                console.log(idea._doc);
            });
    }
});

// Edit Form Process
router.put('/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id,
    })
        .then(idea => {
            // New Values
            idea.title = req.body.title;
            idea.details = req.body.details;

            idea.save()
                .then(idea => {
                    req.flash('success_msg', 'Video idea updated');

                    res.redirect('/ideas');

                    console.log('Updated Success');

                    console.log(idea._doc);
                });
        })
});

// Delete Idea
router.delete('/:id', (req, res) => {
    Idea.remove({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Video idea removed');

            res.redirect('/ideas');

            console.log('Deleted Success');

            console.log(idea._doc);
        });
});


module.exports = router;