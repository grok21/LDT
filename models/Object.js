const Sequelize = require('sequelize')
const db = require('../config/database')

const Object = db.define('object', {
        objectname: {
            type: Sequelize.STRING
        },
        contract: {
            type: Sequelize.STRING
        }, 
        square: {
            type: Sequelize.DOUBLE
        }, 
        buildingpermit: {
            type: Sequelize.STRING
        }, 
        customer: {
            type: Sequelize.STRING
        }, 
        geo: {
            type: Sequelize.STRING
        },
        generalcontractor: {
            type: Sequelize.STRING
        }
    }, 
    {
        tableName: 'object',
        createdAt: false,
        updatedAt: false
    }
)

module.exports = Object