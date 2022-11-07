import React from "react";
import './OnboardingPages.scss';
import pizza2  from '../../images/pizza2.png';
import {Link} from "react-router-dom";

const OnboardingTwoPage = () => {
	return (
		<div className="content">
			<div className="wrapper">
				<div className="image-wrapper">
					<img src={pizza2} alt="pizza2"/>
				</div>
				<div className="main-info">
					<div className="main-header">Order from your favourite stores </div>
					<div className="main-content">It is a long established fact that a reader will be distracted by
						the readable content of a page when looking at its layout. </div>
					<div className="rectangles">
						<div className="rectangle-grey"></div>
						<div className="rectangle-red"></div>
						<div className="rectangle-grey"></div>
					</div>
					<Link to='/second'>
						<button className="btn btn-282">Get Starte</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default OnboardingTwoPage;