import React from "react";
import Imagehelper from "./helper/Imagehelper";
import { Link } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/carthelper";
import { isAuthenticated } from "../auth/helper";
import { toast } from "react-toastify";

const Card = ({
	cart,
	product,
	addtoCart = true,
	removeFromCart = false,
	setReload = f => f,
	reload = undefined,
}) => {
	const cardTitle = product ? product.name : "A photo from pexels";
	const cardDescription = product ? product.descripton : "DEFAULT description";
	const cardPrice = product ? product.price : "5";

	const addToCart = () => {
		addItemToCart(product, res => {
			if (res)
				toast("Item added to cart!", {
					type: "success",
				});
			else
				toast("Item already exists in cart!", {
					type: "error",
				});
		});
	};

	const showAddToCart = () => {
		return (
			addtoCart &&
			(isAuthenticated() ? (
				<button
					onClick={addToCart}
					className="btn btn-block btn-outline-success mt-2 mb-2"
				>
					Add to Cart
				</button>
			) : (
				<Link
					to="/signin"
					className="btn btn-block btn-outline-success mt-2 mb-2"
				>
					Signin to Add to Cart
				</Link>
			))
		);
	};

	const showRemoveFromCart = () => {
		return (
			removeFromCart && (
				<button
					onClick={() => {
						removeItemFromCart(product._id, () => {
							window.location.href = "/cart";
						});
					}}
					className="btn btn-block btn-outline-danger mt-2 mb-2"
				>
					Remove from cart
				</button>
			)
		);
	};

	return cart ? (
		<div
			id={"carttt"}
			style={{ padding: "50px", marginLeft: "10px" }}
			className="card text-white bg-dark border border-info"
		>
			<div className="card-header lead">{cardTitle}</div>
			<div className="card-body">
				<Imagehelper product={product} />
				<p className="lead bg-success font-weight-normal text-wrap">
					{cardDescription}
				</p>
				<p className="btn btn-success rounded  btn-sm px-4">₹{cardPrice}</p>
				<div className="row">
					<div className="col-12">{showAddToCart()}</div>
					<div className="col-12">{showRemoveFromCart()}</div>
				</div>
			</div>
		</div>
	) : (
		<div
			style={{ padding: "20px", margin: "10px" }}
			className="card text-white bg-dark border border-info"
		>
			<div className="card-header lead">{cardTitle}</div>
			<div className="card-body">
				<Imagehelper product={product} />
				<p className="lead bg-success font-weight-normal text-wrap">
					{cardDescription}
				</p>
				<p className="btn btn-success rounded  btn-sm px-4">₹{cardPrice}</p>
				<div className="row">
					{product.stock > 0 ? (
						<div className="col-12">{showAddToCart()}</div>
					) : (
						<p className="btn btn-block btn-danger mt-2 mb-2">Out of stock</p>
					)}
					<div className="col-12">{showRemoveFromCart()}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
