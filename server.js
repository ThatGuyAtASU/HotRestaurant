// build front end (3 HTML pages and css) 
// home
// create res
// view res
// ajax calls to get and post info

// server js tohandle server side (using express, path)
// variables for res arrays
// GET to display home
// GET to display create
// GET to display view
// POST to add reservations

//+++++++++++++++++++++++++++++++++++++++++++++++++++
//Dependencies
//=============================================================
var express = require("express");
var path = require("path");

// Sets up the express app
//=============================================================
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [];
var waitingList = [];

// Basic route for home page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

//Basic route for reservations page
app.get("/api/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));

});

//Basic route for viewing the tables
app.get("/view", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
    // return res.json(reservations);
});
app.get("/api/table", function (req, res) {
    return res.json(reservations);
});
app.get("/api/wait", function (req, res) {
    return res.json(waitingList);
});

//Creating a new Table
app.post("/api/reserve", function (req, res) {

    var newtable = req.body;

    newtable.routeName = newtable.name.replace(/\s+/g, "").toLowerCase();

    console.log(newtable);

    res.json(newtable);

    if(reservations.length >= 5){
        waitingList.push(newtable);
    }
    else
    {
        reservations.push(newtable);
    }
});

//Start the server to begin listening
//===============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
})

