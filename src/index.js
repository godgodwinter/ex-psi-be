// // const express = require("express");
// import express from "express";
// const app = express();

// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from "dotenv";

// // settings Library
// dotenv.config();
// app.use(express.json());
// app.use(cors());
// express.urlencoded({ extended: true });


// // REST
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });
// app.get('/expressjs', function (req, res) {
//     res.send('Hello World, ini expressJS');
// });

// // import PostRoute from "./app/routes/PostRoute.js";
// // app.use(PostRoute);

// // // SETTINGS SERVER
// // const PORT = 8001;
// // // app.listen(PORT, () => {
// // //     console.log(`Server is running on http://localhost:${PORT}`);
// // // });

// // app.listen();

// // Listen
// var port = process.env.PORT || 3000;
// app.listen(port);
// console.log('Listening on localhost:' + port);



// var http = require('http');
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     var message = 'It works!\n',
//         version = 'NodeJS ' + process.versions.node + '\n',
//         response = [message, version].join('\n');
//     res.end(response);
// });
// server.listen();

// import express from "express";
// const app = express();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

dotenv.config();
// app.use(express.json());
// console.log(process.env.DB_DATABASE)
// parse application/json
app.use(bodyParser.json())
app.use(cors());
express.urlencoded({ extended: true });


const db = require("./app/models");
// db.sequelize.sync()
//     .then(() => {
//         console.log("Synced db.");
//     })
//     .catch((err) => {
//         console.log("Failed to sync db: " + err.message);
//     });
// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }
db.sequelize.authenticate()
    .then(() => {
        //     console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });



// Routes
app.get('/', function (req, res) {
    res.send('Hello World, ini Root Ini root');
});

app.get('/ts', function (req, res) {
    res.send('this not ts project');
});
app.get('/expressjs', function (req, res) {
    res.send('Hello World, ini expressJS');
});


// fastify.register(require('./src/routes'));
// import PostRoute from "./app/routes/PostRoute.js";
// const PostRoute = require('./app/routes/PostRoute.js');
// app.use(PostRoute);
// ROUTER
app.use(require('./app/routes/PostRoute'));
// Listen
var port = process.env.PORT || 8001;
app.listen(port);
console.log('Listening on localhost:' + port);
