// import express from "express";
// import { getUsers } from "../controllers/PostController.js";
const express = require("express")
const getUsers = require('../controllers/PostController.js');
const PostRoute = express.Router();

PostRoute.get("/users", getUsers);
// router.get("/users/:id", getUserById);
// router.post("/users", createUser);
// router.patch("/users/:id", updateUser);
// router.delete("/users/:id", deleteUser);

// exports.PostRoute;
// const routes = async (server) => {
//     PostRoute.get("/users", getUsers);
// }

module.exports = PostRoute