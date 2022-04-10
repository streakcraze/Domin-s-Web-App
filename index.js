const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//import routes
const postItemsRoute = require("./routes/postItems.js");
const getItemsRoute = require("./routes/getItems");
const getSpecificItem = require("./routes/getSpecificItem");
const recruiterSignUp = require("./routes/recruiterSignUp");
const recruiterSignIn = require("./routes/recruiterSignIn");
const applicantsRouter = require("./routes/applicants");
const resumeUpload = require("./routes/FilesUpload");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//connect to the database
const mongoURI =
	"mongodb+srv://arnold_odhis4:xKoK9RqRehzDKjyw@cluster0.fzhrm.mongodb.net/ikazidb?retryWrites=true&w=majority";

mongoose
	.connect(mongoURI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	})
	.then(() => console.log("Successfuly connected to mongoDB"))
	.catch((err) => console.error(err));

//set apis
app.use("/api/postitems", postItemsRoute);
app.use("/api/getitems", getItemsRoute);
app.use("/api/getspecific", getSpecificItem);
app.use("/api/recruitersignup", recruiterSignUp);
app.use("/api/recruitersignin", recruiterSignIn);
app.use("/api/applicants", applicantsRouter);
app.use("/api/uploadfile", resumeUpload);

//listen to port
app.listen(5000, () => {
	console.log("Server running on port 5000");
});
