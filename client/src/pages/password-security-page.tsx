import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi';
import DashboardSidebar from '../components/dashboard/dashboardSidebar/dashboardSidebar';
import DashboardHeader from '../components/dashboard/dashboardHeader/dashboardHeader';
import SecurityNav from '../components/security/securityNav/securityNav';
import ChangePasswordSection from '../components/security/changePasswordSection/changePasswordSection';
import TwoFactorSection from '../components/security/twoFactorSection/twoFactorSection';

const PasswordSecurityPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('password');
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(true);
  const [saveLoginInfo, setSaveLoginInfo] = useState(true);

  return (
    <div className="flex min-h-screen w-full bg-surface-alt font-dm overflow-hidden">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 sm:p-8 lg:p-12 pb-24">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-xs md:text-sm font-medium">
              <Link to="/settings" className="text-primary hover:underline">Settings</Link>
              <HiChevronRight className="size-4 text-gray-400" />
              <span className="text-gray-500">Password & Security</span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Navigation */}
              <div className="xl:col-span-4">
                <SecurityNav 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab}
                  isTwoFactorEnabled={isTwoFactorEnabled}
                  saveLoginInfo={saveLoginInfo}
                  setSaveLoginInfo={setSaveLoginInfo}
                />
              </div>

              {/* Main Content Area */}
              <div className="xl:col-span-8">
                {activeTab === 'password' && <ChangePasswordSection />}
                {activeTab === '2fa' && (
                  <TwoFactorSection onComplete={() => setIsTwoFactorEnabled(true)} />
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default PasswordSecurityPage;
