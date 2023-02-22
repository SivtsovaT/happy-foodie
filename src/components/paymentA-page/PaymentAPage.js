import React, { useEffect, useState } from 'react';
import './PaymentAPage.scss';
import { getAuth } from 'firebase/auth';
/* eslint-disable */
import { collection, doc, getDoc, getDocs, query, setDoc, orderBy, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import back from '../../images/back.png';
import creditCard from '../../images/paymentA/credit-cart.png';
import debitCard from '../../images/paymentA/debit-card.png';
import payPal from '../../images/paymentA/paypal.png';
import plus from '../../images/cart-not-set/plus.png';
import checked from '../../images/paymentA/checked.png';
import mastercard from '../../images/paymentA/mastercard.png';
import visa from '../../images/paymentA/visa.png';

function PaymentAPage() {
  const [userData, setUserData] = useState([]);
  const [currentAuth, setCurrentAuth] = useState(null);
  const [activeClassCredit, setActiveClassCredit] = useState(true);
  const [activeClassDebit, setActiveClassDebit] = useState(false);
  const [activeClassPayPal, setActiveClassPayPal] = useState(false);
  const [cards, setCards] = useState([]);
  const [orderCardNumber, setOrderCardNumber] = useState();
  const [payS, setPayS] = useState();
  const [totalSum, setTotalSum] = useState();

  const stylesCredit = {
    background: activeClassCredit ? '#E94040' : '#27252a',
  };
  const stylesDebit = {
    background: activeClassDebit ? '#E94040' : '#27252a',
  };
  const stylesPayPall = {
    background: activeClassPayPal ? '#E94040' : '#27252a',
  };
  const changeActiveClassCredit = () => {
    setActiveClassDebit(false);
    setActiveClassCredit(true);
    setActiveClassPayPal(false);
  };
  const changeActiveClassDebit = () => {
    setActiveClassDebit(true);
    setActiveClassCredit(false);
    setActiveClassPayPal(false);
  };
  const changeActiveClassPayPal = () => {
    setActiveClassDebit(false);
    setActiveClassCredit(false);
    setActiveClassPayPal(true);
  };
  const addCart = async (cardNumber, paymentSystem) => {
    if (!currentAuth) {

    } else {
      const lastNumber = cardNumber.slice(-4);
      const orderRef = collection(db, 'orders');
      const q = query(orderRef, orderBy('created', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      const docSnapshots = querySnapshot.docs;
      for (const i in docSnapshots) {
        const orderId = docSnapshots[i].id;
        const orderRef1 = doc(db, 'orders', orderId);
        await setDoc(orderRef1, {
          cardNumber,
          lastNumber,
          paymentSystem,
        }, { merge: true });
        window.location.reload();
      }
    }
  };

  const payOrder = async () => {
    if (!currentAuth) {

    } else {
      const orderRef = collection(db, 'orders');
      const q = query(orderRef, orderBy('created', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      const docSnapshots = querySnapshot.docs;
      for (const i in docSnapshots) {
        const orderCardNumber = docSnapshots[i].data().lastNumber;
        if (orderCardNumber) {
          const orderId = docSnapshots[i].id;
          const orderRef1 = doc(db, 'orders', orderId);
          await setDoc(orderRef1, {
            paid: 1,
          }, { merge: true });
          window.location.replace('/order');
        } else {
          window.location.replace('/cartnot');
        }
      }
    }
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
    if (!currentAuth) {
      return;
    }
    const getUser = async () => {
      const docRef = doc(db, 'users', currentAuth);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      setUserData(data);
    };
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
    const getCards = async () => {
      const data = await getDocs(collection(db, `users/${currentAuth}/userCard`));
      setCards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCards();
  }, [currentAuth]);

  useEffect(() => {
    if (!currentAuth) {
      return;
    }
    const getCardsAdded = async () => {
      const orderRef = collection(db, 'orders');
      const q = query(orderRef, orderBy('created', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      const docSnapshots = querySnapshot.docs;
      for (const i in docSnapshots) {
        const orderCN = docSnapshots[i].data().lastNumber;
        const orderPS = docSnapshots[i].data().paymentSystem;
        const orderTS = docSnapshots[i].data().totalSum;
        setOrderCardNumber(orderCN);
        setPayS(orderPS);
        setTotalSum(orderTS);
      }
    };
    getCardsAdded();
  }, [currentAuth]);

  return (
    <div className="content">
      <Link to="/cart" className="link-panel">
        <div className="payment-link-wrapper">
          <img src={back} alt="back" />
        </div>
        <div className="payment-title">Payment Method</div>
      </Link>
      <div className="delivery-method">Delivery method</div>
      <div className="delivery-data">
        <div className="delivery-data-descr">
          {userData.region}
          ,
          {' '}
          {userData.city}
          ,
          {' '}
          {userData.street}
        </div>
        <Link to="/address" className="change">Change</Link>
      </div>
      <div className="delivery-data">
        <div className="delivery-data-descr">{userData.phone}</div>
        <Link to="/address" className="change">Change</Link>
      </div>
      <div className="card-types">
        <div style={stylesCredit} onClick={changeActiveClassCredit} className="card-type">
          <div className="payment-image-wrapper">
            <img src={creditCard} alt="credit" />
          </div>
          <div className="card-descr">Credit Card</div>
        </div>
        <div style={stylesDebit} onClick={changeActiveClassDebit} className="card-type">
          <div className="payment-image-wrapper">
            <img src={debitCard} alt="debit" />
          </div>
          <div className="card-descr">Debit</div>
        </div>
        <div style={stylesPayPall} onClick={changeActiveClassPayPal} className="card-type">
          <div className="payment-image-wrapper">
            <img src={payPal} alt="paypal" />
          </div>
          <div className="card-descr">PayPal</div>
        </div>
      </div>
      <div className="add-card-wrapper">
        <div className="add-card">
          <Link to="/carddetails">
            <button className="btn-add">
              <img src={plus} alt="plus" />
            </button>
          </Link>
          <div className="add-card-title">Add new card</div>
        </div>
        <div className="payment-system-content">
          {
						payS
						  ? (
  <div className="payment-system">
    <div className="payment-system-wrapper">
      <div className="payment-system-title">{payS}</div>
      <div className="card-info" style={{ alignItems: 'center' }}>
        {
											payS == 'Mastercard'
											  ? <img src={mastercard} alt="mastercard" />
											  : <img src={visa} alt="visa" />
										}
        <div className="card-info-text">●●●●</div>
        <div className="card-info-number">{orderCardNumber}</div>
        <img style={{ marginLeft: '118px' }} src={checked} alt="checked" />
      </div>
    </div>
  </div>
						  ) : null
					}

          {
						cards.map((card) => (
  <div
    key={card.id}
    onClick={() => addCart(card.cardNumber, card.paymentSystem)}
    className="payment-system"
  >
    <div className="payment-system-wrapper">
      <div className="payment-system-title">{card.paymentSystem}</div>
      <div className="card-info">
        {
												card.paymentSystem == 'Mastercard'
												  ? <img src={mastercard} alt="mastercard" />
												  : <img src={visa} alt="visa" />
											}
        <div className="card-info-text">●●●●</div>
        <div className="card-info-number">{card.lastNumber}</div>
      </div>
    </div>
  </div>
						))
					}
        </div>
        <button onClick={payOrder} className="btn btn-322 btn-payment">
          <div className="pay-now">PAY NOW</div>
          <div className="total-sum">
            $
            {totalSum}
          </div>
        </button>
      </div>
    </div>
  );
}

export default PaymentAPage;
