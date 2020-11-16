const Sequelize = require('sequelize')
const db = require('../config/database')

const Manager = db.define('manager', {
        login: {
            type: Sequelize.STRING
        },
        managername: {
            type: Sequelize.STRING
        },
        hashpass: {
            type: Sequelize.STRING
        }, 
        token: {
            type: Sequelize.STRING
        }, 
        phone: {
            type: Sequelize.STRING
        }, 
        idobject: {
            type: Sequelize.INTEGER
        }
    }, 
    {
        tableName: 'manager', 
        createdAt: false,
        updatedAt: false
    }
)

module.exports = Manager