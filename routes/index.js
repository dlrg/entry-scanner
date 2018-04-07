var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
	if(req.isAuthenticated()) return res.redirect('/scanners')
	res.redirect('/login')
})

module.exports = router