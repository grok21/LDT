const Sequilize = require('sequelize')
const db = require('../config/database')

const Gig = db.define('gig', {
    title: {
        type: Sequilize.STRING
    },
    technologies: {
        type: Sequilize.STRING
    },
    description: {
        type: Sequilize.STRING
    },
    budget: {
        type: Sequilize.STRING
    },
    contact_email: {
        type: Sequilize.STRING
    }
})

module.exports = Gig
