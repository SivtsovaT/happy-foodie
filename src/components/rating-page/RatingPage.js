import React, { useEffect, useState } from 'react';
import './RatingPage.scss';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import back from '../../images/back.png';
import ratingLogo from '../../images/rating/rating-logo.png';
import ratingSmall from '../../images/rating/rating-small.png';
import starRed from '../../images/rating/star_red.png';
import starEmpty from '../../images/rating/star_wtite.png';
import { db } from '../../firebase';

function RatingPage() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');
  const [userData, setUserData] = useState([]);
  const [currentAuth, setCurrentAuth] = useState(null);
  const [httpPending, setHttpPending] = useState(false);

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

  const handleSubmit = async () => {
    if (!currentAuth || httpPending) {
      return;
    }
    const itemRef = doc(db, `reviews/${currentAuth}`);
    setHttpPending(true);
    const auth = getAuth();
    const userPhoto = auth.currentUser.photoURL;
    const userName = auth.currentUser.displayName;
    try {
      await setDoc(itemRef, {
        userId: currentAuth,
        rating,
        comment,
        avatar: userPhoto,
        userName,
      }, { merge: true });
      window.location.replace('home');
    } catch (e) {
      console.log(e);
      setHttpPending(false);
    }
  };

  return (
    <div className="content">
      <div className="rating-wrapper">
        <Link to="/menu" className="link-panel">
          <div className="link-wrapper">
            <img src={back} alt="back" />
          </div>
        </Link>
        <div className="logo-main">
          <div className="logo-wrapper">
            <div className="main-logo">
              <img src={ratingLogo} alt="logo" />
            </div>
            <div className="small-logo">
              <img src={ratingSmall} alt="small" />
            </div>
          </div>
        </div>
        <div className="rating-header">Whataburger</div>
        <div className="rating-pretty">
          {userData.region}
          ,
          {' '}
          {userData.city}
          ,
          {' '}
          {userData.street}
        </div>
        <div className="order-delivered">
          <div className="order-ellipse" />
          <div className="order-text">Order Delivered</div>
        </div>
        <div className="rate">Please Rate Delivery Service</div>
        <div className="good">Good</div>
        <div className="stars-wrapper">
          {
            /* eslint-disable */
            [...Array(5)].map((star, index)=>{
              const ratingValue = index + 1;
              return (
                  <label key={index}>
                    <input
                        className="star-input"
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onChange={()=>setRating(ratingValue)}
                    />
                    <div className="star-wrapper">
                      <img
                          src={ratingValue <= (hover || rating) ? starRed : starEmpty}
                          alt="star"
                          onMouseEnter={()=>setHover(ratingValue)}
                          onMouseLeave={()=>setHover(null)}
                      />
                    </div>

                  </label>
              );
            })
          }
        </div>
        <textarea
          className="input-log rating"
          type="text"
          placeholder="Write review"
          maxLength="360"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="button" onClick={handleSubmit} className="btn btn-282 btn-rating">Submit</button>
      </div>
    </div>
  );
}

export default RatingPage;
