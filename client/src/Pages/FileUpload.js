import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./FileUpload.css";
import img1 from "./img1.jpg";

class FileUpload extends Component {
	state = {
		selectedFile: null,
		uploadSuccess: false,
		loginError: false,
	};

	// On file select (from the pop up)
	onFileChange = (event) => {
		this.setState({ selectedFile: event.target.files[0] });
	};

	// On file upload (click the upload button)
	onFileUpload = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("resume", this.state.selectedFile);

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
				.post("http://localhost:5000/api/uploadfile", formData, config)
				.then((res) => {
					console.log(res);
					this.setState({ uploadSuccess: true });
					resolve();
				})
				.catch((err) => {
					console.log(err);
					this.setState({ loginError: true });
					reject();
				});
		});
	};

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

		if (this.state.uploadSuccess) {
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
				className="container"
				style={{ marginTop: "130px", letterSpacing: "2px" }}
			>
				<div className="Vid">
					<img src={img1} alt="" />
				</div>

				<div className="row">
					<form onSubmit={this.onFileUpload}>
						<h3>Resume Upload</h3>
						<div className="form-group">
							<input type="file" onChange={this.onFileChange} />
						</div>
						<div className="form-group">
							<button className="btn1" type="submit">
								Upload
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default FileUpload;
