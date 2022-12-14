import React, {useState} from "react";
import "./ReviewRestaurantPage.scss";
import {Link} from "react-router-dom";
import back from "../../images/back.png";
import rating_logo from "../../images/rating/rating-logo.png";
import star_yellow from "../../images/revres/star_yellow.png";
import star_empty from "../../images/revres/star_empty.png";
import {getAuth} from "firebase/auth";
import {db} from "../../firebase";
import {setDoc, doc, increment, getDoc} from "firebase/firestore";

const ReviewRestaurantPage = () => {
	const [rating, setRating] = useState(null);
	const [hover, setHover] = useState(null);
	const [comment, setComment] = useState("");

	const handleSubmit = async () => {
		const auth = getAuth();
		const userId = auth.currentUser.uid;
		let itemRef = doc(db, `review-restaurant/${userId}`);
		await setDoc(itemRef, {
			userId: userId,
			rating: rating,
			comment: comment
		}, {merge: true});
		window.location.replace('home');
	}

	return (
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
							<img src={rating_logo} alt="logo"/>
						</div>
					</div>
				</div>
				<div className="question">How was your last order from Whataburger ?</div>
				<div className="revres-good">Good</div>
				<div className="stars-wrapper">
					{
						[...Array(5)].map((star, index) => {
							const ratingValue = index + 1;
							return (
								<label key={index}>
									<input className="star-input"
										   type="radio"
										   name="rating"
										   value={ratingValue}
										   onChange={() => setRating(ratingValue)}
									/>
									<div className="star-wrapper">
										<img src={ratingValue <= (hover || rating) ? star_yellow : star_empty}
											 alt="star"
											 onMouseEnter={() => setHover(ratingValue)}
											 onMouseLeave={() => setHover(null)}
										/>
									</div>

								</label>
							)
						})
					}
				</div>
				<textarea className="input-log rating"
						  type="text"
						  placeholder="Write"
						  maxLength="360"
						  value={comment}
						  onChange={(event) => setComment(event.target.value)}
				/>
				<button onClick={handleSubmit} className="btn btn-282 btn-rating">Submit</button>
			</div>
		</div>
	)
}

export default ReviewRestaurantPage;