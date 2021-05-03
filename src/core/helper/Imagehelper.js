import React from "react";
import { API } from "../../backend";

const Imagehelper = ({ product }) => {
	const imageurl = product
		? `${API}/product/photo/${product._id}`
		: `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

	return (
		<div
			style={{ textAlign: "center" }}
			className="rounded border border-success p-2"
		>
			<img
				src={imageurl}
				alt="imagee"
				style={{ width: "90%" }}
				className="mb-3 rounded"
			/>
		</div>
	);
};

export default Imagehelper;
