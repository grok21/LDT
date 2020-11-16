const Sequelize = require('sequelize')
const db = require('../config/database')

const Worker = db.define('workercontrol', {
        idworker: {
            type: Sequelize.INTEGER
        },
        timeaction: {
            type: Sequelize.DATE
        }, 
        iswork: {
            type: Sequelize.INTEGER
        }, 
        geox: {
            type: Sequelize.STRING
        }, 
        geoy: {
            type: Sequelize.STRING
        },
    }, 
    {
        tableName: 'workercontrol', 
        createdAt: false,
        updatedAt: false
    }
)

module.exports = WorkerControl