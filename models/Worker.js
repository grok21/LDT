const Sequelize = require('sequelize')
const db = require('../config/database')

const Worker = db.define('worker', {
        login: {
            type: Sequelize.STRING
        },
        workername: {
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
        }, 
        iswork: {
            type: Sequelize.INTEGER
        }
    }, 
    {
        tableName: 'worker', 
        createdAt: false,
        updatedAt: false
    }
)

module.exports = Worker