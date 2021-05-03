import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { API } from "../backend";
import { toast } from "react-toastify";

const UserDashboard = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [verified, setVerified] = useState(true);

	const isVerified = () => {
		fetch(`${API}/user/${isAuthenticated().user._id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${isAuthenticated().token}`,
			},
		})
			.then(R => R.json())
			.then(setVerified)
			.catch(console.log);
	};

	useEffect(isVerified);

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

	const loadingMessage = () => {
		return (
			loading && (
				<div className="alert alert-info">
					<h2>
						Please wait while we send an email to the email-address linked with
						your account.
					</h2>
				</div>
			)
		);
	};

	return (
		<Base title="User Dashboard">
			{loadingMessage()}
			{errorMessage()}
			<h1 className="text-white">
				Hey, {isAuthenticated().user.name}. This is your User-Dashboard.
			</h1>
			<div style={{ margin: "20px", fontSize: "1.3em" }} className="list">
				<ul>
					<li>
						<Link to="/purchases">View all purchases</Link>
					</li>
					<li>
						<Link to="/reset-password">Reset password</Link>
					</li>
					{/* <li>
						<Link to="/update-email">Update your account email</Link>
					</li> */}
					<li>
						<Link to="/delete-account">Permanently delete your account</Link>
					</li>
					{!verified && (
						<li>
							<span
								id="verifyEmailAddressLink"
								onClick={() => {
									setLoading(true);
									fetch(`${API}/verify/${isAuthenticated().user._id}`, {
										method: "GET",
										headers: {
											Accept: "application/json",
											"Content-Type": "application/json",
											Authorization: `Bearer ${isAuthenticated().token}`,
										},
									})
										.then(R => R.json())
										.then(resp => {
											if (resp.error) {
												setError(resp.error);
												return;
											}
											toast(
												"A mail has been sent your email address with a link verify your account.",
												{ type: "success" }
											);
											setLoading(false);
										})
										.catch(console.log);
								}}
							>
								Verify email address
							</span>
						</li>
					)}
				</ul>
			</div>
		</Base>
	);
};

export default UserDashboard;
