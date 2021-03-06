let express             = require("express"),
mongoose                = require("mongoose"),
bodyParser              = require("body-parser"),
session                 = require("express-session"),
passport                = require("passport"),
localStrategy           = require("passport-local"),
passportLocalMongoose   = require("passport-local-mongoose"),
app                     = express(),
User                    = require("./models/user"),
port                    = process.env.PORT || 3000;


// connect database & database name
// mongoose.connect("mongodb://localhost/authentication");

// mongoose.connect("mongodb+srv://user1:user1@cluster0.6qplf.mongodb.net/authentication?retryWrites=true&w=majority");

mongoose.connect(process.env.DATABASEURL);

//================================================================

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
// Home Routes
app.get("/", (req, res) => {
    res.render("home");
});


// Secret Routes
// add isLoggedIn as a middleware, run this function before anything else.
app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret");
});

//===============================================================================
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


//==============================================================================
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


//=================================================================================
// LogOut Routes
app.get("/logout", (req, res) => {
    // all data into the database stay same. passport only destroying the user data in the session
    // no longer keeping track user data from request to request 
   req.logout(); 
   res.redirect("/");
});


// check user login or not... custom middleware

// req refers to the request object
// res refers to the response object
// nest refers to the next things that need to be call
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(port, process.env.IP, (req, res) => {
    console.log("starting server...");
});