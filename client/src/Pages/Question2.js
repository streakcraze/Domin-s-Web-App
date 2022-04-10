import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { ApplicantContext } from "../context/ApplicantContext";
import "./RecruiterSignUp.css";
import img1 from "./img1.jpg";

export default function Question2() {
	const [selectedOption, setSelectedOption] = useState(null);
	const [answered, setAnswered] = useState(false);
	const [error, setError] = useState("");

	let { questionPassed } = useContext(ApplicantContext);

	const onValueChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const formSubmit = (event) => {
		event.preventDefault();
		if (!selectedOption) {
			return setError("Kindly Select an Answer To Proceed");
		}

		selectedOption === "A"
			? questionPassed({ "Question 2": true })
			: questionPassed({ "Question 2": false });

		setAnswered(true);
	};

	if (answered) {
		return (
			<Redirect
				push
				to={{
					pathname: "/question3",
				}}
			/>
		);
	}
	return (
		<div>
			<div className="Vid">
				<img src={img1} alt="" />
			</div>

			<div>
				<div
					className="container"
					style={{ marginTop: "130px", width: "600px", letterSpacing: "2px" }}
				>
					<div>
						<h1>Question 2</h1>
						<label>
							Supervisors who always insist on enforcing rules don'target
							understand the reality of the workplace.
						</label>{" "}
						<br />
						<form onSubmit={formSubmit}>
							<div className="radio">
								<label>
									<input
										type="radio"
										value="A"
										checked={selectedOption === "A"}
										onChange={onValueChange}
									/>
									A. Strongly Agree
								</label>
							</div>

							<div className="radio">
								<label>
									<input
										type="radio"
										value="B"
										checked={selectedOption === "B"}
										onChange={onValueChange}
									/>
									B. Agree
								</label>
							</div>

							<div className="radio">
								<label>
									<input
										type="radio"
										value="C"
										checked={selectedOption === "C"}
										onChange={onValueChange}
									/>
									C. Neutral
								</label>
							</div>

							<div className="radio">
								<label>
									<input
										type="radio"
										value="D"
										checked={selectedOption === "D"}
										onChange={onValueChange}
									/>
									D. Disagree
								</label>
							</div>
							<br />
							{error ? (
								<div class="alert alert-primary" role="alert">
									<strong>{error}</strong>
								</div>
							) : null}
							<button className="btn btn-default" type="submit">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
