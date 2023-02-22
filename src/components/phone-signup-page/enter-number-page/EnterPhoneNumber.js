import React, { useEffect, useState } from 'react';
import './EnterPhoneNumber.scss';
import { Link } from 'react-router-dom';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import back from '../../../images/back.png';
import app from '../../../firebase';

function EnterPhoneNumber() {
  const countryCode = '+38';
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [OTP, setOTP] = useState('');
  const [otpVisible, setOtpVisible] = useState(false);
  const [phoneVisible, setPhoneVisible] = useState(true);
  const [counter, setCounter] = useState(60);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      /* eslint-disable */
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
    }, auth);
  };

  const otpStyles = {
    display: otpVisible ? 'block' : 'none',
  };

  const phoneStyles = {
    display: phoneVisible ? 'block' : 'none',
  };

  const showPhone = () => {
    setOtpVisible(false);
    setPhoneVisible(true);
  };

  const auth = getAuth(app);

  const requestOtp = (event) => {
    event.preventDefault();
    if (phoneNumber.length === 13) {
      generateRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setOtpVisible(true);
          setPhoneVisible(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const verifyOtp = (event) => {
    const otp = event.target.value;
    setOTP(otp);
    if (otp.length === 6) {
      const { confirmationResult } = window;
      confirmationResult.confirm(otp).then((result) => {
        const { user } = result;
        console.log(user);
        setTimeout(() => {
          // this address will be changed in the future
          window.location.replace('profile');
        }, 3000);
      }).catch(((error) => {

      }));
    }
  };

  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  useEffect(() => {
    if (counter > 1) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      window.location.replace('login');
    }
  }, [counter]);

  return (
    <div className="content">

      <div style={phoneStyles} className="wrapper">
        <Link to="/login" className="link-panel">
          <div className="link-wrapper">
            <img src={back} alt="back" />
          </div>
        </Link>
        <div id="recaptcha-container" />
        <div className="phone-header">
          <div className="descr">Enter your phone number here</div>
        </div>
        <div className="input-phone-wrapper">
          <input
            className="input-log height-67"
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={handleChange}
          />
          <Link to="/menu">
            <button onClick={requestOtp} className="btn btn-295">Send phone number</button>
          </Link>
        </div>
      </div>
      <div style={otpStyles} className="wrapper">
        <div onClick={showPhone} className="link-panel">
          <div className="link-wrapper">
            <img src={back} alt="back" />
          </div>
        </div>

        <div className="otp-header">
          <div className="otp-title">
            <div className="otp-value">00</div>
            <div className="otp-value">:</div>
            {
							counter < 10 ? <div className="otp-value">0</div> : null
						}
            <div className="otp-value">{counter}</div>
          </div>
          <div className="descr">
            Type the verification code
            we’ve sent you
          </div>
        </div>
        <div className="otp-input-wrapper">
          <input
            className="input-log height-67"
            type="text"
            placeholder="Otp"
            value={OTP}
            onChange={verifyOtp}
          />
        </div>
        <div onClick={showPhone} className="send-again">Send again</div>
      </div>
    </div>
  );
}

export default EnterPhoneNumber;
