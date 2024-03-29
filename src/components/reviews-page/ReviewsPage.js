import React, { useEffect, useState } from 'react';
import './ReviewsPage.scss';
import { Link } from 'react-router-dom';
import {
  collection, doc, getDocs, setDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import back from '../../images/back.png';
import { db } from '../../firebase';
import profileGroup from '../../images/profileGroup.png';
import reviewStar from '../../images/reviews/review-star.png';

function ReviewsPage() {
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [restaurantReviews, setRestaurantReviews] = useState([]);

  useEffect(() => {
    const getOrdersReviews = async () => {
      const data = await getDocs(collection(db, 'reviews'));
      setReviews(data.docs.map(() => ({ ...doc.data(), id: doc.id })));
    };
    getOrdersReviews();
  }, []);

  useEffect(() => {
    const getRestaurantReviews = async () => {
      const data = await getDocs(collection(db, 'review-restaurant'));
      setRestaurantReviews(data.docs.map(() => ({ ...doc.data(), id: doc.id })));
    };
    getRestaurantReviews();
  }, []);

  const handleSubmit = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const itemRef = doc(db, `review-restaurant/${userId}`);
    const userPhoto = auth.currentUser.photoURL;

    await setDoc(itemRef, {
      userId,
      comment,
      avatar: userPhoto,
    }, { merge: true });
    window.location.replace('home');
  };

  return (
      /* eslint-disable */
      <div className="content">
      <Link to="/home" className="link-panel">
        <div className="reviews_link-wrapper">
          <img src={back} alt="back"/>
        </div>
        <div className="reviews-title">Reviews</div>
      </Link>
      <textarea
          className="input-log reviews"
          type="text"
          placeholder="Write your review..."
          maxLength="80"
          value={comment}
          onChange={(event)=>setComment(event.target.value)}
      />

      <div className="review-list">
        {
          reviews.map((orderReview)=>(
              <div key={orderReview.id} className="review-item">
                <div className="review-header">
                  <div className="review-image">
                    <img src={orderReview.avatar ? orderReview.avatar : profileGroup} alt="avatar"/>
                  </div>
                  <div className="review-subheader">
                    <div className="user-wrapper">
                      <div className="user-name">{orderReview.userName}</div>
                      <div className="reviews-rating">
                        <img src={reviewStar} alt="star"/>
                        {orderReview.rating}
                        /5
                      </div>
                    </div>
                    <div className="ellipse-wrapper">
                      <div className="ellipse"/>
                      <div className="ellipse"/>
                    </div>
                  </div>
                </div>
                <div className="review-content">{orderReview.comment}</div>
              </div>
          ))
        }
        {
          restaurantReviews.map((restaurantReview)=>(
              <div key={restaurantReview.id} className="review-item">
                <div className="review-header">
                  <div className="review-image">
                    <img src={restaurantReview.avatar ? restaurantReview.avatar : profileGroup} alt="avatar"/>
                  </div>
                  <div className="review-subheader">
                    <div className="user-wrapper">
                      <div className="user-name">{restaurantReview.userName}</div>
                      <div className="reviews-rating">
                        <img src={reviewStar} alt="star"/>
                        {restaurantReview.rating}
                        /5
                      </div>
                    </div>
                    <div className="ellipse-wrapper">
                      <div className="ellipse"/>
                      <div className="ellipse"/>
                    </div>
                  </div>
                </div>
                <div className="review-content">{restaurantReview.comment}</div>
              </div>
          ))
        }
      </div>
      <div className="review-btn_wrapper">
        <button type="button" onClick={handleSubmit} className="btn btn-282">Send</button>
      </div>
    </div>
  );
}

export default ReviewsPage;
