import React from 'react';
import './index.scss';
import {Route, Routes} from "react-router-dom";
import SplashPage from "./components/splash-page/SplashPage";
import OnboardingOnePage from "./components/onboarding-pages/OnboardingOnePage";
import OnboardingTwoPage from "./components/onboarding-pages/OnboardingTwoPage";
import LoginPage from "./components/login-page/LoginPage";
import ResetPassword from "./components/reset-password-page/ResetPassword";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<SplashPage/>}/>
                <Route path="onboard1" element={<OnboardingOnePage/>}/>
                <Route path="onboard2" element={<OnboardingTwoPage/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="reset" element={<ResetPassword/>}/>
            </Routes>
        </>
    )
}

export default App;
