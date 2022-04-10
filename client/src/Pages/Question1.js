import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { ApplicantContext } from "../context/ApplicantContext";
import "./RecruiterSignUp.css";
import img1 from "./img1.jpg";

export default function Question1() {
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
			? questionPassed({ "Question 1": true })
			: questionPassed({ "Question 1": false });

		setAnswered(true);
	};

	if (answered) {
		return (
			<Redirect
				push
				to={{
					pathname: "/question2",
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
						<h1>Question 1</h1>
						<label>
							Solve for the positive value of ‘y’ for the following equation:
							<br />
							(1/2)y2 - x2 = x/2 where x=4 
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
									A. 18.5
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
									B. 4.5
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
									C. 6
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
									D. 9
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
