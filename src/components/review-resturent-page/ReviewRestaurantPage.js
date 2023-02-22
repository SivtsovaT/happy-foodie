import React, { useState } from 'react';
import './ReviewRestaurantPage.scss';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import {
  setDoc, doc,
} from 'firebase/firestore';
import back from '../../images/back.png';
import ratingLogo from '../../images/rating/rating-logo.png';
import starYellow from '../../images/revres/star_yellow.png';
import starEmpty from '../../images/revres/star_empty.png';
import { db } from '../../firebase';

function ReviewRestaurantPage() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const itemRef = doc(db, `review-restaurant/${userId}`);
    const userPhoto = auth.currentUser.photoURL;
    const userName = auth.currentUser.displayName;

    await setDoc(itemRef, {
      userId,
      rating,
      comment,
      avatar: userPhoto,
      userName,
    }, { merge: true });
    window.location.replace('home');
  };

  return (
      /* eslint-disable */
      <div className="content">
      <div className="rating-wrapper">
        <Link to="/menu" className="link-panel">
          <div className="link-wrapper">
            <img src={back} alt="back"/>
          </div>
        </Link>
        <div className="logo-main">
          <div className="logo-wrapper">
            <div className="main-logo">
              <img src={ratingLogo} alt="logo"/>
            </div>
          </div>
        </div>
        <div className="question">How was your last order from Whataburger ?</div>
        <div className="revres-good">Good</div>
        <div className="stars-wrapper">
          {
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
                          src={ratingValue <= (hover || rating) ? starYellow : starEmpty}
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
            placeholder="Write"
            maxLength="300"
            value={comment}
            onChange={(event)=>setComment(event.target.value)}
        />
        <button type="button" onClick={handleSubmit} className="btn btn-282 btn-rating">Submit</button>
      </div>
    </div>
  );
}

export default ReviewRestaurantPage;
