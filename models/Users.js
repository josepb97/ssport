const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/ssportdb"

mongoose.connect(url,(err) => {
	if (err) throw err;
	console.log('Succesfully connected');
})

var	Users = new mongoose.Schema({
							"@id"	:	String,
							name	:	String,
							email	:	String,
							phone	:	Number,
							age	:	Number,
							gender: String,
							level	: Number,
							score	: Number,
							versionKey: false   

});

module.exports = mongoose.model("Users",Users)