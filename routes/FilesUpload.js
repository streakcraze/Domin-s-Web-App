const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const auth = require("../auth");

const router = express.Router();

const applicantModel = require("../models/Applicant");

const DIR = "./public/";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR);
	},
	filename: (req, file, cb) => {
		cb(null, uuidv4() + "-" + file.originalname);
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype == "application/msword" ||
			file.mimetype ==
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
			file.mimetype == "application/pdf"
		) {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error("Only .doc, .docx and .pdf format allowed!"));
		}
	},
});

/*
router.get("/", (req, res, next) => {
	applicantModel.find().then((data) => {
		res.status(200).json({
			message: "User list retrieved successfully!",
			users: data,
		});
	});
});
*/

router.post("/", auth, upload.single("resume"), (req, res) => {
	const url = req.protocol + "://" + req.get("host");
	applicantModel
		.findOneAndUpdate(
			{ _id: req.applicant.id },
			{ resume: url + "/public/" + req.file.filename }
		)
		.then((doc) => res.json(doc))
		.catch((err) => console.error(err));
});

module.exports = router;
