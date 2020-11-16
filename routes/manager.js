const {Router} = require('express')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const config = require('config')
const Manager = require('../models/Manager')
const Worker = require('../models/Worker')
const auth = require('../middleware/authManager')

const router = Router()

router.post('/register', async (req, res) => {
    try {
        const candidate = await Manager.findOne({where: {login: req.body.login}})

        if (!candidate) {
            const new_candidate = req.body
            const hashpass = await argon2.hash(req.body.hashpass)
            const token = jwt.sign(
                {login: new_candidate['login']},
                config.get('jwtSecret')
            )
            new_candidate['token'] = token
            new_candidate['hashpass'] = hashpass
            Manager.create(new_candidate)

            res.status(200).json({token: token, message: 'Manager created'})
        } else {
            res.status(500).json({message: 'Manager exists'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

router.post('/login', async (req, res) => {
    try {
        const candidate = await Manager.findOne({where: {login: req.body.login}})
        
        if (candidate) {
            if (await argon2.verify(candidate['hashpass'], req.body.hashpass)) {
            //if (candidate['hashpass'] === req.body.hashpass) {
                const token = jwt.sign(
                    {login: candidate['login']},
                    config.get('jwtSecret')
                )

                await Manager.update(
                    {token: token}, 
                    {where: {login: candidate['login']}}
                )

                res.status(200).json({token, message: 'Login'})
            } else {
                res.status(500).json({message: 'Password incorrect'})
            }
        } else {
            res.status(500).json({message: 'Manager doesn\'t exist'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        const candidate = await Manager.findOne({where: {login: req.body.login}})
        
        if (candidate) {
            const token = null

            await Manager.update(
                {token: token}, 
                {where: {login: candidate['login']}}
            )

            res.status(200).json({message: 'Manager logout'})
        } else {
            res.status(500).json({message: 'Manager doesn\'t exist'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

router.get('/get-my-info', auth, async (req, res) => {
    try {
        const candidate = await Manager.findOne({where: {login: req.body.login}})

        if (candidate) {
            res.status(200).send(candidate)
        } else {
            res.status(500).send({message: 'Manager doesn\'t exist'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

router.get('/get-active-workers', auth, async (req, res) => {
    try {
        const workers = await Worker.findAll({where: {iswork: 1}})

        if (workers) {
            res.status(200).send(workers)
        } else {
            res.status(500).send({message: 'Nobody works'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})


router.get('/', async (req, res) => {
    try {
        const managers = await Manager.findAll()
        
        res.send(managers).status(200)
    } catch (err) {
        console.log(err)
    }
})

router.get('/adddata', (req, res) => {
    const data = {
        login: 'user1',
        workername: 'Zamshut',
        hashpass: '1234', 
        phone: '8925',
        idobject: 1
    }

    //let {Login, WorkerName, HashPass, Phone, IdObject} = data

    Manager.create(data)
        .then(res.redirect('/api/manager'))
        .catch(err => console.log)
})

module.exports = router