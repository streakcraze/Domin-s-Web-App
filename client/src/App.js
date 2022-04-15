import React from "react";
import { Route, Switch } from "react-router-dom";
// pages for this product
import LandingPage from "./components/views/LandingPage.js";
import RecruiterSignIn from "./Pages/RecruiterSignIn";
import ApplicantSignIn from "./Pages/ApplicantSignIn";
import ApplicantSignUp from "./Pages/ApplicantSignUp";
import RecruiterSignUp from "./Pages/RecruiterSignUp";
import RecruiterLandingPage from "./Pages/RecruiterLandingPage";
import ApplicantLandingPage from "./Pages/ApplicantLandingPage";
import JobsUpload from "./Pages/JobsUpload";
import ViewVacancies from "./Pages/ViewVacancies";
import FileUpload from "./Pages/FileUpload";
import Question1 from "./Pages/Question1";
import Question2 from "./Pages/Question2";
import Question3 from "./Pages/Question3";
import Question4 from "./Pages/Question4";
import Question5 from "./Pages/Question5";

function App() {
	return (
		<>
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/recruitersignin" component={RecruiterSignIn} />
				<Route exact path="/applicantsignin" component={ApplicantSignIn} />
				<Route exact path="/applicantsignup" component={ApplicantSignUp} />
				<Route exact path="/recruitersignup" component={RecruiterSignUp} />
				<Route
					exact
					path="/recruiterlandingpage"
					component={RecruiterLandingPage}
				/>
				<Route
					exact
					path="/applicantlandingpage"
					component={ApplicantLandingPage}
				/>
				<Route exact path="/jobsupload" component={JobsUpload} />
				<Route exact path="/viewvacancies" component={ViewVacancies} />
				<Route exact path="/fileupload" component={FileUpload} />
				<Route exact path="/question1" component={Question1} />
				<Route exact path="/question2" component={Question2} />
				<Route exact path="/question3" component={Question3} />
				<Route exact path="/question4" component={Question4} />
				<Route exact path="/question5" component={Question5} />
			</Switch>
		</>
	);
}

export default App;
