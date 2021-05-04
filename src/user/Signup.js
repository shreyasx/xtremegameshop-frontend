import React, { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper";
import FacebookLogin from "react-facebook-login";
import { API } from "../backend";
import { toast } from "react-toastify";
import { authenticate, signin, isAuthenticated } from "../auth/helper";
import { Redirect } from "react-router-dom";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";

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
		signup({ name, email, password })
			.then(data => {
				if (data.error) {
					toast(data.error, { type: "error" });
				} else
					signin({ email, password })
						.then(dat => {
							if (dat.error) {
								setValues({
									...values,
									loading: false,
								});
								toast(data.error, {
									type: "error",
								});
							} else {
								authenticate(dat, () => {
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
			})
			.catch(er => {
				console.log("Error in signup");
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
						<div
							className="fb-login"
							style={{ textAlign: "center", margin: "20px auto" }}
						>
							<FacebookLogin
								appId={process.env.REACT_APP_FACEBOOK_APPID}
								autoLoad={false}
								fields="name,email"
								onClick={componentClicked}
								callback={responseFacebook}
							/>
							{/* <FacebookLogin
								appId="432706677778563"
								autoLoad={false}
								callback={responseFacebook}
								render={renderProps => (
									<button onClick={renderProps.onClick}>
										This is my custom FB button
									</button>
								)}
							/> */}
							<GoogleLogin
								clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
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

	const componentClicked = () => {
		setValues({ ...values, loading: true });
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
		<Base
			title="Signup to Xtreme Gameshop"
			description="Signup now to be able to buy your favourite games!"
		>
			{loadingMessage()}
			{signupForm()}
			{performRedirect()}
		</Base>
	);
};

export default Signup;
