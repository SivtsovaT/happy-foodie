import React, {useEffect, useState} from "react";
import "./MenuPage.scss";
import screen from "../../images/screen.png";
import avatar from "../../images/avatar.png";
import closeProfile from "../../images/close.png";
import {Link} from "react-router-dom";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "../../firebase";
import profileGroup from "../../images/profileGroup.png";

const MenuPage = () => {
	const [email, setEmail] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [photoURL, setPhotoURL] = useState(profileGroup);
	const [loading, setLoading] = useState(false);

	const useAuth = () => {
		const [currentUser, setCurrentUser] = useState();
		useEffect(() => {
			const unsub =  onAuthStateChanged(auth, user => setCurrentUser(user));
			return unsub;
		}, [])
		return currentUser;
	}
	const currentUser = useAuth();

	useEffect(() => {
		if (currentUser?.email || currentUser?.displayName || currentUser?.photoURL) {
			setEmail(currentUser.email);
			setDisplayName(currentUser.displayName);
			setPhotoURL(currentUser.photoURL);
			console.log(currentUser)
		}
	}, [currentUser]);

	 const logout = () => {
		return signOut(auth);
	}

	const handleLogout = async () => {
		setLoading(true);
		try {
			await logout();
			setTimeout(() => {
				window.location.replace("login");
			}, 3000);
		} catch {
			alert('error')
		}
		setLoading(false)
	}

	return (
		<div className="content">
			<Link to="/home" className="link-panel">
				<div className="close-wrapper">
					<img src={closeProfile} alt="close"/>
				</div>
			</Link>
			<div className="profile-total">
				<div className="profile-left">
					<div className="avatar-wrapper">
						<img src={photoURL? photoURL : avatar} alt="avatar"/>
					</div>
					<div className="user-name">{displayName}</div>
					<div className="user-email">{email}</div>
					<ul>
						<Link to={"/profile"} className="menu-link">
							<li>My profile</li>
						</Link>
						{/*addresses will be change in the future */}

            <Link to={"/address"} className="menu-link">
							<li>My Address</li>
						</Link>

						<Link to={"/profile"} className="menu-link">
							<li>Payments</li>
						</Link>

						<Link to={"/profile"} className="menu-link">
							<li>Orders</li>
						</Link>

						<Link to={"/profile"} className="menu-link">
							<li>About Us</li>
						</Link>

						<Link to={"/profile"} className="menu-link">
							<li>Privacy Policy</li>
						</Link>

						<Link to={"/profile"} className="menu-link">
							<li>Terms & Conditions</li>
						</Link>
					</ul>
					<button onClick={handleLogout} className="btn btn-101">Log Out</button>
				</div>
				<div className="profile-right">
					<img src={screen} alt="screen"/>
				</div>
			</div>
		</div>
	)
}

export default MenuPage;
