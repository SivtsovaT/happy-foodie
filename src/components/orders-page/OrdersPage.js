import React, {useEffect, useState} from "react";
import "./OrdersPage.scss";
import {getAuth} from "firebase/auth";
import {collection, doc, getDoc, getDocs, increment, query, setDoc, where} from "firebase/firestore";
import {db} from "../../firebase";
import back from "../../images/back.png";
import {Link} from "react-router-dom";
import star_red from "../../images/rating/star_red.png";
import star_empty from "../../images/rating/star_wtite.png";

const OrdersPage = () => {
	const [userOrders, setUserOrders] = useState([]);
	const [userData, setUserData] = useState([]);
	const [currentAuth, setCurrentAuth] = useState(null);
	const [completeActive, setCompleteActive] = useState(true);
	const [pendingActive, setPendingActive] = useState(false);
	const [usOrd, setUsOrd] = useState([]);
	const [ordersListVisible, setOrdersListVisible] = useState(true);
	const [orderVisible, setOrderVisible] = useState(false);
	const [backVisible, setBackVisible] = useState(false);
	const [orderListPartVisible, setOrderListPartVisible] = useState(true);
	const [productRatingVisible, setProductRatingVisible] = useState(false);
	const [rating, setRating] = useState(null);
	const [hover, setHover] = useState(null);
	const [dishDetailImage, setDishDetailImage] = useState('');
	const [dishDetailId, setDishDetailId] = useState('');
	const [dishDetailTitle, setDishDetailTitle] = useState('');


	const wrapperStyles = {
		height: '300px',
		overflow: 'auto',
		marginTop: '30px'
	}

	const completeStyles = {
		color: completeActive ? "#E94040" : "#7F7D92"
	}

	const pendingStyles = {
		color: pendingActive ? "#E94040" : "#7F7D92"
	}

	const changeCompleteActive = () => {
		setCompleteActive(false);
		setPendingActive(true);
	}

	const changePendingActive = () => {
		setCompleteActive(true);
		setPendingActive(false);
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
		const getUserOrders = async () => {
			const q = query(collection(db, "orders"), where("userId", "==", currentAuth));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				setUserOrders(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			});
		};
		getUserOrders();
	}, [currentAuth]);


	const showOrder = async (id) => {
		const orderId = id;
		const docRef = doc(db, "orders", orderId);
		const docSnap = await getDoc(docRef);
		const data = docSnap.data().items;
		setUsOrd(data);
		setOrdersListVisible(false);
		setOrderVisible(true);
		setBackVisible(true);
		setOrderListPartVisible(false);
	}
	const addProductToCart = async (id, title, price, image) => {
		const auth = getAuth();
		let userId = auth.currentUser.uid;
		let productId = id;
		let itemRef = doc(db, `users/${userId}/cart/${productId}`);

		await setDoc(itemRef,{
			title: title,
			price: price,
			amount: increment(1),
			image: image,
		}, {merge: true});
	}
	const showOrdersList = () => {
		setOrdersListVisible(true);
		setOrderVisible(false);
		setBackVisible(false);
		setOrderListPartVisible(true);
		setProductRatingVisible(false);
	}

	const handleSubmit = async () => {
		const productId = dishDetailId;
		let itemRef = doc(db, `dishes/${productId}`);
		try {
			await setDoc(itemRef, {
				stars: increment(rating),
				likesNumber: increment(1)
			}, {merge: true});
			setProductRatingVisible(false);

		} catch (e) {
			console.log(e);
		}
	}

	const showProduct = async (id) => {
		const productId = id;
		const docRef = doc(db, "dishes", productId);
		const docSnap = await getDoc(docRef);
		await setDishDetailImage(docSnap.data().image);
		await setDishDetailTitle(docSnap.data().title);
		await setDishDetailId(productId);
		await  setProductRatingVisible(true);
	}

	return (
		<div className="content">
			{
				orderListPartVisible ?
					<div className="order-list-part">
						<Link to="/menu" className="link-panel">
							<div className="payment-link-wrapper">
								<img src={back} alt="back"/>
							</div>
						</Link>
						<div className="your-orders">Your orders</div>
						<div className="order-type">
							<div style={completeStyles}
								 className="complete"
								 onClick={changePendingActive}
							>Complete orders
							</div>
							<div style={pendingStyles}
								 className="pending"
								 onClick={changeCompleteActive}
							>Pending orders
							</div>
						</div>
					</div> : null
			}

			{
				backVisible ? <div className="link-panel" onClick={showOrdersList}>
					<div className="payment-link-wrapper">
						 <img src={back} alt="back"/>
						 </div>
				</div> : null
			}
			{
				productRatingVisible ?
					<div  className="product-rating">
						<div style={{textAlign:"center", marginBottom:"10px"}} className="product-title">{dishDetailTitle}</div>

						<img style={{width:"200px", height: "150px", marginLeft: "100px", borderRadius: "10px"}} src={dishDetailImage} alt="img"/>
						<div style={{marginLeft: "50px"}} className="stars-wrapper">
							{
								[...Array(5)].map((star, index) => {
									const ratingValue = index + 1;
									return (
										<label key={index}>
											<input className="star-input"
												   type="radio"
												   name="rating"
												   value={ratingValue}
												   onChange={() => setRating(ratingValue)}
											/>
											<div className="star-wrapper">
												<img src={ratingValue <= (hover || rating) ? star_red : star_empty}
													 alt="star"
													 onMouseEnter={() => setHover(ratingValue)}
													 onMouseLeave={() => setHover(null)}

												/>
											</div>

										</label>
									)
								})
							}
							<button className="btn btn-50" onClick={handleSubmit}>Send</button>
						</div>

					</div> : null
			}

			{
				orderVisible ?
					<div className="order-products-wrapper" style={wrapperStyles}>

						{
							usOrd.map(or => {
								return(
									<div  key={or.id} className="product-wrapper">

										<div className="product-image">
											<img className="cart-image" src={or.image}/>
										</div>
										<div className="add-review" onClick={() => showProduct(or.id)}>Add review</div>
										<div className="product-data">
											<div className="product-title">{or.title}</div>
											<div className="product-price">${or.price}</div>
										</div>


										<button className="btn btn-28"
												onClick={() => addProductToCart(
													or.id,
													or.title,
													or.price,
													or.image
												)}
										>+</button>
									</div>
								)
							})
						}
					</div> : null
			}
			{
				ordersListVisible ?
					<div className="orders-list">
						{
							userOrders.map(userOrder => {
								return (
									<div key={userOrder.id} className="order-wrapper">
										<div className="order-image-wrapper">
											<img src={userOrder.items[0].image} alt="user-order-image"/>
										</div>
										<div className="order-description">
											<div className="order-header">Whataburger</div>
											<div className="order-title">{userOrder.items[0].title}</div>

											<div className="order-total">${userOrder.totalSum}</div>

											<div className="order-again"
												 onClick={() => showOrder(userOrder.id)}>Order again</div>
										</div>
									</div>
								)
							})
						}
					</div> : null
			}
		</div>
	)
}

export default OrdersPage;