import React from "react";
import "./CartNotSetPage.scss";
import back from "../../images/back.png";
import {Link} from "react-router-dom";
import creditCard from "../../images/cart-not-set/credit-cart.png";
import plus from "../../images/cart-not-set/plus.png";

const CartNotSetPage = () => {
	const addCart = () => {
		window.location.replace("/carddetails");
	}

	return (
		<div className="content">
			<Link to="/payment" className="link-panel">
				<div className="reviews_link-wrapper">
					<img src={back} alt="back"/>
				</div>
				<div className="reviews-title">Payment Method</div>
			</Link>
			<div className="select-method">Select your payment <br/>
				method
			</div>
			<div className="payment-wrapper">
				<div className="payment-group">
					<img src={creditCard} alt="card"/>
					<div className="empty-payment">Empty Payment Method</div>
					<div className="good-day">Today is a good day for you to make a choice</div>
				</div>
				<div className="add-card">
					<button onClick={addCart} className="btn-add">
						<img src={plus} alt="plus"/>
					</button>
					<div className="add-card-title">Add credit card</div>
				</div>
			</div>
		</div>
	)
}

export default CartNotSetPage;
