import React from "react";
import footArray from "./data/products.json";

const New = () => {
	const products = footArray;
	console.log(products);
	const food = products.map(product => {
		return <div key={product.id}>{product.title}</div>
	}  )
	return (
		<>
			<div>{food}</div>

			<div className="card">
				<div className="card--content"></div>
				<div className="card--content"></div>
				<div className="card--content"></div>
				<div className="card--content"></div>
				<div className="card--content"></div>
				<div className="card--content"></div>
				<div className="card--content"></div>
				<div className="card--content"></div>
				<div className="card--content"></div>
				<div className="card--content"></div>
			</div>

		</>

)
}

export default New;