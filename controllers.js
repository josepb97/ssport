
const SSE = require('express-sse') //Server-side events

const M = require('./model')

const STREAM = new SSE()

exports.middleware = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 
	           'Origin, Content-Type, Accept')
    res.header('Cache-Control', 'no-cache')
	
	//log message

	console.log(Date(), req.method, req.url)
	
	//Check access policy here
	
	next()
}

exports.eventStream = (req, res) => {

  console.log('Nueva conexion SSE ...')

  STREAM.init(req, res)

}

//STREAM.init(req, res)

exports.getUser = (req,res) => M.getUsers(req.params.id).then(r => res.send({result: r}));

exports.updateUser = (req,res) => M.updateUser(req.body.id,req.body).then(r => res.send({result:'OK'}));

exports.updateMatch = (req,res) => M.updateMatch(req.body.id,req.body).then(r => res.send({result:'OK'}));
// 

//ASÍNCRONO!!
exports.createUser = (req,res) => 	M.createUser(req.body).then(r => res.send({result: 'OK'}));

exports.createMatch = (req,res) => 	M.createMatch(req.body).then(r => res.send({result:'OK'}));
// M.createMatch(req.body).then(r => res.send({result: 'OK'}));

exports.getUsers = (req,res) => 	M.getUsers().then(r => res.send({result: r}));

exports.getMatches = (req,res) => 	M.getMatches().then(r => res.send({result: r}));


exports.getMatchesByPlayer = (req,res) => 	M.getMatchByPlayer(req.params.id).then(r => res.send({result: r}));


//exports.getUsers = (req,res) => res.send({result:M.getUsers()});

// exports.getBlogs   = (req,res) => res.send({error: 'to be completed'})

// exports.createBlog = (req,res) => M.updateBlog(req.params.id, req.body)
//                                    .then(r => res.send({result: 'OK'}))

// exports.getBlogData = (req,res) => res.send({error: 'to be completed'})

// exports.searchBlog = (req, res) => M.searchBlog(req.query.q)
//                                     .then(r => res.send({result: r}))

