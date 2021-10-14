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
app.use(express.static("public"));      // tell express to serve the content of the public directory
app.use(bodyParser.urlencoded({extended: true}));       // to get form data


// setting session & passport
app.use(require("express-session")({
    secret: "Salman Farshe",            // used in encode/decode the session data
    resave: false,
    saveUninitialized: false
}));

// setting passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));       // connection with the user.js model
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


// Auth Routes
// show form
app.get("/register", (req, res) => {
    res.render("register");
});

// get data from the form
app.post("/register", (req, res) => {
    User.register(new User({
        email: req.body.email,            // from model name
        username: req.body.username             // get name from form
    }), req.body.password, (err, user) => {         // hashing password, password directly not stored in the database
        if(err){
            console.log(err);
            return res.render("register");
        } else{
            // logged user in & take care all in session, store the correct information, 
            // run the serialize method, to use localStrategy
            passport.authenticate("local") (req, res, () => {
                res.redirect("/secret");
            });
        }
    });
});



// Login Routes
app.get("/login", (req, res) => {
    res.render("login");
});

// middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {                         // final Routes, middleware runs before that

});


app.listen(port, (req, res) => {
    console.log("starting server...");
});