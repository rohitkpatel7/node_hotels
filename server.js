//   import express from 'express'

// const app = express()

// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000')
// })

const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Welcome to our hotel, How can i help you");
});

         

//not use in todays

// app.post("/persons", (req, res) => {
//   const data = req.body; // Assuming req.body contains the person data

//   //create a new person document using the mongoose model
//   const newPerson = new Person(data);

//   //save the new person document to the database
//   newPerson.save((error, savedperson) => {
//     if(error) {
//     console.log("Error saving person:", error);
//     res.status(500).json({ error: "internal server error" });
//     }
//     else {
//       console.log("Person saved successfully:");
//       res.status(201).json(savedperson);
//     }
//   })
// });




 




//import the router files
const personRoutes = require('./routes/personRoutes');
//use the routes
app.use('/person',personRoutes)

const menuRoutes = require('./routes/menuItemRoutes');
app.use('/menu',menuRoutes)


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
