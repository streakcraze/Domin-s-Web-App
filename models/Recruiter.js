const mongoose = require("mongoose");

const recruiterSchema = mongoose.Schema({
	username: {
		type: String,
		default: "",
		required: true,
	},
	email: {
		type: String,
		required: true,
		default: "",
	},
	password: {
		type: String,
		default: "",
		required: true,
	},
});

module.exports = mongoose.model("Recruiter", recruiterSchema);
