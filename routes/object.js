const {Router} = require('express')
const Object = require('../models/Object')

const router = Router()

router.post('/register', async (req, res) => {
    try {
        const candidate = await Object.findOne({where: {objectname: req.body.objectname}})

        if (!candidate) {
            Object.create(req.body)
            res.status(200).json({message: 'Object created'})
        } else {
            res.status(500).json({message: 'Object exists'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

router.get('/', async (req, res) => {
    try {
        const objects = await Object.findAll()
        
        res.send(objects).status(200)
    } catch (err) {
        console.log(err)
    }
})

router.get('/adddata', (req, res) => {
    const data = {
        objectname: 'object1',
        contract: 'contract1',
        square: 1234, 
        buildingpermit: 'permit',
        customer: 'customer1', 
        geo: 'geo1', 
        generalcontractor: 'contractor'
    }

    //let {Login, WorkerName, HashPass, Phone, IdObject} = data

    Object.create(data)
        .then(res.redirect('/api/object'))
        .catch(err => console.log)
})

module.exports = router