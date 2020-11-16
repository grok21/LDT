const Sequelize = require('sequelize')
const config = require('config')

module.exports = new Sequelize(config.get('db_name'), config.get('db_user'), config.get('db_user_password'), {
    host: 'localhost', 
    dialect: 'postgres',
    operatorsAliases: 1,

    pool: {
        max: 5, 
        min: 0, 
        acquire: 30000, 
        idle: 10000
    }
})