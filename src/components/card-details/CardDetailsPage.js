import React, { useState } from 'react';
import './CardDetailsPage.scss';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import back from '../../images/back.png';
import { auth, db } from '../../firebase';

function CardDetailsPage() {
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const navigate = useNavigate();
  const updateCardDetails = async () => {
    const lastNumber = cardNumber.slice(-4);
    if (nameOnCard.length === 0) {
      alert('The field "name" cannot be empty');
    } else if (cardNumber.length !== 16) {
      alert('The field "Card number" must be 16 symbols');
    } else if (expiryDate.length !== 5) {
      alert('Enter please an ExpiryDate like mm/yy');
    } else if (cvv.length !== 3) {
      alert('The field "CVV" must be 3 symbols');
    } else {
      const userId = auth.currentUser.uid;
      const cardId = new Date().toISOString();
      const userRef = doc(db, `users/${userId}/userCard/${cardId}`);
      if (cardNumber[0] === '4') {
        await setDoc(userRef, {
          nameOnCard,
          cardNumber,
          lastNumber,
          expiryDate,
          cvv,
          paymentSystem: 'Visa',
        }, { merge: true });
        window.location.replace('/payment');
      } else if (cardNumber[0] === '5') {
        await setDoc(userRef, {
          nameOnCard,
          cardNumber,
          lastNumber,
          expiryDate,
          cvv,
          paymentSystem: 'Mastercard',
        }, { merge: true });
        window.location.replace('/payment');
      } else {
        alert('Enter the correct card number please');
      }
    }
  };

  return (
    <div className="content">
      <div onClick={() => navigate(-1)} className="link-panel" onKeyUp={() => navigate(-1)} role="presentation">
        <div className="reviews_link-wrapper">
          <img src={back} alt="back" />
        </div>
        <div className="reviews-title">Payment</div>
      </div>
      <div className="card-details-wrapper">
        <input
          className="input-log width-295 cart-details-input"
          placeholder="Name on card"
          value={nameOnCard}
          onChange={(event) => setNameOnCard(event.target.value)}
        />
        <input
          className="input-log width-295 cart-details-input"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(event) => setCardNumber(event.target.value)}
        />
        <div className="input-group">
          <input
            className="input-log cart-details-input"
            style={{ width: '135px', marginRight: '17px' }}
            placeholder="Expiry Date mm/yy"
            value={expiryDate}
            onChange={(event) => setExpiryDate(event.target.value)}
          />
          <input
            className="input-log cart-details-input"
            style={{ width: '125px' }}
            placeholder="CVV"
            value={cvv}
            onChange={(event) => setCvv(event.target.value)}
          />
        </div>
        <button type="button" onClick={updateCardDetails} className="btn btn-295">UPDATE</button>
      </div>
    </div>
  );
}

export default CardDetailsPage;
