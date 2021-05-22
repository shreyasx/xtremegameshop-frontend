import React from "react";
import Menu from "./Menu";

const Base = ({
	title = "My Title",
	description = "My Description",
	className = "text-white p-4",
	children,
	id,
}) => {
	return (
		<div
			style={{
				position: "fixed",
				top: "0",
				bottom: "0",
				minWidth: "100vw",
				overflowY: "scroll",
			}}
		>
			<Menu />
			<div className="">
				<div
					style={{ background: "none" }}
					className="jumbotron text-white text-center"
				>
					<h2 id={id} className="display-4">
						{title}
					</h2>
					<p className="lead">{description}</p>
				</div>
				<div className={className}>{children}</div>
			</div>
			<footer className="footer mt-5">
				<div className=" pb-4 container-fluid p-3 border-top text-white text-center">
					<h6 className="pt-4 pb-2" style={{ lineHeight: "1.5" }}>
						Website created and maintained by{" "}
						<a
							style={{ color: "#00FFFF" }}
							href="https://shreyasjamkhandi.tech/"
							target="_blank"
							rel="noreferrer"
						>
							Shreyas Jamkhandi.
						</a>
						<br /> &#169; All rights reserved.
					</h6>
					<a
						href="https://drive.google.com/file/d/18Vwynqc0O32Gt5Z-1ei0OBUmu910DX6d/view?usp=sharing"
						target="_blank"
						rel="noreferrer"
					>
						<button
							style={{ fontWeight: "bold" }}
							className="btn mb-3 btn-warning"
						>
							View Privacy policy
						</button>
					</a>
				</div>
			</footer>
		</div>
	);
};

export default Base;
