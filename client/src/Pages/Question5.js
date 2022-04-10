import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { ApplicantContext } from "../context/ApplicantContext";
import "./RecruiterSignUp.css";
import img1 from "./img1.jpg";

export default function Question5() {
	const [selectedOption, setSelectedOption] = useState(null);
	const [answered, setAnswered] = useState(false);
	const [error, setError] = useState("");

	let { questionPassed, compileResults } = useContext(ApplicantContext);

	const onValueChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const formSubmit = (event) => {
		event.preventDefault();
		if (!selectedOption) {
			return setError("Kindly Select an Answer To Proceed");
		}

		selectedOption === "A"
			? questionPassed({ "Question 5": true })
			: questionPassed({ "Question 5": false });

		setAnswered(true);
	};

	if (answered) {
		compileResults();
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
		<div>
			<div className="Vid">
				<img src={img1} alt="" />
			</div>

			<div>
				<div>
					<div
						className="container"
						style={{ marginTop: "130px", width: "600px", letterSpacing: "2px" }}
					>
						<div>
							<h1>Question 5</h1>
							<label>
								A user is encountering a problem where part of their email
								signature is appearing to others as a separate attachment.
								<br />
								Which of the following could fix this issue?
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
										A. Remove images from the signature.
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
										B.Change the email format to HTML.
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
										C. Use animated GIFs to slowly display the signature.
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
										D. Scale the signature to 50%.
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
		</div>
	);
}
