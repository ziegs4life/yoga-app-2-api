const Sequelize = require('sequelize')
let pg = require('pg')
let express = require('express')
let bodyParser = require('body-parser')

let app = express()

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}))
let parser = bodyParser.json()
app.use(parser)

const sequelize = new Sequelize('users', 'postgres', '', {
	host: 'localhost',
	dialect: 'postgres',

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},

	operatorsAliases: false
});

const User = sequelize.define('user', {
	user_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	first_name: Sequelize.STRING,
	last_name: Sequelize.STRING
});

const Ticket = sequelize.define('ticket', {
	ticekt_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	ticket_desc: Sequelize.STRING,
	ticket_due_date: Sequelize.DATEONLY,
	ticket_user: Sequelize.STRING
});

sequelize.sync()
	// .then(() => User.create({
	// 	first_name: 'Pat',
	// 	last_name: 'Sull'
	// }))
	// .then(() => User.create({
	// 	first_name: 'Adam',
	// 	last_name: 'Ziegele'
	// }))
	// .then(() => Ticket.create({
	// 	ticket_desc: 'Create ticketing system',
	// 	ticket_due_date: '11/16/17',
	// 	ticket_user: 'Patrick Sullivan'
	// }))
	// .then(() => Ticket.create({
	// 	ticket_desc: 'Setup HTML for ticketing system',
	// 	ticket_due_date: '11/16/17',
	// 	ticket_user: 'Adam Ziegele'
	// }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/users', (req, res) => {
	console.log('this works')
	User.findAll()
	.then(users => {
		var userArray = []
		for (var i = 0; i < users.length; i++) {
			userArray.push(users[i].first_name + " " + users[i].last_name)
		}
		res.send(userArray)
	})
})

app.get('/tickets', (req, res) => {
	console.log('it works again!')
	Ticket.findAll()
	.then(tickets => {
		var ticketArray = []
		for (var x = 0; x < tickets.length; x++) {
			ticketArray.push(tickets[x].ticekt_id + " " + tickets[x].ticket_user + " " + tickets[x].ticket_due_date + " " + tickets[x].ticket_desc)
		}
		res.send(ticketArray)
	})
})

app.post('/users', (req, res) => {
	contentType: 'application/json',
	
	console.log("Start here", req.body)

	var firstName = req.body.first_name
	var lastName = req.body.last_name

	console.log(req.body.last_name)

	User.create({
		first_name: firstName,
		last_name: lastName
	})
})


app.post('/tickets', (req, res) => {
	contentType: 'application/json',
	
	console.log("Start here", req.body)

	var ticketUser = req.body.ticket_user
	var ticketDescription = req.body.ticket_desc
	var ticketDate = req.body.ticket_due_date

	console.log('req.body.ticket_date here: ', req.body.ticket_due_date)

	Ticket.create({
		ticket_desc: ticketDescription,
		ticket_due_date: ticketDate,
		ticket_user: ticketUser
	})
})

app.listen(3000, () => {
	console.log('Listening on port 3000')
})