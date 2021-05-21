import React from "react";
import { Link } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/carthelper";
import { isAuthenticated } from "../auth/helper";
import { toast } from "react-toastify";
import {
	FlippingCard,
	FlippingCardFront,
	FlippingCardBack,
} from "react-ui-cards";
import { API } from "../backend";

const Card2 = ({
	product,
	callback,
	addtoCart = true,
	removeFromCart = false,
}) => {
	const cardTitle = product ? product.name : "A photo from pexels";
	const cardDescription = product ? product.description : "DEFAULT description";
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
					className="btn btn-block btn-outline-success rounded mt-2 mb-2"
					style={{ width: "85%", margin: "0 auto" }}
				>
					Add to Cart
				</button>
			) : (
				<Link
					to="/signin"
					className="btn btn-block rounded btn-outline-success mt-2 mb-2"
					style={{ width: "85%", margin: "0 auto" }}
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
					style={{ width: "85%", margin: "0 auto" }}
					onClick={() => {
						removeItemFromCart(product._id, callback);
					}}
					className="btn btn-block btn-outline-danger mt-2 mb-2"
				>
					Remove from cart
				</button>
			)
		);
	};

	return (
		<div>
			<FlippingCard>
				<FlippingCardBack>
					<div
						style={{
							width: "100%",
							height: "100%",
							backgroundSize: "contain",
							backgroundPosition: "center",
							background: "#343a40",
							border: "1px solid white",
							textAlign: "center",
							position: "relative",
						}}
					>
						<h1 className="card-header text-light lead">{cardTitle}</h1>
						<p className="mt-4">{cardDescription}</p>
						<p className="btn btn-success rounded btn-sm px-4">₹{cardPrice}</p>
						<div
							style={{
								position: "absolute",
								bottom: "20px",
								margin: "0px",
								width: "100%",
							}}
						>
							<div className="col-12">{showAddToCart()}</div>
							<div className="col-12">{showRemoveFromCart()}</div>
						</div>
					</div>
				</FlippingCardBack>
				<FlippingCardFront>
					<div
						style={{
							width: "100%",
							height: "100%",
							backgroundSize: "contain",
							backgroundPosition: "center",
							backgroundImage: `url(${API}/product/photo/${product._id})`,
						}}
					></div>
				</FlippingCardFront>
			</FlippingCard>
		</div>
	);
};

export default Card2;
