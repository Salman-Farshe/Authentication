let express             = require("express"),
mongoose                = require("mongoose"),
bodyParser              = require("body-parser"),
session                 = require("express-session"),
passport                = require("passport"),
localStrategy           = require("passport-local"),
passportLocalMongoose   = require("passport-local-mongoose"),
app                     = express(),
User                    = require("./models/user"),
port                    = 3000;


// connect database & database name
mongoose.connect("mongodb://localhost/authentication");         

app.set("view engine", "ejs");          // don't need e.js extention


// setting session & passport
app.use(require("express-session")({
    secret: "Salman Farshe",            // used in encode/decode the session data
    resave: false,
    saveUninitialized: false
}));

// setting passport
app.use(passport.initialize());
app.use(passport.session());

// reading the session, taking the data from the session, encoded/decoded it
passport.serializeUser(User.serializeUser());           
passport.deserializeUser(User.deserializeUser());           // defined on the models/user.js


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