var config = require('config')
var express = require('express')
var passport = require('passport')
var Users = require('../models/Users')
var router = express.Router()

router.get('/', (req, res) => {
	if(!req.isAuthenticated()) return res.redirect('/login')
	req.logout()
	res.redirect('/')
})


module.exports = router