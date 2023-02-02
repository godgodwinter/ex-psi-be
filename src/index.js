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

var express = require('express');
var app = express();
// Routes
app.get('/', function (req, res) {
    res.send('Hello World, ini Root Ini root');
});
app.get('/expressjs', function (req, res) {
    res.send('Hello World, ini expressJS');
});
// Listen
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on localhost:' + port);
