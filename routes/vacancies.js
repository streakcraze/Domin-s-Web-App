const express = require("express");
const router = express.Router();
const auth = require("../auth");

const vacancyModel = require("../models/Vacancy");
const recruiterModel = require("../models/Recruiter");
const applicantModel = require("../models/Applicant");

router.get("/", (req, res) => {
	vacancyModel
		.find()
		.then((vacancies) => res.json(vacancies))
		.catch((err) => {
			res.status(500).json({ msg: "internal server error" });
			console.log(err);
		});
});

router.get("/:recruiterName", (req, res) => {
	const { recruiterName } = req.params;

	vacancyModel
		.find({ recruiterName: recruiterName })
		.then((vacancies) => res.json(vacancies))
		.catch((err) => {
			res.status(500).json({ msg: "internal server error" });
			console.log(err);
		});
});

router.post("/", auth, (req, res) => {
	const { jobTitle, jobDescription, jobLocation, workExperience } = req.body;

	recruiterModel
		.findById(req.user.id)
		.then((user) => {
			req.user.username = user.username;

			const newVacancy = new vacancyModel({
				recruiterName: req.user.username,
				jobTitle,
				jobDescription,
				jobLocation,
				workExperience,
			});

			newVacancy
				.save()
				.then((vacancy) => res.json(vacancy))
				.catch((err) => {
					res.status(500).json({ msg: "internal server error" });
					console.log(err);
				});
		})
		.catch((err) => {
			res.status(500).json({ msg: "internal server error" });
			console.log(err);
		});
});

router.post("/apply", auth, (req, res) => {
	const { vacancyId } = req.body;

	vacancyModel
		.findById(vacancyId)
		.then((vacancy) => {
			applicantModel
				.findById(req.user.id)
				.select("-password")
				.then((applicant) => {
					vacancy["applicantsList"].push(applicant);
					return vacancy;
				})
				.then((vacancy) =>
					vacancyModel(vacancy)
						.save()
						.then((vacancy) => res.json(vacancy))
						.catch((err) => {
							res.status(500).json({ msg: "error saving vacancy" });
							console.log(err);
						})
				)
				.catch((err) => {
					res.status(500).json({ msg: "error saving applicant" });
					console.log(err);
				});
		})
		.catch((err) => {
			res.status(500).json({ msg: "internal server error" });
			console.log(err);
		});
});

module.exports = router;
