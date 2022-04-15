import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import NavBar from "../components/views/NavBar";
import "./RecruiterSignUp.css";
import axios from "axios";
import img2 from "./img2.jpg";

export class RecruiterSignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			email: "",
			password: "",
			signUpError: "",
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
			.post("http://localhost:5000/api/recruiters/register", data)
			.then((res) => {
				this.setState({
					username: "",
					email: "",
					password: "",
					signUpError: "",
					success: true,
				});
				console.log(res);
			})
			.catch((err) => {
				this.setState({ signUpError: err });
				console.log(err);
			});
	};

	render() {
		if (this.state.success) {
			return <Redirect to="/recruitersignin" />;
		}
		return (
			<div>
				<NavBar />
				<div className="Vid">
					<img src={img2} alt="" />
				</div>

				<div
					className="container"
					style={{ marginTop: "130px", width: "550px", letterSpacing: "2px" }}
				>
					<div>
						<h1>Recruiter Sign Up</h1>
						<label>username :</label>{" "}
						<input
							type="text"
							id="username"
							onChange={this.changeInput}
							placeholder="johndoe..."
						/>
						<br />
						<label>email :</label>{" "}
						<input
							type="email"
							id="email"
							onChange={this.changeInput}
							placeholder="johndoe@gmail.com..."
						/>
						<br />
						<label>password :</label>{" "}
						<input
							type="password"
							id="password"
							onChange={this.changeInput}
							placeholder="******..."
						/>
						<br />
						{this.state.signUpError ? this.state.signUpError : ""}
						<br />
						<input
							type="button"
							value="submit"
							id="btn"
							onClick={this.submit}
						/>
						<p>
							If you have an account <Link to="/recruitersignin">Sign In</Link>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default RecruiterSignUp;
