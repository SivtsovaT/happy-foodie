import React, { useEffect, useState } from 'react';
import './DetailPage.scss';
import { Link } from 'react-router-dom';
import {
  doc, getDoc, increment, setDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import back from '../../images/back.png';
import heartWhite from '../../images/detail/heart-white.png';
import starYellow from '../../images/detail/star-yellow.png';
import plus from '../../images/cart/plus-white.png';
import detailBurger from '../../images/cart/burger-box.png';
import { db } from '../../firebase';

function DetailPage({
  dishDetailTitle,
  dishDetailPrice,
  dishDetailDescription,
  dishDetailImage,
  showHome,
  dishDetailId,
  dishDetailRating,
  dishDetailLikes,
}) {
  const [checked, setChecked] = useState(false);
  const [chefsBurger, setChefsBurger] = useState([]);
  const [detailAmount, setDetailAmount] = useState(1);

  useEffect(() => {
    const getChefsBurger = async () => {
      const docRef = doc(db, 'dishes', 'zk3Nm7r3JlgDeAjQemCL');
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      setChefsBurger(data);
    };
    getChefsBurger();
  }, []);

  const incrementAmount = () => {
    setDetailAmount(detailAmount + 1);
  };
  const decrementAmount = () => {
    if (detailAmount > 1) {
      setDetailAmount(detailAmount - 1);
    }
  };

  const addChefsBurger = async () => {
    setChecked(!checked);
  };
  const addProductToCart = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const productId = dishDetailId;
    const itemRef = doc(db, `users/${userId}/cart/${productId}`);

    await setDoc(itemRef, {
      title: dishDetailTitle,
      price: dishDetailPrice,
      amount: increment(detailAmount),
      image: dishDetailImage,
    }, { merge: true });

    if (checked) {
      const productIdCh = 'zk3Nm7r3JlgDeAjQemCL';
      const itemRefCh = doc(db, `users/${userId}/cart/${productIdCh}`);

      await setDoc(itemRefCh, {
        title: chefsBurger.title,
        price: chefsBurger.price,
        amount: increment(1),
        image: chefsBurger.image,
      }, { merge: true });
    }
  };

  const addToFavourites = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const productId = dishDetailId;
    const itemRef = doc(db, `users/${userId}/favourites/${productId}`);

    await setDoc(itemRef, {
      title: dishDetailTitle,
      price: dishDetailPrice,
      amount: 1,
      image: dishDetailImage,
    }, { merge: true });
  };
  const chefsBurgerPrice = chefsBurger.price;
  return (
    <div className="content">
      <div className="detail-header">
        <div onClick={showHome} onKeyUp={showHome} role="presentation" className="detail-back">
          <img src={back} alt="back" />
        </div>
        <div onClick={addToFavourites} onKeyUp={addToFavourites} role="presentation" className="heart-wrapper">
          <img src={heartWhite} alt="cat" />
        </div>
      </div>
      <div className="order">
        <img className="order-image" src={dishDetailImage} alt="order" />
      </div>

      <div className="detail-main">
        <div className="detail-title">{dishDetailTitle}</div>
        <div className="review">
          <img src={starYellow} alt="star" />
          <div className="detail-rating">{dishDetailRating / dishDetailLikes}</div>
          <div className="detail-total">{dishDetailLikes}</div>
          <Link to="/reviews">
            <div className="see-review">See Review</div>
          </Link>
        </div>
        <div className="details-order">
          <div className="detail-price">
            <div className="dollar">$</div>
            <div className="price">{dishDetailPrice * detailAmount}</div>
          </div>
          <div className="detail-increase">
            <div onClick={decrementAmount} onKeyUp={decrementAmount} role="presentation" className="round-minus">
              <div className="minus" />
            </div>
            <div className="number">{detailAmount}</div>
            <div onClick={incrementAmount} onKeyUp={incrementAmount} role="presentation" className="round-plus">
              <img src={plus} alt="plus" />
            </div>
          </div>
        </div>
        <div className="detail-description">{dishDetailDescription}</div>
        <div className="choice-add">Choice of Add On</div>
        <div className="add-on">
          <div className="add-on_round">
            <img src={detailBurger} alt="burger" />
          </div>
          <div className="add-on_title">{chefsBurger.title}</div>
          <div className="add-on_price">
            $
            {chefsBurger.price}
          </div>
          <label className="cont" htmlFor="first-checkbox">
            <input
              type="checkbox"
              checked={checked}
              onChange={addChefsBurger}
              className="check-highload"
              id="first-checkbox"
            />
            <span className="highload-after" />
          </label>

        </div>
      </div>
      <div className="detail-panel">
        <div className="detail-total_price">
          <div className="detail-total_descr">Total Price</div>
          <div className="detail-total_sum">
            $
            {
              checked
                ? dishDetailPrice * detailAmount + chefsBurgerPrice
                : dishDetailPrice * detailAmount
            }
          </div>
        </div>
        <button type="button" onClick={addProductToCart} className="btn btn-143 det-but">ADD TO BAG</button>
      </div>

    </div>
  );
}

export default DetailPage;
