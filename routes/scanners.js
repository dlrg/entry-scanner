var config = require('config')
var express = require('express')
var Scanners = require('../models/Scanners')
var router = express.Router()
var passport = require('passport')


router.get('/:id/barcode', (req, res) => {
  if(!req.isAuthenticated()) {
    return res.render('failed', {
      title: 'Nicht Autenfiziert!',
      message: 'Du must dich angemeldet haben sein um diese Seite besuchen zu können.'
    })
  }
  Scanners.findById(req.params.id)
  .then(data => {
    res.render('scanners/barcode', { scanner: data, currentUser: req.user, title: config.pageTitle + ' | Scanner Erstellen' })
  })
  .catch(error => res.render('error', { message: error.msg, error }))
})

router.get('/', (req, res) => {
  if(!req.isAuthenticated()) {
    return res.render('failed', {
      title: 'Nicht Autenfiziert!',
      message: 'Du must dich angemeldet haben sein um diese Seite besuchen zu können.'
    })
  }
  Scanners.find()
  .then((data) => {
    res.render('scanners/list', {
        scanners: data,
        currentUser: req.user,
        title: config.pageTitle + ' | Scanner Liste'
    })
  })
  .catch((error) => {
    res.render('error', {
        message: 'Irgendetwas ist schief gelaufen!',
        error,
        title: config.pageTitle + ' | Fehler'
    })
  })
})

router.get('/create', (req, res) => {
  if(!req.isAuthenticated()) {
    return res.render('failed', {
      title: 'Nicht Autenfiziert!',
      message: 'Du must dich angemeldet haben sein um diese Seite besuchen zu können.'
    })
  }
  res.render('scanners/create', { currentUser: req.user, title: config.pageTitle + ' | Scanner Erstellen' })
})

router.post('/create', (req, res) => {
    if(!req.isAuthenticated()) {
        return res.render('failed', {
            title: 'Nicht Autenfiziert!',
             message: 'Du must dich angemeldet haben sein um diese Seite besuchen zu können.'
        })
    }
    Scanners.create({
        name: req.body.name,
        direction: req.body.direction
    })
	  .then((scanner) => {
        res.render('scanners/createSuccess', {
            name: scanner.name,
            token: scanner.token,
            direction: scanner.direction,
            title: config.pageTitle + ' | Scanner Erstellt',
            currentUser: req.user
        })
    })
    .catch(error => {
        if (error && error.name === 'UserExistsError') return res.render('scanners/createFailed', {
            name: req.body.name,
            title: config.pageTitle + ' | Scanner Erstellen',
            currentUser: req.user
        })
        return res.render('error', { message: error.msg, error })
    })
})

router.post('/delete', (req, res) => {
  if(!req.isAuthenticated()) {
    return res.render('failed', {
      title: 'Nicht Autenfiziert!',
      message: 'Du must dich angemeldet haben sein um diese Seite besuchen zu können.'
    })
  }
  Scanners.findByIdAndRemove(req.body.userId, (error, user) => {
    if (error) return res.render('error', { message: error.msg, error })
    res.render('scanners/deleteSuccess', {
        title: config.pageTitle + ' | Scannner Löschen',
        username: user.username,
        currentUser: req.user
    })
  })
})

module.exports = router