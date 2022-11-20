import React, {useState} from "react";
import "./HomePage.scss";
import burger from "../../images/burger.png";
import pizza from "../../images/pizza.png";
import cat from "../../images/cat.png";
import box from "../../images/nav/box.png";
import home from "../../images/nav/home.png";
import search from "../../images/nav/search.png";
import heart from "../../images/nav/heart.png";
import user from "../../images/nav/user.png";
import {Link} from "react-router-dom";
import foodArray from "../data/products.json";
import close from "../../images/close.png";


const HomePage = () => {
	const [burgerVisible, setBurgerVisible] = useState(true);
	const [pizzaVisible, setPizzaVisible] = useState(true);
	const [notTopVisible, setNotTopVisible] = useState(true);
	const [searchValue, setSearchValue] = useState('');
	const [findResultVisible, setFindResultVisible] = useState(false);
	const [cart, setCart] = useState([]);

	const products = foodArray.map((product) => {

		const addProduct = (id) => {
			let existedProduct = cart.find(product => product.id === id);
			if (!existedProduct) {
				const product = products.find(product => product.id === id);
				const productInCart = {...product, amount: 1}
				setCart([...cart, productInCart])
			} else {
				const amount = existedProduct.amount;
					const productInCart = {...existedProduct, amount: amount + 1};
					const oldCart = box.filter(product => product.id !== id);
					setCart([...oldCart, productInCart])
			}
			console.log(cart);
		}
		return (
			<div key={product.id} className="card--content">
				<div className="image-wrapper">
					<img src={product.image}/>
				</div>
				<div className="product">
					<div className="product-title">{product.title}</div>
					<div className="product-descr">{product.ingredients}</div>
					<div className="order">
						<div className="price">$ {product.price}</div>
						<button onClick={addProduct} className="btn btn-28">+</button>
					</div>

				</div>
			</div>
		)
	});
	let burgerMenu = foodArray.filter(product => product.category == "burger").
	map((product) => {
		return (
			<div key={product.id} className="card--content">
				<div className="image-wrapper">
					<img src={product.image}/>
				</div>
				<div className="product">
					<div className="product-title">{product.title}</div>
					<div className="product-descr">{product.ingredients}</div>
					<div className="order">
						<div className="price">$ {product.price}</div>
						<button className="btn btn-28">+</button>
					</div>

				</div>
			</div>
		)
	})
	let pizzaMenu = foodArray.filter(product => product.category == "pizza").
	map((product) => {
		return (
			<div key={product.id} className="card--content">
				<div className="image-wrapper">
					<img src={product.image}/>
				</div>
				<div className="product">
					<div className="product-title">{product.title}</div>
					<div className="product-descr">{product.ingredients}</div>
					<div className="order">
						<div className="price">$ {product.price}</div>
						<button className="btn btn-28">+</button>
					</div>

				</div>
			</div>
		)
	})
	let topMenu = foodArray.filter(product => product.top == true).
	map((product) => {
		return (
			<div key={product.id} className="card--content">
				<div className="image-wrapper">
					<img src={product.image}/>
				</div>
				<div className="product">
					<div className="product-title">{product.title}</div>
					<div className="product-descr">{product.ingredients}</div>
					<div className="order">
						<div className="price">$ {product.price}</div>
						<button className="btn btn-28">+</button>
					</div>

				</div>
			</div>
		)
	})

	let find = foodArray.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase())).
	map((product) => {
		return (
			<div key={product.id} className="card--content">
				<div className="image-wrapper">
					<img src={product.image}/>
				</div>
				<div className="product">
					<div className="product-title">{product.title}</div>
					<div className="product-descr">{product.ingredients}</div>
					<div className="order">
						<div className="price">$ {product.price}</div>
						<button className="btn btn-28">+</button>
					</div>

				</div>
			</div>
		)
	})



	const showBurgerMenu = () => {
		 setPizzaVisible(false);
		 setBurgerVisible(true);
	}

	const showAllMenu = () => {
		setBurgerVisible(true);
		setPizzaVisible(true)
	}

	const showPizzaMenu = () => {
		setBurgerVisible(false);
		setPizzaVisible(true);
	}

	const showAllTop = () => {
		setNotTopVisible(false);
	}

	const showTopOnly = () => {
		setNotTopVisible(true);
	}

	const showFindPanel = () => {
		setFindResultVisible(true)
	}

	const hideFindPanel = () => {
		setFindResultVisible(false)
	}


	return (
		<div className="content">
			<div className="content-home">
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
					<div onClick={showAllMenu} className="all">All</div>
					<div className="category">
						<div onClick={showBurgerMenu} className="category-image">
							<img src={burger} alt="burger"/>
						</div>
						<div className="category-title">Burger</div>
					</div>
					<div className="category">
						<div onClick={showPizzaMenu} className="category-image">
							<img src={pizza} alt="pizza"/>
						</div>
						<div className="category-title">Pizza</div>
					</div>
				</div>
				{
					findResultVisible
						? <div className="find-wrapper">
							<input type="text"
								   style={{marginLeft: "21px"}}
								   className="input-log height-58"
								   value={searchValue}
								   onChange={(event) => setSearchValue(event.target.value)}
							/>
							<button className="btn btn-28"
									style={{marginLeft: "-40px"}}
									onClick={hideFindPanel}>
								<img src={close} alt={close}/>
							</button>
						</div>
						: null
				}

				<div className="main">
					<div className="bar">
						<div className="new">New</div>
						<div className="popular">Popular</div>
					</div>
					{
						findResultVisible ? <div className="card">
							{
								findResultVisible ? find : null
							}

						</div> : <div className="card">
							{
								burgerVisible && pizzaVisible ? products : (
									(!burgerVisible && pizzaVisible) ? pizzaMenu : burgerMenu
								)
							}
						</div>
					}
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
							notTopVisible ? topMenu : products
						}
					</div>

				</div>

				<div className="nav-panel">
					<div className="nav-image-wrapper">
						<img src={home} alt="home"/>
					</div>
					<div className="nav-image-wrapper">
						<img src={box} alt="box"/>
					</div>
					<div onClick={showFindPanel} className="search-wrapper">
						<img src={search} alt="search"/>
					</div>

					<div onClick={showTopOnly} className="nav-image-wrapper">
						<img src={heart} alt="heart"/>

					</div>
					<div className="nav-image-wrapper">
						<img src={user} alt="user"/>
					</div>
				</div>

			</div>
		</div>
	)
}

export default HomePage;