import React, {useState} from "react";
import './ResetPassword.scss';
import back from '../../images/back.png';
import {Link} from "react-router-dom";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";

const ResetPassword = () => {
	const [email, setEmail] = useState('');

	const onChange = (e) => {
		setEmail(e.target.value);
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
			window.location.replace('login');
		} catch {
			alert('Could not send reset email');
		}
	}

	return (
		<div className="content">
			<div className="wrapper">
				<Link to="/login" className="link-panel">
					<div className="link-wrapper">
						<img src={back} alt="back"/>
					</div>
				</Link>
				<div className="header">
					<div className="title">Reset Password
					</div>
					<div className="descr">Please enter your email address to
						request a password reset</div>
				</div>
				<div className="input-wrapper">
					<input className="input-log height-67"
						   type="text"
						   placeholder="Email"
						   onChange={onChange}
						   value={email}
					/>
						<button onClick={onSubmit} className="btn btn-295">Send new password</button>
				</div>
			</div>
		</div>
	)
}

export default ResetPassword;
