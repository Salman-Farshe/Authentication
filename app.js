let express = require("express"),
mongoose    = require("mongoose"),
app         = express(),
port        = 3000;


mongoose.connect("mongodb://localhost/authentication");         // connect database
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