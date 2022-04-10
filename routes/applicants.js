const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth");

const applicantModel = require("../models/Applicant");

router.get("/", auth, (req, res) => {
	applicantModel
		.findById(req.applicant.id)
		.select("-password")
		.then((user) => res.json(user));
});

router.post("/register", (req, res) => {
	const { username, email, password, mobile } = req.body;

	applicantModel
		.findOne({ $or: [{ username }, { email }] })
		.then((applicant) => {
			if (applicant) {
				if (applicant.username === username) {
					return res.status(400).json({ msg: "username already exists!" });
				} else {
					return res.status(400).json({ msg: "email already exists!" });
				}
			}

			const newApplicant = new applicantModel({
				username,
				email,
				password,
				mobile,
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newApplicant.password, salt, (err, hash) => {
					if (err) throw err;
					newApplicant.password = hash;
					newApplicant
						.save()
						.then((applicant) => {
							jwt.sign(
								{ id: applicant._id },
								"domin",
								{ expiresIn: 3600 },
								(err, token) => {
									if (err) throw err;
									res.json({
										applicant: {
											token,
											id: applicant._id,
											username: applicant.username,
											email: applicant.email,
										},
									});
								}
							);
						})
						.catch((err) => {
							res.status(500).json({ msg: "internal server error" });
							console.log(err);
						});
				});
			});
		});
});

router.post("/login", (req, res) => {
	const { username, password } = req.body;

	applicantModel
		.findOne({ username })
		.then((applicant) => {
			if (!applicant)
				return res.status(400).json({ msg: "username does not exist" });

			bcrypt.compare(password, applicant.password).then((isMatch) => {
				if (!isMatch) return res.status(400).json({ msg: "wrong password" });

				jwt.sign(
					{ id: applicant._id },
					"domin",
					{ expiresIn: 3600 },
					(err, token) => {
						if (err) throw err;
						res.json({
							applicant: {
								token,
								id: applicant._id,
								username: applicant.username,
								email: applicant.email,
							},
						});
					}
				);
			});
		})
		.catch((err) => {
			res.status(500).json({ msg: "internal server error" });
			console.log(err);
		});
});

router.post("/uploadTestResults", auth, (req, res) => {
	const { testResult } = req.body;
	applicantModel
		.findOneAndUpdate({ _id: req.applicant.id }, { testResult })
		.then((doc) => res.json(doc))
		.catch((err) => console.error(err));
});

module.exports = router;
