const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const sequelize = require('./config/database')


const app = express()
app.use(express.json())


app.get('/', (req, res) => res.send('INDEX'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000



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