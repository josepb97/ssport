const axios = require('axios');

let client = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 1000,
})
let date = new Date()

// client.post("/users", {id:"danib69",name: "dani", email: "al341841@uji.es",
//   telephone:678288366, birthDate:"1997-05-07", gender:"male", level:0, score:0})
//       .then(response => console.log(response.data))
//       .catch(error => console.log(error))

// client.post("/users", {id:"josegordo",name: "jose", email: "al341820@uji.es",
//   telephone:677015090, birthDate:"1997-11-09", gender:"male", level:0, score:0})
//       .then(response => console.log(response.data))
//       .catch(error => console.log(error))

client.get("/users")
   .then(response => console.log(response.data))
      .catch(error => console.log(error))


// client.put("/users/u0", {id:'danib69',name: "Daniel", email: "al341841@uji.es",
//   telephone:678288366, birthDate:"1997-05-07", gender:"male", level:0, score:0})
//       .then(response => console.log(response.data))
//       .catch(error => console.log(error))


// client.post("/matches", {date: date,
//   location: { city: "Castellón de la Plana", court:"Tenis Castellón"}, type:"single", players: ["danib69","josegordo"], score: {local: [6,4,6], visit: [4,6,1]}})
//       .then(response => console.log((response.data)))
//       .catch(error => console.log(error))


// client.get("/users/danib69")
//       .then(response => console.log(response.data))
//       .catch(error => console.log(error))


// client.put("/matches/m0", {id:"m0",date:date ,
//   location: { city: "Castellón de la Plana", court:"Tenis Castellón"},
//   type:"single", players: ["u0","u1"], score: "6-2#4-6#6-4"})
//       .then(response => console.log(response.data))
//       .catch(error => console.log(error))

// client.get("/users/u0/matches")
//       .then(response => console.log(response.data))
//       .catch(error => console.log(error))

// client.get("/matches")
//    .then(response => console.log(response.data))
//       .catch(error => console.log(error))


// client.get("/user/pepe10")
//       .then(response => console.log(response.data))
//       .catch(error => console.log(error))

// client.post("/blog/motos",{name: "Mundo Motos" , author: "pepe10"})
//       .then(response => console.log(response.data))
//       .catch(error => console.log(error))
