// Dependencies
var express = require("express");
var path = require("path");

// Global Server Variables
var PORT = process.env.PORT || 3000;
var app = express();

// Server Data Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Array to hold all customer objects
var currentCustomers = [
  {
    name: "name",
    phone: "214-212-7777",
    email: "blah@gmail.com",
    id: "blahness"
  },
  {
    name: "test2",
    phone: "test2",
    email: "test2",
    id: "test2"
  },
  {
    name: "test3",
    phone: "test3",
    email: "test3",
    id: "test3"
  },
  {
    name: "test4",
    phone: "test4",
    email: "test4",
    id: "test4"
  }
];

var waitingList = [];

// Start the server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// Index
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "list.html"));
});

// Function to send them the file they searched
app.get("/:file", function(req, res) {
  res.sendFile(path.join(__dirname, req.params.file + ".html"));
});

// Return full list of currentCustomers
app.get("/api/currentCustomers", function(req, res) {
  var tables = {
    currentTables: currentCustomers,
    waitingList: waitingList
  };
  res.json(tables);
});

// Add a new customer to the array and then send back the response
app.post("/api/currentCustomers", function(req, res) {
  var newCustomer = req.body;
  newCustomer.routeName = newCustomer.name.replace(/\s+/g, "").toLowerCase();
  console.log(newCustomer);

  if (currentCustomers.length < 5) {
    currentCustomers.push(newCustomer);
    return res.json("You are officially booked", newCustomer);
  } else {
    waitingList.push(newCustomer);
    return res.json("You are on the waiting list", newCustomer);
  }
});

// Starts the server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
