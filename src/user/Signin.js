import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect, Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";
import FacebookLogin from "react-facebook-login";
import { API } from "../backend";
import { GoogleLogin } from "react-google-login";
import { toast } from "react-toastify";

const Signin = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		loading: false,
		didRedirect: false,
	});

	const { email, password, error, loading, didRedirect } = values;
	const { user } = isAuthenticated();

	const handleChange = name => event => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = event => {
		event.preventDefault();
		setValues({ ...values, loading: true });
		signin({ email, password })
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

	const loadingMessage = () => {
		return (
			loading && (
				<div className="alert alert-info">
					<h2>Loading...</h2>
				</div>
			)
		);
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

	const signinForm = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<form>
						<div className="form-group">
							<label className="text-light">Email-Id</label>
							<input
								onChange={handleChange("email")}
								value={email}
								className="form-control"
								type="email"
							></input>
						</div>
						<div className="form-group">
							<label className="text-light">Password</label>
							<input
								onChange={handleChange("password")}
								value={password}
								className="form-control"
								type="password"
							></input>
						</div>
						<div style={{ margin: "20px auto", fontSize: "1.2em" }}>
							<Link className="forgot" to="/forgot-password">
								Don't remember your password?
							</Link>
						</div>
						<button onClick={onSubmit} className="btn btn-success btn-block">
							Submit
						</button>
						<div
							className="fb-login"
							style={{ textAlign: "center", margin: "20px auto" }}
						>
							<FacebookLogin
								appId="432706677778563"
								autoLoad={false}
								fields="name,email"
								onClick={componentClicked}
								callback={responseFacebook}
							/>
							<GoogleLogin
								clientId="327673455287-3gd4knbeek3bsb86tkbcl29oagpppbg4.apps.googleusercontent.com"
								buttonText="Continue with Google"
								onSuccess={responseGoogle}
								onFailure={responseGoogle}
								cookiePolicy={"single_host_origin"}
							/>
						</div>
					</form>
				</div>
			</div>
		);
	};

	const responseGoogle = response => {
		const { name, email, googleId } = response.profileObj;
		fetch(`${API}/signup/google`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, googleId }),
		})
			.then(r => r.json())
			.then(data => {
				if (data.error) {
					setValues({
						...values,
						error:
							"An account already exists with that email, but you cannot use your " +
							"Google account to sign in. Please enter your password.",
						loading: false,
					});
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

	const componentClicked = () => {
		setValues({ ...values, error: false });
	};

	const responseFacebook = response => {
		const { name, email, userID } = response;
		fetch(`${API}/signup/facebook`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, userID }),
		})
			.then(r => r.json())
			.then(data => {
				if (data.error) {
					setValues({
						...values,
						error:
							"An account already exists with that email, but you cannot use your " +
							"Facebook account to sign in. Please enter your password.",
						loading: false,
					});
				} else {
					authenticate(data, () => {
						setValues({
							...values,
							didRedirect: true,
							loading: false,
						});
					});
				}
			})
			.catch(er => {
				console.log("Signin request failed");
			});
	};

	return (
		<Base title="Signin" description="Signin to your account to make orders!">
			{loadingMessage()}
			{errorMessage()}
			{signinForm()}
			{performRedirect()}
		</Base>
	);
};

export default Signin;
