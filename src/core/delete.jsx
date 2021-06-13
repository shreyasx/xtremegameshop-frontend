import React, { useState } from "react";
import { isAuthenticated, signout } from "../auth/helper";
import { API } from "../backend";

const Delete = ({ history }) => {
	const [loading, setLoading] = useState(false);
	return isAuthenticated() ? (
		<>
			<h1 className="text-white">Are you sure?</h1>
			<h2 className="text-white">We're sorry to see you go!</h2>
			{loading ? (
				<h3 className="alert alert-info">Loading...</h3>
			) : (
				<>
					{" "}
					<button
						style={{ width: "300px" }}
						onClick={() => {
							window.confirm("This action cannot be undone.");
							setLoading(true);
							fetch(`${API}/delete/${isAuthenticated().user._id}`, {
								method: "GET",
								headers: {
									Accept: "application/json",
									"Content-Type": "application/json",
									Authorization: `Bearer ${isAuthenticated().token}`,
								},
							})
								.then(R => R.json())
								.then(resp => {
									console.log(resp);
									if (resp === "Account deleted successfully!") {
										signout(() => {
											history.push("/");
										});
									}
								})
								.catch(console.log);
						}}
						className="btn btn-outline-danger"
					>
						PERMANENTLY DELETE ACCOUNT
					</button>
					<br />
					<button
						style={{ width: "300px" }}
						className="btn btn-outline-success"
						onClick={() => history.push("/user/dashboard")}
					>
						Go back
					</button>
				</>
			)}
		</>
	) : (
		<h1 className="text-white">Not signed in</h1>
	);
};

export default Delete;
