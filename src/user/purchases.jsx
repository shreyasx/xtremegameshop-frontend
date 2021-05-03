import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { API } from "../backend";

const Purchases = () => {
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);

	const getOrders = () => {
		fetch(`${API}/getOrders/${isAuthenticated().user._id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${isAuthenticated().token}`,
			},
		})
			.then(R => R.json())
			.then(resp => {
				setOrders(resp);
				setLoading(false);
			});
	};

	useEffect(getOrders, []);

	const totalPrice = order => {
		let price = 0;
		for (var i = 0; i < order.products.length; i++) {
			price += order.products[i].price;
			console.log(order.products[i].price);
		}
		return <h4 className="text-white">Total price: {price}</h4>;
	};

	return (
		<Base title="All Purchases" description="View all orders made in the past">
			{loading ? (
				<img
					style={{ width: "200px" }}
					src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
					alt="loading"
				/>
			) : orders.length === 0 ? (
				<h2 className="text-white">You haven't made any purchases yet.</h2>
			) : (
				orders.map((order, index) => (
					<div
						style={{ marginLeft: "50px", marginBottom: "50px" }}
						key={index}
						className="text-white"
					>
						<h2>Order ID: {order._id}</h2>
						<h3>Products:</h3>
						<ol>
							{order.products.map((p, i) => (
								<li key={i}>{`${p.name}, Price: \u20B9${p.price}/-`}</li>
							))}
						</ol>
						{totalPrice(order)}
					</div>
				))
			)}
		</Base>
	);
};

export default Purchases;
