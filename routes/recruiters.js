const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth");

const recruiterModel = require("../models/Recruiter");

router.get("/", auth, (req, res) => {
	recruiterModel
		.findById(req.user.id)
		.select("-password")
		.then((user) => res.json(user))
		.catch((err) => console.error(err));
});

router.get("/users", (req, res) => {
	recruiterModel
		.find()
		.select("-password")
		.then((users) => res.json(users))
		.catch((err) => console.log(err));
});

router.post("/register", (req, res) => {
	const { username, email, password, mobile } = req.body;

	recruiterModel
		.findOne({ $or: [{ username }, { email }] })
		.then((recruiter) => {
			if (recruiter) {
				if (recruiter.username === username) {
					return res.status(400).json({ msg: "username already exists!" });
				} else {
					return res.status(400).json({ msg: "email already exists!" });
				}
			}

			const newRecruiter = new recruiterModel({
				username,
				email,
				password,
				mobile,
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newRecruiter.password, salt, (err, hash) => {
					if (err) throw err;
					newRecruiter.password = hash;
					newRecruiter
						.save()
						.then((recruiter) => {
							jwt.sign(
								{ id: recruiter._id },
								"domin",
								{ expiresIn: 3600 },
								(err, token) => {
									if (err) throw err;
									res.json({
										recruiter: {
											token,
											id: recruiter._id,
											username: recruiter.username,
											email: recruiter.email,
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

	recruiterModel
		.findOne({ username })
		.then((recruiter) => {
			if (!recruiter)
				return res.status(400).json({ msg: "username does not exist" });

			bcrypt.compare(password, recruiter.password).then((isMatch) => {
				if (!isMatch) return res.status(400).json({ msg: "wrong password" });

				jwt.sign(
					{ id: recruiter._id },
					"domin",
					{ expiresIn: 3600 },
					(err, token) => {
						if (err) throw err;
						res.json({
							recruiter: {
								token,
								id: recruiter._id,
								username: recruiter.username,
								email: recruiter.email,
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

module.exports = router;
