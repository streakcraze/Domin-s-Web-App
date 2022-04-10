import React, { useEffect } from "react";
import "./RecruiterSignUp.css";
import img1 from "./img1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

function ApplicantLandingPage() {
	useEffect(() => {
		new Promise((resolve, reject) => {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};
			const token = window.localStorage.getItem("ikazi-token");

			if (token) {
				config.headers["x-auth-token"] = token;
			}

			axios
				.get("http://localhost:5000/api/applicants", config)
				.then((res) => {
					console.log(res);
					resolve();
				})
				.catch((err) => {
					console.log(err);
					reject({ register: err.response.data.msg });
				});
		});
	}, []);

	return (
		<>
			(
			<div>
				<div className="Vid">
					<img src={img1} alt="" />
				</div>
				Welcome
				<div className="section2">
					<p>
						Get access to available job vacancies
						<br />
						Upload Resumes, take skill test
					</p>
				</div>
				<Link to="/question1">
					<button type="button" value="submit" id="btn">
						Take Skill Test
					</button>
				</Link>
				<Link to="/fileupload">
					<button type="button" value="submit" id="btn1">
						Upload Resume
					</button>
				</Link>
				<Link to="/viewvacancies">
					<button type="button" value="submit" id="btn2">
						View Vacancies
					</button>
				</Link>
			</div>
			);
		</>
	);
}

export default ApplicantLandingPage;
