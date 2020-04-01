const express = required('express');
const users = express.Router();
const User = require('../models/user.js');

// GET USER
users.get('/:id', (req,res) => {
    User.findById(req.params.id, (err,foundUser) => {
        if(err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(foundUser)
    })
})

// CREATE NEW USER
users.post('/', (req,res) => {
    User.create(req.body, (error, createdUser) => {
        if(error) {
            res.status(400).json({error: error.message})
        }
        res.status(200).json(createdUser)
    })
})

// DELETE USER
users.delete('/:id', (req,res) => {
    User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
        if(err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(deletedUser);
    })
})

// ADD TO USER FAVORITES LIST
users.put('/edit/:id', (req,res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
        if (err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(updatedUser)
    })
})


module.exports = users;