import React from "react";
import './SplashPage.scss';
import vector from '../../images/Vector.png';
import foodie from '../../images/Foodie.png';


const SplashPage = () => {

	const showNextPage = () => {
		setTimeout(() => {
			window.location.replace("onboard1");

		}, 3000);
	}
	showNextPage();

	return (
		<div className="content">
			<div className="splash-wrapper">
				<div className="logo-wrapper">
					<img src={vector} alt="vector"/>
					<img src={foodie} alt="foodie"/>
				</div>
			</div>
		</div>
	)
}
export default SplashPage;