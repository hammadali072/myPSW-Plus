import { useState } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import DashboardSidebar from '../components/dashboard/dashboardSidebar/dashboardSidebar';
import DashboardHeader from '../components/dashboard/dashboardHeader/dashboardHeader';

const AboutSettingsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const aboutItems = [
    { label: 'Privacy Policy', path: '/settings/about/privacy' },
    { label: 'Terms of Use', path: '/settings/about/terms' }
  ];

  return (
    <div className="flex h-screen w-full bg-surface-alt font-dm overflow-hidden">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 sm:p-8 lg:p-12 pb-24">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 sm:mb-8 text-xs sm:text-sm font-medium">
              <Link to="/settings" className="text-primary hover:underline">Settings</Link>
              <HiChevronRight className="size-4 text-gray-400" />
              <span className="text-gray-500">About</span>
            </div>

            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 font-playfair mb-6 sm:mb-10 leading-tight">About</h1>

              <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-50">
                  {aboutItems.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      className="flex items-center justify-between p-5 sm:p-8 hover:bg-gray-50 duration-300 group"
                    >
                      <span className="text-sm sm:text-lg font-bold text-gray-700 group-hover:text-primary duration-300 font-dm tracking-tight">
                        {item.label}
                      </span>
                      <HiChevronRight className="size-5 sm:size-6 text-gray-300 group-hover:text-primary group-hover:translate-x-1 duration-300 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutSettingsPage;
