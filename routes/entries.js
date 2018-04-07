var config = require('config')
var express = require('express')
var Entries = require('../models/Entries')
var router = express.Router()
var passport = require('passport')

router.get('/', (req, res) => {
  if(!req.isAuthenticated()) {
    return res.render('failed', {
      title: 'Nicht Autenfiziert!',
      message: 'Du must dich angemeldet haben sein um diese Seite besuchen zu können.'
    })
  }
  Entries.find()
  .then((data) => {
    res.render('entries/list', { entries: data, currentUser: req.user, title: config.pageTitle + ' | Eintrag Liste' })
  })
  .catch((error) => {
    res.render('error', { message: 'Irgendetwas ist schief gelaufen!', error, title: config.pageTitle + ' | Fehler'})
  })
})

module.exports = router