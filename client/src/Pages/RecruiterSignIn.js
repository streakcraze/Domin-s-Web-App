import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import NavBar from "../components/views/NavBar";
import axios from "axios";
import "./RecruiterSignUp.css";
import img2 from "./img2.jpg";

export class RecruiterSignIn extends Component {
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
			.post("http://localhost:5000/api/recruiters/login", data)
			.then((res) => {
				this.setState({
					username: "",
					password: "",
					success: true,
				});
				window.localStorage.setItem("ikazi-token", res.data.recruiter.token);
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
						pathname: "/recruiterlandingpage",
						search: "?utm=your+face",
						state: { userName: this.state.userName },
					}}
				/>
			);
		}
		return (
			<div>
				<NavBar />
				<div className="Vid">
					<img src={img2} alt="" />
				</div>

				<div
					className="container"
					style={{ marginTop: "130px", width: "600px", letterSpacing: "2px" }}
				>
					<div>
						<h1>Recruiter Sign In</h1>
						<label>username :</label>{" "}
						<input
							type="text"
							id="username"
							onChange={this.changeInput}
							placeholder="johndoe..."
						/>
						<br />
						<label>password :</label>{" "}
						<input
							type="password"
							id="password"
							onChange={this.changeInput}
							placeholder="johndoe@gmail.com..."
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
							<Link to="/recruitersignup">Sign Up</Link>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default RecruiterSignIn;
