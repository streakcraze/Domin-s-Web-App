import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./RecruiterSignUp.css";
import img2 from "./img2.jpg";

export default function RecruiterLandingPage() {
	const [applicantList, setApplicantList] = useState([]);

	const viewApplicants = applicantList.map((applicant) => {
		return (
			<div
				key={`${applicant.username}`}
				style={{
					backgroundColor: "green",
					margin: "20px",
					padding: "10px",
					borderRadius: "20px",
					border: "2px",
				}}
			>
				<p style={{ color: "white" }}>username: {applicant.username}</p>
				<p style={{ color: "white" }}>email: {applicant.email}</p>
				<p style={{ color: "white" }}>mobile: {applicant.mobile}</p>
				<p style={{ color: "white" }}>test result: {applicant.testResult}</p>
			</div>
		);
	});

	const retrieveApplicants = () => {
		axios
			.get("http://localhost:5000/api/applicants/users")
			.then((res) => {
				console.log(res.data);
				setApplicantList(res.data);
			})
			.catch((err) => console.log(err));
	};

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
				onClick={retrieveApplicants}
			>
				View Applicants
			</button>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
				}}
			>
				{applicantList.length > 0 && viewApplicants}
			</div>
		</div>
	);
}
