var config = require('config')
var express = require('express')
var passport = require('passport')
var Users = require('../models/Users')
var router = express.Router()

router.get('/', (req, res) => {
	if(req.isAuthenticated()) return req.redirect('/')
	res.render('auth/login', { currentUser: req.user })
})

router.post('/', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/loginFailed'
}))

router.get('/loginFailed', (req, res) => {
	if(req.isAuthenticated()) return req.redirect('/')
	res.render('auth/loginFailed', { title: config.pageTitle + ' | Login', currentUser: req.user })
})


module.exports = router