import React, {useState} from "react";
import './SignUpPage.scss';
import {Link} from "react-router-dom";
import back from "../../images/back.png";
import hide from "../../images/hide.png";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import app from "../../firebase";

const SignUpPage = () => {
	const [passwordShown, setPasswordShown] = useState(true);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const auth = getAuth(app);


	const handleSignup = (event) => {
		event.preventDefault();
		if (name.length == 0) {
			alert('The field "name" cannot be empty')
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
			alert('Please enter a valid email')
		} else if (password.length == 0 && password.length < 6) {
			alert("Password length cannot be less than 6 characters")
		} else if (password.valueOf() !== confirmPassword.valueOf()) {
			alert("Confirm your password please")
		} else {
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					console.log(user)
					alert('Registration successful');
					setTimeout(() => {
						//this address will be changed in the future
						window.location.replace("onboard1");

					}, 3000);
				})
				.catch((error) => {
					const errorCode = error.code;
					alert(errorCode)
				})
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
				<div className="signup-header">
					<div className="title">Sign Up</div>
					<div className="descr">Create your account here</div>
				</div>
				<div className="input-signup-wrapper">
					<input className="input-log height-67"
						   name="name"
						   type="text"
						   placeholder="Name"
						   value={name}
						   onChange={(event) => setName(event.target.value)}
					/>

					<input className="input-log height-67"
						   name="email1"
						   type="email"
						   placeholder="Email"
						   onChange={(event) => setEmail(event.target.value)}
						   value={email}
					/>

					<div onClick={togglePassword} className='password-wrapper'>
						<input className="input-log height-58"
							   name="password"
							   type={passwordShown ? "text" : "password"}
							   placeholder="Password"
							   value={password}
							   onChange={(event) => setPassword(event.target.value)}
						/>
						<div className='password-image'>
							<img  src={hide} alt='hide'/>
						</div>
					</div>
					<div onClick={togglePassword} className='password-wrapper'>
						<input className="input-log height-58"
							   type={passwordShown ? "text" : "password"}
							   placeholder=" Confirm password"
							   value={confirmPassword}
							   onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<div className='password-image'>
							<img  src={hide} alt='hide'/>
						</div>
					</div>
					<Link to="/menu">
					<button onClick={handleSignup} className="btn btn-295">Sign up</button>
					</Link>
				</div>
				<div className="have-account-signup-block">
					<div className="have-account-title">Don’t have an account?</div>
					<Link className="link" to="/signup">
						<div className="have-account-signup">Sign up</div>
					</Link>
				</div>
			</div>

		</div>
	)
}

export default SignUpPage;