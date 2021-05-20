import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, createaProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import LoadingGIF from "../core/loadingGIF";

const AddProduct = () => {
	const { user, token } = isAuthenticated();

	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		stock: "",
		photo: "",
		categories: [],
		category: "",
		loading: false,
		error: "",
		createdProduct: "",
		getaRedirect: false,
		formData: "",
	});

	const {
		name,
		description,
		price,
		stock,
		loading,
		categories,
		error,
		createdProduct,
		formData,
	} = values;

	const preload = () => {
		getCategories().then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, categories: data, formData: new FormData() });
			}
		});
	};

	// eslint-disable-next-line
	useEffect(preload, []);

	const onSubmit = event => {
		event.preventDefault();
		setValues({ ...values, error: "", loading: true });
		createaProduct(user._id, token, formData).then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					name: "",
					description: "",
					price: "",
					photo: "",
					stock: "",
					loading: false,
					createdProduct: data.name,
				});
			}
		});
	};

	const handleChange = name => event => {
		const value = name === "photo" ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const successMessage = () => (
		<div
			className="alert alert-success mt-3"
			style={{ display: createdProduct ? "" : "none" }}
		>
			<h4>{createdProduct} created successfully</h4>
		</div>
	);

	const errorMessage = () => (
		<div
			className="alert alert-danger mt-3"
			style={{ display: error ? "" : "none" }}
		>
			{error}
		</div>
	);

	const createProductForm = () => (
		<form onSubmit={onSubmit}>
			<span>Post photo</span>
			<div className="form-group">
				<label className="btn btn-block btn-success">
					<input
						onChange={handleChange("photo")}
						type="file"
						required
						accept="image"
						placeholder="choose a file"
					/>
				</label>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange("name")}
					className="form-control"
					required
					placeholder="Name"
					value={name}
				/>
			</div>
			<div className="form-group">
				<textarea
					maxLength="120"
					onChange={handleChange("description")}
					className="form-control"
					required
					placeholder="Description Max 120 characters."
					value={description}
				/>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange("price")}
					type="number"
					required
					className="form-control"
					placeholder="Price"
					value={price}
				/>
			</div>
			<div className="form-group">
				<select
					onChange={handleChange("category")}
					className="form-control"
					placeholder="Category"
					required
				>
					<option>Select</option>
					{categories &&
						categories.map((cate, index) => (
							<option key={index} value={cate._id}>
								{cate.name}
							</option>
						))}
				</select>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange("stock")}
					type="number"
					required
					className="form-control"
					placeholder="Stock"
					value={stock}
				/>
			</div>

			<button type="submit" className="btn btn-outline-success mb-3">
				Create Product
			</button>
		</form>
	);

	return (
		<Base
			title="Add a product here!"
			description="Welcome to product creation section"
			className="container bg-info p-4"
		>
			{loading ? (
				<LoadingGIF />
			) : (
				<>
					<Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
						Admin Home
					</Link>
					<div className="row bg-dark text-white rounded">
						<div className="col-md-8 offset-md-2">
							{successMessage()}
							{errorMessage()}
							{createProductForm()}
						</div>
					</div>
				</>
			)}
		</Base>
	);
};

export default AddProduct;
