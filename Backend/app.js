const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/config.env" });
const path = require("path");
const cookieParser = require("cookie-parser");

const user = require("./Routers/user");
// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(express.static("js"));
app.use(express.static("css"));

const { checkUserRoles } = require("./Middleware/auth");

//  Importing  routes
const User = require("./Routers/user");
const Bmi = require("./Routers/bmi");

// using routes
app.use("/api/v1", User);
app.use("/api/v1", Bmi);

// pages render
app.get("/login", (req, res) => {
  res.sendFile("Login.html", { root: "public" });
});

app.get("/user-register", (req, res) => {
  res.sendFile("register.html", { root: "public" });
});

app.get("/", checkUserRoles(["user"]), (req, res) => {
  res.sendFile("Home.html", { root: "public" });
});

module.exports = app;
