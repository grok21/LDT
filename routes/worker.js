const {Router} = require('express')
const jwt = require('jsonwebtoken')
//const argon2 = require('argon2')
const config = require('config')
const Worker = require('../models/Worker')
const auth = require('../middleware/authWorker')


const router = Router()

router.post('/register', async (req, res) => {
    try {
        const candidate = await Worker.findOne({where: {login: req.body.login}})

        if (!candidate) {
            const new_candidate = req.body
            new_candidate['iswork'] = 0
            const hashpass = await argon2.hash(req.body.hashpass)
            const token = jwt.sign(
                {login: new_candidate['login']},
                config.get('jwtSecret')
            )
            new_candidate['token'] = token
            new_candidate['hashpass'] = hashpass
            Worker.create(new_candidate)
            res.status(200).json({token: token, message: 'Worker created'})
        } else {
            res.status(500).json({message: 'Worker exists'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

router.post('/login', async (req, res) => {
    try {
        const candidate = await Worker.findOne({where: {login: req.body.login}})
        
        if (candidate) {
            if (await argon2.verify(candidate['hashpass'], req.body.hashpass)) {
                const token = jwt.sign(
                    {login: candidate['login']},
                    config.get('jwtSecret')
                )

                await Worker.update(
                    {token: token}, 
                    {where: {login: candidate['login']}}
                )

                res.status(200).json({token, message: 'Login'})
            } else {
                res.status(500).json({message: 'Password incorrect'})
            }
        } else {
            res.status(500).json({message: 'Worker doesn\'t exist'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        const candidate = await Worker.findOne({where: {login: req.body.login}})
        
        if (candidate) {
            const token = null

            await Worker.update(
                {token: token}, 
                {where: {login: candidate['login']}}
            )

            res.status(200).json({message: 'Worker logout'})
        } else {
            res.status(500).json({message: 'Worker doesn\'t exist'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

router.get('/get-my-info', auth, async (req, res) => {
    try {
        const candidate = await Worker.findOne({where: {login: req.body.login}})

        if (candidate) {
            res.status(200).send(candidate)
        } else {
            res.status(500).send({message: 'Worker doesn\'t exist'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

router.get('/get-iswork', auth, async (req, res) => {
    try {
        const candidate = await Worker.findOne({where: {login: req.body.login}})

        if (candidate) {
            res.status(200).send({iswork: candidate['iswork']})
        } else {
            res.status(500).send({message: 'Worker doesn\'t exist'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

router.post('/update-iswork', auth, async (req, res) => {
    try {
        const candidate = await Worker.findOne({where: {login: req.body.login}})

        if (candidate) {
            await Worker.update(
                {iswork: req.body.iswork}, 
                {where: {login: candidate['login']}}
            )
            res.status(200).send({message: 'Status updated'})
        } else {
            res.status(500).json({message: 'Worker doesn\'t exist'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})


router.get('/', async (req, res) => {
    try {
        const workers = await Worker.findAll()
        
        res.send(workers).status(200)
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

    Worker.create(data)
        .then(res.redirect('/api/worker'))
        .catch(err => console.log)
})

module.exports = router