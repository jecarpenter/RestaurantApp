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
    customerName: "customerName",
    phoneNumber: "214-212-7777",
    customerEmail: "blah@gmail.com",
    customerID: "blahness"
  },
  {
    customerName: "test2",
    phoneNumber: "test2",
    customerEmail: "test2",
    customerID: "test2"
  },
  {
    customerName: "test3",
    phoneNumber: "test3",
    customerEmail: "test3",
    customerID: "test3"
  },
  {
    customerName: "test4",
    phoneNumber: "test4",
    customerEmail: "test4",
    customerID: "test4"
  }
];

var waitingList = [];

// Index
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "list.html"));
});

// Function to send them the file they searched
app.get("/:file", function (req, res) {
  res.sendFile(path.join(__dirname, req.params.file));
});

// Return full list of currentCustomers
app.get("/api/tables", function (req, res) {
  var tables = {
    currentTables: currentCustomers,
    waitingList: waitingList
  };
  res.json(tables);
});

app.post("api/clear", function (req, res) {
  currentCustomers.empty();
  waitingList.empty();
});

// Add a new customer to the array and then send back the response
app.post("/api/tables", function (req, res) {
  var newCustomer = req.body;
  newCustomer.routeName = newCustomer.customerName.replace(/\s+/g, "").toLowerCase();
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
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
