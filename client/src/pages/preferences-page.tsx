import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HiChevronRight,
  HiOutlineMap,
  HiOutlineCalendar,
  HiOutlineBriefcase,
  HiOutlineHeart,
  HiOutlineUsers,
  HiOutlineTranslate,
  HiOutlineBadgeCheck,
  HiOutlineShieldCheck
} from 'react-icons/hi';
import { clsx } from 'clsx';

import DashboardSidebar from '../components/dashboard/dashboardSidebar/dashboardSidebar';
import DashboardHeader from '../components/dashboard/dashboardHeader/dashboardHeader';

const PREFERENCE_CATEGORIES = [
  {
    id: 'service-area',
    title: 'Service Area',
    description: 'Travel limits and preferred work neighborhoods.',
    Icon: HiOutlineMap,
    color: 'text-indigo-600 bg-indigo-50'
  },
  {
    id: 'schedule',
    title: 'Schedule & Availability',
    description: 'Work hours and upcoming time off requests.',
    Icon: HiOutlineCalendar,
    color: 'text-fuchsia-600 bg-fuchsia-50'
  },
  {
    id: 'expertise',
    title: 'Care Expertise',
    description: 'Specialized nursing and technical medical skills.',
    Icon: HiOutlineBriefcase,
    color: 'text-indigo-600 bg-indigo-50'
  },
  {
    id: 'services',
    title: 'Care Services',
    description: 'Daily living assistance and personal support services.',
    Icon: HiOutlineHeart,
    color: 'text-fuchsia-600 bg-fuchsia-50'
  },
  {
    id: 'gender',
    title: 'Patient Gender Preferences',
    description: 'Preferences for patient gender matching for comfort.',
    Icon: HiOutlineUsers,
    color: 'text-indigo-600 bg-indigo-50'
  },
  {
    id: 'language-primary',
    title: 'Language',
    description: 'Your primary clinical communication language.',
    Icon: HiOutlineTranslate,
    color: 'text-fuchsia-600 bg-fuchsia-50'
  },
  {
    id: 'certifications',
    title: 'Certifications & Qualifications',
    description: 'Professional certifications and valid licenses.',
    Icon: HiOutlineBadgeCheck,
    color: 'text-indigo-600 bg-indigo-50'
  },
  {
    id: 'language-secondary',
    title: 'Language Preferences',
    description: 'Secondary languages for providing care.',
    Icon: HiOutlineTranslate,
    color: 'text-fuchsia-600 bg-fuchsia-50'
  }
];

const PreferencesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (id: string) => {
    if (id === 'service-area') {
      navigate('/settings/preferences/service-area');
    } else if (id === 'schedule') {
      navigate('/availability');
    } else if (id === 'expertise') {
      navigate('/settings/preferences/care-expertise');
    } else if (id === 'services') {
      navigate('/settings/preferences/care-services');
    }
  };

  return (
    <div className="flex h-screen w-full bg-surface-alt font-dm overflow-hidden">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 pb-24">


            <div className="flex items-center gap-2 mb-6 sm:mb-8 text-[10px] sm:text-xs md:text-sm font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
              <Link to="/settings" className="text-primary hover:underline flex items-center gap-1 shrink-0">
                Settings
              </Link>
              <HiChevronRight className="size-3 sm:size-4 text-gray-400 shrink-0" />
              <span className="text-gray-500 shrink-0">Preferences</span>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">

              <div className="mb-8 sm:mb-10 lg:mb-14">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-playfair mb-2 sm:mb-3 leading-tight tracking-tight">Preferences</h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 font-medium font-dm leading-relaxed">
                  Customize your profile to match with the most suitable patients.
                </p>
              </div>


              <div className="space-y-3 sm:space-y-4">
                {PREFERENCE_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className="w-full group bg-white p-4 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:bg-gray-50/60 hover:border-gray-200 duration-300 flex items-center justify-between outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <div className="flex items-center gap-3 sm:gap-6 text-left min-w-0">
                      <div className={clsx(
                        "size-10 sm:size-12 md:size-14 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 duration-500 shadow-sm",
                        category.color
                      )}>
                        <category.Icon className="size-5 sm:size-6 md:size-7" />
                      </div>
                      <div className="min-w-0 pr-2">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1b1b22] font-dm mb-0.5 group-hover:text-primary duration-300 truncate">
                          {category.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs md:text-sm text-[#4a4452] font-medium leading-relaxed font-dm line-clamp-1 sm:line-clamp-none">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="size-7 sm:size-9 md:size-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 group-hover:bg-gradient-primary group-hover:text-white duration-300 shadow-sm">
                      <HiChevronRight className="size-4 sm:size-5 md:size-6 duration-300" />
                    </div>
                  </button>
                ))}
              </div>


              <div className="mt-10 sm:mt-16 lg:mt-20 p-6 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl border border-dashed border-gray-200 flex flex-col items-center text-center space-y-3 sm:space-y-4 bg-white/40 backdrop-blur-sm">
                <div className="size-10 sm:size-12 rounded-xl bg-white shadow-md border border-gray-100 flex items-center justify-center text-primary/60 shrink-0">
                  <HiOutlineShieldCheck className="size-6 sm:size-7" />
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-medium leading-relaxed font-dm italic">
                  Your preferences are securely stored and only shared with verified care professionals assigned to your care team.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default PreferencesPage;
