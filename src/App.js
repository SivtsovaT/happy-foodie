import React from 'react';
import './index.scss';
import {Route, Routes} from "react-router-dom";
import SplashPage from "./components/splash-page/SplashPage";
import OnboardingOnePage from "./components/onboarding-pages/OnboardingOnePage";
import OnboardingTwoPage from "./components/onboarding-pages/OnboardingTwoPage";
import LoginPage from "./components/login-page/LoginPage";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<SplashPage/>}/>
                <Route path="onboard1" element={<OnboardingOnePage/>}/>
                <Route path="onboard2" element={<OnboardingTwoPage/>}/>
                <Route path="login" element={<LoginPage/>}/>
            </Routes>
        </>
    )
}

export default App;
