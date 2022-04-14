// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");

var compression = require("compression");
const logger = require("morgan");
const path = require('path')

const getData = require('./getData')

// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================
var app = express();
var PORT = process.env.PORT || 8080;

app.use(compression());
app.use(logger("dev"));
app.use(express.static('public'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// ================================================================================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get("/terms", async (req, res) => {
    console.log(getData)
    const termArr = await getData();
    res.json(termArr)
})

// =============================================================================
// LISTENER
// =============================================================================

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});