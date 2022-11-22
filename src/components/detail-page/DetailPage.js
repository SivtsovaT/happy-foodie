import React, {useState} from "react";
import "./DetailPage.scss";
import {Link} from "react-router-dom";
import back from "../../images/back.png";
import heart_white from "../../images/detail/heart-white.png";
import star_yellow from "../../images/detail/star-yellow.png";
import plus from "../../images/cart/plus-white.png";
import detail_burger from "../../images/cart/burger-box.png";


const DetailPage = ({title, showHome, image, price, description}) => {
	const [checked, setChecked] = useState(false);

	const handleChange = () => {
		setChecked(!checked);
		if(!checked) {
			console.log("add to cart")
		}
	}
	return (
		<div className="content">
			<div className="detail-header">
					<div onClick={showHome} className="detail-back">
						<img src={back} alt="back"/>
					</div>
				<div className="heart-wrapper">
					<img src={heart_white} alt="cat"/>
				</div>
			</div>
			<div className="order">
				<img className="order-image" src={image} alt="image"/>
			</div>

			<div className="detail-main">
				<div className="detail-title">{title}</div>
				<div className="review">
					<img src={star_yellow} alt="star"/>
					<div className="detail-rating">4.5</div>
					<div className="detail-total">30+</div>
					<Link to={"/reviews"}>
						<div className="see-review">See Review</div>
					</Link>
				</div>
				<div className="details-order">
					<div className="detail-price">
						<div className="dollar">$</div>
						<div className="price">{price}</div>
					</div>
					<div className="detail-increase">
						<div className="round-minus">
							<div className="minus"></div>
						</div>
						<div className="number">2</div>
						<div className="round-plus">
							<img src={plus} alt="plus"/>
						</div>
					</div>
				</div>
				<div className="detail-description">{description}</div>
				<div className="choice-add">Choice of Add On</div>
				<div className="add-on">
					<div className="add-on_round">
						<img src={detail_burger} alt="burger"/>
					</div>
					<div className="add-on_title">Chicken, Cheese and pineapple</div>
					<div className="add-on_price">$2.30</div>
					<label className="cont">
						<input type="checkbox"
							   checked={checked}
							   onChange={handleChange}
							   className="check-highload"
						/>
						<span className="highload-after"></span>
					</label>

				</div>
			</div>
			<div className="detail-panel">
				<div className="detail-total_price">
					<div className="detail-total_descr">Total Price</div>
					<div className="detail-total_sum">$ 10.50</div>
				</div>
				<button className="btn btn-143 det-but" >ADD TO BAG</button>
			</div>

		</div>
	)
}

export default DetailPage;