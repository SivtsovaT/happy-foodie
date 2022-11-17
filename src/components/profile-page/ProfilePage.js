import React, {useEffect, useState} from "react";
import './ProfilePage.scss';
import back from "../../images/back.png";
import camera from "../../images/camera.png";
import profileGroup from "../../images/profileGroup.png";
import {Link} from "react-router-dom";
import {auth, upload} from "../../firebase";
import {onAuthStateChanged} from 'firebase/auth';

const ProfilePage = () => {
	const [email, setEmail] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [photoURL, setPhotoURL] = useState(profileGroup);
	const [photo, setPhoto] = useState(null);
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
		if (currentUser?.email || currentUser?.displayName || currentUser?.phoneNumber) {
			setEmail(currentUser.email);
			setDisplayName(currentUser.displayName);
			setPhoneNumber(currentUser.phoneNumber);
			console.log(currentUser)
		}
	}, [currentUser]);

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setPhoto(e.target.files[0]);
		}
	}
	const handleClick = () => {

		setTimeout(() => {
			window.location.replace("profile");
		}, 5000);
		upload(photo, currentUser, setLoading);
	}

	useEffect(() => {
		if (currentUser?.photoURL) {
			console.log(currentUser.photoURL)
			setPhotoURL(currentUser.photoURL);
		}
	}, [currentUser])

	return (
		<div className="content">
			<Link to="/login" className="link-panel">
				<div className="link-wrapper">
					<img src={back} alt="back"/>
				</div>
			</Link>
			<div className="user-profile_wrapper">
				<label>
					<div className="avatar">
						<div className="profile-image-group">
							<img className="photo" src={photoURL} alt="profile"/>
							<img className="camera" src={camera} alt="camera"/>
							<input type="file"
								   onChange={handleChange}
							/>
						</div>
					</div>
				</label>
				<div className="user__name">{displayName}</div>
				<button className=" btn-edit-profile" disabled={loading || !photo} onClick={handleClick}>Edit Profile
				</button>
			</div>
			<div className="user-data">
				<div className="user-data_title">Full name</div>
				<div className="user-data_descr">{displayName}</div>
			</div>
			<div className="user-data">
				<div className="user-data_title">E-mail</div>
				<div className="user-data_descr">{email}</div>
			</div>
			<div className="user-data">
				<div className="user-data_title">Phone Number</div>
				<div className="user-data_descr">{phoneNumber}</div>
			</div>
		</div>
	)
}

export default ProfilePage;