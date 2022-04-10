const mongoose = require("mongoose");

const applicantSchema = mongoose.Schema({
	username: {
		type: String,
		default: "",
		required: true,
	},
	password: {
		type: String,
		default: "",
		required: true,
	},
	email: {
		type: String,
		required: true,
		default: "",
	},
	mobile: {
		type: String,
		required: true,
		default: "",
	},
	resume: {
		type: String,
		default: "",
	},
	testResult: {
		type: String,
		default: "",
	},
});

module.exports = mongoose.model("Applicant", applicantSchema);
