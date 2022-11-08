import React, {useState} from "react";
import './LoginPage.scss';
import vector_big from '../../images/Vector-big.png';
import foodie_big from '../../images/Foodie-big.png';
import facebook from '../../images/facebook.png';
import google from '../../images/google.png';
import apple from '../../images/apple.png';
import hide from '../../images/hide.png';
import {Link} from "react-router-dom";
import {signInWithEmailAndPassword,} from "firebase/auth";
import {auth} from "../../firebase";

const LoginPage = () => {
	const [passwordShown, setPasswordShown] = useState(true);
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const login = async () => {
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				loginEmail,
				loginPassword
			);
			console.log(user);
			setTimeout(() => {
				//this address will be changed in the future
				window.location.replace("onboard1");

			}, 3000);
		} catch {
			alert('Incorrect email or password')
		}
	};

	return (
		<div className="content">
			<div className="wrapper">
				<div className="logo-wrapper">
					<img src={vector_big} alt="vector"/>
					<img src={foodie_big} alt="foodie"/>
				</div>
				<div className="inputs-wrapper">
					<input className="input-log height-67"
						   type="email"
						   placeholder="Email"
						   onChange={(e) => setLoginEmail(e.target.value)}
					/>
					<div onClick={togglePassword} className='password-wrapper'>
						<input className="input-log height-58"
							  type={passwordShown ? "text" : "password"}
							   placeholder="Password"
							   onChange={(e) => setLoginPassword(e.target.value)}
						/>
						<div className='password-image'>
							<img  src={hide} alt='hide'/>
						</div>

					</div>
				</div>
				<Link className="forgot-pass" to='/'>Forgot Password?</Link>
					<button onClick={login} className="btn btn-295">Log In</button>

				<div className="login-with-wrapper">
					<div className="title">or login with</div>
					<div className="social">
						<div className="social-round">
							<img src={facebook} alt="facebook"/>
						</div>
						<div className="social-round">
							<img src={google} alt="google"/>
						</div>
						<div className="social-round">
							<img src={apple} alt="apple"/>
						</div>
					</div>
				</div>
				<div className="have-account">
					<div className="have-account-title">Don’t have an account?</div>
					<Link className="link" to="/signup">
						<div className="have-account-signup">Sign up</div>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default LoginPage;