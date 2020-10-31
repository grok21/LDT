const {Router} = require('express')
const User = require('../models/User')
const sequelize = require('../config/database')

const router = Router()

router.post('/register', async (req, res) => {
    try {
        const {login, password} = req.body
        const candidate = await User.findAll({where: {login: login}})

        if (!candidate) {
            User.create({login, password})
            res.send(200)
        } else {

        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const candidate = await User.findAll({where: {login: req.body.login}})
        
        if (candidate) {
            res.status(200).json({message: 'user exists'})
        } else {
            res.status(500).json({message: 'user doesn\'t exist'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server error'})
    }
})

router.get('/', async (req, res) => {
    try {
        //const users = await User.findOne( {where: {login: 'user3'}} )
        const users = await User.findAll()
        //console.log(users[0]['geo'])
        
        res.send(users).status(200)
    } catch (err) {
        console.log(err)
    }
})

router.get('/update', async (req, res) => {
    try {

        /*
        const user = await User.findOne( {where: {login: 'user2'}} )
        user['geo'].push('geo5')
        console.log(user['geo'])

        await User.update(
            {geo: user['geo']}, 
            {where: {login: user['login']}}
        )
        */
        res.status(200).redirect('/auth')
    } catch (e) {
        console.log(e)
    }
})

router.get('/adduser', (req, res) => {
    const data = {
        login: 'user2',
        password: '1234', 
        geo: [
            'geo1', 
            'geo2', 
            'geo3'
        ]
    }

    let {login, password, geo} = data

    User.create({login, password, geo})
        .then(res.redirect('/gigs'))
        .catch(err => console.log)

})

module.exports = router