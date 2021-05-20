import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { API } from "../backend";

const Verify = ({ match }) => {
	const [resp, setResp] = useState(false);
	const [loading, setLoading] = useState(true);

	const check = () => {
		fetch(`${API}/verify-email`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ token: match.params.token }),
		})
			.then(R => R.json())
			.then(res => {
				setResp(res);
				setLoading(false);
			})
			.catch(console.log);
	};

	// eslint-disable-next-line
	useEffect(check, []);

	return (
		<Base title="Account Verification Page" description="">
			{loading ? (
				<img
					style={{ width: "200px" }}
					src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
					alt="loading"
				/>
			) : (
				<h2 className="text-white">
					{resp === true ? "Account verified!" : resp.error}
				</h2>
			)}
		</Base>
	);
};

export default Verify;
