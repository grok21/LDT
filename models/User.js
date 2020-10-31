const Sequelize = require('sequelize')
const db = require('../config/database')

const User = db.define('user', {
    login: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }, 
    geo: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    }
}, {tableName: 'users'})

module.exports = User
