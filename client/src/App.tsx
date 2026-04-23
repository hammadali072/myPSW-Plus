import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing-page-page';
import LoginPage from './pages/login-page';
import SignupPage from './pages/signup-page';
import OnboardingPage from './pages/onboarding-page';
import UserTypePage from './pages/user-type-page';
import AccountSetupPage from './pages/account-setup-page';
import ProfileSetupPage from './pages/profile-setup-page';
import FamilyProfileSetupPage from './pages/family-profile-setup-page';
import SetupCompletePage from './pages/setup-complete-page';

function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/user-type" element={<UserTypePage />} />
      <Route path="/account-setup" element={<AccountSetupPage />} />
      <Route path="/profile-setup" element={<ProfileSetupPage />} />
      <Route path="/family-profile-setup" element={<FamilyProfileSetupPage />} />
      <Route path="/setup-complete" element={<SetupCompletePage />} />
    </Routes>
  );
}

export default App;
