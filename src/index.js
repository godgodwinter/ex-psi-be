
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const expressBusboy = require('express-busboy');


const app = express();

dotenv.config();
// parse requests of content-type - application/json
// app.use(express.json());
// console.log(process.env.DB_DATABASE)
// parse application/json
app.use(cors());
//form / parser
expressBusboy.extend(app);
app.use(bodyParser.json())
const forms = multer();
// parse requests of content-type - application/x-www-form-urlencoded
express.urlencoded({ extended: true });
const cookieSession = require("cookie-session");


const db = require("./app/models");
db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

app.use(
    cookieSession({
        name: "bezkoder-session",
        secret: process.env.JWT_SECRET || "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true
    })
);




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
require('./app/routes/AuthRoute')(app);
// Listen
var port = process.env.PORT || 8001;
app.listen(port);
console.log('Listening on localhost:' + port);
