const express = require('express')
const path = require('path')
const config = require('config')
const sequelize = require('./config/database')

const app = express()
app.use(express.json())

app.get('/', (req, res) => res.send('INDEX'))
app.use('/api/worker', require('./routes/worker'))
app.use('/api/object', require('./routes/object'))
app.use('/api/manager', require('./routes/manager'))


const PORT = config.get('port') || 5000



async function start() {
    try {
        await sequelize.authenticate()
        //await sequelize.sync({force: true}) 
        await sequelize.sync()
        app.listen(PORT, (err) => {
            if (err) { console.log(err) }
            else {console.log(`Server started on port ${PORT}...`)}
        })

    } catch (err) {
        console.log(err)
    }
}

start()