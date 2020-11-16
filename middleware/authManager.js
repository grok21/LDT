  // Routes protection
  const jwt = require('jsonwebtoken')
  const config = require('config')
  const Manager = require('../models/Manager')
  
  module.exports = async function(req, res, next) {    
      try {
          const candidate = await Manager.findOne({where: {login: req.body.login}})
          if (candidate) {
              if (req.body.token === candidate['token']) {
                jwt.verify(candidate['token'], config.get('jwtSecret'), (err) => {
                    if (err) { return res.status(500).json({message: "authorize first"}) }
                    next()
                })
              } else {
                  return res.status(500).json({message: "authorize first"})
              }
          } else {
              return res.status(500).json({message: "authorize first"})
          }
      } catch (err) {
          return res.status(500).json(err)
      }
  }