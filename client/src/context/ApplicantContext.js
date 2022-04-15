import React, { createContext, useState } from "react";
import axios from "axios";

export const ApplicantContext = createContext();

export default function ApplicantContextProvider(props) {
	const [quizResults, setQuizResults] = useState({});
	const [loginError, setLoginError] = useState(false);

	const questionPassed = (questionResult) => {
		let obj = { ...quizResults, ...questionResult };
		setQuizResults(obj);
	};

	const compileResults = () => {
		const asArray = Object.entries(quizResults);
		const correctAnswers = asArray.filter(
			([key, value]) => value === true
		).length;
		const testResult = `${(correctAnswers / 5) * 100}%`;
		console.log(quizResults);
		console.log(testResult);

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
					"http://localhost:5000/api/applicants/uploadTestResults",
					{ testResult },
					config
				)
				.then((res) => {
					console.log(res);
					resolve();
				})
				.catch((err) => {
					console.log(err);
					setLoginError(true);
					reject();
				});
		});
	};

	return (
		<ApplicantContext.Provider
			value={{ questionPassed, compileResults, loginError }}
		>
			{props.children}
		</ApplicantContext.Provider>
	);
}
