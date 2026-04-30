import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiChevronRight, HiCheckCircle } from 'react-icons/hi';
import { clsx } from 'clsx';

import DashboardSidebar from '../components/dashboard/dashboardSidebar/dashboardSidebar';
import DashboardHeader from '../components/dashboard/dashboardHeader/dashboardHeader';

const GENDER_OPTIONS = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'no-preference', label: 'No Preference' }
];

const PatientGenderPreferencesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState(() => {
    return localStorage.getItem('patient_gender_preference') || 'no-preference';
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('patient_gender_preference', selectedGender);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="flex h-screen w-full bg-surface-alt font-dm overflow-hidden">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 sm:p-8 lg:p-12 pb-16 sm:pb-24">
            <div className="flex items-center gap-2 mb-6 sm:mb-8 text-[10px] sm:text-xs md:text-sm font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
              <Link to="/settings" className="text-primary hover:underline shrink-0">Settings</Link>
              <HiChevronRight className="size-3 sm:size-4 text-gray-400 shrink-0" />
              <Link to="/settings/preferences" className="text-primary hover:underline shrink-0">Preferences</Link>
              <HiChevronRight className="size-3 sm:size-4 text-gray-400 shrink-0" />
              <span className="text-gray-500 shrink-0">Patient Gender Preferences</span>
            </div>

            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-6 sm:mb-10 lg:mb-14">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-playfair mb-2 sm:mb-3 leading-tight tracking-tight">Patient Gender Preferences</h1>
                <p className="text-[11px] sm:text-sm md:text-base lg:text-lg text-gray-500 font-medium font-dm leading-relaxed">
                  Please choose your preferred patient gender to ensure a comfortable and respectful caregiving experience.
                </p>
              </div>

              <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8 sm:mb-12 lg:mb-14">
                {GENDER_OPTIONS.map((option, idx) => {
                  const isSelected = selectedGender === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedGender(option.id)}
                      className={clsx(
                        "w-full flex items-center justify-between p-5 sm:p-7 md:p-8 hover:bg-gray-50/80 duration-300 group",
                        idx !== GENDER_OPTIONS.length - 1 && "border-b border-gray-50"
                      )}
                    >
                      <span className={clsx(
                        "text-sm sm:text-base md:text-lg font-bold font-dm duration-300",
                        isSelected ? "text-primary" : "text-gray-700 group-hover:text-gray-900"
                      )}>
                        {option.label}
                      </span>
                      <div className={clsx(
                        "size-5 sm:size-6 md:size-7 rounded-full border-2 flex items-center justify-center duration-300",
                        isSelected ? "border-primary bg-primary" : "border-gray-200 group-hover:border-gray-300"
                      )}>
                        {isSelected && <div className="size-2 sm:size-2.5 md:size-3 rounded-full bg-white shadow-sm" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4 sm:space-y-6">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={clsx(
                    "w-full bg-gradient-primary text-white py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.99]",
                    isSaving && "animate-pulse"
                  )}
                >
                  {isSaving ? 'Saving Changes...' : 'Save'}
                </button>

                {saveSuccess && (
                  <div className="flex items-center justify-center gap-2 text-green-600 animate-in fade-in slide-in-from-top-2 duration-500">
                    <HiCheckCircle className="size-5 sm:size-6" />
                    <span className="text-sm sm:text-base font-bold font-dm">Preferences updated successfully!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientGenderPreferencesPage;
