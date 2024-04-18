const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

const User = require('../../models/User');

router.put('/:id', bodyParser.json(), (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then((user) => res.json({ msg: 'Updated user successfully' }))
        .catch((err) => res.status(400).jason({ error: 'Unable to update the Databse' }));
});

router.put('/', (req, res) => {
    res.json({error: "No ID was supplied. What item should be updated?"})
 });

 router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((user) => {res.json({ msg: "Item was deleted successfully."})})
        .catch((err) => res.status(404).json({ error: "No such item exists."}));
});

router.get('/', (req, res) => {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ noitemsfound: "No items found."}));
});

router.post('/', bodyParser.json(), (req, res) => {
    User.create(req.body)
    .then((user) => res.json({ msg: 'USer added successfully!'}))
    .catch((err) => res.status(400).json({ error: 'Unable to add this item' + err}));
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .then((user) => {res.json(user)})
    .catch((err) => res.status(404).json({ noitemfound: "No user found." }));
});

module.exports = router;