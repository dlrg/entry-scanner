var config = require('config')
var express = require('express')
var Scanners = require('../models/Scanners')
var Entries = require('../models/Entries')
var router = express.Router()
var passport = require('passport')


router.post('/newEntry', (req, res) => {
    console.log(req.body)
    Scanners.findOne({ token: req.body.token })
    .then(data => {console.log(data); return data})
    .then(data => Entries.create({
        barcode: req.body.barcode,
        direction: data.direction
    }))
    .then(data => res.send(data))
    .catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
    
})

module.exports = router