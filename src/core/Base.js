import React from "react";
import Menu from "./Menu";

const Base = ({
	title = "My Title",
	description = "My Description",
	className = "bg-dark text=white p-4",
	children,
}) => {
	return (
		<div>
			<Menu />
			<div className="container-fluid">
				<div className="jumbotron bg-dark text-white text-center">
					<h2 className="display-4">{title}</h2>
					<p className="lead">{description}</p>
				</div>
				<div className={className}>{children}</div>
			</div>
			<footer className="footer bg-dark mt-5">
				<div className=" pb-4 container-fluid p-3 bg-success text-white text-center">
					<h4 className="p-3">Feel free to reach out in case of queries.</h4>
					<h6>
						Website created and maintained by{" "}
						<a
							style={{ color: "rgb(133, 208, 255)" }}
							href="https://shreyasjamkhandi.tech/"
							target="_blank"
							rel="noreferrer"
						>
							Shreyas Jamkhandi
						</a>
						.<br /> &#169;All rights reserved.
					</h6>
					<a
						href="https://drive.google.com/file/d/18Vwynqc0O32Gt5Z-1ei0OBUmu910DX6d/view?usp=sharing"
						target="_blank"
						rel="noreferrer"
					>
						<button style={{ fontWeight: "bold" }} className="btn btn-warning">
							View Privacy policy
						</button>
					</a>
				</div>
			</footer>
		</div>
	);
};

export default Base;
