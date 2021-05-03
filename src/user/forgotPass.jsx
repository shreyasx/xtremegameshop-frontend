import React, { useState } from "react";
import { API } from "../backend";
import Base from "../core/Base";
import { toast } from "react-toastify";

const ForgotPassword = ({ match }) => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const onSubmit = e => {
		e.preventDefault();
		setLoading(true);
		fetch(`${API}/sendResetPasswordLink`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		})
			.then(R => R.json())
			.then(resp => {
				if (resp === true)
					toast("Password reset link sent!", { type: "success" });
				else toast("Check your email address!", { type: "error" });
				setLoading(false);
			})
			.catch(console.log);
	};

	return (
		<Base
			title="Forgot password?"
			description="No worries. We will email you a link to reset your password."
		>
			{loading ? (
				<img
					style={{ width: "200px" }}
					src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
					alt="loading"
				/>
			) : (
				<div className="row">
					<div className="col-md-6 offset-sm-3 text-left">
						<form>
							<div className="form-group">
								<label className="text-light">Enter your account email</label>
								<input
									style={{ marginBottom: "40px" }}
									onChange={e => setEmail(e.target.value)}
									className="form-control"
									type="email"
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

export default ForgotPassword;
