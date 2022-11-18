import React from 'react';
import './index.scss';
import {Route, Routes} from "react-router-dom";
import SplashPage from "./components/splash-page/SplashPage";
import OnboardingOnePage from "./components/onboarding-pages/OnboardingOnePage";
import OnboardingTwoPage from "./components/onboarding-pages/OnboardingTwoPage";
import LoginPage from "./components/login-page/LoginPage";
import ResetPassword from "./components/reset-password-page/ResetPassword";
import SignUpPage from "./components/sign-up-page/SignUpPage";
import EnterPhoneNumber from "./components/phone-signup-page/enter-number-page/EnterPhoneNumber";
import ProfilePage from "./components/profile-page/ProfilePage";
import MenuPage from "./components/menu-page/MenuPage";
import HomePage from "./components/home-page/HomePage";
import AddNewAddressPage from "./components/add-new-address-page/AddNewAddressPage";




const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<SplashPage/>}/>
                <Route path="onboard1" element={<OnboardingOnePage/>}/>
                <Route path="onboard2" element={<OnboardingTwoPage/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="reset" element={<ResetPassword/>}/>
                <Route path="signup" element={<SignUpPage/>}/>
                <Route path="phone" element={<EnterPhoneNumber/>}/>
                <Route path="profile" element={<ProfilePage/>}/>
                <Route path="menu" element={<MenuPage/>}/>
                <Route path="home" element={<HomePage/>}/>
                <Route path="address" element={<AddNewAddressPage/>}></Route>
            </Routes>
        </>
    )
}

export default App;
