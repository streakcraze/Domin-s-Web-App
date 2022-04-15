import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import NavBar from "../components/views/NavBar";
import axios from "axios";
import "./RecruiterSignUp.css";
import img1 from "./img1.jpg";

export class ApplicantSignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			success: false,
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

		const data = this.state;

		axios
			.post("http://localhost:5000/api/applicants/login", data)
			.then((res) => {
				this.setState({
					username: "",
					password: "",
					success: true,
				});
				window.localStorage.setItem("ikazi-token", res.data.applicant.token);
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		if (this.state.success) {
			return (
				<Redirect
					to={{
						pathname: "/applicantlandingpage",
						search: "?utm=your+face",
						state: { username: this.state.username },
					}}
				/>
			);
		}
		return (
			<div>
				<NavBar />
				<div className="Vid">
					<img src={img1} alt="" />
				</div>

				<div
					className="container"
					style={{ marginTop: "130px", width: "600px", letterSpacing: "2px" }}
				>
					<div>
						<h1>Applicant Sign In</h1>
						<label>username :</label>{" "}
						<input
							type="text"
							id="username"
							onChange={this.changeInput}
							placeholder="username..."
						/>
						<br />
						<label>password :</label>{" "}
						<input
							type="password"
							id="password"
							onChange={this.changeInput}
							placeholder="password..."
						/>
						<br />
						<input
							type="button"
							value="submit"
							id="btn"
							onClick={this.submit}
						/>
						<p>
							If you do not have an account{" "}
							<Link to="/applicantsignup">Sign Up</Link>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default ApplicantSignIn;
