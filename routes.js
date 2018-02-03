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


const Workout = sequelize.define('workouts', {
	workout_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	email: Sequelize.STRING,
	name: Sequelize.STRING,
	workout_date: Sequelize.STRING,
	workout_duration: Sequelize.INTEGER,
	pose_array: {type: Sequelize.ARRAY(Sequelize.STRING)},
	muscle_array: {type: Sequelize.ARRAY(Sequelize.STRING)}
}, {underscored: true});


sequelize.sync()
	// .then(()=> Workout.bulkCreate([
	// 	{
	// 		email: 'prsullivan5@gmail.com', 
	// 		name: 'Patrick Sullivan',
	// 		workout_date: '02/02/18',
	// 		workout_duration: 60,
	// 		pose_array: ['Saddle', 'Seated Forward Fold', 'Pigeon'],
	// 		muscle_array: ['Quads', 'Hamstrings', 'Hips']
	// 	},
	// 	{
	// 		email: 'ziegs4life@gmail.com', 
	// 		name: 'Adam Ziegele',
	// 		workout_date: '02/02/18',
	// 		workout_duration: 120,
	// 		pose_array: ['Twisted Lizard', 'Dragon', 'Pigeon'],
	// 		muscle_array: ['Quads', 'Hamstrings', 'Hips']
	// 	}
	// ]))

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  	next();
});


app.get('/my_workouts', (req, res) => {
	console.log('this works')
	Workout.findAll()
	.then(workouts => {
		res.send(workouts)
	})
})

app.post('/my_workouts', (req, res)=>{
	contentType: 'application/json',

	Workout.create({
		email: req.body.email,
		name: req.body.name,
		workout_date: req.body.workout_date,
		workout_duration: req.body.workout_duration,
		pose_array: req.body.pose_array,
		muscle_array: req.body.muscle_array
	})

	res.json('success')
})

// app.get('/tickets', (req, res) => {
// 	console.log('it works again!')
// 	Ticket.findAll()
// 	.then(tickets => {
// 		var ticketArray = []
// 		for (var x = 0; x < tickets.length; x++) {
// 			ticketArray.push(tickets[x].ticekt_id + " " + tickets[x].ticket_user + " " + tickets[x].ticket_due_date + " " + tickets[x].ticket_desc)
// 		}
// 		res.send(ticketArray)
// 	})
// })

// app.post('/users', (req, res) => {
// 	contentType: 'application/json',
	
// 	console.log("Start here", req.body)

// 	var firstName = req.body.first_name
// 	var lastName = req.body.last_name

// 	console.log(req.body.last_name)

// 	User.create({
// 		first_name: firstName,
// 		last_name: lastName
// 	})
// })


// app.post('/tickets', (req, res) => {
// 	contentType: 'application/json',
	
// 	console.log("Start here", req.body)

// 	var ticketUser = req.body.ticket_user
// 	var ticketDescription = req.body.ticket_desc
// 	var ticketDate = req.body.ticket_due_date

// 	console.log('req.body.ticket_date here: ', req.body.ticket_due_date)

// 	Ticket.create({
// 		ticket_desc: ticketDescription,
// 		ticket_due_date: ticketDate,
// 		ticket_user: ticketUser
// 	})
// })

app.listen(3001, () => {
	console.log('Listening on port 3001')
})