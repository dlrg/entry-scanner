const clui = require('clui')
const Spinner = clui.Spinner
const clc = require('CLI-color')
const Line = clui.Line
const mongoose = require('mongoose')
const config = require('config')
const Users = require('./models/Users')
const boxen = require('boxen');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const exampleData = {
	username: 'example',
	password: 'secret'
}
var outputCreateUser = new Spinner('Creating Example User', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
passport.initialize()
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());
mongoose.connect(config.mongodb)
.then(() => outputCreateUser.start())
.then(() => Users.register(new Users({ username: exampleData.username }), exampleData.password))
.then(user => {
	outputCreateUser.stop()
	outputCreateUser = new Line()
	.padding(2)
	.column('✔ Created Example User', 30, [clc.green])
	.output()
	console.log(boxen(`User Registrated! Huray!\nYour Username: ${exampleData.username}\n Your Password: ${exampleData.password}`, {
		padding: 1,
		margin: 1,
		borderStyle: 'round',
		borderColor: 'green',
		float: 'left',
		backgroundColor: 'blue'
	}))
})
.then(() => process.exit())
.catch(err => {
	console.error(err)
	process.exit()
})
