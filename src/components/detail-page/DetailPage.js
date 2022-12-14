import React, {useEffect, useState} from "react";
import "./DetailPage.scss";
import {Link} from "react-router-dom";
import back from "../../images/back.png";
import heart_white from "../../images/detail/heart-white.png";
import star_yellow from "../../images/detail/star-yellow.png";
import plus from "../../images/cart/plus-white.png";
import detail_burger from "../../images/cart/burger-box.png";
import {doc, getDoc, increment, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {getAuth} from "firebase/auth";

const DetailPage = ({dishDetailTitle, dishDetailPrice, dishDetailDescription, dishDetailImage, showHome, dishDetailId}) => {
	const [checked, setChecked] = useState(false);
	const [chefsBurger, setChefsBurger] = useState([]);
	const [detailAmount, setDetailAmount] = useState(1);

	useEffect(() => {
		const getChefsBurger = async () => {
			const docRef = doc(db, "dishes", "zk3Nm7r3JlgDeAjQemCL");
			const docSnap = await getDoc(docRef);
			const data = docSnap.data();
			setChefsBurger(data);
		}
		getChefsBurger();
	}, []);

	const incrementAmount = () => {
		setDetailAmount(detailAmount + 1);

	}
	const decrementAmount = () => {
		if (detailAmount > 1) {
			setDetailAmount(detailAmount - 1);
		} else return;
	}

	const addChefsBurger = async () => {
		setChecked(!checked);
	}
	const addProductToCart = async () => {
		const auth = getAuth();
		let userId = auth.currentUser.uid;
		let productId = dishDetailId;
		let itemRef = doc(db, `users/${userId}/cart/${productId}`);

		await setDoc(itemRef,{
			title: dishDetailTitle,
			price: dishDetailPrice,
			amount: detailAmount,
			image: dishDetailImage,
		}, {merge: true});

		if(checked) {
			const auth = getAuth();
			let userId = auth.currentUser.uid;
			let productId = 'zk3Nm7r3JlgDeAjQemCL';
			let itemRef = doc(db, `users/${userId}/cart/${productId}`);

			await setDoc(itemRef,{
				title: chefsBurger.title,
				price: chefsBurger.price,
				amount: increment(1),
				image: chefsBurger.image,
			}, {merge: true});
		}
	}
	const chefsBurgerPrice = chefsBurger.price;
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
				<img className="order-image" src={dishDetailImage} alt="image"/>
			</div>

			<div className="detail-main">
				<div className="detail-title">{dishDetailTitle}</div>
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
						<div className="price">{dishDetailPrice * detailAmount}</div>
					</div>
					<div className="detail-increase">
						<div onClick={decrementAmount} className="round-minus">
							<div className="minus"></div>
						</div>
						<div className="number">{detailAmount}</div>
						<div onClick={incrementAmount} className="round-plus">
							<img src={plus} alt="plus"/>
						</div>
					</div>
				</div>
				<div className="detail-description">{dishDetailDescription}</div>
				<div className="choice-add">Choice of Add On</div>
				<div className="add-on">
					<div className="add-on_round">
						<img src={detail_burger} alt="burger"/>
					</div>
					<div className="add-on_title">{chefsBurger.title}</div>
					<div className="add-on_price">${chefsBurger.price}</div>
					<label className="cont">
						<input type="checkbox"
							   checked={checked}
							   onChange={addChefsBurger}
							   className="check-highload"
						/>
						<span className="highload-after"></span>
					</label>

				</div>
			</div>
			<div className="detail-panel">
				<div className="detail-total_price">
					<div className="detail-total_descr">Total Price</div>
					<div className="detail-total_sum">$
						{
							checked ? dishDetailPrice * detailAmount + chefsBurgerPrice : dishDetailPrice * detailAmount
						}
					</div>
				</div>
				<button onClick={addProductToCart} className="btn btn-143 det-but" >ADD TO BAG</button>
			</div>

		</div>
	)
}

export default DetailPage;