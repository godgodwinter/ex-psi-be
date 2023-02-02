// const express = require("express");
import express from "express";
const app = express();

import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

// settings Library
dotenv.config();
app.use(express.json());
app.use(cors());
express.urlencoded({ extended: true });


// REST
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// import PostRoute from "./app/routes/PostRoute.js";
// app.use(PostRoute);

// SETTINGS SERVER
const PORT = 8001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
