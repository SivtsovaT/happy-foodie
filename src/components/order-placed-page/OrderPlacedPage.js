import React from 'react';
import './OrderPlacedPage.scss';
import { Link } from 'react-router-dom';
import back from '../../images/back.png';
import order from '../../images/order-placed/order.png';

function OrderPlacedPage() {
  const goHome = (event) => {
    event.preventDefault();
    window.location.replace('/home');
  };
  return (
    <div className="content">
      <Link to="/home" className="link-panel">
        <div className="order-link-wrapper">
          <img src={back} alt="back" />
        </div>
      </Link>
      <div className="order-wrapper">
        <img src={order} alt="order" />
        <div className="order-success">
          Your order has been
          {' '}
          <br />
          {' '}
          successfully placed
        </div>
        <div className="relax">
          Sit and relax while your orders is being
          {' '}
          <br />
          {' '}
          worked on . It’ll take 5min before you get it
        </div>
        <button type="button" onClick={goHome} className="btn btn-295">Go back to home</button>
      </div>

    </div>
  );
}

export default OrderPlacedPage;
