import React, { useState } from "react";
import { API } from "../backend";
import Base from "../core/Base";

const NewPassword = ({ match, history }) => {
	const [pass1, setPass1] = useState("");
	const [pass2, setPass2] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const onSubmit = e => {
		e.preventDefault();
		setLoading(true);
		fetch(`${API}/forgot/${match.params.token}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ pass1, pass2 }),
		})
			.then(R => R.json())
			.then(resp => {
				if (resp.error) setError(resp.error);
				else {
					setSuccess(true);
					setError("");
					setTimeout(() => {
						history.push("/signin");
					}, 3000);
				}
				setLoading(false);
			})
			.catch(console.log);
	};

	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-danger"
						style={{ display: error ? "" : "none" }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	const successMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-success"
						style={{ display: success ? "" : "none" }}
					>
						Password updated successfully. Taking you to the signin page...
					</div>
				</div>
			</div>
		);
	};

	return (
		<Base title="Forgot password" description="Enter your new password here.">
			{loading ? (
				<img
					style={{ width: "200px" }}
					src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
					alt="loading"
				/>
			) : (
				<div className="row">
					<div className="col-md-6 offset-sm-3 text-left">
						{errorMessage()}
						{successMessage()}
						<form>
							<div className="form-group">
								<label className="text-light">Enter new password</label>
								<input
									style={{ marginBottom: "20px" }}
									onChange={e => setPass1(e.target.value)}
									className="form-control"
									type="password"
								></input>
								<label className="text-light">Same password again</label>
								<input
									style={{ marginBottom: "20px" }}
									onChange={e => setPass2(e.target.value)}
									className="form-control"
									type="password"
								></input>
								<button
									type="submit"
									onClick={onSubmit}
									className="btn btn-success btn-block"
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</Base>
	);
};

export default NewPassword;
