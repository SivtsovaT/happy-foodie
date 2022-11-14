import React, {useState} from "react";
import './SignUpPage.scss';
import {Link} from "react-router-dom";
import back from "../../images/back.png";
import hide from "../../images/hide.png";
import {getAuth} from "firebase/auth";
import app from "../../firebase";
import db from "../../firebase";
import {createUserDocument} from "../../firebase";

const SignUpPage = () => {
	const [state, setState] = useState({displayName: '', email: '', password: '' });
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');

	const auth = getAuth(db);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setState({ email, password, displayName });
		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			console.log(user);
			await createUserDocument(user, { displayName });
		} catch (error) {
			console.log('error', error);
		}

		setState({ displayName: '', email: '', password: '' });
	};

	return (
		<div className="content">
			<form className="signup-login" onSubmit={handleSubmit}>
				<h2>Signup</h2>

				<input
					type="name"
					name="displayName"
					value={displayName}
					onChange={(e) => setDisplayName(e.target.value)}
					placeholder="Name"
				/>
				<input
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				/>
				<input
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<button>Signup</button>
			</form>
		</div>
	)
}

export default SignUpPage;