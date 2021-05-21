import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card2 from "./newCard";
import { loadCart } from "./helper/carthelper";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { emptyCart } from "./helper/carthelper";
import { API } from "../backend";
import Particles from "react-particles-js";
import bodyConfig from "../body";

toast.configure();

const Cart = () => {
	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false);
	const [loading, setLoading] = useState(true);
	const [payLoading, setPayLoading] = useState(false);
	const [verified, setVerified] = useState(false);

	const isVerified = () => {
		fetch(`${API}/user/${isAuthenticated().user._id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${isAuthenticated().token}`,
			},
		})
			.then(R => R.json())
			.then(setVerified)
			.catch(console.log);
	};

	useEffect(isVerified, []);

	const getPrice = () => {
		var price = 0;
		for (var i = 0; i < products.length; i++) price += products[i].price;
		return price;
	};

	useEffect(() => {
		(async () => {
			const ps = await loadCart(isAuthenticated().user._id);
			setProducts(ps);
			setLoading(false);
		})();
	}, []);

	const loadAllProducts = () => {
		if (products.length === 0) return "No items in your cart. Go add some now!";
		else
			return (
				<div className="row" style={{ alignItems: "flex-start" }}>
					{products.map((product, index) => (
						<div key={index} style={{ margin: "10px 10px" }}>
							<Card2
								callback={async () => {
									const ps = await loadCart(isAuthenticated().user._id);
									setProducts(ps);
									setLoading(false);
									toast("Item removed from cart.", { type: "success" });
								}}
								product={product}
								addtoCart={false}
								removeFromCart={true}
								setReload={setReload}
								reload={reload}
								cart={true}
							/>
						</div>
					))}
				</div>
			);
	};

	const loadCheckout = () => {
		const idList = products.map(prod => prod._id);
		const product = {
			price: getPrice(),
			user: isAuthenticated().user._id,
		};
		async function handleToken(token, addresses) {
			setPayLoading(true);
			setLoading(true);
			const response = await axios.post(`${API}/checkout`, {
				token,
				product,
				idList,
			});
			const { status, payment } = response.data;
			if (status === "success") {
				emptyCart(() => {
					const data = JSON.stringify({
						products,
						addresses,
						payment,
						price: getPrice(),
					});
					fetch(`${API}/newOrder/${isAuthenticated().user._id}`, {
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
							Authorization: `Bearer ${isAuthenticated().token}`,
						},
						body: data,
					})
						.then(R => R.json())
						.then(resp => {
							(async () => {
								const ps = await loadCart(isAuthenticated().user._id);
								setProducts(ps);
								setLoading(false);
							})();
							setPayLoading(false);
						})
						.catch(console.log);
				});
				toast("Payment successful! Check email for details", {
					type: "success",
				});
			} else {
				toast("Something went wrong, please try again", { type: "error" });
				setLoading(false);
				setPayLoading(false);
			}
		}

		return (
			<>
				{payLoading ? (
					<div className="alert alert-info">
						<h2>Loading... Do not close or refresh the page.</h2>
					</div>
				) : products.length === 0 ? (
					<h2>Add products to checkout!</h2>
				) : (
					<>
						<h2>This Section for Checking out:</h2>
						{verified ? (
							<StripeCheckout
								stripeKey={process.env.REACT_APP_STRIPE_KEY}
								token={handleToken}
								amount={getPrice() * 100}
								name="Products"
								billingAddress
								shippingAddress
							/>
						) : (
							`Go to user dashboard and verify your email address to continue with your order.`
						)}
					</>
				)}
			</>
		);
	};

	return (
		<>
			<Particles params={bodyConfig} />
			<Base title="Your Cart" description="Ready to checkout">
				<div className="row text-white">
					{!isAuthenticated().user ? (
						<h6>
							Please <Link to="/signin">SignIn</Link> to access your cart.
						</h6>
					) : (
						<>
							<div className="col-md-8">
								<h2>Your Cart:</h2>
								{loading ? <h2>Loading Cart...</h2> : loadAllProducts()}
							</div>
							<div className="col-md-4">{loadCheckout()}</div>
						</>
					)}
				</div>
			</Base>
		</>
	);
};

export default Cart;
