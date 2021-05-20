// import FacebookLogin from "react-facebook-login";
import { API } from "../backend";
import { GoogleLogin } from "react-google-login";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import React from "react";
import { authenticate } from "../auth/helper";
// import fb from "../images/fb.jpg";
import google from "../images/google.jpg";

const Buttons = ({ setValues, values }) => {
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

	// const componentClicked = () => {
	// 	setValues({ ...values, error: false });
	// };

	// const responseFacebook = response => {
	// 	console.log("fres- ", response);
	// 	const { name, email, userID } = response;
	// 	fetch(`${API}/signup/facebook`, {
	// 		method: "POST",
	// 		headers: {
	// 			Accept: "application/json",
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ name, email, userID }),
	// 	})
	// 		.then(r => r.json())
	// 		.then(data => {
	// 			if (data.error) {
	// 				setValues({
	// 					...values,
	// 					error:
	// 						"An account already exists with that email, but you cannot use your " +
	// 						"Facebook account to sign in. Please enter your password.",
	// 					loading: false,
	// 				});
	// 			} else {
	// 				authenticate(data, () => {
	// 					setValues({
	// 						...values,
	// 						didRedirect: true,
	// 						loading: false,
	// 					});
	// 				});
	// 			}
	// 		})
	// 		.catch(er => {
	// 			console.log("Signin request failed");
	// 		});
	// };

	return (
		<div style={{ margin: "20px 0", textAlign: "center" }}>
			<h5 style={{ display: "inline-block", margin: "0px 20px" }}>
				Or continue with:{" "}
			</h5>
			{/* <FacebookLogin
				appId={process.env.REACT_APP_FACEBOOK_APPID}
				callback={responseFacebook}
				onClick={componentClicked}
				render={renderProps => (
					<button class={`social-button`} onClick={renderProps.onClick}>
						<div
							style={{
								background: "rgb(255, 255, 255)",
								padding: "10px",
								borderRadius: "2px",
							}}
						>
							<img style={{ width: "25px" }} src={fb} alt="fb-logo" srcset="" />
						</div>
					</button>
				)}
			/> */}
			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
				render={renderProps => (
					<button
						class={`social-button`}
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
					>
						<div
							style={{
								background: "rgb(255, 255, 255)",
								padding: "10px",
								borderRadius: "2px",
							}}
						>
							<img
								style={{ width: "25px" }}
								src={google}
								alt="google-logo"
								srcset=""
							/>
						</div>
					</button>
				)}
				buttonText=""
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={"single_host_origin"}
			/>
		</div>
	);
};

export default Buttons;
