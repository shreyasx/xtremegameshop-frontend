import { API } from "../backend";
import React from "react";
import { authenticate } from "../auth/helper";
import google from "../images/google.jpg";
import { useGoogleLogin } from "@react-oauth/google";

const Buttons = ({ setValues, values }) => {
	const responseGoogle = response => {
		console.log(response);
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
						setValues({ ...values, didRedirect: true });
					});
				}
			})
			.catch(er => {
				console.log("Signin request failed");
			});
	};

	const onSuccess = async resp => {
		fetch(`${API}/signup/google`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
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
						setValues({ ...values, didRedirect: true });
					});
				}
			})
			.catch(er => {
				console.log("Signin request failed");
			});
	};

	const login = useGoogleLogin({ onSuccess });

	return (
		<div style={{ margin: "20px 0", textAlign: "center" }}>
			<h5 style={{ display: "inline-block", margin: "0px 20px" }}>
				Or continue with:{" "}
			</h5>
			<button className={`social-button`} onClick={login()}>
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
						srcSet=""
					/>
				</div>
			</button>
		</div>
	);
};

export default Buttons;
