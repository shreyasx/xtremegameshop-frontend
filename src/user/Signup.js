import React, { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper";
import Buttons from "./social-buttons";
import { toast } from "react-toastify";
import { authenticate, isAuthenticated } from "../auth/helper";
import { Redirect } from "react-router-dom";
import Particles from "react-particles-js";
import bodyConfig from "../body";

const Signup = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		loading: false,
		didRedirect: false,
	});

	const { name, email, password, loading, didRedirect } = values;
	const { user } = isAuthenticated();

	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value });
	};

	const onSubmit = event => {
		event.preventDefault();
		setValues({ ...values, loading: true });
		signup({ name, email, password })
			.then(data => {
				if (data.error) {
					setValues({ ...values, loading: false });
					toast(data.error, { type: "error" });
				} else {
					authenticate(data, () => {
						setValues({
							...values,
							didRedirect: true,
						});
					});
				}
			})
			.catch(er => {
				console.log("Signin request failed");
			});
	};

	const signupForm = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<form>
						<div className="form-group">
							<label className="text-light">Name</label>
							<input
								className="form-control"
								onChange={handleChange("name")}
								type="text"
								value={name}
							></input>
						</div>
						<div className="form-group">
							<label className="text-light">Email-Id</label>
							<input
								className="form-control"
								onChange={handleChange("email")}
								type="email"
								value={email}
							></input>
						</div>
						<div className="form-group">
							<label className="text-light">Password</label>
							<input
								className="form-control"
								onChange={handleChange("password")}
								type="password"
								value={password}
							></input>
						</div>
						<button onClick={onSubmit} className="btn btn-success btn-block">
							Submit
						</button>
						<Buttons setValues={setValues} values={values} />
					</form>
				</div>
			</div>
		);
	};

	const loadingMessage = () => {
		return (
			loading && (
				<div className="alert alert-info">
					<h2>Loading...</h2>
				</div>
			)
		);
	};

	const performRedirect = () => {
		if (didRedirect) {
			if (user && user.role === 1) {
				return <Redirect to="/admin/dashboard" />;
			} else {
				return <Redirect to="/user/dashboard" />;
			}
		}

		if (isAuthenticated()) {
			return <Redirect to="/" />;
		}
	};

	return (
		<>
			<Particles params={bodyConfig} />
			<Base
				title="Signup to Xtreme Gameshop"
				description="Signup now to be able to buy your favourite games!"
			>
				{loadingMessage()}
				{signupForm()}
				{performRedirect()}
			</Base>
		</>
	);
};

export default Signup;
