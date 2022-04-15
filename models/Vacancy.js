const mongoose = require("mongoose");

const vacancySchema = mongoose.Schema({
	recruiterName: {
		type: String,
		required: true,
		default: "",
	},
	jobTitle: {
		type: String,
		required: true,
		default: "",
	},
	jobDescription: {
		type: String,
		required: true,
		default: "",
	},
	jobLocation: {
		type: String,
		required: true,
		default: "",
	},
	workExperience: {
		type: String,
		required: true,
		default: "",
	},
	applicantsList: [
		{
			username: { type: String },
			email: { type: String },
			mobile: { type: String },
			testResult: { type: String },
			resume: { type: String },
		},
	],
});

module.exports = mongoose.model("Vacancy", vacancySchema);
