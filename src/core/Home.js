import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card2 from "./newCard";
import { getProducts } from "./helper/coreapicalls";
import { API } from "../backend";

export default function Home() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	const loadAllProducts = () => {
		getProducts().then(data => {
			if (data.error) {
				setError(data.error);
			} else {
				setProducts(data);
				setLoading(false);
			}
		});
	};

	const categoryChange = category => {
		setLoading(true);
		if (category === "All") {
			loadAllProducts();
			return;
		}
		fetch(`${API}/getProducts?categ=${category}`)
			.then(re => re.json())
			.then(resp => {
				setProducts(resp);
				setLoading(false);
			})
			.catch(console.log);
	};

	const getCategories = () => {
		fetch(`${API}/getCategories`)
			.then(r => r.json())
			.then(setCategories)
			.catch(console.log);
	};

	useEffect(() => {
		loadAllProducts();
		getCategories();
	}, []);

	return (
		<Base title="XTREME Gameshop" description="Find your most desired games!">
			<div className="row">
				<h1 style={{ margin: "0px auto" }} className="text-white">
					EXTREME Game Collection
				</h1>
			</div>

			{error ? error : ""}
			{categories.length > 0 ? (
				<div className="row text-white">
					<div style={{ margin: "20px auto", textAlign: "center" }}>
						<h2 style={{ display: "inline" }}>
							{"Pick a Category: "}&nbsp;&nbsp;&nbsp;
						</h2>
						<button
							className="btn booboo btn-success"
							onClick={() => {
								var buttons = document.querySelectorAll(".booboo");
								for (var index = 0; index < buttons.length; index++) {
									buttons[index].classList.remove("btn-success");
									buttons[index].classList.add("btn-outline-success");
								}
								document.activeElement.classList.remove("btn-outline-success");
								document.activeElement.classList.add("btn-success");
								categoryChange("All");
							}}
						>
							All Games
						</button>
						&nbsp;&nbsp;
						{categories.map((c, i) => (
							<span key={i + 99}>
								<button
									className="btn booboo btn-outline-success"
									onClick={() => {
										var buttons = document.querySelectorAll(".booboo");
										for (var index = 0; index < buttons.length; index++) {
											buttons[index].classList.remove("btn-success");
											buttons[index].classList.add("btn-outline-success");
										}
										document.activeElement.classList.remove(
											"btn-outline-success"
										);
										document.activeElement.classList.add("btn-success");
										categoryChange(c._id);
									}}
								>
									{c.name}
								</button>
								&nbsp;&nbsp;
							</span>
						))}
					</div>
				</div>
			) : (
				""
			)}
			{loading ? (
				<div className="row">
					<img
						style={{ width: "200px" }}
						src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
						alt="loading"
					/>
					<h3 className="text-white">Loading Games...</h3>
				</div>
			) : (
				<>
					<div className="row">
						{products.map((product, index) => {
							return (
								<div key={index} className="col-md-4 col-sm-6 col-xl-3 mb-4">
									<Card2 product={product} />
								</div>
							);
						})}
					</div>
				</>
			)}
		</Base>
	);
}
