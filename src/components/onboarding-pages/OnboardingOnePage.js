import React from "react";
import './OnboardingPages.scss';
import pizza from '../../images/pizza1.png';
import {Link} from "react-router-dom";

const OnboardingOnePage = () => {
	return(
		<div className="content">
			<div className="wrapper">
				<div className="image-wrapper">
					<img src={pizza} alt="pizza"/>
				</div>
				<div className="main-info">
					<div className="main-header">Choose Your Favorite Food</div>
					<div className="main-content">It is a long established fact that a reader will be distracted
						by the readable content of a page when looking at its layout. </div>
					<div className="rectangles">
						<div className="rectangle-red"></div>
						<div className="rectangle-grey"></div>
						<div className="rectangle-grey"></div>
					</div>
					<Link to='/onboard2'>
						<button className="btn btn-282">Get Started</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default OnboardingOnePage;