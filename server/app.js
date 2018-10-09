var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');

var app = express();
var port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");

var nameSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	dateOfBirth: String
});

var User = mongoose.model("User", nameSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
	console.log("Server listening on port " + port);
});

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/allUsers", (req, res) => {
	User.find(function (err, users) {
		if (err) throw err;
		console.log(users);
		res.send(users);
	});
});

app.post("/addUser", (req, res) => {

	var newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		dateOfBirth: req.body.dateOfBirth
	});

	newUser.save()
		.then(item => {
			console.log("Added item: ", item);
			res.send("Item saved to database");
		})
		.catch(err => {
			res.status(400).send("Unable to save to database");
		});
});

