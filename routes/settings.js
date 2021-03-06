var config = require('config')
var express = require('express')
var Users = require('../models/Users')
var router = express.Router()
var passport = require('passport')

router.get('/password', (req, res) => {
  if(!req.isAuthenticated()) {
    return res.render('failed', {
      title: 'Nicht Autenfiziert!',
      message: 'Du must dich angemeldet haben um diese Seite besuchen zu können.'
    })
  }
  res.render('settings/password', { title: config.pageTitle + ' | Passwort Ändern', currentUser: req.user })
})

router.post('/password', (req, res) => {
  if(!req.isAuthenticated()) {
    return res.render('failed', {
      title: 'Nicht Autenfiziert!',
      message: 'Du must dich angemeldet haben sein um diese Seite besuchen zu können.'
    })
	}
	req.user.changePassword(req.body.oldPassword, req.body.newPassword)
	.then(data => {
		res.render('settings/passwordSuccess', { title: config.pageTitle, currentUser: req.user })
	})
	.catch(err => {
		if (err.name === 'IncorrectPasswordError') return res.render('settings/passwordFailed', {
            title: config.pageTitle + ' | Passwort Ändern',
            currentUser: req.user
        })
		res.render('error', { error:err, title: config.pageTitle + ' | Fehler!' })
	})
})

module.exports = router