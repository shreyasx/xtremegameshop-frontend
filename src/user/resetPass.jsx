import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { signin, isAuthenticated } from "../auth/helper";
import { API } from "../backend";

const ResetPassword = () => {
	const [loading, setLoading] = useState(true);
	const [current, setCurrent] = useState("");
	const [newP, setNew] = useState("");
	const [newP2, setNew2] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [status, setStatus] = useState("");

	useEffect(() => {
		fetch(`${API}/getStatus/${isAuthenticated().user._id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${isAuthenticated().token}`,
			},
		})
			.then(R => R.json())
			.then(stat => {
				setStatus(stat);
				setLoading(false);
			})
			.catch(console.log);
	}, []);

	const successMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-success"
						style={{ display: success ? "" : "none" }}
					>
						Password updated successfully.
					</div>
				</div>
			</div>
		);
	};

	const linked = () => {
		if (newP !== newP2) {
			setError("Passwords must be the same!");
			return;
		}
		fetch(`${API}/update/${isAuthenticated().user._id}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${isAuthenticated().token}`,
			},
			body: JSON.stringify({ pass1: newP, pass2: newP2 }),
		})
			.then(R => R.json())
			.then(resp => {
				if (resp.error) {
					setError(resp.error);
					setSuccess(false);
					return;
				}
				setSuccess(true);
				setError("");
			})
			.catch(console.log);
	};

	const nonlinked = user => {
		signin(user).then(data => {
			if (data.error) {
				setError("Incorrect password. Try again");
				return;
			} else {
				if (newP !== newP2) {
					setError("Passwords must be the same!");
					return;
				}
				fetch(`${API}/update/${isAuthenticated().user._id}`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${isAuthenticated().token}`,
					},
					body: JSON.stringify({ pass1: newP, pass2: newP2 }),
				})
					.then(R => R.json())
					.then(resp => {
						if (resp.error) {
							setError(resp.error);
							setSuccess(false);
							return;
						}
						setSuccess(true);
						setError("");
					})
					.catch(console.log);
			}
		});
	};

	const onSubmit = ev => {
		ev.preventDefault();
		if (status === "linked") linked();
		else {
			const user = { email: isAuthenticated().user.email, password: current };
			nonlinked(user);
		}
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

	return (
		<Base title="Reset Password" description="">
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
							{status === "not linked" && (
								<div className="form-group">
									<label className="text-light">Current password</label>
									<input
										onChange={ev => {
											setCurrent(ev.target.value);
										}}
										className="form-control"
										type="password"
									/>
								</div>
							)}
							<div className="form-group">
								<label className="text-light">New password</label>
								<input
									onChange={ev => {
										setNew(ev.target.value);
									}}
									className="form-control"
									type="password"
								/>
							</div>
							<div className="form-group">
								<label className="text-light">New password (again)</label>
								<input
									onChange={ev => {
										setNew2(ev.target.value);
									}}
									className="form-control"
									type="password"
								/>
							</div>
							<button onClick={onSubmit} className="btn btn-success btn-block">
								Submit
							</button>
						</form>
					</div>
				</div>
			)}
		</Base>
	);
};

export default ResetPassword;
