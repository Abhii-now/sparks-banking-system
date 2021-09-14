const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/users");
const people = require("./people");

mongoose.connect("mongodb://localhost:27017/banking-sys");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});
const seedDB = async () => {
  await User.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const balance = Math.floor(Math.random() * 100000);
    const user = new User({
      balance: balance,
      gender: people[i].gender,
      name: people[i].name.first + " " + people[i].name.last,
      email: people[i].email,
    });
    await user.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
