import React from 'react';
import './OnboardingPages.scss';
import { Link } from 'react-router-dom';
import pizza2 from '../../images/pizza2.png';

function OnboardingTwoPage() {
  return (
    <div className="content">
      <div className="wrapper">
        <div className="image-wrapper">
          <img src={pizza2} alt="pizza2" />
        </div>
        <div className="main-info">
          <div className="main-header">Order from your favourite stores </div>
          <div className="main-content">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
            {' '}
          </div>
          <div className="rectangles">
            <div className="rectangle-grey" />
            <div className="rectangle-red" />
            <div className="rectangle-grey" />
          </div>
          <Link to="/login">
            <button type="button" className="btn btn-282">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OnboardingTwoPage;
