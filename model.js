//const _ require('lodash')

const S = require('./server')
var mongoose = require('mongoose');
var Users = require('./models/Users');
var Matches = require('./models/Matches');
//var UsersDB = mongoose.model('Users')
//DATABASE
//User   {id: Number, userName: String, name: String, passwd: String , email: String, phone: String,
//	age: Number, gender: String, level: Number, score: Number , matches: Object}
//Match   {id: Number , date: Object, location: Object, ended: Number,
// type: String, players: Object, score: Object}
//¿Ranking?
/*createUser getUser getUsers updUser updUserScore notifyUser getTrend getStats
createMatch addPlayer updMatch postScore filterBy* updRanking getMatchByPlayer
*/
// let Users = []
// let Matches = []
//let Posts = {}

exports.createUser = data =>
                       new Promise((accept,reject) => {
					      //TODO: check if user data is right
                  			console.log("añadiendo")
                  			var newUser = new Users({
                  				"@id"	:	data.id,
								name	:	data.name,
								email	:	data.email,
								phone	:	data.phone,
								age	:	data.age,
								gender: data.gender,
								level	: data.level,
								score	: data.score,  
                  			})
                  			newUser.save(function(err){
								if (err) throw err;
									console.log("Guardado!");
									//ahora	consultamos	el	dato	guardado,	simplemente	para	ilustrar	una	consulta
									Users.findOne({name:data.name}, function(err , dato){
										if (err) throw err;
										console.log(dato);
									});
								});
							accept(data)

						})

exports.getUsers = _ =>
					  new Promise((accept,reject) => {
					  	var UsersObj = Users.find({})
					  	var promise = UsersObj.exec(function(err,docs){
					  		console.log(docs)
					  		accept(docs)
					  	});


					  })

exports.getUser = id =>
	                   new Promise((accept,reject) => {
						accept(Users.filter(user=> user.id==id))
					  })

exports.updateUser = (userId, data) =>
										 new Promise((accept,reject) => {
					    				if(Users.filter(user=> user.id==userId).length>0){
									    	Users[Users.indexOf(Users.filter(user=> user.id==userId)[0])]=data
											accept(true)
										}else{
											accept(false)
										}
										})


// exports.updateUserScore = data =>
// 							new Promise((accept,reject) => {
// 								//Add the match if it isn't in Matches
// 								if( Matches.indexOf(data.id)<0 ) accept(false)

// 								let nJugadores = data.players.length
// 								if(nJugadores==2){

// 									//Users[data.players] = [idLocal,idVisitante] cuando es un partido individual
// 									let actualLocalScore = Users.filter(x => x.id==data.players[0])[0].score
// 									let actualVisitScore = Users.filter(x => x.id==data.players[1])[0].score
// 								} else{
// 									//Users[data.players] = [idLocal1,idLocal2,idVisitante1,idVisitante2]
// 									//cuando es un partido dobles
// 									let actualLocalScore = (Users.filter(x => x.id==data.players[0])[0].score + Users.filter(x => x.id==data.players[1])[0].score)/2
// 									let actualVisitScore = (Users.filter(x => x.id==data.players[2])[0].score + Users.filter(x => x.id==data.players[3])[0].score)/2
// 								}

// 								let juegosLocal = data.score.local.reduce((x,y) => x+y,0)
// 								let juegosVisitante = data.score.local.reduce((x,y) => x+y,0)
// 								let victoria = 0

// 								for(let i=0; i < data.score.local.length; i++){

// 									if(data.score.local[i]<data.score.visit[i]) victoria+=1
// 									else victoria-=1

// 								}
// 								if(nJugadores==2){
// 									Users.filter(x => x.id==data.players[0])[0].score+=((actualLocalScore/actualVisitScore)*(juegosLocal/juegosVisitante)*victoria)/5
// 									Users.filter(x => x.id==data.players[1])[0].score+=((actualVisitScore/actualLocalScore)*(juegosVisitante/juegosLocal)*victoria)/5

// 								} else{
// 									Users.filter(x => x.id==data.players[0])[0].score+=((actualLocalScore/actualVisitScore)*(juegosLocal/juegosVisitante)*victoria)/5
// 									Users.filter(x => x.id==data.players[1])[0].score+=((actualLocalScore/actualVisitScore)*(juegosLocal/juegosVisitante)*victoria)/5
// 									Users.filter(x => x.id==data.players[2])[0].score+=((actualVisitScore/actualLocalScore)*(juegosVisitante/juegosLocal)*victoria)/5
// 									Users.filter(x => x.id==data.players[3])[0].score+=((actualVisitScore/actualLocalScore)*(juegosVisitante/juegosLocal)*victoria)/5

// 								}

// 								accept(true)

// 								}
// 							)
//exports.notifyUser

//exports.getTrend

//exports.getStats

exports.getMatches = _ =>
					new Promise((accept,reject) => {
					  	var MatchesObj = Matches.find({})
					  	var promise = MatchesObj.exec(function(err,docs){
					  		console.log(docs)
					  		accept(docs)
					  	});


					  })
exports.createMatch = data =>
                       new Promise((accept,reject) => {
					      //TODO: check if user data is right
					     //  	data.id="m"+Matches.length;
						    // Matches.push(data);
						    // accept(data);
						    console.log(data.score)
						    data.ended = data.score.local[2] >= 6 && data.score.visit[2] < data.score.local[2] -1
						    || data.score.visit[2] >= 6 && data.score.local[2] < data.score.visit[2] -1
						    || data.score.local[0] >= 6 &&  data.score.local[1] >= 6
						    || data.score.visit[0] >= 6 &&  data.score.visit[1] >= 6
						    if(data.ended){
						    	let local = 0
						    	let visit = 0
						    	for (let i=0;i<data.score.local.length;i++) {
						    		if (data.score.local[i] > data.score.visit[i])
						    			local++
						    		else visit++
						    	}
						    	if (data.type === "single")
						    		data.winners = local > visit ? [data.players[0]] : [data.players[1]]
						    	else
						    		data.winners = local > visit ? data.players.slice(0,2) : data.players.slice(2,4)

						    }
						    console.log("añadiendo")
                  			var newMatch = new Matches({
                  				"@id"	:	data.id,
								date	:	data.date,
								location	:	data.location,
								ended	:	data.ended,
								type	:	data.type,
								ended	: 	data.ended, 
								players: data.players,
								score	: data.score,
								winners	: data.winners   
                  			})
                  			newMatch.save(function(err){
								if (err) throw err;
									console.log("Guardado!");
									//ahora	consultamos	el	dato	guardado,	simplemente	para	ilustrar	una	consulta
									Matches.findOne({name:data.name}, function(err , dato){
										if (err) throw err;
										console.log(dato);
									});
								});
							accept(data)

					})

/*exports.addPlayer = (idMatch,idPlayer) =>
                       new Promise((accept,reject) => {
					      //TODO: check if user data is right
					      if(! idMatch in Object.keys(Matches) || ! idPlayer in Object.keys(Users)) accept(false)

						  Matches[idMatch].players.append(idPlayer)
						  accept(true)

						})*/

/*exports.removePlayer = (idMatch,idPlayer) =>
                       new Promise((accept,reject) => {
					      //TODO: check if user data is right
					      if(! idMatch in Object.keys(Matches) || ! idPlayer in Object.keys(Users)) accept(false)

						  for()
						  accept(true)

						})*/

exports.updateMatch = (matchId, data) =>
                       new Promise((accept,reject) => {
					      //TODO: check if user data is right
					      	if(Matches.filter(match=> match.id==matchId).length>0){
					      		let oldMatch=Matches.filter(match=> match.id==matchId)[0]
								Matches[Matches.indexOf(oldMatch)]=data
								// data.players.forEach(playerId => Users.filter(user => user.id==playerId)[0].matches[])
								accept(true)
						  	}else{
								accept(false)
							}

						})


exports.getMatchByPlayer = idPlayer =>
						new Promise((accept,reject) => {
							if(Users.filter(user => user.id==idPlayer).length>0){
								accept(Matches.filter(match => match.players.includes(idPlayer)))
							} else {
								accept(false)
							}
						})
//gamesLocal && gamesVisit array [set1,set2,set3,(set4,set5)]
/*exports.postScore = (idMatch,gamesLocal,gamesVisit) =>
					new Promise((accept,reject) => {
				      //TODO: check if user data is right
				      if(! idMatch in Object.keys(Matches) || (Matches[idMatch].type=='i' && Matches[idMatch].players.length != 2)
				      	|| (Matches[idMatch].type=='d' && Matches[idMatch].players.length != 4)) accept(false)
					  Matches[idMatch].score.local=gamesLocal
					  Matches[idMatch].score.visit=gamesVisit

					  accept(true)

					})*/
