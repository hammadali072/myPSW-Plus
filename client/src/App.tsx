import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing-page-page';
import LoginPage from './pages/login-page';
import SignupPage from './pages/signup-page';
import OnboardingPage from './pages/onboarding-page';
import UserTypePage from './pages/user-type-page';
import AccountSetupPage from './pages/account-setup-page';
import ProfileSetupPage from './pages/profile-setup-page';
import FamilyProfileSetupPage from './pages/family-profile-setup-page';
import ProviderProfileSetupPage from './pages/provider-profile-setup-page';
import SetupCompletePage from './pages/setup-complete-page';
import DashboardPage from './pages/dashboard-page';
import CareRequestsPage from './pages/care-requests-page';
import AvailabilityPage from './pages/availability-page';
import ClientsPage from './pages/clients-page';
import MessagesPage from './pages/messages-page';
import SettingsPage from './pages/settings-page';
import SwitchAccountsPage from './pages/switch-accounts-page';
import ProfileSettingsPage from './pages/profile-settings-page';
import NotificationSettingsPage from './pages/notification-settings-page';
import BillingPaymentPage from './pages/billing-payment-page';
import PreferencesPage from './pages/preferences-page';
import PasswordSecurityPage from './pages/password-security-page';
import DataSettingsPage from './pages/data-settings-page';
import AboutSettingsPage from './pages/about-settings-page';
import ServiceAreaPage from './pages/service-area-page';
import CareExpertisePage from './pages/care-expertise-page';
import CareServicesPage from './pages/care-services-page';

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
      <Route path="/provider-profile-setup" element={<ProviderProfileSetupPage />} />
      <Route path="/setup-complete" element={<SetupCompletePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/care-requests" element={<CareRequestsPage />} />
      <Route path="/availability" element={<AvailabilityPage />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/settings/switch-accounts" element={<SwitchAccountsPage />} />
      <Route path="/settings/profile" element={<ProfileSettingsPage />} />
      <Route path="/settings/notifications" element={<NotificationSettingsPage />} />
      <Route path="/settings/billing" element={<BillingPaymentPage />} />
      <Route path="/settings/preferences" element={<PreferencesPage />} />
      <Route path="/settings/preferences/service-area" element={<ServiceAreaPage />} />
      <Route path="/settings/preferences/care-expertise" element={<CareExpertisePage />} />
      <Route path="/settings/preferences/care-services" element={<CareServicesPage />} />
      <Route path="/settings/security" element={<PasswordSecurityPage />} />
      <Route path="/settings/data" element={<DataSettingsPage />} />
      <Route path="/settings/about" element={<AboutSettingsPage />} />
    </Routes>
  );
}

export default App;
