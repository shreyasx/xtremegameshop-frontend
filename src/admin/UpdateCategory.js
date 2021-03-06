import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
	const { user, token } = isAuthenticated();

	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [performPreload, setPerformPreload] = useState(true);
	const [dataArrived, setDataArrived] = useState(false);

	const preload = categoryId => {
		if (performPreload)
			getCategory(categoryId).then(data => {
				if (data.error) {
					setError(data.error);
					setPerformPreload(false);
				} else {
					setName(data.name);
					setPerformPreload(false);
				}
				setDataArrived(true);
			});
	};

	// eslint-disable-next-line
	useEffect(() => preload(match.params.categoryId), []);

	const goBack = () => (
		<div className="mt-5">
			<Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
				Admin Home
			</Link>
		</div>
	);

	const handleChange = event => {
		setError("");
		setName(event.target.value);
	};

	const onSubmit = event => {
		event.preventDefault();
		setDataArrived(false);
		setError("");
		setSuccess(false);

		//backend request fired
		updateCategory(match.params.categoryId, user._id, token, name).then(
			data => {
				if (data.error) {
					setError(false);
				} else {
					setError("");
					setSuccess(true);
					setName("");
				}
				setDataArrived(true);
			}
		);
	};

	const successMessage = () => {
		if (success) {
			return <h4 className="text-success">Category Updated successfully</h4>;
		}
	};

	const warningMessage = () => {
		if (error) {
			return <h4 className="text-warning">Failed to update category</h4>;
		}
	};

	const myCategoryForm = () => (
		<form>
			<div className="form-group">
				<p className="lead">Enter the category</p>
				<input
					onChange={handleChange}
					value={name}
					type="text"
					className="form-control my-3"
					autoFocus
					required
					placeholder="For ex. Summer"
				/>
				<button onClick={onSubmit} className="btn btn-outline-info">
					Update category
				</button>
			</div>
		</form>
	);

	return (
		<Base
			title="Update a Category"
			description="Add a new name for category for new tshirts"
			className="container bg-info p-4"
		>
			<div className="row bg-white rounded">
				<div className="col-md-8 offset-md-2">
					{successMessage()}
					{warningMessage()}
					{dataArrived ? (
						myCategoryForm()
					) : (
						<img
							style={{ width: "200px" }}
							src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
							alt="loading"
						/>
					)}
					{goBack()}
				</div>
			</div>
		</Base>
	);
};

export default UpdateCategory;
