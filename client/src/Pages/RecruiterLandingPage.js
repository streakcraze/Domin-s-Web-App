import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./RecruiterSignUp.css";
import img2 from "./img2.jpg";
import pdfIcon from "../components/pdf.svg";

export default function RecruiterLandingPage() {
	const [applications, setApplications] = useState([]);
	const [recruiterName, setRecruiterName] = useState();
	const [loginError, setLoginError] = useState(false);

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
				.get("http://localhost:5000/api/recruiters", config)
				.then((res) => {
					console.log(res);
					setRecruiterName(res.data.username);
					resolve();
				})
				.catch((err) => {
					console.log(err);
					setLoginError(true);
					reject();
				});
		});
	}, []);

	const viewApplications = applications.map((application) => {
		return (
			<div
				key={`${application._id}`}
				style={{
					backgroundColor: "green",
					margin: "20px",
					padding: "10px",
					borderRadius: "20px",
					border: "2px",
				}}
			>
				<p style={{ color: "white" }}>job title: {application.jobTitle}</p>
				<p style={{ color: "white" }}>
					job description: {application.jobDescription}
				</p>
				<p style={{ color: "white" }}>
					job location: {application.jobLocation}
				</p>
				<p style={{ color: "white" }}>
					work experience: {application.workExperience}
				</p>
				<p style={{ color: "white" }}>applicants: </p>
				{application.applicantsList.map((applicant) => {
					return (
						<ul
							key={`${applicant._id}`}
							style={{ padding: "3px", marginLeft: "5px", listStyle: "none" }}
						>
							<li>username: {applicant.username}</li>
							<li>email: {applicant.email}</li>
							<li>mobile: {applicant.mobile}</li>
							<li>test result: {applicant.testResult}</li>
							<li>
								resume:{" "}
								<a
									href={applicant.resume}
									download
									rel="noopener noreferrer"
									target="_blank"
								>
									<img
										src={pdfIcon}
										style={{
											position: "static",
											height: "20px",
											width: "20px",
										}}
										alt="pdf-icon"
									/>
								</a>
							</li>
						</ul>
					);
				})}
			</div>
		);
	});

	const retrieveApplications = () => {
		axios
			.get(`http://localhost:5000/api/vacancies/${recruiterName}`)
			.then((res) => {
				console.log(res.data);
				setApplications(res.data);
			})
			.catch((err) => console.log(err));
	};

	if (loginError) {
		return (
			<Redirect
				to={{
					pathname: "/recruitersignin",
				}}
			/>
		);
	}

	return (
		<div>
			<div className="Vid">
				<img src={img2} alt="" />
			</div>
			Welcome
			<div className="section1">
				<p>
					Be able to upload available job vacancies.
					<br />
					Browse the various applicants and resumes
				</p>
			</div>
			<Link to="/jobsupload">
				<button type="button" value="submit" id="btn">
					Post Vacancy
				</button>
			</Link>
			<button
				type="button"
				value="submit"
				id="btn1"
				onClick={retrieveApplications}
			>
				View Applications
			</button>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
				}}
			>
				{applications.length > 0 && viewApplications}
			</div>
		</div>
	);
}
