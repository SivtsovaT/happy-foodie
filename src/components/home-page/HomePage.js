import React, {useEffect, useState} from "react";
import "./HomePage.scss";
import burger from "../../images/burger.png";
import pizza from "../../images/pizza.png";
import cat from "../../images/cat.png";
import cart from "../../images/nav/box.png";
import home from "../../images/nav/home.png";
import search from "../../images/nav/search.png";
import heart from "../../images/nav/heart.png";
import user from "../../images/nav/user.png";
import {Link} from "react-router-dom";
import close from "../../images/close.png";
import {getAuth} from "firebase/auth";
import {db} from "../../firebase";
import {doc, collection, getDocs, query, where, setDoc, increment, getDoc} from "firebase/firestore";
import DetailPage from "../detail-page/DetailPage";

const HomePage = () => {
	const [searchValue, setSearchValue] = useState('');
	const [invisibleHome, setInvisibleHome] = useState(false);
	const [dishes, setDishes] = useState([]);
	const [dishesTop, setDishesTop] = useState([]);
	const dishesCollectionRef = collection(db, "dishes");
	const [filteredDishes, setFilteredDishes] = useState([]);
	const [findInputVisible, setFindInputVisible] = useState(false);
	const [dishDetailTitle, setDishDetailTitle] = useState('');
	const [dishDetailPrice, setDishDetailPrice] = useState('');
	const [dishDetailDescription, setDishDetailDescription] = useState('');
	const [dishDetailImage, setDishDetailImage] = useState('');
	const [dishDetailId, setDishDetailId] = useState('');

	const showFindInput = () => {
		setFindInputVisible(true)
	}
	const hideFindInput = () => {
		setFindInputVisible(false)
	}

	const stylesHome = {
		display: invisibleHome ? "none" : "flex"
	}

	const showHome = () => {
		setInvisibleHome(prevState => !prevState)
	}

	useEffect(() => {
		const getDishes = async () => {
			const data = await getDocs(dishesCollectionRef);
			setDishes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};

		getDishes();
	}, []);

	useEffect(() => {
		const getDishesTop = async () => {
			const q = query(collection(db, "dishes"), where("top", "==", "true"));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				setDishesTop(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			});
		};

		getDishesTop();
	}, []);

	useEffect(() => {
		setFilteredDishes(
			dishes.filter(
				(dish) =>
					dish.title.toLowerCase().includes(searchValue.toLowerCase())
			)
		);
	}, [searchValue, dishes]);

	const openAllMenu =  async () => {
		const q = query(collection(db, "dishes"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setDishes(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});
	}

	const openBurgerMenu =  async () => {
		const q = query(collection(db, "dishes"), where("category", "==", "burger"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setDishes(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});
	}

	const openPizzaMenu =  async () => {
		const q = query(collection(db, "dishes"), where("category", "==", "pizza"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setDishes(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});
	}

	const showAllTop = async () => {
		const q = query(collection(db, "dishes"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setDishesTop(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});
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

	const showProd = async (id) => {
		const productId = id;
		const docRef = doc(db, "dishes", productId);
		const docSnap = await getDoc(docRef);
		await setDishDetailTitle(docSnap.data().title);
		await setDishDetailPrice(docSnap.data().price);
		await setDishDetailDescription(docSnap.data().description);
		await setDishDetailImage(docSnap.data().image);
		await setDishDetailId(docSnap.data().id);
		setDishDetailId(productId)
		setInvisibleHome(true);
	}

	return (
		<div>
			{
				invisibleHome && <DetailPage dishDetailTitle={dishDetailTitle}
											 dishDetailPrice={dishDetailPrice}
											 dishDetailDescription={dishDetailDescription}
											 dishDetailImage={dishDetailImage}
											 dishDetailId={dishDetailId}
											 showHome={showHome}
				/>
			}
			<div style={stylesHome} className="content">
				<div  className="content-home">
					<div className="sandwich">
						<Link to="/menu" className="sandwich-wrapper">
							<div className="line-one"></div>
							<div className="line-two"></div>
							<div className="line-three"></div>
						</Link>
						<div className="cat-wrapper">
							<img src={cat} alt="cat"/>
						</div>
					</div>
					<div className="home-header">
						<div className="title">Get your Food</div>
						<div className="descr">Delivered!</div>
					</div>
					<div className="categories">
						<div onClick={openAllMenu} className="all">All</div>
						<div className="category">
							<div onClick={openBurgerMenu} className="category-image">
								<img src={burger} alt="burger"/>
							</div>
							<div className="category-title">Burger</div>
						</div>
						<div className="category">
							<div onClick={openPizzaMenu} className="category-image">
								<img src={pizza} alt="pizza"/>
							</div>
							<div className="category-title">Pizza</div>
						</div>
					</div>
					{
						findInputVisible ? 	<div className="find-wrapper">
							<input
								type="text"
								style={{marginLeft: "21px"}}
								className="input-log height-58"
								value={searchValue}
								onChange={(event) => setSearchValue(event.target.value)}
							/>
							<button className="btn btn-28"
									style={{marginLeft: "-40px"}}
									onClick={hideFindInput}>
								<img src={close} alt={close}/>
							</button>
						</div> : null
					}
					<div className="main">
						<div className="bar">
							<div className="new">New</div>
							<div className="popular">Popular</div>
						</div>
						<div className="card">
							{filteredDishes.map((dish) => {
								return (
									<div key={dish.id} className="card--content">
										<div className="image-wrapper">
											<img src={dish.image}
												 alt="image"
												 onClick={() => showProd(dish.id)}
											/>
										</div>
										<div className="product">
											<div className="product-title">{dish.title}</div>
											<div className="product-descr">{dish.ingredients}</div>
											<div className="order">
												<div className="price">$ {dish.price}</div>
												<button onClick={() => addProductToCart(
													dish.id,
													dish.title,
													dish.price,
													dish.image
												)}
														className="btn btn-28">+
												</button>
											</div>
										</div>
									</div>
								)
							})
							}
						</div>
					</div>

					<div className="details">
						<div className="top-details">Top Food Deals</div>
						<div className="view-all">
							<div onClick={showAllTop} className="view-all-title">View all</div>
							<div className="view-all-image">
								<i></i>
							</div>
						</div>
					</div>
					<div className="main">
						<div className="card">
							{
								dishesTop.map((dish) => {
									return (
										<div key={dish.id} className="card--content">
											<div className="image-wrapper">
												<img src={dish.image}
													 alt="image"
													 onClick={showHome}
												/>
											</div>
											<div className="product">
												<div className="product-title">{dish.title}</div>
												<div className="product-descr">{dish.ingredients}</div>
												<div className="order">
													<div className="price">$ {dish.price}</div>
													<button  className="btn btn-28">+</button>
												</div>
											</div>
										</div>
									)
								})
							}
						</div>
					</div>
					<div className="nav-panel">
						<div className="nav-image-wrapper">
							<img src={home} alt="home"/>
						</div>
						<Link to="/cart">
							<div className="nav-image-wrapper">
								<img src={cart} alt="box"/>
							</div>
						</Link>
						<div onClick={showFindInput} className="search-wrapper">
							<img src={search} alt="search"/>
						</div>
						<Link to="/favourites">
							<div className="nav-image-wrapper">
								<img src={heart} alt="heart"/>
							</div>
						</Link>
						<div className="nav-image-wrapper">
							<img src={user} alt="user"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomePage;