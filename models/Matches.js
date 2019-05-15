const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/ssportdb"

mongoose.connect(url,(err) => {
	if (err) throw err;
	console.log('Succesfully connected');
})

var	Matches = new mongoose.Schema({
							"@id"	:	String,
							date	:	Date,
							location	:	Object,
							ended	:	Boolean,
							type	:	String,
							players: Array,
							winners	: Array,
							score	: Object,
							versionKey: false  

});

module.exports = mongoose.model("Matches",Matches)