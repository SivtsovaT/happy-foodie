import React, {useEffect, useState} from "react";
import "./CartPage.scss";
import {db, auth, upload} from "../../firebase";
import profileGroup from "../../images/profileGroup.png";
import {Link} from "react-router-dom";
import back from "../../images/back.png";
import camera from "../../images/camera.png";
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {setDoc, doc, getDoc} from "firebase/firestore";

const CartPage = () => {
	const [email, setEmail] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [photoURL, setPhotoURL] = useState(profileGroup);
	const [photo, setPhoto] = useState(null);
	const [loading, setLoading] = useState(false);

	const [user, setUser] = useState([]);
	const auth = getAuth();
	const fireUser = auth.currentUser;

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


	const getUserData = async () => {
		const docRef = doc(db, "users", fireUser.uid + "order")
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			setUser(docSnap.data())
		} else {
			console.log("No such document!")
		}
	}
	useEffect(() => {
		getUserData()
	}, []);

	return (
		<div className="content">
			<Link to="/home" className="link-panel">
				<div className="link-wrapper">
					<img src={back} alt="back"/>
				</div>
			</Link>
			<div className="user-data">
				<div className="user-data_title">{user.title}</div>
				<div className="user-data_title"> {user.price}</div>
			</div>
		</div>
	)
}

export default CartPage;