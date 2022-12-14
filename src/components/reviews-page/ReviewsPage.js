import React, {useState} from "react";
import "./ReviewsPage.scss";
import {Link} from "react-router-dom";
import back from "../../images/back.png";

const ReviewsPage = () => {
	const [comment, setComment] = useState("");

	return (
		<div className="content">
			<Link to="/detail" className="link-panel">
				<div className="reviews_link-wrapper">
					<img src={back} alt="back"/>
				</div>
				<div className="reviews-title">Reviews</div>
			</Link>
			<textarea className="input-log reviews"
					  type="text"
					  placeholder="Write your review..."
					  maxLength="80"
					 value={comment}
					 onChange={(event) => setComment(event.target.value)}
			/>


			<div className="review-list">
				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>
				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>

				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>

				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>

				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>

				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>

				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>

				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>

				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>

				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>
				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>

				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>

				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>

				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>

				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>

				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>

				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>

				<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
					alteration in some form, by injected humour, or randomised words</div>



			</div>
		</div>
	)
}

export default ReviewsPage