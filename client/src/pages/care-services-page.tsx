import { useState } from 'react';

import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  HiChevronRight,
  HiCheckCircle,
  HiOutlineCheck
} from 'react-icons/hi';
import {
  MdOutlineBathtub,
  MdOutlineVolunteerActivism,
  MdOutlineCheckroom,
  MdOutlineDirectionsRun,
  MdOutlineMedicalServices,
  MdOutlineContentCut,
  MdOutlineHomeWork,
  MdOutlineRestaurant,
  MdOutlineDirectionsCar
} from 'react-icons/md';

import DashboardSidebar from '../components/dashboard/dashboardSidebar/dashboardSidebar';
import DashboardHeader from '../components/dashboard/dashboardHeader/dashboardHeader';

const CARE_SERVICES = [
  { id: 'bathing', label: 'Bathing & Toileting', icon: MdOutlineBathtub },
  { id: 'companionship', label: 'Companionship', icon: MdOutlineVolunteerActivism },
  { id: 'dressing', label: 'Dressing', icon: MdOutlineCheckroom },
  { id: 'exercise', label: 'Exercise & Mobility', icon: MdOutlineDirectionsRun },
  { id: 'general', label: 'General Care', icon: MdOutlineMedicalServices },
  { id: 'hygiene', label: 'Hygiene & Grooming', icon: MdOutlineContentCut },
  { id: 'housekeeping', label: 'Housekeeping', icon: MdOutlineHomeWork },
  { id: 'meal', label: 'Meal Preparation', icon: MdOutlineRestaurant },
  { id: 'transportation', label: 'Transportation', icon: MdOutlineDirectionsCar },
];

const CareServicesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>(['bathing', 'companionship', 'dressing']);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full bg-surface-alt font-dm overflow-hidden">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 sm:p-8 lg:p-12 pb-24">


            <div className="flex items-center gap-2 mb-6 sm:mb-8 text-[10px] sm:text-xs md:text-sm font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
              <Link to="/settings" className="text-primary hover:underline shrink-0">Settings</Link>
              <HiChevronRight className="size-3 sm:size-4 text-gray-400 shrink-0" />
              <Link to="/settings/preferences" className="text-primary hover:underline shrink-0">Preferences</Link>
              <HiChevronRight className="size-3 sm:size-4 text-gray-400 shrink-0" />
              <span className="text-gray-500 shrink-0">Care Services</span>
            </div>

            <div className="animate-in fade-in slide-in-from-right-4 duration-500">

              <div className="mb-8 sm:mb-12 lg:mb-16">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-playfair mb-2 sm:mb-3 leading-tight tracking-tight">Care Services</h1>
                <p className="text-[11px] sm:text-sm md:text-base lg:text-lg text-text-muted font-medium font-dm leading-relaxed">
                  Please select all the specific type of care needs you provide.
                </p>
              </div>


              <div className="space-y-2.5 sm:space-y-3 md:space-y-4 mb-10 sm:mb-16">
                {CARE_SERVICES.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={clsx(
                        "w-full group bg-white p-3.5 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 duration-300 flex items-center justify-between outline-none focus:outline-none",
                        isSelected
                          ? "border-[#6A0DAD] bg-[#F3E8FF]/30 shadow-md shadow-primary/5"
                          : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
                      )}
                    >
                      <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                        <div className={clsx(
                          "size-9 sm:size-11 md:size-14 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 duration-300",
                          isSelected ? "bg-white text-[#6A0DAD] shadow-sm" : "bg-gray-50 text-gray-400"
                        )}>
                          <service.icon className="size-5 sm:size-6 md:size-8" />
                        </div>
                        <span className={clsx(
                          "text-sm sm:text-base md:text-lg font-bold font-dm duration-300 text-left truncate",
                          isSelected ? "text-[#6A0DAD]" : "text-gray-700"
                        )}>
                          {service.label}
                        </span>
                      </div>
                      <div className={clsx(
                        "size-5 sm:size-6 md:size-7 rounded-md sm:rounded-lg border-2 flex items-center justify-center duration-300 shrink-0 ml-3",
                        isSelected
                          ? "bg-[#6A0DAD] border-[#6A0DAD] text-white scale-100"
                          : "bg-white border-gray-200 scale-90 opacity-40"
                      )}>
                        {isSelected && <HiOutlineCheck className="size-3 sm:size-4 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>


              <div className="space-y-4 sm:space-y-6">
                <button
                  onClick={handleSave}
                  disabled={isSaving || saveSuccess}
                  className={clsx(
                    "w-full py-4 sm:py-5 md:py-6 bg-gradient-primary text-white rounded-xl sm:rounded-full font-bold text-sm sm:text-base md:text-xl font-dm shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.01] duration-300 active:scale-95 flex items-center justify-center gap-2 sm:gap-3",
                    (isSaving || saveSuccess) && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isSaving ? (
                    <div className="size-4 sm:size-5 md:size-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : saveSuccess ? (
                    <HiCheckCircle className="size-5 sm:size-6 md:size-7" />
                  ) : null}
                  <span>{isSaving ? 'Saving Changes...' : saveSuccess ? 'Changes Saved!' : 'Save Changes'}</span>
                </button>

                {saveSuccess && (
                  <div className="bg-emerald-50 border border-emerald-100 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in duration-300">
                    <HiCheckCircle className="size-4 sm:size-5 md:size-6 text-emerald-500 shrink-0" />
                    <p className="text-emerald-700 text-[11px] sm:text-sm font-bold font-dm">Your care services have been updated successfully.</p>
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

export default CareServicesPage;
