const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Gig = require('../models/Gig')

router.get('/', (req, res) => 
    Gig.findAll()
        .then(gigs => {
            console.log(gigs)
            res.send(gigs).sendStatus(200)
        })
        .catch(err => console.log(err))
)

router.get('/add', (req, res) => {
    const data = {
        title: 'Looking for a php developer', 
        technologies: 'react, javascript, html, css',
        budget: '$1.000',
        description: 'abcde', 
        contact_email: 'user1@gmail.com'
    }

    let {title, technologies, budget, description, contact_email} = data

    // Insert into table
    Gig.create({title, technologies, description, budget, contact_email})
        .then(gig => res.redirect('/gigs'))
        .catch(err => console.log(err))
})

module.exports = router