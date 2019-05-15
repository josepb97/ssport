// const MongoClient = require('mongodb').MongoClient
// const url = "mongodb://localhost:27017"

// MongoClient.connect(url,function(err,client){
// 	if(err){
// 		console.log(err)
// 		return
// 	}

// 	const db = client.db('ssportdb')

// 	const Users = db.collection('users')
// 	const Matches = db.collection('matches')
// 	Users.insertOne({"name":"miRABO"})


// })


// Connection to Mongo DB
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/ssportdb"

mongoose.connect(url,(err) => {
	if (err) throw err;
	console.log('Succesfully connected');
})

// var	Users = new mongoose.Schema({
// 							"@id"	:	String,
// 							name	:	String,
// 							email	:	String,
// 							phone	:	Number,
// 							age	:	Number,
// 							gender: String,
// 							level	: Number,
// 							score	: Number   

// });

// var usersModel = mongoose.model("Users",Users)


// Import section
const bodyparser = require('body-parser')
const express    = require('express')
const control    = require('./controllers')

//Express Web Server object
const app = express()

//HTTP Body parsers for JSON
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

//Middleware
app.use(control.middleware)

//Routes of our REST service

app.use('/web', express.static('public'))



app.get('/users', control.getUsers);

app.get('/users/:id', control.getUser);

app.post('/users', control.createUser);

app.put('/users/:id', control.updateUser);

// app.get('/locations', control.getLocaltions);

// app.get('/matches', control.getMatches);

// app.get('/users/:id/stats', control.getStats);

app.post('/matches', control.createMatch);

app.get('/matches',control.getMatches);

app.put('/matches/:id', control.updateMatch);

app.get('/users/:id/matches', control.getMatchesByPlayer);

// app.get('/ranking', control.getRanking);


//Run server
const PORT = 8080
app.listen(PORT, _ => console.log(`Servidor web escuchando en puerto ${PORT}`))

