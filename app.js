let express             = require("express"),
mongoose                = require("mongoose"),
bodyParser              = require("body-parser"),
passport                = require("passport"),
localStrategy           = require("passport-local"),
passportLocalMongoose   = require("passport-local-mongoose"),
app                     = express(),
user                    = require("./models/user"),
port                    = 3000;


// connect database & database name
mongoose.connect("mongodb://localhost/authentication");         

app.set("view engine", "ejs");          // don't need e.js extention

// ======================== Routes ==========================
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", (req, res) => {
    res.render("secret");
});


app.listen(port, (req, res) => {
    console.log("starting server...");
});