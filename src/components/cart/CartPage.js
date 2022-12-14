import React, {useEffect, useState} from "react";
import "./CartPage.scss";
import {db} from "../../firebase";
import {Link} from "react-router-dom";
import back from "../../images/back.png";
import {getAuth} from 'firebase/auth';
import trash from "../../images/cart/trash.png";
import plus from "../../images/cart/plus.png";
import minus from "../../images/cart/minuse.png";
import edite_icon from "../../images/cart/edit-icon.png";
import delete_icon from "../../images/cart/delete-icon.png";
import plus_white from "../../images/cart/plus-white.png";
import plus_big from "../../images/cart/plus-big.png";
import box from "../../images/nav/cart-grey.png";
import search from "../../images/nav/search.png";
import heart from "../../images/nav/heart.png";
import user_prof from "../../images/nav/user.png";
import home from "../../images/nav/home-grey.png";
import {collection, getDocs,deleteDoc, doc, getDoc, setDoc, increment} from "firebase/firestore";
import close from "../../images/close.png";

const CartPage = () => {
	const [dishes, setDishes] = useState([]);
	const [userData, setUserData] = useState([]);
	const [chefsBurger, setChefsBurger] = useState([]);
	const [chefsBurgerVisible, setChefsBurgerVisible] = useState(true);
	const [disabled, setDisabled] = useState(true);
	const [currentAuth, setCurrentAuth] = useState(null);
	const [httpPending, setHttpPending] = useState(false);
	const [chefsAmount, setChefsAmount] = useState(0);
	const [order, setOrder] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [comment, setComment] = useState('');
	const [promoCode, setPromoCode] = useState('');
	const [addPromoCodeVisible, setAddPromoCodeVisible] = useState(false);

	const showPromoCodeInput = () => {
		setAddPromoCodeVisible(true);
	}

	const stylesChief = {
		display: disabled ? 'none' : 'flex'
	}
	const hidePromoCodeInput = () => {
		setAddPromoCodeVisible(false);
	}

	const addPromoCode = (event) => {
		setPromoCode(event.target.value);
	}

	const addComment = (event) => {
		setComment(event.target.value);
	}

	const getAuthUser = async () => {
		try {
			const auth = await getAuth();
			const userId = auth?.currentUser?.uid || null
			setCurrentAuth(userId);
			if (!userId) {
				setTimeout(() => {
					getAuthUser();
				}, 2000);
			}
		} catch (e) {
			console.log(e)
		}
	};

	const incrementChefsBurger = async () => {
		if (!currentAuth || httpPending) {
			return;
		}
		let itemRef = doc(db, `users/${currentAuth}/cart/zk3Nm7r3JlgDeAjQemCL`);
		setHttpPending(true);
		try {
			await setDoc(itemRef, {
				title: chefsBurger.title,
				amount: increment(1),
				price: chefsBurger.price,
				image: chefsBurger.image
			}, {merge: true});
			const data = await getDocs(collection(db, `users/${currentAuth}/cart`));
			setDishes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
			setHttpPending(false);
			setChefsAmount(chefsAmount + 1);
			setOrder(data.docs.map((doc) => ({...doc.data(), id: doc.id, totalPrice: doc.data().price * doc.data().amount})));
			setTotalPrice(order.reduce((s, i) => s = s + i.totalPrice, 0));
		} catch(e) {
			console.log(e);
			setHttpPending(false);
		}
	}

	const decrementChefsBurger = async () => {
		if (!currentAuth || httpPending) {
			return;
		}
		let itemRef = doc(db, `users/${currentAuth}/cart/zk3Nm7r3JlgDeAjQemCL`);
		setHttpPending(true);
		try {
			await setDoc(itemRef, {
				title: chefsBurger.title,
				amount: increment(-1),
				price: chefsBurger.price,
				image: chefsBurger.image
			}, {merge: true});
			const data = await getDocs(collection(db, `users/${currentAuth}/cart`));
			setDishes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
			setHttpPending(false);
			if (chefsAmount > 1) {
				setChefsAmount(chefsAmount - 1);
				setOrder(data.docs.map((doc) => ({...doc.data(), id: doc.id, totalPrice: doc.data().price * doc.data().amount})));
				setTotalPrice(order.reduce((s, i) => s = s + i.totalPrice, 0));
			}
			else {
				const productId = 'zk3Nm7r3JlgDeAjQemCL';
				let itemRef = doc(db, `users/${currentAuth}/cart/${productId}`);
				await deleteDoc(itemRef);
				const data = await getDocs(collection(db, `users/${currentAuth}/cart`));
				setDishes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
				setChefsBurgerVisible(false);
				setOrder(data.docs.map((doc) => ({...doc.data(), id: doc.id, totalPrice: doc.data().price * doc.data().amount})));
				setTotalPrice(order.reduce((s, i) => s = s + i.totalPrice, 0));
			};
		} catch(e) {
			console.log(e);
			setHttpPending(false);
		}
	}
	const deleteDish = async (id) => {
		let productId = id;
		let itemRef = doc(db, `users/${currentAuth}/cart/${productId}`);
		await deleteDoc(itemRef);
		const data = await getDocs(collection(db, `users/${currentAuth}/cart`));
		setDishes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
		if (productId == "zk3Nm7r3JlgDeAjQemCL") {
			setChefsBurgerVisible(false);
		}
		setOrder(data.docs.map((doc) => ({...doc.data(), id: doc.id, totalPrice: doc.data().price * doc.data().amount})));
		setTotalPrice(order.reduce((s, i) => s = s + i.totalPrice, 0));
	};

	const increaseDish = async (id, title, price, amount, image) => {
		if (!currentAuth || httpPending) {
			return;
		}
		let productId = id;
		let itemRef = doc(db, `users/${currentAuth}/cart/${productId}`);
		setHttpPending(true);
		try {
			await setDoc(itemRef, {
				title: title,
				amount: increment(1),
				price: price,
				image: image
			}, {merge: true});

			const data = await getDocs(collection(db, `users/${currentAuth}/cart`));
			setDishes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
			setHttpPending(false);
			setOrder(data.docs.map((doc) => ({...doc.data(), id: doc.id, totalPrice: doc.data().price * doc.data().amount})));
			setTotalPrice(order.reduce((s, i) => s = s + i.totalPrice, 0));

		} catch(e) {
			console.log(e);
			setHttpPending(false);
		}
		if (productId == "zk3Nm7r3JlgDeAjQemCL") {
			setChefsAmount(chefsAmount + 1);
		}
	}
	const totalSum = dishes.map(item => item.amount * item.price).reduce((prev, curr) => prev + curr, 0);

	const checkOut = async () => {
		if (!currentAuth || httpPending) {
			return;
		}
		setHttpPending(true);
		try {
			if (order.length > 0) {
				const data = await getDocs(collection(db, `users/${currentAuth}/cart`));
				setHttpPending(false);
				setOrder(data.docs.map((doc) => ({...doc.data(), id: doc.id, totalPrice: doc.data().price * doc.data().amount})));
				await setDoc(doc(db, "users", currentAuth), {
					...order,
					comment: comment,
					promoCode: promoCode,
					totalSum: totalSum
				}, {merge: true});

			} else {
				alert('Please check some meals');
			}
		} catch(e) {
			console.log(e);
			setHttpPending(false);
		}
	}

	const editChefsBurger = () => {
		setDisabled(false)
	}

	const removeChiefBurger = () => {
		setChefsBurgerVisible(false);
	}

	useEffect(() => {
		if (!currentAuth) {
			return;
		}
		const getUser = async () => {
			const docRef = doc(db, "users", currentAuth);
			const docSnap = await getDoc(docRef);
			const data = docSnap.data();
			setUserData(data);
		}
		getUser();
	}, [currentAuth]);

	useEffect(() => {
		const auth = async () => {
			await getAuthUser();
		};
		auth();
	}, []);

	useEffect(() => {
		if (!currentAuth) {
			return;
		}
		const getChefsBurger = async () => {
			const docRef = doc(db, "dishes", "zk3Nm7r3JlgDeAjQemCL");
			const docSnap = await getDoc(docRef);
			const data = docSnap.data();
			setChefsBurger(data);
		}
		getChefsBurger();
	}, [currentAuth]);

	useEffect(() => {
		if (!currentAuth) {
			return;
		}
		const getDishes = async () => {
			const data = await getDocs(collection(db, `users/${currentAuth}/cart`));
			setDishes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
			await setOrder(data.docs.map((doc) => ({...doc.data(), id: doc.id, totalPrice: doc.data().price * doc.data().amount})));
			setTotalPrice(order.reduce((s, i) => s = s + i.totalPrice, 0));
		};
		getDishes();
	}, [currentAuth]);

	return (
		<div className="content">
			<div className="content-cart">
				<div className="cart-header">
					<Link to="/home" className="cart-wrapper">
						<div className="link-wrapper">
							<img src={back} alt="back"/>
						</div>
					</Link>
					<div className="delivery">
						<div className="delivery-header">Delivery to</div>
						<div className="delivery-address">{userData.region}, {userData.city}, {userData.street}
						</div>
					</div>
				</div>
				<h2 className="your-cart">Your cart</h2>
				<div className="products-wrapper">
					{dishes.map((dish) => {
						return (
							<div key={dish.id} className="product-wrapper">
								<div className="product-image">
									<img className="cart-image" src={dish.image} alt="burger"/>
								</div>
								<div className="product-data">
									<div className="product-title">{dish.title}</div>
									<div className="product-price">${dish.price * dish.amount}</div>
								</div>
								{ httpPending && <div className="product-total">Saving...</div>}
								{ !httpPending && <div className="product-total">
									<img onClick={() => deleteDish(dish.id)} src={trash} alt="trash"/>
									<div className="number">{dish.amount}</div>
									<img
										onClick={() => increaseDish(dish.id, dish.title, dish.price, dish.amount, dish.image)}
										src={plus} alt="plus"/>
								</div>
								}
							</div>
						);
					})}
				</div>
				{
					chefsBurgerVisible ?
						<div className="chefs-burger-wrapper">
							<div className="chefs-burger-data">
								<div className="burger-title">{chefsBurger.title}</div>
								<div className="burger-price">${chefsBurger.price}</div>
							</div>
							<div style={stylesChief} className="burger-total">
								<img onClick={decrementChefsBurger} src={minus} alt="minus"/>
								<div className="number">{chefsAmount}</div>
								<img onClick={incrementChefsBurger} src={plus} alt="plus"/>
							</div>
							<div className="edit">
								<img onClick={editChefsBurger} src={edite_icon} alt="edit"/>
								<img onClick={removeChiefBurger} src={delete_icon} alt="delete"/>
							</div>
						</div> : null

				}
				<Link to="/home" style={{textDecoration: "none"}}>
					<div className="add-more">
						<img src={plus_white} alt="plus"/>
						<div className="add-more-descr">Add more items</div>
					</div>
				</Link>
				<input className="add-instructions"
					   placeholder="Add special instructions"
					   type="text"
					   value={comment}
					   onChange={addComment}
				/>
				<div className="promo-wrapper">
					<div className="promo-info">
						<div className="promo-title">Promo Code</div>
						<div className="promo-code">{promoCode}</div>
					</div>
					{
						addPromoCodeVisible ?
							<div>
								<input className="input-log input-promo"
									   placeholder="add your promo code"
									   value={promoCode}
									   onChange={addPromoCode}
								/>
								<button className="btn btn-28"
										style={{marginLeft: "-40px"}}
										onClick={hidePromoCodeInput}
								>
									<img src={close} alt={close}/>
								</button>

							</div>

							: null
					}
					<div onClick={showPromoCodeInput} className="promo-add">
						<img src={plus_big} alt="plus"/>
					</div>
				</div>

				<div onClick={checkOut} className="btn btn-322 check">
					<div className="checkout">Check out</div>
								<div  className="check-price">${totalSum}</div>


				</div>

				<div className="nav-panel cart-nav">
					<div className="nav-image-wrapper">
						<Link to="/home">
							<img src={home} alt="home"/>

						</Link>
					</div>
					<Link to="/cart">
						<div className="nav-image-wrapper">
							<img src={box} alt="box"/>
						</div>
					</Link>
					<div className="search-wrapper">
						<img src={search} alt="search"/>
					</div>
					<div className="nav-image-wrapper">
						<img src={heart} alt="heart"/>
					</div>
					<div className="nav-image-wrapper">
						<img src={user_prof} alt="user"/>
					</div>
				</div>
			</div>
		</div>
	)
}
export default CartPage;