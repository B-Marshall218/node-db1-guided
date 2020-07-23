const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    // SELECT * FROM posts; 
    db.select("*")
        .from("posts")
        .then((postsArray) => res.status(200).json({ data: postsArray }))
        .catch(err => console.log(err))
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    //SELECT * FROM posts WHERE id = id
    db("posts")
        // .where("id", "=", id)
        // .where({id:id})
        .where("id", id)
        .first()  //when you know theres only one item
        .then(post => res.status(200).json({ data: post }))
        .catch((err) => { console.log(err) })

});

router.post('/', (req, res) => {
    const postData = req.body;
    // INSERT INTO posts (fields) VALUES (values...)
    db("posts")
        .insert(postData)
        .then(id => res.json(201).json({ data: id }))
        .catch((err) => { console.log(err) })
});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;