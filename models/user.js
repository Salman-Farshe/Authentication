let mongoose    = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

// Define Schema
let Schema      = mongoose.Schema;
let ObjectId    = Schema.ObjectId;

// Creating User Schema
let userSchema = new Schema({
    email: String,
    username: String,
    password: String
});

// add methods automatically don't need to add manually
userSchema.plugin(passportLocalMongoose);

let User = mongoose.model("User", userSchema);          // model & collection name

module.exports = User;          // exports into main app.js