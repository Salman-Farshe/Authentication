let mongoose    = require("mongoose");

// Define Schema
let Schema      = mongoose.Schema;
let ObjectId    = Schema.ObjectId;

// Creating User Schema
let userSchema = new Schema({
    username: String,
    password: String
});

let User = mongoose.model("User", userSchema);          // model & collection name

module.exports = User;          // exports into main app.js