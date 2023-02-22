import React, { useEffect, useState } from 'react';
import './FavouritesPage.scss';
import { getAuth } from 'firebase/auth';
import {
  collection, deleteDoc, doc, getDocs, increment, setDoc,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import trash from '../../images/cart/trash.png';
import back from '../../images/back.png';

function FavouritesPage() {
  const [dishes, setDishes] = useState([]);
  const [httpPending, setHttpPending] = useState(false);
  const [currentAuth, setCurrentAuth] = useState(null);

  /* eslint-disable */
  const deleteDish = async (id) => {
    const productId = id;
    const itemRef = doc(db, `users/${currentAuth}/favourites/${productId}`);
    await deleteDoc(itemRef);
    const data = await getDocs(collection(db, `users/${currentAuth}/favourites`));
    setDishes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const addProductToCart = async (id, title, price, image) => {
    const productId = id;
    const itemRef = doc(db, `users/${currentAuth}/cart/${productId}`);
    setHttpPending(true);
    await setDoc(itemRef, {
      title,
      price,
      amount: increment(1),
      image,
    }, { merge: true });
    setHttpPending(false);
  };

  const getAuthUser = async () => {
    try {
      const auth = await getAuth();
      const userId = auth?.currentUser?.uid || null;
      setCurrentAuth(userId);
      if (!userId) {
        setTimeout(() => {
          getAuthUser();
        }, 2000);
      }
    } catch (e) {
      console.log(e);
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
      await setDishes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDishesFavourite();
  }, [currentAuth]);

  return (
    <div className="content">
      <Link to="/home" className="link-panel">
        <div className="payment-link-wrapper">
          <img src={back} alt="back" />
        </div>
        <div className="payment-title">Payment Method</div>
      </Link>
      <div className="favourites-list">
        {
          /* eslint-disable-next-line max-len */
          dishes.map((dish) => (
            <div key={dish.id} className="product-wrapper">
              <div className="product-image">
                <img className="cart-image" src={dish.image} alt="burger" />
              </div>
              <div className="product-data">
                <div className="product-title">{dish.title}</div>
                <div className="product-price">
                  $
                  {dish.price * dish.amount}
                </div>
              </div>
              {httpPending && <div className="product-total">Saving...</div>}
              {!httpPending && (
                <div className="product-total">
                  <button
                    type="button"
                    style={{ background: '#27252a' }}
                    className="btn btn-28"
                  >
                    <img onClick={() => deleteDish(dish.id)} onKeyUp={() => deleteDish(dish.id)} role="presentation" src={trash} alt="trash" />
                  </button>
                  <button
                    className="btn btn-28"
                    type="button"
                    onClick={() => addProductToCart(dish.id, dish.title, dish.price, dish.image)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>

          ))
        }

      </div>
    </div>
  );
}

export default FavouritesPage;
