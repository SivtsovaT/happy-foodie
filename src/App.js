import React from 'react';
import './index.scss';
import { Route, Routes } from 'react-router-dom';
import SplashPage from './components/splash-page/SplashPage';
import OnboardingOnePage from './components/onboarding-pages/OnboardingOnePage';
import OnboardingTwoPage from './components/onboarding-pages/OnboardingTwoPage';
import LoginPage from './components/login-page/LoginPage';
import ResetPassword from './components/reset-password-page/ResetPassword';
import SignUpPage from './components/sign-up-page/SignUpPage';
import EnterPhoneNumber from './components/phone-signup-page/enter-number-page/EnterPhoneNumber';
import ProfilePage from './components/profile-page/ProfilePage';
import MenuPage from './components/menu-page/MenuPage';
import HomePage from './components/home-page/HomePage';
import AddNewAddressPage from './components/add-new-address-page/AddNewAddressPage';
import CartPage from './components/cart/CartPage';
import RatingPage from './components/rating-page/RatingPage';
import DetailPage from './components/detail-page/DetailPage';
import ReviewsPage from './components/reviews-page/ReviewsPage';
import ReviewRestaurantPage from './components/review-resturent-page/ReviewRestaurantPage';
import OrderPlacedPage from './components/order-placed-page/OrderPlacedPage';
import CartNotSetPage from './components/cart-not-set-page/CartNotSetPage';
import PaymentAPage from './components/paymentA-page/PaymentAPage';
import CardDetailsPage from './components/card-details/CardDetailsPage';
import FavouritesPage from './components/favourites-page/FavouritesPage';
import OrdersPage from './components/orders-page/OrdersPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="onboard1" element={<OnboardingOnePage />} />
      <Route path="onboard2" element={<OnboardingTwoPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="reset" element={<ResetPassword />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="phone" element={<EnterPhoneNumber />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="menu" element={<MenuPage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="address" element={<AddNewAddressPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="rating" element={<RatingPage />} />
      <Route path="detail" element={<DetailPage />} />
      <Route path="reviews" element={<ReviewsPage />} />
      <Route path="revres" element={<ReviewRestaurantPage />} />
      <Route path="order" element={<OrderPlacedPage />} />
      <Route path="cartnot" element={<CartNotSetPage />} />
      <Route path="payment" element={<PaymentAPage />} />
      <Route path="carddetails" element={<CardDetailsPage />} />
      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="orders" element={<OrdersPage />} />

    </Routes>
  );
}

export default App;
