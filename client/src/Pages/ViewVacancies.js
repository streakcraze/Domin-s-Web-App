import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./vacancies.css";

export class ViewVacancies extends Component {
	constructor(props) {
		super(props);

		this.state = {
			vacancies: [],
			applicationSuccess: false,
			loginError: false,
		};

		this.submit = this.submit.bind(this);
		this.getVacancies = this.getVacancies.bind(this);
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/api/vacancies")
			.then((response) => {
				console.log(response);
				this.setState({
					vacancies: response.data,
				});
			})
			.catch((err) => console.log(err));
	}

	submit(event, vacancyId) {
		event.preventDefault();

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
				.post(
					"http://localhost:5000/api/vacancies/apply",
					{ vacancyId },
					config
				)
				.then((res) => {
					console.log(res);
					alert("Success");
					this.setState({ applicationSuccess: true });
					resolve();
				})
				.catch((err) => {
					console.log(err);
					this.setState({ loginError: true });
					reject();
				});
		});
	}

	getVacancies() {
		return this.state.vacancies.map((vacancy) => (
			<div className="wrapper" key={vacancy._id}>
				<div className="outer">
					<div className="content animated fadeInLeft">
						<span className="bg animated fadeInDown">{vacancy.jobTitle}</span>
						<h1>{vacancy.jobDescription}</h1>

						<p>{vacancy.jobLocation}</p>
						<p>{vacancy.workExperience}</p>
						<div className="button">
							<button
								className="cart-btn"
								onClick={(event) => this.submit(event, vacancy._id)}
							>
								<i className="cart-icon ion-bag"></i>APPLY JOB
							</button>
						</div>
					</div>
				</div>
			</div>
		));
	}
	render() {
		if (this.state.loginError) {
			return (
				<Redirect
					to={{
						pathname: "/applicantsignin",
					}}
				/>
			);
		}

		if (this.state.applicationSuccess) {
			return (
				<Redirect
					to={{
						pathname: "/applicantlandingpage",
						search: "?utm=your+face",
					}}
				/>
			);
		}

		return (
			<div
				style={{
					flexDirection: "column",
					alignItems: "center",
					backgroundColor: "#262626",
				}}
			>
				{this.getVacancies()}
			</div>
		);
	}
}

export default ViewVacancies;
