const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/users");
const app = express();
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/banking-sys");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});
app.get("/users", async (req, res) => {
  const users = await User.find({});
  res.render("users/index", { users });
});
app.post("/users/:senderId", async (req, res) => {
  const id = req.body.reciever;
  const amount = req.body.amount;
  const user = await User.findById(id);
  if (user) {
    user.balance += parseInt(amount);
  }
  const { senderId } = req.params;
  console.log(senderId);
  const sender = await User.findById(senderId);
  sender.balance -= parseInt(amount);
  console.log(sender.balance);
  await user.save();
  await sender.save();
  res.redirect(`/users/${senderId}`);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render(`users/show`, { user });
});
app.get("/users/:id/transaction", async (req, res) => {
  const { id } = req.params;
  const users = await User.find({});
  const user = await User.findById(id);
  res.render(`users/transact`, { user, users });
});
app.listen(3000, () => {
  console.log("serving port 3000");
});
