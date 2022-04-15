import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./RecruiterSignUp.css";
import img2 from "./img2.jpg";

export class jobsUpload extends Component {
	constructor(props) {
		super(props);

		this.state = {
			jobTitle: "",
			jobDescription: "",
			jobLocation: "",
			workExperience: "",
			success: false,
			loginError: false,
		};

		this.submit = this.submit.bind(this);
		this.changeInput = this.changeInput.bind(this);
	}

	changeInput = (event) => {
		this.setState({
			[event.target.id]: event.target.value,
		});
	};

	submit = (event) => {
		event.preventDefault();
		console.log("submit button clicked");
		const data = this.state;

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
				.post("http://localhost:5000/api/vacancies", data, config)
				.then((res) => {
					this.setState({
						jobTitle: "",
						jobDescription: "",
						jobLocation: "",
						workExperience: "",
						success: true,
					});
					console.log(res);
					resolve();
				})
				.catch((err) => {
					console.log(err);
					this.setState({ loginError: true });
					reject({ register: err.response.data.msg });
				});
		});
	};

	render() {
		if (this.state.loginError) {
			return (
				<Redirect
					to={{
						pathname: "/recruitersignin",
					}}
				/>
			);
		}

		if (this.state.success) {
			return (
				<Redirect
					to={{
						pathname: "/recruiterlandingpage",
					}}
				/>
			);
		}

		return (
			<div>
				<div className="Vid">
					<img src={img2} alt="" />
				</div>

				<div
					className="container"
					style={{ marginTop: "130px", width: "600px", letterSpacing: "2px" }}
				>
					<div>
						<h1>Vacancy Update Form</h1>
						<label>Job Title :</label>{" "}
						<input
							type="text"
							id="jobTitle"
							onChange={this.changeInput}
							placeholder="Job Title..."
						/>
						<br />
						<label>Job Description :</label>{" "}
						<input
							type="text"
							id="jobDescription"
							onChange={this.changeInput}
							placeholder="Job description..."
						/>
						<br />
						<label>Job Location :</label>{" "}
						<input
							type="text"
							id="jobLocation"
							onChange={this.changeInput}
							placeholder="Location..."
						/>
						<br />
						<label>Work Experience :</label>{" "}
						<input
							type="text"
							id="workExperience"
							onChange={this.changeInput}
							placeholder="In years..."
						/>
						<br />
						<button
							type="button"
							value="submit"
							id="btn1"
							onClick={this.submit}
						>
							{" "}
							Submit{" "}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default jobsUpload;
