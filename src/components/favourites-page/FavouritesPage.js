import React, {useEffect, useState} from "react";
import "./FavouritesPage.scss";
import {getAuth} from "firebase/auth";
import {collection, deleteDoc, doc, getDocs, increment, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import trash from "../../images/cart/trash.png";
import plus from "../../images/cart/plus.png";
import box from "../../images/nav/cart-grey.png";

const FavouritesPage = () => {
	const [dishes, setDishes] = useState([]);
	const [httpPending, setHttpPending] = useState(false);
	const [currentAuth, setCurrentAuth] = useState(null);

	//const [userData, setUserData] = useState([]);
	const deleteDish = async (id) => {
		let productId = id;
		let itemRef = doc(db, `users/${currentAuth}/favourites/${productId}`);
		await deleteDoc(itemRef);
		const data = await getDocs(collection(db, `users/${currentAuth}/favourites`));
		setDishes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
	};

	const addProductToCart = async (id, title, price, image) => {
		let productId = id;
		let itemRef = doc(db, `users/${currentAuth}/cart/${productId}`);

		await setDoc(itemRef,{
			title: title,
			price: price,
			amount: increment(1),
			image: image,
		}, {merge: true});
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
		const auth = async () => {
			await getAuthUser();
		};
		auth();
	}, []);

	useEffect(() => {
		if (!currentAuth) {
			return;
		}
		const getDishesFavourite = async () => {
			const data = await getDocs(collection(db, `users/${currentAuth}/favourites`));
			await setDishes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
		};
		getDishesFavourite();
	}, [currentAuth]);





	return (
		<div className="content">
			{
				dishes.map(dish => {
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
								<button style={{background: "#27252a"}} className="btn btn-28">
									<img onClick={() => deleteDish(dish.id)} src={trash} alt="trash"/>

								</button>
								<button onClick={() => addProductToCart(
									dish.id,
									dish.title,
									dish.price,
									dish.image
								)}
										className="btn btn-28">+
								</button>

							</div>

							}
						</div>

					)
				})
			}
		</div>
	)
}

export default FavouritesPage;